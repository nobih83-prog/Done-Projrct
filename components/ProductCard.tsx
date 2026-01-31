
import React from 'react';
import { Plus, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  isWishlisted: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onToggleWishlist, onViewDetails, isWishlisted }) => {
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

  return (
    <div className="group bg-white rounded-lg md:rounded-2xl overflow-hidden border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden cursor-pointer" onClick={() => onViewDetails(product)}>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.isNew && (
          <span className="absolute top-1 left-1 md:top-3 md:left-3 px-1.5 md:px-3 py-0.5 md:py-1 bg-amber-500 text-white text-[6px] md:text-[10px] font-bold uppercase tracking-widest rounded-full">
            New
          </span>
        )}
        {product.isSale && (
          <span className="absolute top-1 left-1 md:top-3 md:left-3 px-1.5 md:px-3 py-0.5 md:py-1 bg-red-500 text-white text-[6px] md:text-[10px] font-bold uppercase tracking-widest rounded-full">
            Sale
          </span>
        )}
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-1 right-1 md:top-3 md:right-3 p-1 md:p-2 rounded-full shadow-sm transition-all z-10 ${
            isWishlisted 
              ? 'bg-amber-600 text-white' 
              : 'bg-white/80 backdrop-blur-sm text-slate-400 hover:text-amber-600'
          }`}
        >
          <Heart size={12} className="md:w-[18px] md:h-[18px]" fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="absolute bottom-1 right-1 md:bottom-4 md:right-4 p-1.5 md:p-3 bg-white text-slate-900 rounded-full shadow-lg opacity-100 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all hover:bg-amber-600 hover:text-white"
        >
          <Plus size={14} className="md:w-[20px] md:h-[20px]" />
        </button>
      </div>
      
      <div className="p-1.5 md:p-5 flex-grow flex flex-col justify-between">
        <div>
          <p className="text-[6px] md:text-[10px] text-slate-400 font-medium uppercase tracking-[0.1em] md:tracking-widest mb-0.5 md:mb-1">
            {product.category}
          </p>
          <h3 
            className="text-[9px] md:text-base font-semibold text-slate-800 line-clamp-2 md:line-clamp-1 mb-0.5 md:mb-2 cursor-pointer hover:text-amber-600 transition-colors leading-tight"
            onClick={() => onViewDetails(product)}
          >
            {product.name}
          </h3>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
          <span className="text-[9px] md:text-base font-bold text-amber-600">
            {formattedPrice}
          </span>
          {formattedOriginalPrice && (
            <span className="text-[7px] md:text-[12px] text-slate-400 line-through">
              {formattedOriginalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
