
import React from 'react';
import { X, ChevronRight } from 'lucide-react';
import { Category } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryChange: (category: string) => void;
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  onCategoryChange,
  onLoginClick,
  onRegisterClick
}) => {
  const categories = [
    { name: 'Phone Case', id: Category.ELECTRONICS },
    { name: 'Eyeglasses', id: Category.ACCESSORIES },
    { name: 'Bag', id: Category.FASHION },
    { name: 'Accessories', id: Category.ACCESSORIES },
    { name: 'Watch', id: Category.WATCHES },
    { name: 'Jewellery', id: Category.ACCESSORIES },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-y-0 left-0 w-full max-w-[300px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
        {/* Header */}
        <div className="flex items-center h-16 px-4 border-b border-slate-100">
          <button onClick={onClose} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => {
                  onCategoryChange(cat.id);
                  onClose();
                }}
                className="w-full flex items-center justify-between px-6 py-4 text-slate-800 hover:bg-slate-50 transition-colors group"
              >
                <span className="text-[15px] font-medium tracking-tight">{cat.name}</span>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-amber-600 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Auth Section */}
        <div className="p-6 border-t border-slate-100 space-y-3">
          <h4 className="text-lg font-bold luxury-font mb-4">My Account</h4>
          <button 
            onClick={() => {
              onLoginClick();
              onClose();
            }}
            className="w-full py-3 bg-black text-white text-sm font-bold tracking-widest uppercase hover:bg-slate-900 transition-all rounded-sm"
          >
            Log In
          </button>
          <button 
            onClick={() => {
              onRegisterClick();
              onClose();
            }}
            className="w-full py-3 border border-black text-black text-sm font-bold tracking-widest uppercase hover:bg-slate-50 transition-all rounded-sm"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
