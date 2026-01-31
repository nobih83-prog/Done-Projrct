
import React from 'react';
import { Home, LayoutGrid, Phone, MessageCircle } from 'lucide-react';
import { Category } from '../types';

interface BottomNavProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onMenuClick: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ 
  activeCategory, 
  onCategoryChange, 
  onMenuClick
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 flex h-16 items-stretch pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      {/* Home */}
      <button
        onClick={() => onCategoryChange(Category.ALL)}
        className={`flex-1 flex flex-col items-center justify-center border-r border-slate-50 transition-all active:scale-90 ${
          activeCategory === Category.ALL ? 'text-amber-600' : 'text-slate-400 hover:text-slate-900'
        }`}
      >
        <Home size={20} strokeWidth={activeCategory === Category.ALL ? 2.5 : 1.5} />
        <span className="text-[9px] font-bold uppercase tracking-tighter mt-1">Home</span>
      </button>

      {/* Explore / Categories */}
      <button
        onClick={onMenuClick}
        className="flex-1 flex flex-col items-center justify-center border-r border-slate-50 text-slate-400 hover:text-slate-900 transition-all active:scale-90"
      >
        <LayoutGrid size={20} strokeWidth={1.5} />
        <span className="text-[9px] font-bold uppercase tracking-tighter mt-1">Explore</span>
      </button>

      {/* Direct Call */}
      <a
        href="tel:01718952852"
        className="flex-1 flex flex-col items-center justify-center border-r border-slate-50 text-slate-400 hover:text-slate-900 transition-all active:scale-90"
      >
        <Phone size={20} strokeWidth={1.5} />
        <span className="text-[9px] font-bold uppercase tracking-tighter mt-1">Call</span>
      </a>

      {/* WhatsApp Chat */}
      <a
        href="https://wa.me/8801718952852"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center text-slate-400 hover:text-[#25D366] transition-all active:scale-90"
      >
        <MessageCircle size={20} strokeWidth={1.5} />
        <span className="text-[9px] font-bold uppercase tracking-tighter mt-1">Chat</span>
      </a>
    </div>
  );
};

export default BottomNav;
