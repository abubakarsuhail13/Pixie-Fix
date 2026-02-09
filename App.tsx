
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Services } from './components/Services';
import { TechSection } from './components/TechSection';
import { ScaleSection } from './components/ScaleSection';
import { QuoteFlow } from './components/QuoteFlow';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [showQuoteTool, setShowQuoteTool] = useState(false);
  const [selectedInitialService, setSelectedInitialService] = useState<string | undefined>();

  const startQuoteFlow = (serviceId?: string) => {
    setSelectedInitialService(serviceId);
    setShowQuoteTool(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar onStart={() => startQuoteFlow()} />
      
      <main>
        <Hero onStart={() => startQuoteFlow()} />
        <HowItWorks />
        <Services onStart={(id) => startQuoteFlow(id)} />
        <TechSection />
        
        {/* Social Proof / Credibility Minimal Section */}
        <section className="py-20 bg-slate-50 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <div className="text-3xl font-bold text-[#121212] mb-2">12+ Years</div>
                <div className="text-slate-500 font-medium">Industry experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#121212] mb-2">15,000+</div>
                <div className="text-slate-500 font-medium">Vetted providers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#121212] mb-2">94%</div>
                <div className="text-slate-500 font-medium">Quote accuracy</div>
              </div>
            </div>
          </div>
        </section>

        <ScaleSection />

        {/* Final CTA Section */}
        <section className="py-24 bg-blue-600 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-10"></div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Resolve Home Problems. With Just a Photo.</h2>
            <p className="text-blue-100 text-xl mb-10 leading-relaxed">
              Take a picture. Get an instant quote. Book with confidence. 
              Join thousands of homeowners who've ditched the old way of doing things.
            </p>
            <button 
              onClick={() => startQuoteFlow()}
              className="px-10 py-5 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-xl"
            >
              Get Started Now
            </button>
          </div>
        </section>
      </main>

      <Footer />

      {showQuoteTool && (
        <QuoteFlow 
          onClose={() => setShowQuoteTool(false)} 
          initialService={selectedInitialService}
        />
      )}
    </div>
  );
};

export default App;
