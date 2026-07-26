const fs = require('fs');
const content = fs.readFileSync('src/components/Internship.tsx', 'utf8');
const start = content.indexOf('                  {/* Action buttons above certificate */}');
const endStr = '                  {/* ══════════ END CERTIFICATE ══════════ */}';
const end = content.indexOf(endStr) + endStr.length;

if (start !== -1 && end !== -1) {
  const newContent = `                  <div className="p-8 rounded-2xl bg-neutral-900/60 border border-brand-cyan/20 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Award className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold text-white mb-2">
                        Verification Successful
                      </h3>
                      <p className="text-sm text-neutral-400 max-w-md mx-auto">
                        Hi <strong className="text-white">{retrievedCert.name}</strong>, your credentials have been verified successfully. You can now access your official E-Certificate from our secure Google Drive registry.
                      </p>
                    </div>
                    <div className="flex gap-4 items-center">
                      <a
                        href="https://drive.google.com/drive/folders/1jEQT8Mq1u_cslFUX93YYeXcLrake5XWs?usp=drive_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-xl text-sm font-bold text-neutral-950 bg-brand-cyan hover:bg-brand-cyan/90 transition-all flex items-center gap-2"
                      >
                        <Award className="w-4 h-4" />
                        Access Certificate Folder
                      </a>
                      <button
                        onClick={() => {
                          setRetrievedCert(null);
                          setInternIdInput('');
                          setEnteredChallenge('');
                          setActiveChallenge('');
                          setCertError('');
                        }}
                        className="px-4 py-3 rounded-xl text-sm font-semibold text-neutral-400 hover:text-white transition-all bg-neutral-800"
                      >
                        Close
                      </button>
                    </div>
                    <div className="text-[10px] text-neutral-500 font-mono mt-4 p-3 bg-neutral-950 rounded-lg border border-white/5">
                      Verification ID: <span className="text-brand-cyan">{retrievedCert.hashKey}</span> <br />
                      Intern ID: <span className="text-white">{retrievedCert.internId}</span>
                    </div>
                  </div>`;
  const result = content.substring(0, start) + newContent + content.substring(end);
  fs.writeFileSync('src/components/Internship.tsx', result);
  console.log('Success');
} else {
  console.log('Failed to find markers', start, content.indexOf(endStr));
}
