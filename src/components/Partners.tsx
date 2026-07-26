import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Users, ShieldCheck, Award, CheckCircle, MapPin } from 'lucide-react';

import msmeLogo from '../assets/images/msme_logo_new_1784556115645.jpg';
import gstLogo from '../assets/images/gst_logo_new_1784556230027.jpg';
import dpiitLogo from '../assets/images/dpiit_recognition_logo_1784528792442.jpg';
import startupIndiaLogo from '../assets/images/startup_india_new_logo_1784556296376.jpg';
import chennaiTechLogo from '../assets/images/chennai_tech_logo_1784555659108.jpg';

interface CollaborationItem {
  name: string;
}

interface RegistrationItem {
  title: string;
  status: string;
  logo?: string;
}

export default function Partners() {
  const collaborations: CollaborationItem[] = [
    { name: 'Naan Mudhalvan' },
    { name: 'ATAL Tinkering Labs' },
    { name: 'School of Excellence (Model Schools)' }
  ];

  const registrations: RegistrationItem[] = [
    { 
      title: 'MSME', 
      status: 'Registered',
      logo: msmeLogo
    },
    { 
      title: 'GST', 
      status: 'Registered',
      logo: gstLogo
    },
    { 
      title: 'DPIIT', 
      status: 'Recognized',
      logo: dpiitLogo
    },
    { 
      title: 'Startup India', 
      status: 'Registered',
      logo: startupIndiaLogo
    }
  ];

  return (
    <section id="partners" className="py-24 relative overflow-hidden bg-neutral-900">
      {/* Background radial overlays */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-purple/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
          <span className="text-xs text-brand-cyan font-mono uppercase tracking-widest">COLLABORATIVE ECOSYSTEM</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white leading-tight">
            Our Partners & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">Registrations</span>
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed font-light mt-1">
            Collaborating with leading organizations to deliver excellence in hardware engineering, education, and professional development.
          </p>
        </div>

        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left Column: Featured Knowledge Partner (8 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 bg-neutral-950/40 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-cyan/15 border border-brand-cyan/25 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-brand-cyan" />
                  </div>
                  <div>
                    <span className="text-[10px] text-brand-cyan font-mono uppercase tracking-widest block">KNOWLEDGE PARTNER</span>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-0.5">
                      Chennai Institute of Technology
                    </h3>
                  </div>
                </div>
                
                {/* Logo Image */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-white border border-white/15 flex items-center justify-center p-1.5 shadow-md shadow-black/40 flex-shrink-0 self-start sm:self-auto">
                  <img 
                    src={chennaiTechLogo} 
                    alt="Chennai Institute of Technology Logo" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain select-none pointer-events-none"
                  />
                </div>
              </div>
              
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                Partnering with Chennai Institute of Technology as our Knowledge Partner, we collaborate on cutting-edge research, curriculum development, and student training programs in embedded systems, IoT, and emerging technologies.
              </p>
              
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light mt-4">
                This partnership helps bridge the gap between academia and industry, providing students with hands-on experience and real-world applications to prepare them for global technological milestones.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-white/5 flex items-center gap-2.5 text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-brand-cyan/75" />
              <span>Chennai, Tamil Nadu, India</span>
            </div>
          </motion.div>

          {/* Right Column: Research Collaboration & Clients (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 bg-neutral-950/40 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/5 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-purple/15 border border-brand-purple/25 flex items-center justify-center">
                  <Users className="w-5 h-5 text-brand-purple" />
                </div>
                <div>
                  <span className="text-[10px] text-brand-purple font-mono uppercase tracking-widest block">RESEARCH COLLABORATION</span>
                  <h3 className="text-lg font-display font-bold text-white mt-0.5">
                    Clients & Collaborators
                  </h3>
                </div>
              </div>

              <div className="flex flex-col gap-3.5">
                {collaborations.map((collab, index) => (
                  <motion.div 
                    key={collab.name}
                    initial={{ opacity: 0, x: -5 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-3 rounded-lg bg-neutral-950/80 border border-white/5 flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-brand-purple" />
                    <span className="text-xs font-semibold text-neutral-200 tracking-wide">{collab.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-8 text-[10px] text-neutral-500 font-mono uppercase tracking-wider">
              Strategic educational impact initiatives
            </div>
          </motion.div>

        </div>

        {/* Bottom Section: Registered With */}
        <div className="pt-8 border-t border-white/5">
          <div className="text-center mb-10">
            <span className="text-[11px] text-neutral-400 font-mono uppercase tracking-widest bg-neutral-950 px-4 py-2 rounded-full border border-white/5">
              REGISTERED WITH
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {registrations.map((reg, idx) => (
              <motion.div
                key={reg.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -4, border: '1px solid rgba(168, 85, 247, 0.2)' }}
                className="p-5 rounded-xl bg-neutral-950 border border-white/5 flex flex-col justify-between items-center text-center group transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-full overflow-hidden border flex items-center justify-center mb-3 group-hover:scale-105 transition-all duration-300 ${reg.logo ? 'bg-white border-white' : 'bg-neutral-900/80 border-white/10 text-white'}`}>
                  {reg.logo ? (
                    <img 
                      src={reg.logo} 
                      alt={reg.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover select-none pointer-events-none"
                    />
                  ) : idx % 2 === 0 ? (
                    <Award className="w-6 h-6 text-brand-purple" />
                  ) : (
                    <ShieldCheck className="w-6 h-6 text-brand-cyan" />
                  )}
                </div>
                
                <div>
                  <h4 className="font-display font-bold text-sm text-white tracking-wide">{reg.title}</h4>
                  
                  <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-400 uppercase tracking-wider">
                    <CheckCircle className="w-2.5 h-2.5 text-emerald-400" />
                    <span>{reg.status}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
