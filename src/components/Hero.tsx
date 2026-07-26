import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown, CheckCircle, Database, Shield, Zap } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onAboutClick: () => void;
}

export default function Hero({ onExploreClick, onAboutClick }: HeroProps) {
 
  // Mouse movement states for 3D card tilt
  const [tiltX, setTiltX] = React.useState(0);
  const [tiltY, setTiltY] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Calculate normalized cursor coordinates (-1 to 1)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Apply degrees rotation
    setTiltX(-y * 20); // up to 20 degrees tilt on X axis
    setTiltY(x * 20);  // up to 20 degrees tilt on Y axis
  };

  const handleMouseLeave = () => {
    setTiltX(0);
    setTiltY(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-radial from-neutral-900 via-neutral-950 to-neutral-950">
      {/* Dynamic particles / grid background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Background radial glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-brand-purple/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-brand-cyan/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full flex-grow grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left column: Text Content */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.1] text-white"
          >
            Pioneering the Future <br />
            of <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-purple-400 to-brand-cyan text-glow">Technology & Education</span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-400 text-sm sm:text-base max-w-xl leading-relaxed font-light"
          >
            Innovative Hardware. Powerful Software. Expert Training.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mt-2"
          >
            <button
              onClick={onExploreClick}
              className="px-6 py-3 rounded-lg text-xs font-semibold tracking-wide bg-gradient-to-r from-brand-purple to-purple-600 text-white hover:shadow-lg hover:shadow-brand-purple/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-250 flex items-center gap-2"
            >
              Explore Services
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onAboutClick}
              className="px-6 py-3 rounded-lg text-xs font-semibold tracking-wide border border-white/10 hover:border-white/25 text-neutral-300 hover:text-white hover:bg-white/5 active:scale-98 transition-all duration-200"
            >
              Who We Are
            </button>
          </motion.div>

          {/* Quick Stats Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="grid grid-cols-3 gap-6 pt-8 mt-4 border-t border-white/5"
          >
            <div>
              <p className="text-2xl font-bold font-display text-white">99.9%</p>
              <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider mt-1">Uptime SLA</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-display text-brand-cyan">15M+</p>
              <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider mt-1">API Requests/Day</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-display text-brand-purple">50+</p>
              <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider mt-1">IoT Deployments</p>
            </div>
          </motion.div>
        </div>

        {/* Right column: Main Image render and overlay indicators */}
        <div className="lg:col-span-5 relative flex items-center justify-center [perspective:1200px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              scale: isHovered ? 1.04 : 1,
              rotateX: tiltX,
              rotateY: tiltY,
            }}
            transition={{ 
              type: 'spring', 
              stiffness: 150, 
              damping: 20,
              mass: 0.6
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative w-full aspect-square max-w-[440px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_25px_60px_-15px_rgba(139,92,246,0.3)] bg-neutral-900 group cursor-pointer [transform-style:preserve-3d] select-none"
          >
            {/* Main high-quality premium rendering of the ESP32 microcontroller with glowing circuitry */}
            <motion.img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBf-1b5smA8DgE8gVWObgu5-JDqrkQQkNHI6dzZepnr1Fs6GgDx83AM7m24RxJdZNXB6EBOxbar_KNpTNJPWkhX0hvjMYEPhneP4e_m-TR-0zpyHEwvW9uvCSoSJRNfORYEhkJuGcCLzs__tGVYoEEewnBeHMG9Mv4hNU1UT3CvNSu8gBnq34HN2QtyHW4Y1OrMJ1Amox8yWDsBFuULm6f8bGkgNAm6r_cgXth3fJ-oCJ4br66Bpmr7"
              alt="ESP32 Microcontroller Premium Render"
              className="w-full h-full object-cover pointer-events-none [transform:translateZ(20px)]"
              referrerPolicy="no-referrer"
              animate={{
                scale: isHovered ? 1.08 : 1,
              }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Futuristic ambient neon overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60 pointer-events-none [transform:translateZ(25px)]" />

            {/* Glowing active nodes indicators overlay */}
            <div className="absolute top-[35%] left-[45%] flex h-3 w-3 [transform:translateZ(40px)] pointer-events-none">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-80"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-cyan"></span>
            </div>
            <div className="absolute top-[55%] left-[25%] flex h-3 w-3 [transform:translateZ(40px)] pointer-events-none">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-purple opacity-80"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-purple"></span>
            </div>

            {/* Dynamic Interactive Flashlight / Specular Glare */}
            {isHovered && (
              <div 
                className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_220px_at_var(--x)_var(--y),rgba(139,92,246,0.18)_0%,transparent_100%)] mix-blend-screen [transform:translateZ(30px)]"
                style={{
                  '--x': `${50 + tiltY * 1.8}%`,
                  '--y': `${50 - tiltX * 1.8}%`,
                } as React.CSSProperties}
              />
            )}
          </motion.div>

          {/* Secondary background graphics */}
          <div className="absolute -z-10 -right-6 -bottom-6 w-32 h-32 rounded-lg border border-brand-cyan/20 bg-brand-cyan/5 rotate-12 blur-[1px] pointer-events-none" />
          <div className="absolute -z-10 -left-6 -top-6 w-32 h-32 rounded-lg border border-brand-purple/20 bg-brand-purple/5 -rotate-12 blur-[1px] pointer-events-none" />
        </div>

      </div>

      {/* Scroll Section */}
      <div className="max-w-7xl mx-auto px-6 w-full pt-12 relative z-10">
        {/* Scroll animation down indicator */}
        <div className="flex justify-center mt-4">
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={onAboutClick}
          >
            <span className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase">Scroll to explore</span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
