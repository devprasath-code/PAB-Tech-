import express, { Request, Response, NextFunction } from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import * as fs from 'fs';
import * as crypto from 'crypto';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { normalizeDriveId, validateDriveId, buildDrivePreviewURL } from './src/utils/drive';
import { z } from 'zod';
import { createServer as createViteServer } from 'vite';
import { google } from 'googleapis';

const certTokens = new Map<string, { fileId: string, expiresAt: number }>();
const DRIVE_FOLDER_ID = '1jEQT8Mq1u_cslFUX93YYeXcLrake5XWs';

// Single shared Google auth instance (initialised once, reused everywhere)
let _driveAuth: InstanceType<typeof google.auth.GoogleAuth> | null = null;
function getDriveAuth() {
  if (!_driveAuth) {
    // Prefer service-account JSON from env; fall back to ADC
    const saJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    const credentials = saJson ? JSON.parse(saJson) : undefined;
    _driveAuth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });
  }
  return _driveAuth;
}

// Periodically clean up expired cert tokens (every 5 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [token, data] of certTokens.entries()) {
    if (data.expiresAt < now) certTokens.delete(token);
  }
}, 5 * 60 * 1000);

// --- CONFIGURATION & ENV VARIABLES ---
const PORT = Number(process.env.PORT) || 4000;
const DB_ENCRYPTION_SECRET = process.env.DB_ENCRYPTION_KEY || (process.env.NODE_ENV !== 'production' ? 'default-secret-database-key-for-pab-interns' : '');
const HMAC_SECRET_KEY = process.env.HMAC_SECRET_KEY || (process.env.NODE_ENV !== 'production' ? 'default-secure-hmac-secret-key-for-pab-interns' : '');

interface Intern {
  s_no: number;
  intern_id: string;
  name: string;
  hash_key: string;
  drive_file_id?: string;
}

interface ActiveChallenge {
  challenge: string;
  expiresAt: number;
  signature: string;
}

// Global state
let interns: Intern[] = [];
const activeChallenges = new Map<string, ActiveChallenge>();

// Create express app
const app = express();

// Trust reverse proxy (Cloud Run / nginx proxy) for accurate IP identification in rate limiters
app.set('trust proxy', 1);

// --- SECURE MIDDLEWARE SETUP ---
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 1. CORS
app.use(cors({
  origin: true, // Allow all origins for the development/preview environment
  credentials: true
}));

