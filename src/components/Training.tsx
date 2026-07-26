import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Laptop, 
  Briefcase, 
  GraduationCap, 
  Layers,
  Trophy
} from 'lucide-react';

export default function Training() {
  const handleScrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="training" className="py-24 relative overflow-hidden bg-neutral-950 border-t border-white/5">
      {/* Background radial elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-brand-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-brand-purple/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs text-brand-cyan font-mono uppercase tracking-widest bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/20 inline-flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5" />
            Academy & Certifications
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-white">
            Training Programs
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
            Upskilling the next generation of tech professionals with comprehensive pipelines, hands-on environments, and career success metrics.
          </p>
        </div>

        {/* Training Impact Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20">
          <motion.div 
            whileHover={{ y: -3 }}
            className="p-6 rounded-2xl bg-neutral-900/40 border border-white/5 backdrop-blur-sm text-center space-y-1"
          >
            <p className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight bg-gradient-to-r from-brand-cyan to-brand-purple bg-clip-text text-transparent">
              2,000+
            </p>
            <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Students Trained</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            className="p-6 rounded-2xl bg-neutral-900/40 border border-white/5 backdrop-blur-sm text-center space-y-1"
          >
            <p className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight bg-gradient-to-r from-brand-purple to-brand-cyan bg-clip-text text-transparent">
              10+
            </p>
            <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Workshops Conducted</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            className="p-6 rounded-2xl bg-neutral-900/40 border border-white/5 backdrop-blur-sm text-center space-y-1"
          >
            <p className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight bg-gradient-to-r from-brand-cyan via-purple-500 to-brand-cyan bg-clip-text text-transparent">
              100%
            </p>
            <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Hands-on Lab Exercises</p>
          </motion.div>
        </div>

        {/* Our Training Sessions Subsection */}
        <div className="mb-20 text-left">
          <div className="border-b border-white/5 pb-4 mb-10">
            <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-5 h-5 text-brand-purple" />
              Our Training Sessions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* CARD 1: Technical Workshops */}
            <motion.div 
              whileHover={{ y: -5, border: '1px solid rgba(6, 182, 212, 0.2)' }}
              className="p-6 rounded-2xl bg-neutral-900/20 border border-white/5 flex flex-col justify-between text-left space-y-6 relative overflow-hidden group transition-all"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                  <Laptop className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-display font-bold text-white group-hover:text-brand-cyan transition-colors">
                    Technical Workshops
                  </h4>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    Hands-on workshops covering the latest technologies and industry best practices.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-2.5">
                  {[
                    'Web Development',
                    'Mobile App Development',
                    'Cloud Computing',
                    'Data Science & AI',
                    'Hardware & IoT'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleScrollToId('events')}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-neutral-900 border border-white/10 hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5"
              >
                View Workshops
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>

            {/* CARD 2: Hackathons */}
            <motion.div 
              whileHover={{ y: -5, border: '1px solid rgba(168, 85, 247, 0.2)' }}
              className="p-6 rounded-2xl bg-neutral-900/20 border border-white/5 flex flex-col justify-between text-left space-y-6 relative overflow-hidden group transition-all"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple">
                  <Trophy className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-display font-bold text-white group-hover:text-brand-purple transition-colors">
                    Hackathons
                  </h4>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    Competitive coding events that foster innovation and problem-solving skills.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-2.5">
                  {[
                    '24-48 Hour Events',
                    'Industry Mentorship',
                    'Prize Pool',
                    'Networking Opportunities',
                    'Project Showcase'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-purple flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleScrollToId('events')}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-neutral-900 border border-white/10 hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5"
              >
                Upcoming Events
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>

            {/* CARD 3: Placement Assistance */}
            <motion.div 
              whileHover={{ y: -5, border: '1px solid rgba(14, 165, 233, 0.2)' }}
              className="p-6 rounded-2xl bg-neutral-900/20 border border-white/5 flex flex-col justify-between text-left space-y-6 relative overflow-hidden group transition-all"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-display font-bold text-white group-hover:text-sky-400 transition-colors">
                    Placement Assistance
                  </h4>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    Comprehensive career support to help you land your dream tech job.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-2.5">
                  {[
                    'Resume Building',
                    'Interview Preparation',
                    'Company Connections',
                    'Mock Interviews',
                    'Career Counseling'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#contact"
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 border border-white/10 hover:bg-neutral-800 transition-all flex items-center justify-center gap-1.5"
              >
                Inquire Support
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
