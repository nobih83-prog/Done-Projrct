
import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemoveItem: (id: string) => void;
  onAddToCart: (product: Product) => void;
}

const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemoveItem,
  onAddToCart
}) => {
  const formatPrice = (price: number) => 
    new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0,
    }).format(price);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[65] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center space-x-2 text-amber-600">
            <Heart size={24} fill="currentColor" />
            <h2 className="text-xl font-bold luxury-font text-slate-900">Wishlist</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center">
              <Heart size={64} strokeWidth={1} className="mb-4 opacity-20" />
              <p className="text-lg">Your wishlist is empty</p>
              <button 
                onClick={onClose}
                className="mt-4 text-amber-600 font-medium hover:underline"
              >
                Find your treasures
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex space-x-4 group">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-50 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-800 line-clamp-1">{item.name}</h4>
                    <p className="text-amber-600 font-bold mt-1">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => {
                        onAddToCart(item);
                        onRemoveItem(item.id);
                      }}
                      className="flex-1 py-1.5 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded hover:bg-amber-600 transition-colors flex items-center justify-center space-x-1"
                    >
                      <ShoppingBag size={12} />
                      <span>Add to Bag</span>
                    </button>
                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-slate-50">
            <button 
              onClick={onClose}
              className="w-full py-4 border border-slate-900 text-slate-900 rounded-xl font-bold tracking-widest uppercase hover:bg-slate-900 hover:text-white transition-all"
            >
              Continue Exploration
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistDrawer;
