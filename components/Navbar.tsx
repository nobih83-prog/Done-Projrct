
import React from 'react';
import { Search, ShoppingBag, Menu, Heart, X, User } from 'lucide-react';
import { Category } from '../types';

interface NavbarProps {
  onCategoryChange: (category: string) => void;
  onMenuClick: () => void;
  onCartClick: () => void;
  onWishlistClick: () => void;
  onAuthClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  wishlistCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onCategoryChange, 
  onMenuClick, 
  onCartClick, 
  onWishlistClick,
  onAuthClick,
  searchQuery,
  onSearchChange,
  cartCount, 
  wishlistCount 
}) => {
  const announcementText = "Up to 10K BDT 10% Off | Up to 5K BDT Free Delivery | Nashwa Exclusive Collection | Authentic Luxury Delivered to Your Doorstep • ";

  return (
    <div className="w-full">
      {/* Announcement Bar with Scrolling Marquee */}
      <div className="bg-[#d4af37] text-white text-[10px] py-2 px-0 flex items-center font-medium tracking-tight overflow-hidden relative">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          <span className="px-4">{announcementText}</span>
          <span className="px-4">{announcementText}</span>
          <span className="px-4">{announcementText}</span>
          <span className="px-4">{announcementText}</span>
        </div>
      </div>
      
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 px-4 h-16 flex items-center justify-between gap-4">
        {/* Left: Hamburger Menu */}
        <div className="flex-shrink-0">
          <button 
            onClick={onMenuClick}
            className="p-2 -ml-2 text-slate-900 hover:text-amber-600 transition-colors"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>

        {/* Center: Search Bar (Desktop/Tablet) & Logo */}
        <div className="flex-1 flex items-center justify-center max-w-xl">
          <div className="hidden md:flex items-center w-full relative group">
            <Search className="absolute left-3 text-slate-400 group-focus-within:text-amber-600 transition-colors" size={16} />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for treasures..."
              className="w-full pl-9 pr-9 py-2 bg-slate-50 border border-slate-100 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/10 focus:bg-white transition-all luxury-font"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-3 p-1 text-slate-400 hover:text-slate-600"
              >
                <X size={12} />
              </button>
            )}
          </div>
          
          <div 
            className="md:hidden flex flex-col items-center cursor-pointer" 
            onClick={() => onCategoryChange(Category.ALL)}
          >
            <span className="text-xl font-bold tracking-[0.2em] luxury-font text-slate-900">
              NASHWA
            </span>
            <span className="text-[7px] tracking-[0.3em] font-medium text-slate-400 -mt-1 uppercase">The Art of Elegance</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex-shrink-0 flex items-center space-x-0.5">
          <div className="hidden lg:flex flex-col items-end mr-3">
            <span className="text-base font-bold tracking-[0.1em] luxury-font text-slate-900 uppercase">NASHWA</span>
            <span className="text-[5px] tracking-[0.2em] text-slate-400 uppercase">Premium Selection</span>
          </div>
          
          <button 
            onClick={onAuthClick}
            className="hidden md:block p-2 text-slate-900 hover:text-amber-600 transition-colors"
          >
            <User size={20} strokeWidth={1.5} />
          </button>

          <button 
            onClick={onWishlistClick}
            className="p-2 text-slate-900 hover:text-amber-600 transition-colors relative"
          >
            <Heart size={20} strokeWidth={1.5} />
            {wishlistCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-red-500 text-white text-[8px] flex items-center justify-center rounded-full font-bold shadow-sm">
                {wishlistCount}
              </span>
            )}
          </button>
          <button 
            onClick={onCartClick}
            className="p-2 text-slate-900 hover:text-amber-600 transition-colors relative"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-amber-600 text-white text-[8px] flex items-center justify-center rounded-full font-bold shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 py-2 bg-white border-b border-slate-50">
        <div className="relative flex items-center">
          <Search className="absolute left-3 text-slate-400" size={14} />
          <input 
            id="mobile-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search our collection..."
            className="w-full pl-8 pr-8 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[11px] focus:outline-none focus:bg-slate-100 transition-all luxury-font"
          />
          {searchQuery && (
            <button 
              onClick={() => onSearchChange('')}
              className="absolute right-3 text-slate-400"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
