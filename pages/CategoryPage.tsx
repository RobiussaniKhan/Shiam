
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, Sparkles, Copy, Check, Heart, 
  RotateCcw, Info, Loader2, Share2
} from 'lucide-react';
import { CATEGORIES, TONES, LANGUAGES } from '../constants';
import { generateCaptions } from '../services/geminiService';
import { CategoryId, Tone, Language, GeneratedCaption } from '../types';

export const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: CategoryId }>();
  const category = CATEGORIES.find(c => c.id === categoryId);

  const [tone, setTone] = useState<Tone>('emotional');
  const [language, setLanguage] = useState<Language>('english');
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [captions, setCaptions] = useState<GeneratedCaption[]>([]);
  const [copyingId, setCopyingId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from local storage
  useEffect(() => {
    const saved = localStorage.getItem('capgenie_favs');
    if (saved) setFavorites(JSON.parse(saved));
    
    // SEO Update
    if (category) {
      document.title = category.seoTitle;
    }
  }, [category]);

  const handleGenerate = async () => {
    if (!category) return;
    setLoading(true);
    try {
      const results = await generateCaptions({
        category: category.id,
        tone,
        language,
        context
      });
      
      const newCaptions: GeneratedCaption[] = results.map((text, i) => ({
        id: `${Date.now()}-${i}`,
        text,
        category: category.id,
        timestamp: Date.now()
      }));
      
      setCaptions(newCaptions);
    } catch (error) {
      alert("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (id: string) => {
    const newFavs = favorites.includes(id) 
      ? favorites.filter(f => f !== id) 
      : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem('capgenie_favs', JSON.stringify(newFavs));
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopyingId(id);
    setTimeout(() => setCopyingId(null), 2000);
  };

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Category not found</h2>
        <Link to="/" className="text-blue-500 underline">Back to home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
        <ChevronLeft size={20} /> Back to Dashboard
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Generator Controls */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h1 className="text-4xl font-serif font-bold mb-4">{category.name} <span className="text-blue-500">Generator</span></h1>
            <p className="text-gray-400">{category.description}</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-300 block">The Tone</label>
              <div className="grid grid-cols-2 gap-2">
                {TONES.map(t => (
                  <button 
                    key={t.value}
                    onClick={() => setTone(t.value as Tone)}
                    className={`px-4 py-3 rounded-xl text-sm transition-all border ${tone === t.value ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20' : 'glass border-white/5 text-gray-400 hover:border-white/20'}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-300 block">Language Preference</label>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="w-full px-4 py-3 rounded-xl glass border-white/5 outline-none focus:border-blue-500 transition-all text-white appearance-none"
              >
                {LANGUAGES.map(l => (
                  <option key={l.value} value={l.value} className="bg-gray-900">{l.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-gray-300 block">What is happening in the photo?</label>
                <span className="text-xs text-gray-500">Optional</span>
              </div>
              <textarea 
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="e.g. Walking alone in the rain, feeling peaceful at a cafe, graduation day..."
                className="w-full px-4 py-3 rounded-xl glass border-white/5 outline-none focus:border-blue-500 transition-all text-white h-32 resize-none"
              />
            </div>

            <button 
              onClick={handleGenerate}
              disabled={loading}
              className={`w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Casting Spells...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generate Magic Captions
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-xl font-bold flex items-center gap-2">
              Results <span className="text-sm font-normal text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">{captions.length}</span>
            </h3>
            {captions.length > 0 && (
              <button 
                onClick={handleGenerate}
                className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <RotateCcw size={14} /> Regenerate
              </button>
            )}
          </div>

          <div className="space-y-4 min-h-[400px]">
            {captions.length === 0 && !loading && (
              <div className="flex flex-col items-center justify-center h-full text-center glass rounded-3xl p-12 border-dashed border-white/10">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-gray-600">
                  <Info size={32} />
                </div>
                <h4 className="text-lg font-semibold text-gray-400 mb-2">No captions yet</h4>
                <p className="text-sm text-gray-500 max-w-xs">Adjust your settings and hit generate to see the magic happen.</p>
              </div>
            )}

            {loading && (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-24 rounded-2xl glass animate-pulse flex items-center px-6">
                    <div className="h-4 w-3/4 bg-white/5 rounded" />
                  </div>
                ))}
              </div>
            )}

            {captions.map((cap) => (
              <div key={cap.id} className="group relative overflow-hidden rounded-2xl glass p-6 border-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-1">
                <p className="text-lg leading-relaxed text-gray-200 mb-6">{cap.text}</p>
                
                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => toggleFavorite(cap.id)}
                      className={`p-2 rounded-lg transition-colors ${favorites.includes(cap.id) ? 'bg-rose-500/20 text-rose-500' : 'hover:bg-white/5 text-gray-500 hover:text-white'}`}
                    >
                      <Heart size={18} fill={favorites.includes(cap.id) ? "currentColor" : "none"} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors">
                      <Share2 size={18} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => copyToClipboard(cap.id, cap.text)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold transition-all ${copyingId === cap.id ? 'bg-green-500/20 text-green-500' : 'bg-white/5 hover:bg-white/10 text-white'}`}
                  >
                    {copyingId === cap.id ? <Check size={16} /> : <Copy size={16} />}
                    {copyingId === cap.id ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
