import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import https from 'https';

// --- UTILS ---
function normalizeDriveId(id: string | null | undefined): string | null {
  if (!id) return null;
  const cleaned = id.replace(/[\s\n\t\u200B]+/g, '');
  return cleaned || null;
}

function validateDriveId(id: string | null | undefined): boolean {
  if (!id) return false;
  if (id.length <= 20) return false;
  return /^[a-zA-Z0-9_-]+$/.test(id);
}

function checkDriveFileExists(fileId: string): Promise<boolean> {
  return new Promise((resolve) => {
    // We check the download endpoint because it usually returns 404 if not found
    // or 403/redirect if found. It's more reliable than the view endpoint which returns 200 with HTML for 404s.
    const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
    
    https.get(url, (res) => {
      // 404 means it definitely doesn't exist
      if (res.statusCode === 404) {
        resolve(false);
      } else {
        // Anything else (200, 302, 303, 403) typically means the file exists
        // (even if restricted, 403 means it exists but requires auth, 
        // though our links should be 'Anyone with the link' which usually redirects or serves it).
        resolve(true);
      }
    }).on('error', () => {
      resolve(false);
    });
  });
}

// --- MAIN SCRIPT ---
async function main() {
  console.log('--- Google Drive Links Audit ---');
  
  const dbPath = path.join(process.cwd(), 'server', 'private', 'database', 'interns.json');
  if (!fs.existsSync(dbPath)) {
    console.error('Database file not found at', dbPath);
    process.exit(1);
  }

  const fileContent = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  const ciphertext = fileContent.data;

  const parts = ciphertext.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encryptedHex = parts[1];
  
  // Try default fallback since this is a local project standard
  const DB_ENCRYPTION_SECRET = process.env.DB_ENCRYPTION_KEY || 'default-secret-database-key-for-pab-interns';
  const key = crypto.createHash('sha256').update(DB_ENCRYPTION_SECRET).digest();
  
  let decrypted = '';
  try {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
  } catch (err) {
    console.error('Failed to decrypt database. Check encryption key.');
    process.exit(1);
  }

  const interns = JSON.parse(decrypted);
  console.log(`Successfully decrypted database. Checking ${interns.length} interns...\n`);

  let passed = 0;
  let failed = 0;
  let missing = 0;
  let invalidFormat = 0;
  const duplicateMap = new Set<string>();
  let duplicates = 0;

  for (const intern of interns) {
    const rawId = intern.drive_file_id;
    const normalizedId = normalizeDriveId(rawId);
    
    process.stdout.write(`Checking ${intern.intern_id} (${intern.name})... `);

    if (!rawId) {
      console.log('❌ MISSING drive_file_id');
      missing++;
      failed++;
      continue;
    }

    if (!validateDriveId(normalizedId)) {
      console.log(`❌ INVALID FORMAT (Raw: '${rawId}', Normalized: '${normalizedId}')`);
      invalidFormat++;
      failed++;
      continue;
    }

    if (duplicateMap.has(normalizedId!)) {
      console.log(`⚠️ DUPLICATE ID (${normalizedId})`);
      duplicates++;
      // We don't fail just for duplicate, as sometimes siblings share a drive link if it's a team cert? 
      // Actually prompt says "Missing IDs, Duplicate IDs, Invalid IDs". Let's just warn.
    } else {
      duplicateMap.add(normalizedId!);
    }

    const exists = await checkDriveFileExists(normalizedId!);
    if (exists) {
      console.log('✅ PASS');
      passed++;
    } else {
      console.log(`❌ FILE NOT FOUND IN DRIVE (${normalizedId})`);
      failed++;
    }
    
    // Add a tiny delay to prevent rate-limiting by Google
    await new Promise(r => setTimeout(r, 100));
  }

  console.log('\n--- AUDIT REPORT ---');
  console.log(`Total Checked: ${interns.length}`);
  console.log(`PASS: ${passed}`);
  console.log(`FAIL: ${failed}`);
  console.log(`Missing: ${missing}`);
  console.log(`Invalid Format: ${invalidFormat}`);
  console.log(`Duplicates: ${duplicates}`);
}

main().catch(console.error);
