
import React from 'react';
import { motion } from 'framer-motion';

export const TechSection: React.FC = () => {
  return (
    <section id="tech" className="py-24 bg-[#121212] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              whileHover={{ rotate: 10 }}
              className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/20"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.div>
            <h2 className="text-4xl font-bold mb-6">Built for the Real World — Not Just Demos</h2>
            <div className="space-y-6">
              {[
                { title: 'Computer Vision Analysis', desc: 'Our proprietary models detect depth, volume, and material degradation from simple smartphone photos.' },
                { title: 'Automated Pricing Engine', desc: 'Real-time market data matching with local contractor rates ensures quote accuracy within 5%.' },
                { title: 'Full Lifecycle Ops', desc: 'From vetting and compliance to escrow payments and site management—we handle the heavy lifting.' },
                { title: 'Enterprise Scalability', desc: 'Designed with 12+ years of on-the-ground service industry experience.' }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="group"
                >
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors flex items-center gap-3">
                    <span className="text-blue-500 font-mono text-sm">0{i+1}</span>
                    {item.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed pl-8 border-l border-slate-800 ml-3">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-teal-400 rounded-3xl blur opacity-25"></div>
            <div className="relative bg-slate-900 rounded-3xl border border-slate-800 p-2 overflow-hidden">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200" 
                alt="AI Overlay" 
                className="rounded-2xl opacity-80"
              />
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 max-w-[200px]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-bold tracking-widest uppercase">Live Detection</span>
                </div>
                <div className="text-xs font-mono text-blue-400 mb-1">Object: Wood Fence</div>
                <div className="text-xs font-mono text-blue-400 mb-1">Width: 42.5ft</div>
                <div className="text-xs font-mono text-blue-400">Status: Structural Decay</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
