
import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';

interface ServicesProps {
  onStart: (serviceId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onStart }) => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <h2 className="text-4xl font-bold text-[#121212] mb-4">Our Core Expertise</h2>
            <p className="text-slate-500 max-w-xl">Specialized in exterior home improvements where visual assessment is the standard.</p>
          </div>
          <motion.button 
            whileHover={{ x: 5 }}
            className="text-blue-600 font-semibold flex items-center gap-2 transition-all"
          >
            See All Services
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((s, idx) => (
            <motion.div 
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-6 shadow-sm border border-slate-100">
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src={s.image} 
                  alt={s.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span className="text-white font-semibold">View Recent Jobs</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#121212] mb-3 group-hover:text-blue-600 transition-colors">{s.title}</h3>
              <p className="text-slate-500 mb-6">{s.description}</p>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onStart(s.id)}
                className="w-full py-4 bg-slate-50 border border-slate-100 text-[#121212] rounded-xl font-bold hover:bg-[#121212] hover:text-white transition-all group-hover:shadow-md"
              >
                Get Quote
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
