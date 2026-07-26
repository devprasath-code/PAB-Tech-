import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, ArrowUp, ArrowRight } from 'lucide-react';
import PabLogo from './PabLogo';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative bg-neutral-950 pt-24 pb-12 border-t border-white/5 overflow-hidden">
      
      {/* Background flare */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[250px] bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/5 text-left">
          
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-1.5">
              <PabLogo width={42} height={42} showText={true} />
            </div>
            
            <p className="text-xs text-neutral-400 leading-relaxed font-light max-w-xs mt-1">
              High-fidelity silicon microprocessor integration, low-latency firmware codebases, and redundant, secure cloud-native architectures.
            </p>

            <div className="flex gap-3 text-neutral-500 mt-2">
              <a href="https://github.com/pabtech" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-neutral-900 border border-white/5 hover:text-white hover:bg-neutral-800 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/search/results/all/?keywords=PAB%20HARDWARE%20AND%20SOFTWARE%20%28OPC%29%20PRIVATE%20LIMITED&origin=ENTITY_SEARCH_HOME_HISTORY&heroEntityKey=urn%3Ali%3Aorganization%3A110209090&position=0" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-neutral-900 border border-white/5 hover:text-white hover:bg-neutral-800 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h5 className="text-[10px] font-mono font-bold text-white uppercase tracking-wider mb-1">Navigation</h5>
            <a href="#home" className="text-xs text-neutral-400 hover:text-white transition-colors self-start">Home</a>
            <a href="#about" className="text-xs text-neutral-400 hover:text-white transition-colors self-start">About Us</a>
            <a href="#products" className="text-xs text-neutral-400 hover:text-white transition-colors self-start">Products</a>
            <a href="#software" className="text-xs text-neutral-400 hover:text-white transition-colors self-start">Software Stack</a>
            <a href="#training" className="text-xs text-neutral-400 hover:text-white transition-colors self-start">Training Labs</a>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 flex flex-col gap-3.5">
            <h5 className="text-[10px] font-mono font-bold text-white uppercase tracking-wider mb-1">Contact Office</h5>
            
            <div className="flex gap-2.5 items-center text-xs text-neutral-400">
              <Mail className="w-3.5 h-3.5 text-brand-purple flex-shrink-0" />
              <a href="mailto:info@pabtech.in" className="hover:text-white transition-colors">info@pabtech.in</a>
            </div>

            <div className="flex gap-2.5 items-center text-xs text-neutral-400">
              <Phone className="w-3.5 h-3.5 text-brand-cyan flex-shrink-0" />
              <a href="tel:+919600899402" className="hover:text-white transition-colors">+91 9600 899 402</a>
            </div>


          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-mono text-neutral-500">
            <span>&copy; {new Date().getFullYear()} PAB TECH INC. All rights reserved.</span>
            <span className="text-neutral-700">|</span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
            <span className="text-neutral-700">|</span>
            <span className="text-neutral-500">
              Developed by <span className="text-neutral-400 font-medium">Dev</span> (For works: <a href="mailto:devprasathloganathan@gmail.com" className="text-brand-purple hover:text-white transition-colors">devprasathloganathan@gmail.com</a> &bull; <a href="https://linkedin.com/in/dev-prasath-l/" target="_blank" rel="noopener noreferrer" className="text-brand-purple hover:text-white transition-colors">LinkedIn</a>)
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-lg bg-neutral-900 border border-white/5 hover:border-white/15 text-neutral-400 hover:text-white transition-all flex items-center gap-2 group text-xs"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
