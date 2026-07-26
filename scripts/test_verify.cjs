const http = require('http');

function post(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = http.request({
      hostname: 'localhost',
      port: 4000,
      path,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) }
    }, (res) => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(raw) }); }
        catch { resolve({ status: res.statusCode, body: raw }); }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function run() {
  const internId = 'PAB-SI-26-031';
  console.log(`\n--- Step 1: Request challenge for ${internId} ---`);
  const r1 = await post('/api/request-challenge', { internId });
  console.log('Status:', r1.status, '| Response:', JSON.stringify(r1.body));

  if (!r1.body.challenge) {
    console.error('FAILED: No challenge returned. Test cannot continue.');
    return;
  }

  const challenge = r1.body.challenge;
  // Hash key for PAB-SI-26-031 (JAGATHEESWARI V): 2662-986A-F8D2-2F21-97AE-80A4-191A-0201-41A3-4C66
  // Last block = 4C66
  const hashKeyBlock = '4C66';
  console.log(`\n--- Step 2: Verify with challenge="${challenge}", hashKeyBlock="${hashKeyBlock}" ---`);
  const r2 = await post('/api/verify', { internId, challenge, hashKeyBlock });
  console.log('Status:', r2.status, '| Response:', JSON.stringify(r2.body));

  if (r2.body.success) {
    console.log('\n✅ SUCCESS: E-certificate flow works for', internId);
  } else {
    console.log('\n❌ FAILED: Verification did not succeed.');
  }
}

run().catch(console.error);
