import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

interface Intern {
  s_no: number;
  intern_id: string;
  name: string;
  hash_key: string;
  drive_file_id?: string;
}

const internsData: Intern[] = [
  { s_no: 1, intern_id: "PAB-SI-26-001", name: "PADMASRI N", hash_key: "08C3-7FD4-FD58-A84D-149C-7CB7-52F9-F6BA-C178-9546", drive_file_id: "https://drive.google.com/file/d/1xQH3Y0JoTgv8_fiB1UBm7jxa1-t8YsY4/view?usp=sharing" },
  { s_no: 2, intern_id: "PAB-SI-26-003", name: "DIVYADHARSHINI S", hash_key: "E5C8-C5B1-DF7C-39C3-36CE-67B5-7FF4-D90A-DF0E-76D0", drive_file_id: "https://drive.google.com/file/d/18xVv2J2H4OxSmln6Vgz-eFr-Sjffbhmz/view?usp=sharing" },
  { s_no: 3, intern_id: "PAB-SI-26-005", name: "SARUSARIDHA V", hash_key: "50E4-40AF-95BC-2EE1-82F1-B064-2558-EE06-62B3-A80F", drive_file_id: "https://drive.google.com/file/d/1gnJM-At2uOtNMJMPziKKoCcOe99LhmAh/view?usp=sharing" },
  { s_no: 4, intern_id: "PAB-SI-26-006", name: "SIMEON STEPENRAJ J", hash_key: "2117-EAD8-DF45-F9BA-2B2F-4451-E418-BE83-9F13-82C0", drive_file_id: "https://drive.google.com/file/d/1jrHhNaSXWwvo4WIRaNLT5tgbkLICpe-u/view?usp=sharing" },
  { s_no: 5, intern_id: "PAB-SI-26-007", name: "RENUKA P N", hash_key: "F787-8983-4D34-2D52-2819-8A4F-F577-1B30-6821-73AD", drive_file_id: "https://drive.google.com/file/d/1xGDRmXlv2hyOkhJHO5XpvwPKJ6egR2bJ/view?usp=sharing" },
  { s_no: 6, intern_id: "PAB-SI-26-008", name: "SRI NAVEEN M", hash_key: "D2E0-FD64-394F-74DE-49B0-EB0D-1188-4F24-2FC9-77A2", drive_file_id: "https://drive.google.com/file/d/1q7jyCSkRMDA198RKg1H_Td2GNL5Bhh7b/view?usp=sharing" },
  { s_no: 7, intern_id: "PAB-SI-26-009", name: "PAVATHARANI N", hash_key: "F029-A236-801F-D815-FE4E-56D1-B6B0-8E6E-0241-5491", drive_file_id: "https://drive.google.com/file/d/1rb-oYi6EABYLD4cWnco-0ownrzedm0MF/view?usp=sharing" },
  { s_no: 8, intern_id: "PAB-SI-26-010", name: "JEVENDRAN C", hash_key: "F03C-8EF8-4F00-B0CB-FD6E-5CCF-A882-A445-A9DD-6EEF", drive_file_id: "https://drive.google.com/file/d/1oce3RTHSk6gbnSHFDTvliKtSczjsbDU3/view?usp=sharing" },
  { s_no: 9, intern_id: "PAB-SI-26-011", name: "SACHIN S", hash_key: "6021-5EE4-D879-11D5-3205-5667-8DC2-3FDB-1BE2-DA28", drive_file_id: "https://drive.google.com/file/d/1OL9jz3YyQ1gdhqjgbnfQ_ywoStqyqgtc/view?usp=sharing" },
  { s_no: 10, intern_id: "PAB-SI-26-012", name: "ROSHINI P", hash_key: "6E45-E5EB-C528-85D3-9CBD-A4D6-5D28-EA97-D3E6-8D51", drive_file_id: "https://drive.google.com/file/d/1I9_EswEOBajb2ItyCqOA7-KcYp1jL67L/view?usp=sharing" },
  { s_no: 11, intern_id: "PAB-SI-26-013", name: "MOHAN RAJ K", hash_key: "6BDC-7213-A163-E3F6-D34E-168F-1560-A81D-1F17-9ABF", drive_file_id: "https://drive.google.com/file/d/1O6scIkdrwGdpP19O685NixblQvugwi_3/view?usp=sharing" },
  { s_no: 12, intern_id: "PAB-SI-26-014", name: "MONIKA VARSHINI P", hash_key: "813C-869E-3BE2-12AD-1942-9F25-FE3C-C684-3373-E0D7", drive_file_id: "https://drive.google.com/file/d/10timRaf5vfN5byWBXwqe6cwgNudnR8QS/view?usp=sharing" },
  { s_no: 13, intern_id: "PAB-SI-26-015", name: "THILAGAVATHY D", hash_key: "BA22-EDD6-9E88-F4A9-6D38-24ED-C8F1-413B-A703-9303", drive_file_id: "https://drive.google.com/file/d/1TzDcOClEkkfN1tXN4vOafOYlKAY1stl3/view?usp=sharing" },
  { s_no: 14, intern_id: "PAB-SI-26-017", name: "VAISHNAVI L", hash_key: "8450-799B-56AD-7C1C-21E8-31BA-A8B0-7A6D-45CB-6B75", drive_file_id: "https://drive.google.com/file/d/1midAk6XOUCb0-xmjjd44RoXNSAc7IG_w9/view?usp=sharing" },
  { s_no: 15, intern_id: "PAB-SI-26-019", name: "SATHISH R", hash_key: "AA28-C4FC-078E-422B-A5AC-F3C2-DD85-FAF7-CCE6-7C65", drive_file_id: "https://drive.google.com/file/d/1Zktyz6fiz1frc00ier9A7R76IBJ3iCd0/view?usp=sharing" },
  { s_no: 16, intern_id: "PAB-SI-26-020", name: "VAISHNAVI B", hash_key: "CE92-8437-9C67-0CBB-1439-2020-A937-C6D7-1327-2ABF", drive_file_id: "https://drive.google.com/file/d/14z0nVcho34rxewfe9C2o3wTN165xdRnB/view?usp=sharing" },
  { s_no: 17, intern_id: "PAB-SI-26-021", name: "RITHIK J", hash_key: "4AEB-AF69-196C-8862-5093-8AE7-8CD6-02A1-A91F-A79A", drive_file_id: "https://drive.google.com/file/d/1De34Ejkf7gUJrijKo57HXSGkhr_SIFrY/view?usp=sharing" },
  { s_no: 18, intern_id: "PAB-SI-26-022", name: "JEEVITHA C", hash_key: "9345-EBCF-C1BA-E1C3-4849-0A5F-46B1-90F5-D176-2A2F", drive_file_id: "https://drive.google.com/file/d/1ViJceS3jrP9Wy3Kz30IJ8Td41L297nPj/view?usp=sharing" },
  { s_no: 19, intern_id: "PAB-SI-26-023", name: "KAVITHALAYA JAYA RANGINI V", hash_key: "7D2F-FA45-1D15-1188-8188-1C7D-EF2F-3575-E3FC-3948", drive_file_id: "https://drive.google.com/file/d/1OUTniJt9nXb8pYP5IiczWvcamGp5lEph/view?usp=sharing" },
  { s_no: 20, intern_id: "PAB-SI-26-024", name: "TEJASHREE G", hash_key: "1A1D-DD6B-3DB0-53D0-5868-EF57-D2D7-A8C0-454E-9F21", drive_file_id: "https://drive.google.com/file/d/1WGuuBPn_Yqpm8H0etEnYy3bTA39nxqiL/view?usp=sharing" },
  { s_no: 21, intern_id: "PAB-SI-26-025", name: "SUKEERAJAN R", hash_key: "4F1A-CEE8-4A7A-6E07-7EA0-026E-63B2-7DD5-10A2-A12D", drive_file_id: "https://drive.google.com/file/d/1Cua_KdA2Cbnribk4-UyPWunadiEQc7U9/view?usp=sharing" },
  { s_no: 22, intern_id: "PAB-SI-26-026", name: "SANTHANAMARI M", hash_key: "7DCB-85A6-5765-2801-8D6E-F853-264C-37E3-9BBB-C95D", drive_file_id: "https://drive.google.com/file/d/176TYx2xwL22DOF3aOOTlrMdKxcuVMqo1/view?usp=sharing" },
  { s_no: 23, intern_id: "PAB-SI-26-027", name: "SANTHANAMARI V", hash_key: "4603-2F4D-E7A1-6653-A38F-A07C-75A9-F75B-FD50-2049", drive_file_id: "https://drive.google.com/file/d/1haw2INOvuEVhPGBZwvhMKxFBvc26S_dC/view?usp=sharing" },
  { s_no: 24, intern_id: "PAB-SI-26-028", name: "ANUPRIYA K", hash_key: "EA29-6420-7558-EE9F-DD62-0798-4AF5-D318-049B-48CD", drive_file_id: "https://drive.google.com/file/d/1xYV5y5KDc5EGDZwzNLnX-sNpniRaIZug/view?usp=sharing" },
  { s_no: 25, intern_id: "PAB-SI-26-029", name: "BALA RIVINYA I", hash_key: "033B-1577-28D7-23DA-D7AF-4816-4850-B11F-F784-AD2A", drive_file_id: "https://drive.google.com/file/d/1qm5bDPwUBnY6vHZZz7EG4vBYcOICqG1O/view?usp=sharing" },
  { s_no: 26, intern_id: "PAB-SI-26-030", name: "RAJEEV RAM R", hash_key: "B5E6-5F8A-CFE2-43DE-E09C-ADCD-3527-E353-5ED0-39D6", drive_file_id: "https://drive.google.com/file/d/1R9LmTx73BI07g-e9FOC7rikgcujR0Bvt/view?usp=sharing" },
  { s_no: 27, intern_id: "PAB-SI-26-031", name: "JAGATHEESWARI V", hash_key: "2662-986A-F8D2-2F21-97AE-80A4-191A-0201-41A3-4C66", drive_file_id: "https://drive.google.com/file/d/1NeF51D69HpNPRaUE6YUAA7vh8lZL-jW1/view?usp=sharing" },
  { s_no: 28, intern_id: "PAB-SI-26-032", name: "DEV PRASATH L", hash_key: "C113-F7E7-A7E3-7FF3-612B-7D65-4521-F1AA-870A-F5F6", drive_file_id: "https://drive.google.com/file/d/1q6-wl6w0SPxdS50dLzY_AAplY_gSpMb-/view?usp=sharing" },
  { s_no: 29, intern_id: "PAB-SI-26-033", name: "GAYATHRI M", hash_key: "AD63-21F8-C465-5F25-8A35-7EAB-4BF6-E016-B6CF-2B5B", drive_file_id: "https://drive.google.com/file/d/1pX4ZD9dwOak1v9Tp_x4fsA87gA1Wuzx-/view?usp=sharing" }
];

const ENCRYPTION_SECRET = process.env.DB_ENCRYPTION_KEY || 'default-secret-database-key-for-pab-interns';

function encrypt(text: string): string {
  const key = crypto.createHash('sha256').update(ENCRYPTION_SECRET).digest();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  // Return iv:encrypted hex format
  return iv.toString('hex') + ':' + encrypted;
}

function run() {
  const outputDir = path.join(process.cwd(), 'server', 'private', 'database');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const rawJson = JSON.stringify(internsData, null, 2);
  const encryptedString = encrypt(rawJson);

  const outputPath = path.join(outputDir, 'interns.json');
  fs.writeFileSync(outputPath, JSON.stringify({ data: encryptedString }, null, 2));
  console.log(`Successfully encrypted database. Saved ${internsData.length} interns to ${outputPath}`);
}

run();
