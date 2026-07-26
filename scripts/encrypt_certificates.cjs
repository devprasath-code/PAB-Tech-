const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ENCRYPTION_SECRET = process.env.DB_ENCRYPTION_KEY || 'default-secret-database-key-for-pab-interns';

const certMapping = [
  { source: 'media__1784623578149.jpg', internId: 'PAB-SI-26-007' },
  { source: 'media__1784623578172.jpg', internId: 'PAB-SI-26-008' },
  { source: 'media__1784623578229.jpg', internId: 'PAB-SI-26-009' },
  { source: 'media__1784623578275.jpg', internId: 'PAB-SI-26-010' },
  { source: 'media__1784623578290.jpg', internId: 'PAB-SI-26-011' }
];

function encryptBuffer(buffer) {
  const key = crypto.createHash('sha256').update(ENCRYPTION_SECRET).digest();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  return Buffer.concat([iv, encrypted]);
}

function run() {
  const brainDir = 'C:\\Users\\M. Sasikala\\.gemini\\antigravity\\brain\\d6c9b1ec-1886-4854-8d0c-6fd3cd2abff1';
  const destDir = path.join(process.cwd(), 'server', 'private', '.certificates');

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  for (const item of certMapping) {
    const srcPath = path.join(brainDir, item.source);
    if (!fs.existsSync(srcPath)) {
      console.error(`Source file not found: ${srcPath}`);
      continue;
    }
    const rawBuffer = fs.readFileSync(srcPath);
    const encryptedBuffer = encryptBuffer(rawBuffer);
    const destPath = path.join(destDir, `${item.internId}.enc`);
    fs.writeFileSync(destPath, encryptedBuffer);
    console.log(`Encrypted & stored: ${item.internId} -> ${destPath}`);
  }
}

run();
