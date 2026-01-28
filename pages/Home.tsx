
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Moon, Heart, CloudRain, ShieldCheck, Users, Zap, 
  ChevronRight, Sparkles 
} from 'lucide-react';
import { CATEGORIES } from '../constants';

const CategoryIcon = ({ iconName, size = 24 }: { iconName: string, size?: number }) => {
  const icons: Record<string, any> = { Moon, Heart, CloudRain, ShieldCheck, Users, Zap };
  const Icon = icons[iconName] || Sparkles;
  return <Icon size={size} />;
};

const Hero = () => (
  <section className="px-6 py-20 text-center relative overflow-hidden">
    {/* Decorative Blobs */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
    <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full -z-10" />
    
    <div className="max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-blue-500/20 text-blue-400 text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4">
        <Sparkles size={14} />
        <span>New: Added 4K Quality Captions</span>
      </div>
      <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight leading-tight">
        Words That <span className="gradient-text">Capture</span> Your Moments
      </h1>
      <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
        Stop staring at a blank screen. Generate emotional, poetic, and creative captions for every mood using our advanced AI.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <a href="#categories" className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold transition-all shadow-xl shadow-blue-600/20 flex items-center gap-2">
          Start Generating Free <ChevronRight size={20} />
        </a>
        <button className="px-8 py-4 rounded-2xl glass hover:bg-white/5 font-bold transition-all">
          Explore Templates
        </button>
      </div>
    </div>
  </section>
);

export const Home = () => {
  return (
    <div>
      <Hero />
      
      <section id="categories" className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-3">Choose a Category</h2>
            <p className="text-gray-400">Each category is fine-tuned for the best results.</p>
          </div>
          <button className="hidden md:block text-blue-400 font-semibold hover:underline">View All Categories</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <Link 
              key={category.id} 
              to={`/category/${category.id}`}
              className={`group relative overflow-hidden rounded-3xl p-8 transition-all hover:-translate-y-2 glass hover:border-white/20`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl glass border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/5 transition-all text-white">
                  <CategoryIcon iconName={category.icon} size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors">{category.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{category.description}</p>
                <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
                  Generate Now <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white/5 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-1">50K+</div>
            <div className="text-gray-400 text-sm">Captions Generated</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-1">12K+</div>
            <div className="text-gray-400 text-sm">Happy Users</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-1">99%</div>
            <div className="text-gray-400 text-sm">Satisfaction Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-1">3</div>
            <div className="text-gray-400 text-sm">Languages Supported</div>
          </div>
        </div>
      </section>
    </div>
  );
};
