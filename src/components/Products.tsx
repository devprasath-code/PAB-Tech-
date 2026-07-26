import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Layers, GraduationCap, Sprout, Activity, Eye, X, Check, ArrowRight } from 'lucide-react';
import chipLayoutImg from '../assets/images/efficient_chip_layout_1784259263006.jpg';
import pcbDesignImg from '../assets/images/pcb_layout_design_1784259585682.jpg';
import stemKitImg from '../assets/images/stem_robotics_kit_1784260090150.jpg';
import agritechSensorsImg from '../assets/images/agritech_smart_sensors_1784260781854.jpg';
import foodtechImg from '../assets/images/foodtech_monitoring_device_1784261400261.jpg';

interface HardwareProduct {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  glowColor: string;
  features: string[];
  specs: {
    label1: string;
    val1: string;
    label2: string;
    val2: string;
    label3: string;
    val3: string;
    label4: string;
    val4: string;
  };
  details: string;
  image?: string;
  imageFallbacks?: string[];
}

function RobustImage({ 
  src, 
  alt, 
  className,
  fallbackSrcs = [],
  ...props 
}: { 
  src: string; 
  alt: string; 
  className?: string;
  fallbackSrcs?: string[];
  [key: string]: any;
}) {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [fallbackIndex, setFallbackIndex] = useState<number>(0);

  React.useEffect(() => {
    setCurrentSrc(src);
    setFallbackIndex(0);
  }, [src]);

  const handleError = () => {
    if (fallbackIndex < fallbackSrcs.length) {
      setCurrentSrc(fallbackSrcs[fallbackIndex]);
      setFallbackIndex(prev => prev + 1);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleError}
      className={className}
      referrerPolicy="no-referrer"
      {...props}
    />
  );
}

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<HardwareProduct | null>(null);

  const products: HardwareProduct[] = [
    {
      id: 'chip-design',
      name: 'IC / Chip Design & Manufacturing',
      category: 'Semiconductor',
      tagline: 'Custom integrated circuit design & low-volume production.',
      description: 'Custom integrated circuit design and manufacturing services for specialized applications.',
      icon: <Cpu className="w-8 h-8 text-brand-purple" />,
      gradient: 'from-brand-purple/20 via-purple-900/10 to-transparent',
      glowColor: 'rgba(168, 85, 247, 0.4)',
      features: [
        'Custom ASIC Design',
        'FPGA Programming',
        'Chip Testing & Validation',
        'Low-volume Production'
      ],
      specs: {
        label1: 'Technology',
        val1: 'Mixed-Signal & Digital ASICs',
        label2: 'Lithography',
        val2: '180nm to 28nm processes',
        label3: 'Capabilities',
        val3: 'FPGA prototyping & emulation',
        label4: 'Services',
        val4: 'Testing, verification & validation'
      },
      details: 'We provide comprehensive IC design services from specification to silicon. Our team of expert silicon engineers designs custom ASIC and SoC platforms, optimizes FPGA designs for production, and handles low-volume foundry runs for aerospace, defense, and industrial applications.',
      image: chipLayoutImg,
      imageFallbacks: [
        'https://images.weserv.nl/?url=https://www.financialexpress.com/wp-content/uploads/2024/07/efficient-chip-layout-ai-algorithms-can-facilitate-innovative-design-approaches-3564257.jpg',
        'https://images.weserv.nl/?url=https://www.financialexpress.com/wp-content/uploads/2024/07/efficient-chip-layout-ai-algorithms-can-facilitate-innovative-design-approaches.jpg',
        'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    {
      id: 'pcb-design',
      name: 'PCB Design & Manufacturing',
      category: 'Manufacturing',
      tagline: 'Professional multi-layer PCB design and quick-turn prototyping.',
      description: 'Professional PCB design, prototyping, and manufacturing services.',
      icon: <Layers className="w-8 h-8 text-brand-cyan" />,
      gradient: 'from-brand-cyan/20 via-cyan-900/10 to-transparent',
      glowColor: 'rgba(6, 182, 212, 0.4)',
      features: [
        'Multi-layer PCB Design',
        'Rapid Prototyping',
        'Assembly Services',
        'Quality Testing'
      ],
      specs: {
        label1: 'Stackup',
        val1: 'Up to 16 layer multi-layer boards',
        label2: 'Prototyping',
        val2: 'Rapid 24-48 hour turnaround',
        label3: 'Assembly',
        val3: 'High-density SMT & fine-pitch BGA',
        label4: 'Quality',
        val4: 'AOI, X-Ray, and flying probe testing'
      },
      details: 'Our professional board layouts are optimized for signal integrity, thermal dissipation, and electromagnetic compliance. We handle the entire lifecycle from schematic capture and multi-layer layout to component sourcing, quick-turn assembly, and functional testing.',
      image: pcbDesignImg,
      imageFallbacks: [
        'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    {
      id: 'stem-kits',
      name: 'DIY STEM Education Kits',
      category: 'Education',
      tagline: 'Hands-on hardware & software learning kits for classroom or self-study.',
      description: 'Hands-on learning kits for students and educators to explore electronics and programming.',
      icon: <GraduationCap className="w-8 h-8 text-amber-400" />,
      gradient: 'from-amber-500/20 via-amber-900/10 to-transparent',
      glowColor: 'rgba(251, 191, 36, 0.4)',
      features: [
        'Arduino-based Kits',
        'Raspberry Pi Projects',
        'Robotics Kits',
        'IoT Learning Modules'
      ],
      specs: {
        label1: 'Targets',
        val1: 'K-12, Universities, and DIY makers',
        label2: 'Microcontrollers',
        val2: 'Arduino, ESP32, and Raspberry Pi',
        label3: 'Programming',
        val3: 'Scratch, Python, and C++',
        label4: 'Content',
        val4: 'Step-by-step curriculum & video guides'
      },
      details: 'Empower students and future engineering talents with comprehensive educational kits. Each kit features high-quality modules, breadboards, sensors, and structural elements accompanied by rich interactive guides and ready-made lesson plans for classroom implementation.',
      image: stemKitImg,
      imageFallbacks: [
        'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    {
      id: 'agritech',
      name: 'AgriTech Solutions',
      category: 'Agriculture',
      tagline: 'Smart IoT monitoring & precision automation for modern farming.',
      description: 'Smart agriculture technology for modern farming and precision agriculture.',
      icon: <Sprout className="w-8 h-8 text-emerald-400" />,
      gradient: 'from-emerald-500/20 via-emerald-900/10 to-transparent',
      glowColor: 'rgba(16, 185, 129, 0.4)',
      features: [
        'IoT Sensors for Soil & Climate',
        'Automated Irrigation Systems',
        'Crop Monitoring Solutions',
        'Smart Farming Equipment'
      ],
      specs: {
        label1: 'Sensors',
        val1: 'Soil moisture, NPK, EC, solar radiation',
        label2: 'Wireless',
        val2: 'LoRaWAN, NB-IoT, cellular backhaul',
        label3: 'Battery Life',
        val3: '5+ years via solar & ultra-low power',
        label4: 'Protection',
        val4: 'IP67 weather-sealed, UV-stabilized'
      },
      details: 'Enable data-driven agronomy with our field-tested smart sensor clusters and automated actuators. Monitor soil health, maximize water efficiency, and protect crops from extreme weather anomalies with real-time analytics sent directly to cloud dashboards.',
      image: agritechSensorsImg,
      imageFallbacks: [
        'https://images.unsplash.com/photo-1563514220747-a18732d0f3ac?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    {
      id: 'foodtech',
      name: 'FoodTech Solutions',
      category: 'Food Industry',
      tagline: 'FDA-compliant cold chain sensors and food processing automation.',
      description: 'Innovative food technology solutions for processing, safety, and quality control.',
      icon: <Activity className="w-8 h-8 text-rose-400" />,
      gradient: 'from-rose-500/20 via-rose-900/10 to-transparent',
      glowColor: 'rgba(244, 63, 94, 0.4)',
      features: [
        'Food Safety Sensors',
        'Quality Control Systems',
        'Processing Automation',
        'Cold Chain Monitoring'
      ],
      specs: {
        label1: 'Safety',
        val1: 'FDA & HACCP compliant tracking',
        label2: 'Sensors',
        val2: 'Contactless IR, humidity, gas sensors',
        label3: 'Automation',
        val3: 'Integrates with PLC and industrial gear',
        label4: 'Monitoring',
        val4: 'Sub-degree cold chain tracking'
      },
      details: 'Ensure uncompromising quality and absolute regulatory compliance in food processing and logistics. Our low-power, high-precision thermal and gas sensor clusters offer continuous remote visibility over raw storage, automated assembly lines, and global cold-chains.',
      image: foodtechImg,
      imageFallbacks: [
        'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1584263343923-d4855a4118ce?auto=format&fit=crop&w=1200&q=80'
      ]
    }
  ];

  const filteredProducts = products;

  return (
    <section id="products" className="py-24 relative overflow-hidden bg-neutral-950 border-b border-white/5">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-brand-purple/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-brand-cyan/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Main Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 text-left">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="text-xs text-brand-purple font-mono uppercase tracking-widest">HARDWARE PRODUCTS</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white leading-tight mt-1">
              Hardware Products
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed mt-2">
              Cutting-edge hardware solutions for education and industry
            </p>
          </div>
        </div>

        {/* Dynamic Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: idx * 0.05 }}
                className="flex flex-col bg-neutral-900/20 border border-white/5 rounded-2xl overflow-hidden hover:border-brand-purple/20 hover:bg-neutral-900/40 transition-all duration-300 group text-left cursor-pointer relative"
                onClick={() => setSelectedProduct(product)}
              >
                {/* Advanced visual icon container (acting as beautiful blueprint-tech header) */}
                <div className="relative aspect-video w-full overflow-hidden bg-neutral-950 flex items-center justify-center border-b border-white/5 p-8">
                  {/* Grid background */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />
                  
                  {/* Subtle color glow backplate */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-b ${product.gradient} opacity-40 transition-opacity duration-300 group-hover:opacity-75`} 
                  />

                  {/* Optional product image overlay */}
                  {product.image && (
                    <RobustImage 
                      src={product.image} 
                      fallbackSrcs={product.imageFallbacks}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-95 transition-all duration-500 pointer-events-none group-hover:scale-105"
                    />
                  )}

                  {/* Animated floating icon block */}
                  {!product.image && (
                    <motion.div 
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 4 + idx * 1.2,
                        ease: "easeInOut"
                      }}
                      className="relative z-10 w-16 h-16 rounded-2xl bg-neutral-900/80 border border-white/10 flex items-center justify-center shadow-lg group-hover:border-white/20 transition-all duration-300"
                      style={{
                        boxShadow: `0 8px 30px -4px ${product.glowColor}`
                      }}
                    >
                      {product.icon}
                    </motion.div>
                  )}

                  {/* Category Tag */}
                  {!product.image && (
                    <span className="absolute top-4 left-4 bg-neutral-900/95 border border-white/10 text-brand-cyan text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md">
                      {product.category}
                    </span>
                  )}
                </div>

                {/* Content Block */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-brand-purple transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-xs text-brand-cyan font-mono mt-1 mb-4 leading-relaxed">
                      {product.tagline}
                    </p>
                    
                    {/* List of services / bullet points */}
                    <div className="space-y-2 mt-2">
                      {product.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan/60" />
                          <span className="text-xs text-neutral-300 font-light">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest group-hover:text-neutral-300 transition-colors duration-300 flex items-center gap-1">
                      More Information <ArrowRight className="w-3 h-3 text-neutral-500 group-hover:text-brand-purple transition-colors duration-300" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Product Datasheet/Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop filter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-neutral-950/85 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl rounded-2xl bg-neutral-900 border border-white/10 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] text-left"
            >
              {/* Close Icon Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-750 text-neutral-400 hover:text-white transition-all border border-white/5 z-20"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Optional Hero Image */}
              {selectedProduct.image && (
                <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/5 mb-6 z-10">
                  <RobustImage 
                    src={selectedProduct.image} 
                    fallbackSrcs={selectedProduct.imageFallbacks}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent" />
                </div>
              )}

              {/* Title Header */}
              <div className="mb-6 relative z-10">
                <span className="text-[9px] text-brand-cyan font-mono uppercase tracking-widest border border-brand-cyan/20 px-2.5 py-1 rounded-md bg-brand-cyan/5">
                  {selectedProduct.category} // SOLUTIONS DATASHEET
                </span>
                <div className="flex items-center gap-4 mt-4">
                  <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-white/5 flex items-center justify-center">
                    {selectedProduct.icon}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white leading-tight">
                      {selectedProduct.name}
                    </h3>
                    <p className="text-xs text-brand-purple font-mono mt-0.5">{selectedProduct.tagline}</p>
                  </div>
                </div>
              </div>

              {/* Rich Technical Specs Panel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-neutral-950/50 p-4 rounded-xl border border-white/5 mb-6 font-sans">
                <div>
                  <h4 className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">{selectedProduct.specs.label1}</h4>
                  <p className="text-xs text-white font-medium mt-1">{selectedProduct.specs.val1}</p>
                </div>
                <div>
                  <h4 className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">{selectedProduct.specs.label2}</h4>
                  <p className="text-xs text-white font-medium mt-1">{selectedProduct.specs.val2}</p>
                </div>
                <div>
                  <h4 className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">{selectedProduct.specs.label3}</h4>
                  <p className="text-xs text-white font-medium mt-1">{selectedProduct.specs.val3}</p>
                </div>
                <div>
                  <h4 className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">{selectedProduct.specs.label4}</h4>
                  <p className="text-xs text-white font-medium mt-1">{selectedProduct.specs.val4}</p>
                </div>
              </div>

              {/* Long Description / Details */}
              <div className="mb-6">
                <h4 className="text-xs text-white font-display font-bold uppercase tracking-wider mb-2">Overview</h4>
                <p className="text-xs text-neutral-300 leading-relaxed font-light">
                  {selectedProduct.details}
                </p>
              </div>

              {/* Offerings list with Custom Bullet Check Icons */}
              <div className="mb-6">
                <h4 className="text-xs text-white font-display font-bold uppercase tracking-wider mb-3">Key Offerings</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedProduct.features.map((feat, i) => (
                    <div key={i} className="flex gap-2.5 items-start">
                      <div className="w-5 h-5 rounded bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-brand-purple" />
                      </div>
                      <p className="text-xs text-neutral-300 leading-normal font-light">{feat}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consultation Call Action */}
              <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-[10px] text-neutral-400 font-light">
                  Interested in standard integration or custom engineering services?
                </p>
                <button
                  onClick={() => {
                    setSelectedProduct(null);
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-white hover:bg-neutral-200 text-neutral-950 font-semibold text-xs transition-all duration-200 text-center"
                >
                  Contact Engineering
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
