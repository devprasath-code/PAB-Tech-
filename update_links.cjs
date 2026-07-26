const fs = require('fs');
const content = fs.readFileSync('src/components/Internship.tsx', 'utf8');

const targetStr = `                    <button
                      onClick={handlePrint}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-neutral-900 border border-white/10 hover:bg-neutral-800 active:scale-95 transition-all flex items-center gap-2"
                    >
                      <Printer className="w-4 h-4 text-brand-purple" />
                      Print / Save as PDF
                    </button>`;

const replaceStr = `                    <button
                      onClick={handlePrint}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-neutral-900 border border-white/10 hover:bg-neutral-800 active:scale-95 transition-all flex items-center gap-2"
                    >
                      <Printer className="w-4 h-4 text-brand-purple" />
                      Print / Save as PDF
                    </button>
                    <a
                      href="https://drive.google.com/drive/folders/1jEQT8Mq1u_cslFUX93YYeXcLrake5XWs?usp=drive_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold text-neutral-950 bg-brand-cyan hover:bg-brand-cyan/90 transition-all flex items-center gap-2"
                    >
                      Access Certificate Folder
                    </a>`;

if (content.includes(targetStr)) {
  fs.writeFileSync('src/components/Internship.tsx', content.replace(targetStr, replaceStr));
  console.log('Success');
} else {
  console.log('Target string not found');
}
