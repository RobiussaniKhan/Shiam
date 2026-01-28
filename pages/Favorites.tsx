
import React, { useState, useEffect } from 'react';
import { Heart, Trash2, Copy, Check, Info, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Favorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copyingId, setCopyingId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('capgenie_favs');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const removeFavorite = (id: string) => {
    const newFavs = favorites.filter(f => f !== id);
    setFavorites(newFavs);
    localStorage.setItem('capgenie_favs', JSON.stringify(newFavs));
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopyingId(id);
    setTimeout(() => setCopyingId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
        <ChevronLeft size={20} /> Back to Dashboard
      </Link>

      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-serif font-bold mb-2 flex items-center gap-3">
            Your <span className="text-rose-500">Favorites</span>
            <Heart size={32} className="text-rose-500" fill="currentColor" />
          </h1>
          <p className="text-gray-400">All your saved magic captions in one place.</p>
        </div>
        <div className="text-sm bg-rose-500/10 text-rose-500 px-3 py-1 rounded-full font-bold">
          {favorites.length} Saved
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center glass rounded-3xl border-dashed border-white/10">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 text-gray-600">
            <Heart size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-300 mb-3">No favorites yet</h2>
          <p className="text-gray-500 max-w-sm mb-8">Start generating captions and save the ones you love by clicking the heart icon.</p>
          <Link to="/" className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold transition-all">
            Go to Generator
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {favorites.map((favId, idx) => {
            // In a real app, we'd fetch the caption text from a DB or global state.
            // For this demo, we'll assume we saved some context but we'll show a placeholder
            // since localStorage only stores IDs. In a robust version, we'd store the whole object.
            // Let's assume the favorite ID is just a placeholder for now as per this MVP.
            const placeholderText = "Sample saved caption text that you liked. (In a full backend version, this would be retrieved from your saved database history.)";
            
            return (
              <div key={idx} className="group glass rounded-2xl p-6 border-white/5 hover:border-rose-500/30 transition-all">
                <p className="text-lg leading-relaxed text-gray-200 mb-6 italic">"{placeholderText}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <button 
                    onClick={() => removeFavorite(favId)}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 size={16} /> Remove
                  </button>
                  <button 
                    onClick={() => copyToClipboard(favId, placeholderText)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold transition-all ${copyingId === favId ? 'bg-green-500/20 text-green-500' : 'bg-white/5 hover:bg-white/10 text-white'}`}
                  >
                    {copyingId === favId ? <Check size={16} /> : <Copy size={16} />}
                    {copyingId === favId ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
