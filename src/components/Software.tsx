import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

interface SoftwareItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  features: string[];
}

export default function Software() {
  const softwareList: SoftwareItem[] = [
    {
      id: 'lms',
      title: 'Learning Management System',
      tagline: 'Comprehensive LMS platform for educational institutions and corporate training.',
      description: 'A scalable, feature-rich virtual learning environment that simplifies administration, tracking, and delivery of educational courses and corporate training programs.',
      techStack: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'WebRTC'],
      features: [
        'Course Management',
        'Student Progress Tracking',
        'Interactive Content',
        'Analytics Dashboard'
      ]
    },
    {
      id: 'test-eval',
      title: 'Test & Evaluation Platform',
      tagline: 'Advanced assessment tools for creating, administering, and analyzing tests.',
      description: 'A secure, robust assessment engine designed for institutions to conduct high-stakes examinations, mock tests, and training evaluations with proctoring and real-time grading.',
      techStack: ['TypeScript', 'Express', 'Redis', 'GraphQL', 'AWS'],
      features: [
        'Custom Test Creation',
        'Automated Grading',
        'Anti-cheating Features',
        'Detailed Reports'
      ]
    },
    {
      id: 'psychometric',
      title: 'Psychometric Assessment',
      tagline: 'Scientific psychometric tools for talent assessment and development.',
      description: 'Advanced cognitive and behavioral analytics designed to help organizations identify optimal candidates, foster collaborative teamwork, and guide professional development.',
      techStack: ['Python AI', 'Next.js', 'FastAPI', 'D3.js', 'MongoDB'],
      features: [
        'Personality Assessments',
        'Aptitude Tests',
        'Career Guidance',
        'Team Analytics'
      ]
    }
  ];

  return (
    <section id="software" className="py-24 relative overflow-hidden bg-neutral-900">
      <div className="absolute top-0 left-1/4 w-[600px] h-[300px] rounded-full bg-brand-purple/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[300px] rounded-full bg-brand-cyan/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
          <span className="text-xs text-brand-cyan font-mono uppercase tracking-widest">SOFTWARE SOLUTIONS</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white leading-tight">
            Powerful platforms for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">learning, assessment, and analytics</span>
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed font-light mt-1">
            Empowering organizations with state-of-the-art platforms for secure testing, seamless learning management, and predictive psychometric analytics.
          </p>
        </div>

        {/* 3-Column Static Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {softwareList.map((sw, idx) => (
            <motion.div
              key={sw.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.01, boxShadow: '0 20px 35px -12px rgba(168, 85, 247, 0.12)' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="glass-panel w-full p-6 sm:p-8 rounded-2xl border border-white/5 relative overflow-hidden bg-neutral-950/60 transition-colors duration-300 text-left flex flex-col justify-between"
            >
              <div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-purple/5 rounded-full blur-2xl pointer-events-none" />
                
                <span className="text-[10px] text-brand-purple font-mono uppercase tracking-widest bg-brand-purple/15 px-2.5 py-1 rounded-full border border-brand-purple/20">
                  {sw.id.toUpperCase()} MODULE
                </span>
                
                <h3 className="text-xl font-display font-bold text-white mt-4">
                  {sw.title}
                </h3>
                <p className="text-xs text-brand-cyan font-mono mt-1 mb-4">
                  {sw.tagline}
                </p>
                <p className="text-xs text-neutral-300 leading-relaxed font-light mb-6 min-h-[72px]">
                  {sw.description}
                </p>

                {/* Features Checklist */}
                <div className="flex flex-col gap-3 mb-6">
                  {sw.features.map((feat, i) => (
                    <div key={i} className="flex gap-2.5 items-start">
                      <div className="w-5 h-5 rounded bg-brand-cyan/15 border border-brand-cyan/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-brand-cyan" />
                      </div>
                      <p className="text-xs text-neutral-300 leading-normal font-light">{feat}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="pt-5 border-t border-white/5 mt-auto">
                <h4 className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider mb-2.5">Engine Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {sw.techStack.map((tech) => (
                    <span key={tech} className="text-[10px] font-mono text-neutral-300 bg-neutral-900 border border-white/10 px-2.5 py-1 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
