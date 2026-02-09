
export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Quote {
  estimatedCost: string;
  breakdown: {
    labor: string;
    materials: string;
    timeline: string;
  };
  analysis: string;
}

export type AppView = 'landing' | 'quote-flow';
