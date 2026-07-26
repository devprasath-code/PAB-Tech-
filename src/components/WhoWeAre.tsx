import React from 'react';
import { motion } from 'motion/react';
import { Eye, Target, Award, Users, Lightbulb, Mail, Quote } from 'lucide-react';


export default function WhoWeAre() {
  const coreValues = [
    {
      icon: <Award className="w-5 h-5 text-brand-purple" />,
      title: 'Excellence',
      desc: 'We strive for the highest standards in everything we do, from product quality to customer service.'
    },
    {
      icon: <Users className="w-5 h-5 text-brand-cyan" />,
      title: 'Collaboration',
      desc: 'We believe in the power of teamwork and partnerships to achieve remarkable results.'
    },
    {
      icon: <Lightbulb className="w-5 h-5 text-purple-400" />,
      title: 'Innovation',
      desc: 'We continuously push boundaries and explore new possibilities to stay ahead.'
    }
  ];

  const leaders = [
    {
      role: 'Founder',
      name: 'Mr. P. Arun Kumar',
      title: 'Founder',
      email: 'arunkumar@pabtech.in',
      quote: 'Our mission is to bridge the gap between cutting-edge technology and practical education, empowering the next generation of innovators to shape a better future.',
      initials: 'AK',
      image: 'https://pab.figma.site/_assets/v11/0fe60bc2a2c9ebca86e7d5874a3121f891cbe4cf.png'
    },
    {
      role: 'CTO',
      name: 'Mr. D. Vijayanand',
      title: 'Chief Technology Officer',
      email: 'vijayanand@pabtech.in',
      quote: "Technology is the backbone of innovation. We're constantly pushing the boundaries of what's possible, creating solutions that are not just advanced, but also accessible and impactful.",
      initials: 'VN',
      image: 'https://pab.figma.site/_assets/v11/3941256d49ca889268c44bcbcda7694346b075bf.png'
    }
  ];

  return (
    <>
      <section id="about" className="py-24 relative overflow-hidden bg-neutral-950">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-purple/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-brand-cyan/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Main Header */}
          <div className="max-w-3xl text-left mb-16">
            <span className="text-xs text-brand-purple font-mono uppercase tracking-widest">ABOUT PAB</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white leading-tight mt-2 mb-4">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-purple-400 to-brand-cyan">PAB</span>
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
              Transforming technology and education through innovation and excellence
            </p>
          </div>

          {/* Vision & Mission Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.01, boxShadow: '0 20px 40px -15px rgba(168, 85, 247, 0.08)' }}
              className="glass-panel p-8 sm:p-10 rounded-2xl border border-white/5 bg-neutral-900/30 text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/5 rounded-full blur-2xl pointer-events-none" />
              <div className="w-12 h-12 rounded-xl bg-brand-purple/15 border border-brand-purple/20 flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-brand-purple" />
              </div>
              <h3 className="font-display font-extrabold text-xl text-white mb-4">Our Vision</h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                To be the global leader in integrated technology solutions, empowering businesses and individuals with cutting-edge hardware, innovative software, and transformative education programs that shape the future of technology.
              </p>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -6, scale: 1.01, boxShadow: '0 20px 40px -15px rgba(6, 182, 212, 0.08)' }}
              className="glass-panel p-8 sm:p-10 rounded-2xl border border-white/5 bg-neutral-900/30 text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 rounded-full blur-2xl pointer-events-none" />
              <div className="w-12 h-12 rounded-xl bg-brand-cyan/15 border border-brand-cyan/20 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-brand-cyan" />
              </div>
              <h3 className="font-display font-extrabold text-xl text-white mb-4">Our Mission</h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                To deliver exceptional technology solutions and educational services that drive innovation, foster growth, and create lasting value for our clients, partners, and communities worldwide.
              </p>
            </motion.div>
          </div>

          {/* Core Values Section */}
          <div className="border-t border-white/5 pt-16 mb-24">
            <div className="text-left mb-12">
              <span className="text-[10px] text-brand-cyan font-mono uppercase tracking-widest">FOUNDATIONS</span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
                Our Core Values
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {coreValues.map((val, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -4, border: '1px solid rgba(255,255,255,0.1)' }}
                  className="p-6 rounded-xl bg-neutral-900/20 border border-white/5 transition-all text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-neutral-950 border border-white/5 flex items-center justify-center mb-4">
                    {val.icon}
                  </div>
                  <h4 className="font-display font-bold text-base text-white mb-2">
                    {val.title}
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light">
                    {val.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Leadership Section */}
      <section className="bg-neutral-950 py-24 border-t border-white/5 text-center relative overflow-hidden">
        {/* Glow effects to match other sections */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-purple/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto mb-16">
            <span className="text-xs text-brand-purple font-mono uppercase tracking-widest block mb-2">LEADERSHIP</span>
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight mb-3">
              Our Leadership
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">
              Meet the visionary leaders driving innovation and excellence at PAB
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
            {leaders.map((leader, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -6 }}
                className="bg-neutral-900/40 p-5 sm:p-6 rounded-[24px] text-left flex flex-col justify-between transition-all border border-white/5 hover:border-brand-purple/20 backdrop-blur-sm shadow-xl"
              >
                <div>
                  {/* Image Frame with realistic studio background */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-b from-[#b0b9c2] via-[#a6afb8] to-[#8c959e] flex items-center justify-center shadow-inner">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top select-none pointer-events-none"
                    />
                  </div>

                  {/* Text Details Area */}
                  <div className="mt-6 flex flex-col gap-1.5 px-1">
                    <h4 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-none">
                      {leader.name}
                    </h4>
                    <p className="text-brand-cyan font-medium text-xs sm:text-sm">
                      {leader.title}
                    </p>
                    <a
                      href={`mailto:${leader.email}`}
                      className="text-neutral-400 font-light text-xs hover:text-brand-cyan transition-colors inline-block w-fit"
                    >
                      {leader.email}
                    </a>

                    <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mt-5 font-light">
                      "{leader.quote}"
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
