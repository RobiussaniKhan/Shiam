
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Heart, Search, Menu, X, Github } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Sparkles className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight">CapGenie<span className="text-blue-500">.ai</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}>Home</Link>
          <Link to="/favorites" className={`text-sm font-medium flex items-center gap-2 transition-colors ${location.pathname === '/favorites' ? 'text-rose-400' : 'text-gray-400 hover:text-white'}`}>
            <Heart size={16} /> Favorites
          </Link>
          <button className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-sm font-semibold transition-all shadow-lg shadow-blue-600/20">
            Get Pro
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-gray-400" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 glass border-b border-white/5 p-6 md:hidden animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-lg font-medium">Home</Link>
            <Link to="/favorites" onClick={() => setIsOpen(false)} className="text-lg font-medium">Favorites</Link>
            <button className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold">Get Pro</button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="border-t border-white/5 py-12 px-6 mt-20">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <Sparkles className="text-white" size={16} />
          </div>
          <span className="text-lg font-bold">CapGenie</span>
        </div>
        <p className="text-gray-400 max-w-sm mb-6">
          The ultimate AI-powered caption generator for creators who want to stand out. From Islamic reminders to bold attitude, we've got you covered.
        </p>
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors">
            <Github size={18} />
          </a>
        </div>
      </div>
      <div>
        <h4 className="font-semibold mb-4 text-white">Categories</h4>
        <ul className="space-y-2 text-gray-400">
          <li><Link to="/category/islamic" className="hover:text-blue-400 transition-colors">Islamic</Link></li>
          <li><Link to="/category/romantic" className="hover:text-blue-400 transition-colors">Romantic</Link></li>
          <li><Link to="/category/attitude" className="hover:text-blue-400 transition-colors">Attitude</Link></li>
          <li><Link to="/category/motivational" className="hover:text-blue-400 transition-colors">Motivational</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4 text-white">Company</h4>
        <ul className="space-y-2 text-gray-400">
          <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
          <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
          <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
      &copy; {new Date().getFullYear()} CapGenie AI. Designed for Creators.
    </div>
  </footer>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col pt-24">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};
