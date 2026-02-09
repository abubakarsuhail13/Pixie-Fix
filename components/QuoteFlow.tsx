
import React, { useState, useRef } from 'react';
import { generateQuote } from '../services/geminiService';
import { Quote } from '../types';
import { SERVICES } from '../constants';

interface QuoteFlowProps {
  onClose: () => void;
  initialService?: string;
}

export const QuoteFlow: React.FC<QuoteFlowProps> = ({ onClose, initialService }) => {
  const [step, setStep] = useState<'selection' | 'upload' | 'analyzing' | 'result'>('selection');
  const [selectedService, setSelectedService] = useState<string>(initialService || '');
  const [image, setImage] = useState<string | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setStep('analyzing');
        processQuote(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processQuote = async (imgData: string) => {
    try {
      const res = await generateQuote(imgData, selectedService);
      setQuote(res);
      setStep('result');
    } catch (err) {
      setError('Could not generate quote. Please ensure photos are clear.');
      setStep('upload');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-[#121212]">
              {step === 'selection' && 'Select Your Service'}
              {step === 'upload' && 'Upload Photos'}
              {step === 'analyzing' && 'Analyzing Project...'}
              {step === 'result' && 'Your AI Estimate'}
            </h2>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-bold">Pixie Fix Engine v2.5</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8">
          {step === 'selection' && (
            <div className="grid gap-4">
              {SERVICES.map(s => (
                <button 
                  key={s.id}
                  onClick={() => { setSelectedService(s.id); setStep('upload'); }}
                  className="flex items-center gap-4 p-4 border border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50/30 transition-all text-left group"
                >
                  <img src={s.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                  <div>
                    <div className="font-bold text-lg text-[#121212] group-hover:text-blue-600 transition-colors">{s.title}</div>
                    <div className="text-sm text-slate-500">{s.description}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 'upload' && (
            <div className="text-center">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200 rounded-3xl p-12 hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all mb-6"
              >
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Upload visual context</h3>
                <p className="text-slate-500 text-sm">Take 1-3 clear photos of the area needing repair.</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            </div>
          )}

          {step === 'analyzing' && (
            <div className="text-center py-12">
              <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <h3 className="text-xl font-bold mb-2">Pixie AI is scanning...</h3>
              <p className="text-slate-500 animate-pulse">Running computer vision models for volume, risk, and material detection.</p>
            </div>
          )}

          {step === 'result' && quote && (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <div className="bg-blue-600 text-white rounded-3xl p-8 mb-8 flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-semibold mb-1">Estimated Project Total</p>
                  <h3 className="text-4xl font-bold">{quote.estimatedCost}</h3>
                </div>
                <div className="text-right">
                  <div className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">94% CONFIDENCE</div>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-xs text-slate-400 font-bold mb-1 uppercase">Labor</div>
                  <div className="font-bold text-slate-900">{quote.breakdown.labor}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-xs text-slate-400 font-bold mb-1 uppercase">Materials</div>
                  <div className="font-bold text-slate-900">{quote.breakdown.materials}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-xs text-slate-400 font-bold mb-1 uppercase">Timeline</div>
                  <div className="font-bold text-slate-900">{quote.breakdown.timeline}</div>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="font-bold text-slate-900 mb-2">Visual Analysis Report</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{quote.analysis}</p>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 py-4 bg-[#121212] text-white rounded-2xl font-bold hover:bg-slate-800 transition-all">
                  Schedule Pros
                </button>
                <button 
                  onClick={() => setStep('upload')}
                  className="px-6 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all"
                >
                  Recalculate
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
