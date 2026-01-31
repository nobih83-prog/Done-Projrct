
import React, { useState, useRef, useMemo } from 'react';
import { ChevronLeft, ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw, Star, Zap, Check } from 'lucide-react';
import { Product } from '../types';
import PolicyModal, { PolicyType } from './PolicyModal';
import SizeGuideModal from './SizeGuideModal';
import { PRODUCTS } from '../constants';

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onDirectCheckout: (product: Product, quantity: number) => void;
  onViewDetails: (product: Product) => void;
  isWishlisted: boolean;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ 
  product, 
  onClose, 
  onAddToCart, 
  onToggleWishlist,
  onDirectCheckout,
  onViewDetails,
  isWishlisted
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  
  const zoomRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const similarProducts = useMemo(() => {
    return PRODUCTS
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 5);
  }, [product]);

  const formattedPrice = new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    maximumFractionDigits: 0,
  }).format(product.price);

  const formattedOriginalPrice = product.originalPrice 
    ? new Intl.NumberFormat('en-BD', {
        style: 'currency',
        currency: 'BDT',
        maximumFractionDigits: 0,
      }).format(product.originalPrice)
    : null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomRef.current || !imgRef.current) return;
    const { left, top, width, height } = zoomRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    imgRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  const handleMouseLeave = () => {
    if (imgRef.current) {
      imgRef.current.style.transformOrigin = 'center center';
    }
  };

  return (
    <div className="fixed inset-0 z-[80] bg-white overflow-y-auto animate-in slide-in-from-bottom duration-500 pt-safe pb-safe">
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-8">
        {/* Top Header Navigation */}
        <div className="flex items-center justify-between mb-4 md:mb-10">
          <button 
            onClick={onClose}
            className="flex items-center space-x-2 text-slate-500 hover:text-slate-900 transition-colors group"
          >
            <div className="p-1.5 md:p-2 rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors">
              <ChevronLeft size={16} className="md:w-[18px] md:h-[18px] group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest">Back</span>
          </button>
          
          <div className="text-center">
            <span className="text-[10px] md:text-[11px] font-bold luxury-font tracking-[0.2em] text-slate-900">EXQUISITE DETAIL</span>
          </div>
          
          <div className="w-10" />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          
          {/* LEFT: Similar Products Sidebar (Desktop Only) */}
          <div className="hidden lg:flex lg:w-[15%] flex-col space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Related</h3>
            {similarProducts.map(p => (
              <div 
                key={p.id} 
                onClick={() => onViewDetails(p)}
                className="group cursor-pointer border border-slate-100 rounded-xl overflow-hidden hover:border-amber-200 transition-all bg-slate-50/30"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={p.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                </div>
                <div className="p-2 text-center">
                  <p className="text-[9px] font-bold text-slate-700 line-clamp-1 group-hover:text-amber-600">{p.name}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CENTER: Main Image Display */}
          <div className="lg:w-[40%] flex flex-col gap-3">
            <div 
              ref={zoomRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="zoom-container aspect-[3/4] rounded-xl md:rounded-[2.5rem] bg-slate-50 border border-slate-100 shadow-sm group/zoom overflow-hidden mx-auto w-full max-w-[210px] md:max-w-[400px]"
            >
              <img 
                ref={imgRef}
                src={product.image} 
                alt={product.name}
                className="zoom-image w-full h-full object-cover pointer-events-none md:pointer-events-auto"
              />
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2 max-w-[210px] md:max-w-[400px] mx-auto w-full">
              <div className="aspect-[3/4] rounded-lg overflow-hidden border-2 border-amber-600 bg-slate-50 shadow-sm">
                <img src={product.image} className="w-full h-full object-cover opacity-80" />
              </div>
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-[3/4] rounded-lg overflow-hidden border border-slate-100 bg-slate-50 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-not-allowed">
                  <img src={product.image} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Info Section */}
          <div className="lg:w-[45%] flex flex-col">
            <div className="mb-4 md:mb-8 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[7px] md:text-[8px] font-bold uppercase tracking-[0.2em] rounded-full">
                  {product.category}
                </span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={8} fill="currentColor" />)}
                </div>
              </div>
              
              <h1 className="text-lg md:text-4xl font-bold luxury-font text-slate-900 mb-1 md:mb-3 leading-tight px-4 md:px-0">
                {product.name}
              </h1>

              <div className="flex items-center justify-center md:justify-start space-x-3 mb-4 md:mb-6">
                <span className="text-base md:text-2xl font-bold text-slate-900">
                  {formattedPrice}
                </span>
                {formattedOriginalPrice && (
                  <span className="text-xs md:text-sm text-slate-400 line-through font-light">
                    {formattedOriginalPrice}
                  </span>
                )}
              </div>

              {/* Variant Selectors: Color */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-4 md:mb-6 flex flex-col items-center md:items-start">
                  <h4 className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2 md:mb-3">Select Color</h4>
                  <div className="flex gap-2.5">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-7 h-7 md:w-8 md:h-8 rounded-full border-2 p-0.5 transition-all flex items-center justify-center ${selectedColor === color ? 'border-amber-600 scale-110 shadow-md' : 'border-transparent hover:border-slate-200'}`}
                      >
                        <div 
                          className="w-full h-full rounded-full shadow-inner flex items-center justify-center" 
                          style={{ backgroundColor: color }}
                        >
                          {selectedColor === color && <Check size={10} className={color.toLowerCase() === '#ffffff' ? 'text-black' : 'text-white'} />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Variant Selectors: Size */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6 md:mb-8 flex flex-col items-center md:items-start px-2 md:px-0">
                  <div className="flex justify-between items-center w-full max-w-[280px] md:max-w-none mb-2 md:mb-3">
                    <h4 className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Available Size</h4>
                    <button 
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-[8px] font-bold text-amber-600 uppercase tracking-widest hover:underline"
                    >
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-start gap-1.5 md:gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 md:px-4 md:py-2 text-[9px] md:text-[10px] font-bold rounded-md border transition-all ${selectedSize === size ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-100 hover:border-amber-200'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-slate-50/50 p-4 md:p-6 rounded-xl md:rounded-2xl border border-slate-100 mx-2 md:mx-0">
                <p className="text-slate-600 text-[10px] md:text-sm leading-relaxed italic line-clamp-3 md:line-clamp-none">
                  "{product.description}"
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 px-4 md:px-0 mb-8">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-3">
                <div className="flex items-center justify-between border border-slate-200 rounded-xl px-4 py-1.5 md:py-2 bg-slate-50">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-1 hover:text-amber-600 transition-colors">
                    <span className="text-lg leading-none">-</span>
                  </button>
                  <span className="w-8 text-center font-bold text-xs md:text-sm">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="p-1 hover:text-amber-600 transition-colors">
                    <span className="text-lg leading-none">+</span>
                  </button>
                </div>
                
                <button 
                  onClick={() => onAddToCart({ ...product, selectedColor, selectedSize } as Product)}
                  className="flex-1 bg-slate-100 text-slate-900 py-3 md:py-4 rounded-xl font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] hover:bg-slate-200 transition-all border border-slate-200 flex items-center justify-center space-x-2 active:scale-95"
                >
                  <ShoppingBag size={14} />
                  <span>Add to Bag</span>
                </button>

                <button 
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3 md:p-4 rounded-xl border transition-all flex items-center justify-center active:scale-95 ${
                    isWishlisted ? 'bg-red-50 border-red-100 text-red-500' : 'border-slate-200 text-slate-400 hover:text-amber-600 bg-white'
                  }`}
                >
                  <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              <button 
                onClick={() => onDirectCheckout(product, quantity)}
                className="w-full py-3.5 md:py-4 bg-slate-900 text-white rounded-xl font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] hover:bg-amber-600 transition-all active:scale-[0.98] flex items-center justify-center space-x-2 shadow-lg shadow-slate-100"
              >
                <Zap size={14} fill="currentColor" />
                <span>Express Direct Checkout</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-1 md:gap-2 pt-6 border-t border-slate-100 mx-4 md:mx-0">
              <button onClick={() => setActivePolicy('authentic')} className="flex flex-col items-center text-center p-1.5 md:p-2 rounded-xl hover:bg-slate-50 transition-colors">
                <ShieldCheck className="text-amber-600 mb-1" size={14} />
                <span className="text-[6px] md:text-[7px] font-bold uppercase tracking-widest text-slate-900 whitespace-nowrap">Authentic</span>
              </button>
              <button onClick={() => setActivePolicy('delivery')} className="flex flex-col items-center text-center p-1.5 md:p-2 rounded-xl hover:bg-slate-50 transition-colors">
                <Truck className="text-amber-600 mb-1" size={14} />
                <span className="text-[6px] md:text-[7px] font-bold uppercase tracking-widest text-slate-900 whitespace-nowrap">Priority Ship</span>
              </button>
              <button onClick={() => setActivePolicy('returns')} className="flex flex-col items-center text-center p-1.5 md:p-2 rounded-xl hover:bg-slate-50 transition-colors">
                <RefreshCw className="text-amber-600 mb-1" size={14} />
                <span className="text-[6px] md:text-[7px] font-bold uppercase tracking-widest text-slate-900 whitespace-nowrap">Easy Returns</span>
              </button>
            </div>
          </div>
        </div>

        {/* Similar Products (Mobile Horizontal Scroll) */}
        <div className="lg:hidden mt-8 border-t border-slate-100 pt-6">
          <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 px-2">Related Treasures</h3>
          <div className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
            {similarProducts.map(p => (
              <div key={p.id} onClick={() => onViewDetails(p)} className="w-28 flex-shrink-0 bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm active:scale-95">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={p.image} className="w-full h-full object-cover" />
                </div>
                <div className="p-2">
                  <p className="text-[8px] font-bold text-slate-700 line-clamp-1">{p.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PolicyModal type={activePolicy} onClose={() => setActivePolicy(null)} />
      
      <SizeGuideModal 
        isOpen={isSizeGuideOpen} 
        onClose={() => setIsSizeGuideOpen(false)} 
        category={product.category}
      />
    </div>
  );
};

export default ProductDetails;