// 2. Helmet - configured securely while allowing Vite preview content
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      // Allow unsafe-inline in dev so Vite can inject its bootstrap scripts
      scriptSrc: process.env.NODE_ENV !== 'production'
        ? ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://fonts.googleapis.com"]
        : ["'self'", "https://fonts.googleapis.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "blob:", "https://*"],
      fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],
      // Allow Vite HMR websocket on any local port as well as remote connections
      connectSrc: ["'self'", "https://*", "wss://*", "ws://*", "ws://localhost:*", "http://localhost:*"],
      // Allow embedding Google Drive certificate previews
      frameSrc: ["'self'", "https://drive.google.com", "https://docs.google.com"],
      frameAncestors: ["'self'", "https://*.run.app", "https://*.google.com", "https://ai.studio"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// 3. Compression
app.use(compression());

// 4. Rate Limiting for API routes
const apiRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // 30 requests per minute per IP
  message: { success: false, message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const verificationRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // 10 verification requests per 5 minutes per IP (prevent brute force)
  message: { success: false, message: 'Too many verification attempts. Please try again in 5 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// --- HELPER FUNCTIONS ---

// Decrypt database on startup
function loadAndDecryptDatabase() {
  try {
    const dbPath = path.join(process.cwd(), 'server', 'private', 'database', 'interns.json');
    if (!fs.existsSync(dbPath)) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('Database file not found; using in‑memory demo data for development.');
        interns = [
          { s_no: 1, intern_id: "PAB-SI-26-001", name: "PADMASRI N", hash_key: "08C3-7FD4-FD58-A84D-149C-7CB7-52F9-F6BA-C178-9546" },
          { s_no: 2, intern_id: "PAB-SI-26-003", name: "DIVYADHARSHINI S", hash_key: "E5C8-C5B1-DF7C-39C3-36CE-67B5-7FF4-D90A-DF0E-76D0" },
          { s_no: 3, intern_id: "PAB-SI-26-005", name: "SARUSARIDHA V", hash_key: "50E4-40AF-95BC-2EE1-82F1-B064-2558-EE06-62B3-A80F" }
        ];
      } else {
        console.error('Critical: Database file missing in production environment.');
        // Proceed with empty intern list; all API calls will return not‑found.
      }
      return;
    }

    const fileContent = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const ciphertext = fileContent.data;

    const parts = ciphertext.split(':');
    if (parts.length !== 2) {
      throw new Error('Invalid ciphertext format in interns.json');
    }

    const iv = Buffer.from(parts[0], 'hex');
    const encryptedHex = parts[1];

    let decrypted = '';
    let success = false;

    // 1. Try decrypting with DB_ENCRYPTION_SECRET (Primary Key)
    try {
      const key = crypto.createHash('sha256').update(DB_ENCRYPTION_SECRET).digest();
      const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
      decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      success = true;
      console.log('[Database] Decrypted database successfully using primary key.');
    } catch (e) {
      console.warn('[Database] Primary decryption failed, attempting fallback...');
    }

    // 2. Try decrypting with default/fallback secret
    if (!success) {
      try {
        const fallbackSecret = 'default-secret-database-key-for-pab-interns';
        const key = crypto.createHash('sha256').update(fallbackSecret).digest();
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        success = true;
        console.log('[Database] Decrypted database successfully using fallback key.');
      } catch (e) {
        console.warn('[Database] Decryption failed; loading demo interns.');
        interns = [
          { s_no: 1, intern_id: "PAB-SI-26-001", name: "PADMASRI N", hash_key: "08C3-7FD4-FD58-A84D-149C-7CB7-52F9-F6BA-C178-9546" },
          { s_no: 2, intern_id: "PAB-SI-26-003", name: "DIVYADHARSHINI S", hash_key: "E5C8-C5B1-DF7C-39C3-36CE-67B5-7FF4-D90A-DF0E-76D0" },
          { s_no: 3, intern_id: "PAB-SI-26-005", name: "SARUSARIDHA V", hash_key: "50E4-40AF-95BC-2EE1-82F1-B064-2558-EE06-62B3-A80F" }
        ];
        return;
      }
    }

    interns = JSON.parse(decrypted);
    console.log(`[Database] Loaded ${interns.length} interns successfully.`);
  } catch (error) {
    console.error('[Database Error] Failed to load/decrypt database:', error);
  }
}

// Cryptographically secure challenge generation
function generateSecureChallenge(): string {
  // Use a custom set of characters that excludes ambiguous characters (O, 0, I, 1)
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  const randomBytes = crypto.randomBytes(4);
  for (let i = 0; i < 4; i++) {
    result += chars[randomBytes[i] % chars.length];
  }
  return result;
}

// Input sanitization middleware helper
function sanitizeInput(text: string): string {
  return text.replace(/[<>'"&/]/g, '').trim();
}

// Periodically clean up expired challenges (every minute)
setInterval(() => {
  const now = Date.now();
  let deletedCount = 0;
  for (const [internId, challengeData] of activeChallenges.entries()) {
    if (challengeData.expiresAt < now) {
      activeChallenges.delete(internId);
      deletedCount++;
    }
  }
  if (deletedCount > 0) {
    console.log(`[Session Manager] Cleared ${deletedCount} expired challenges.`);
  }
}, 60 * 1000);

// --- API ENDPOINTS ---

// 1. Request Challenge
const RequestChallengeSchema = z.object({
  internId: z.string()
    .min(1, "Intern ID is required")
    .max(30, "Intern ID is too long")
    .transform(sanitizeInput)
});

app.post('/api/request-challenge', apiRateLimiter, async (req: Request, res: Response): Promise<void> => {
  try {
    const validationResult = RequestChallengeSchema.safeParse(req.body);
    if (!validationResult.success) {
       res.status(400).json({ 
        success: false, 
        message: validationResult.error.issues[0].message 
      });
       return;
    }

    const { internId } = validationResult.data;
    const normalizedId = internId.toUpperCase();

    // Ensure interns are loaded (in case DB not yet loaded)
    if (interns.length === 0) {
      loadAndDecryptDatabase();
    }
    // Check if the intern ID exists
    const intern = interns.find(i => i.intern_id.toUpperCase() === normalizedId);
    if (!intern) {
       res.status(404).json({ 
        success: false, 
        message: 'Invalid Intern ID' 
      });
       return;
    }

    // Generate random 4-character verification challenge
    let challenge = generateSecureChallenge();
    
    // Ensure challenge is unique amongst active challenges
    let attempts = 0;
    while (
      Array.from(activeChallenges.values()).some(c => c.challenge === challenge && c.expiresAt > Date.now()) && 
      attempts < 10
    ) {
      challenge = generateSecureChallenge();
      attempts++;
    }

    // Compute HMAC-SHA256 signature using the HASH_KEY and SERVER SECRET_KEY
    const hmac = crypto.createHmac('sha256', HMAC_SECRET_KEY);
    hmac.update(intern.hash_key + intern.intern_id + challenge);
    const signature = hmac.digest('hex');

    // Store temporarily for 5 minutes
    const expiresIn = 300; // seconds
    const expiresAt = Date.now() + expiresIn * 1000;

    activeChallenges.set(normalizedId, {
      challenge,
      expiresAt,
      signature
    });

    console.log(`[Challenge Created] Intern ID: ${normalizedId} | Challenge: ${challenge}`);

    // Return the response without exposing sensitive info
     res.json({
      challenge,
      expiresIn
    });
  } catch (error) {
    console.error('[API Error] Request challenge failure:', error);
     res.status(500).json({ 
      success: false, 
      message: 'Internal Server Error' 
    });
  }
});

async function getDriveCertificate(internId: string, sNo: number, driveFileId?: string): Promise<string | null> {
  try {
    const drive = google.drive({ version: 'v3', auth: getDriveAuth() });

    // If the database row already contains a file ID, use it directly
    if (driveFileId) return driveFileId;

    // Build candidate filenames to search (most-likely first)
    const padded = String(sNo).padStart(3, '0');
    const possibleNames = [
      `PAB-SI-26-${padded}.jpeg`,   // matches PAB-SI-26-001.jpeg etc.
      `PAB-SI-26-${padded}.pdf`,
      `${internId}.jpeg`,
      `${internId}.pdf`,
      `PAB-INT-2026-${padded}.jpeg`,
      `PAB-INT-2026-${padded}.pdf`,
      `PAB-INT-2028-${padded}.jpeg`,
      `PAB-INT-2028-${padded}.pdf`,
    ];

    const queryNames = possibleNames.map(n => `name = '${n}'`).join(' or ');
    const query = `'${DRIVE_FOLDER_ID}' in parents and (${queryNames}) and trashed = false`;

    const response = await drive.files.list({
      q: query,
      fields: 'files(id, name, mimeType)',
      spaces: 'drive',
      pageSize: 5,
    });

    if (response.data.files && response.data.files.length > 0) {
      console.log(`[Drive] Found certificate for ${internId}: ${response.data.files[0].name}`);
      return response.data.files[0].id!;
    }

    console.warn(`[Drive] No certificate file found for ${internId} in folder`);
    return null;
  } catch (err) {
    console.error(`[Drive Error] Failed to search certificate for ${internId}:`, err);
    return null;
  }
}

// 2. Verify Challenge & Retrieve Certificate
const VerifyChallengeSchema = z.object({
  internId: z.string()
    .min(1, "Intern ID is required")
    .max(30, "Intern ID is too long")
    .transform(sanitizeInput),
  challenge: z.string()
    .length(4, "Challenge must be exactly 4 characters")
    .toUpperCase()
    .transform(sanitizeInput),
  hashKeyBlock: z.string()
    .length(4, "Hash Key Block must be exactly 4 characters")
    .toUpperCase()
    .transform(sanitizeInput)
});

app.post('/api/verify', verificationRateLimiter, async (req: Request, res: Response): Promise<void> => {
  try {
    const validationResult = VerifyChallengeSchema.safeParse(req.body);
    if (!validationResult.success) {
       res.status(400).json({ 
        success: false, 
        message: validationResult.error.issues[0].message 
      });
       return;
    }

    const { internId, challenge, hashKeyBlock } = validationResult.data;
    const normalizedId = internId.toUpperCase();

    // Check challenge existence
    const storedChallenge = activeChallenges.get(normalizedId);
    if (!storedChallenge) {
       res.status(400).json({ 
        success: false, 
        message: 'Verification Failed' // Keep generic for security
      });
       return;
    }

    // Check expiration
    if (storedChallenge.expiresAt < Date.now()) {
      activeChallenges.delete(normalizedId);
       res.status(400).json({ 
        success: false, 
        message: 'Verification Failed' 
      });
       return;
    }

    // Check challenge match
    if (storedChallenge.challenge !== challenge) {
       res.status(400).json({ 
        success: false, 
        message: 'Verification Failed' 
      });
       return;
    }

    // Retrieve the intern
    const intern = interns.find(i => i.intern_id.toUpperCase() === normalizedId);
    if (!intern) {
      activeChallenges.delete(normalizedId);
       res.status(400).json({ 
        success: false, 
        message: 'Verification Failed' 
      });
       return;
    }

    console.log("Drive ID:", intern.drive_file_id);
    console.log(
      "Preview:",
      `https://drive.google.com/file/d/${intern.drive_file_id}/preview`
    );

    // Verify that the entered hashKeyBlock matches ANY segment of the intern's hash_key
    const segments = intern.hash_key.split('-').map(s => s.toUpperCase());
    const blockMatches = segments.includes(hashKeyBlock.toUpperCase());
    if (!blockMatches) {
      console.warn(`[Security Alert] Hash Key block mismatch for Intern: ${normalizedId}`);
      activeChallenges.delete(normalizedId);
       res.status(400).json({ 
        success: false, 
        message: 'Verification Failed' 
      });
       return;
    }

    // Backend combines and computes HMAC-SHA256 using the HASH_KEY and SECRET_KEY
    const hmac = crypto.createHmac('sha256', HMAC_SECRET_KEY);
    hmac.update(intern.hash_key + intern.intern_id + challenge);
    const computedSignature = hmac.digest('hex');

    // Verify that the generated signature matches the expected stored value
    if (computedSignature !== storedChallenge.signature) {
      console.warn(`[Security Alert] Signature mismatch for Intern: ${normalizedId}`);
      activeChallenges.delete(normalizedId);
       res.status(401).json({ 
        success: false, 
        message: 'Verification Failed' 
      });
       return;
    }

    // Use drive_file_id directly from the encrypted database
    const rawFileId = intern.drive_file_id || null;
    const fileId = normalizeDriveId(rawFileId);
    const isValidDriveId = validateDriveId(fileId);

    if (process.env.NODE_ENV === 'development') {
      console.log(`\n--- [DEBUG: Certificate Retrieval] ---`);
      console.log(`Found Intern: ${intern.name}`);
      console.log(`Intern ID: ${normalizedId}`);
      console.log(`Raw Drive File ID: '${rawFileId}'`);
      console.log(`Normalized Drive File ID: '${fileId}'`);
      console.log(`Valid ID Format: ${isValidDriveId}`);
      if (isValidDriveId && fileId) {
        console.log(`Generated Preview URL: ${buildDrivePreviewURL(fileId)}`);
      }
      console.log(`----------------------------------------\n`);
    }

    if (!isValidDriveId && rawFileId) {
      console.warn(`[Certificate Alert] Intern ${normalizedId} has an invalid drive_file_id format: '${rawFileId}'`);
    }

    // Only set valid drive IDs for the frontend
    const finalFileId = isValidDriveId ? fileId : null;
    console.log(`[Certificate] Intern ${normalizedId} drive_file_id: ${finalFileId || 'NOT FOUND OR INVALID'}`);

    // Verification succeeded!
    activeChallenges.delete(normalizedId);
    console.log(`[Verification Success] Intern ID: ${normalizedId} successfully verified.`);

    const certToken = crypto.randomUUID();
    if (finalFileId) {
      certTokens.set(certToken, { fileId: finalFileId, expiresAt: Date.now() + 15 * 60 * 1000 }); // Valid for 15 mins
    }

    // Return verification result with token
     res.json({
      success: true,
      name: intern.name,
      internId: intern.intern_id,
      hashKey: intern.hash_key,
      certNo: `PAB-INT-2026-${String(intern.s_no).padStart(3, '0')}`,
      certToken: certToken,
      driveFileId: finalFileId,
      previewUrl: finalFileId ? buildDrivePreviewURL(finalFileId) : null,
      status: 'Verified'
    });
  } catch (error) {
    console.error('[API Error] Verification failure:', error);
     res.status(500).json({ 
      success: false, 
      message: 'Internal Server Error' 
    });
  }
});

// Health check endpoint (public — used by Render & monitoring tools)
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'PAB Backend',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// --- DEBUG ENDPOINT (Development Only) ---
app.get('/api/debug/certificate/:internId', (req: Request, res: Response): void => {
  if (process.env.NODE_ENV !== 'development') {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }

  const { internId } = req.params;
  const intern = interns.find(i => i.intern_id.toUpperCase() === internId.toUpperCase());
  
  if (!intern) {
    res.status(404).json({ error: 'Intern not found' });
    return;
  }

  const rawFileId = intern.drive_file_id;
  const fileId = normalizeDriveId(rawFileId);
  const isValid = validateDriveId(fileId);

  res.json({
    intern: {
      s_no: intern.s_no,
      intern_id: intern.intern_id,
      name: intern.name,
    },
    driveInfo: {
      rawDriveId: rawFileId,
      normalizedDriveId: fileId,
      isValidFormat: isValid,
      previewUrl: isValid && fileId ? buildDrivePreviewURL(fileId) : null,
      viewUrl: isValid && fileId ? `https://drive.google.com/file/d/${fileId}/view?usp=sharing` : null
    },
    status: isValid ? 'Valid Format' : 'Invalid or Missing ID Format'
  });
});

// Certificate Streaming endpoint — proxies the Drive file through the backend
app.get('/api/certificate/:token', async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.params;
    const cert = certTokens.get(token);
    if (!cert || cert.expiresAt < Date.now()) {
      res.status(403).send('Invalid or expired certificate token. Please verify again.');
      return;
    }

    if (req.query.download === 'true') {
      try {
        const drive = google.drive({ version: 'v3', auth: getDriveAuth() });
        const file = await drive.files.get(
          { fileId: cert.fileId, alt: 'media' },
          { responseType: 'stream' }
        );
        const contentType = (file.headers['content-type'] as string) || 'application/octet-stream';
        const isPDF = contentType.includes('pdf');
        const ext = isPDF ? 'pdf' : 'jpeg';
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `attachment; filename="PAB_Certificate.${ext}"`);
        (file.data as NodeJS.ReadableStream).pipe(res);
        return;
      } catch (err) {
        res.redirect(`https://drive.google.com/uc?export=download&id=${cert.fileId}`);
        return;
      }
    }

    try {
      const drive = google.drive({ version: 'v3', auth: getDriveAuth() });
      const meta = await drive.files.get({
        fileId: cert.fileId,
        fields: 'mimeType, name',
      });
      const mimeType = meta.data.mimeType || 'image/jpeg';
      const isPDF = mimeType.includes('pdf');

      if (isPDF) {
        const file = await drive.files.get(
          { fileId: cert.fileId, alt: 'media' },
          { responseType: 'stream' }
        );
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="PAB_Certificate.pdf"');
        (file.data as NodeJS.ReadableStream).pipe(res);
        return;
      } else {
        const file = await drive.files.get(
          { fileId: cert.fileId, alt: 'media' },
          { responseType: 'arraybuffer' }
        );
        const imgData = Buffer.from(file.data as ArrayBuffer).toString('base64');
        const imgMime = mimeType.includes('png') ? 'image/png' : 'image/jpeg';
        const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:#1a1a1a; display:flex; align-items:flex-start; justify-content:center; min-height:100vh; padding:16px; }
  img { max-width:100%; height:auto; border-radius:8px; box-shadow:0 4px 32px rgba(0,0,0,0.5); }
</style></head>
<body><img src="data:${imgMime};base64,${imgData}" alt="PAB Internship Certificate" /></body>
</html>`;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.send(html);
        return;
      }
    } catch (err) {
      res.redirect(`https://drive.google.com/file/d/${cert.fileId}/preview`);
      return;
    }
  } catch (error: any) {
    console.error('[Drive Stream Error]', error?.message || error);
    res.status(500).send('Error retrieving certificate. Please try again.');
  }
});

// --- SERVER STARTUP & VITE INTEGRATION ---
async function startServer() {
  // Load and decrypt database
  loadAndDecryptDatabase();

  // Email transporter (use environment variables for credentials)
  const emailTransporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });


  // Internship application email endpoint
  app.post('/api/internship-apply', async (req: Request, res: Response) => {
    try {
      const data = req.body;

      // Extract attachments if present
      const attachments = [];
      if (data.photo && data.photo.data) {
        attachments.push({
          filename: data.photo.name || 'photo.png',
          path: data.photo.data
        });
      }
      if (data.resume && data.resume.data) {
        attachments.push({
          filename: data.resume.name || 'resume.pdf',
          path: data.resume.data
        });
      }

      // Format email body professionally
      const emailContent = `
🎓 NEW INTERNSHIP APPLICATION INTAKE
=============================================

1. PERSONAL INFORMATION
---------------------------------------------
Full Name: ${data.name || 'N/A'}
Gender: ${data.gender || 'N/A'}
Date of Birth: ${data.dob || 'N/A'}
Registration Number: ${data.regNo || 'N/A'}

2. CONTACT INFORMATION
---------------------------------------------
Mobile Number: ${data.mobile || 'N/A'}
WhatsApp Number: ${data.whatsapp || 'N/A'}
Email Address: ${data.email || 'N/A'}

3. ACADEMIC AND LOCATION DETAILS
---------------------------------------------
Department: ${data.department === 'Other' ? data.departmentOther : (data.department || 'N/A')}
CGPA / Percentage (5th Sem): ${data.cgpa || 'N/A'}
College Name: ${data.collegeName || 'N/A'}
University: ${data.university || 'N/A'}
Preferred Location: ${data.location || 'N/A'}

4. EXPERIENCE & INTERNSHIP TOPICS
---------------------------------------------
Topic 1 (Interest): ${data.areaOfInterest1 === 'Other' ? data.areaOfInterest1Other : (data.areaOfInterest1 || 'N/A')}
Topic 2 (Interest): ${data.areaOfInterest2 === 'Other' ? data.areaOfInterest2Other : (data.areaOfInterest2 || 'N/A')}
Prior Embedded Systems Experience: ${data.priorExperience || 'No'}
Prior Experience Details: ${data.priorExperience === 'Yes' ? (data.experienceDetails || 'None provided') : 'N/A'}

5. STATEMENT OF INTENT
---------------------------------------------
Why join this Internship:
${data.whyJoin || 'N/A'}

=============================================
Submitted: ${new Date().toLocaleString()} (Local Server Time)
      `;

      const mailOptions = {
        from: process.env.EMAIL_USER || 'no-reply@pabtech.in',
        to: 'info@pabtech.in',
        subject: `New Internship Application - ${data.name || 'Applicant'} [GCT/Autonomous]`,
        text: emailContent,
        attachments
      };

      await emailTransporter.sendMail(mailOptions);
      res.json({ success: true, message: 'Application emailed successfully.' });
    } catch (err) {
      console.error('[Email send error]', err);
      res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
  });

  // Contact form email endpoint
  app.post('/api/contact', apiRateLimiter, async (req: Request, res: Response) => {
    try {
      const { name, email, phone, subject, message } = req.body;

      if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
        res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
        return;
      }

      const emailContent = `
📬 NEW CONTACT FORM SUBMISSION — PAB TECH
=============================================

Full Name   : ${name}
Email       : ${email}
Phone       : ${phone || 'Not provided'}
Subject     : ${subject}

Message:
---------------------------------------------
${message}

=============================================
Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
      `;

      const mailOptions = {
        from: process.env.EMAIL_USER || 'no-reply@pabtech.in',
        to: 'support@pabtech.in',
        replyTo: email,
        subject: `[PAB Web] ${subject} — from ${name}`,
        text: emailContent,
      };

      await emailTransporter.sendMail(mailOptions);
      console.log(`[Contact] Message from ${name} <${email}> forwarded to support@pabtech.in`);
      res.json({ success: true, message: 'Message sent successfully.' });
    } catch (err) {
      console.error('[Contact email error]', err);
      res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    console.log('[Dev] Starting Vite in middleware mode...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    console.log('[Prod] Serving static client files...');
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 PAB Backend running on port ${PORT}`);
  });
}

// Global error handler to avoid leaking stack traces
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Unhandled Error]', err.message);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

startServer();
