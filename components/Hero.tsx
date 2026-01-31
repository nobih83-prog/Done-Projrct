
import React from 'react';

interface HeroProps {
  onShopNowClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopNowClick }) => {
  return (
    <div className="w-full px-1 md:px-4 py-2 bg-white">
      <div className="flex gap-1 md:gap-2 h-[220px] md:h-[320px] w-full max-w-7xl mx-auto overflow-hidden">
        
        {/* Left: Main Large Image (65% width) */}
        <div className="relative w-[65%] h-full group cursor-pointer overflow-hidden rounded-l-xl md:rounded-l-3xl" onClick={onShopNowClick}>
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200" 
            alt="Luxury Fashion" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-center px-4 md:px-12 text-white">
            <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-amber-400 mb-1 md:mb-2">New Season</p>
            <h1 className="text-xl md:text-4xl font-bold luxury-font mb-2 md:mb-4 leading-tight max-w-md">
              The Art of <br/>Pure <span className="italic text-amber-100">Elegance</span>
            </h1>
            <div className="flex gap-2">
              <button 
                className="px-4 py-1.5 md:px-6 md:py-2 bg-white text-black rounded-full text-[9px] md:text-[11px] font-bold uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all active:scale-95"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* Right: Stacked Small Images (35% width) */}
        <div className="flex flex-col gap-1 md:gap-2 w-[35%] h-full">
          {/* Top Small Image */}
          <div className="relative h-1/2 group cursor-pointer overflow-hidden rounded-tr-xl md:rounded-tr-3xl" onClick={onShopNowClick}>
            <img 
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600" 
              alt="Premium Electronics" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-end p-2 md:p-6">
              <span className="text-[7px] md:text-[10px] text-white font-bold uppercase tracking-widest border-b border-white/50 pb-1">Electronics</span>
            </div>
          </div>
          
          {/* Bottom Small Image */}
          <div className="relative h-1/2 group cursor-pointer overflow-hidden rounded-br-xl md:rounded-br-3xl" onClick={onShopNowClick}>
            <img 
              src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=600" 
              alt="Luxury Watches" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-end p-2 md:p-6">
              <span className="text-[7px] md:text-[10px] text-white font-bold uppercase tracking-widest border-b border-white/50 pb-1">Watches</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
