
import React from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem 
}) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const formatPrice = (price: number) => 
    new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0,
    }).format(price);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      {/* Top Dropdown Panel - Made Narrower (max-w-sm) */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-center pointer-events-none">
        <div className="w-full max-w-sm bg-white shadow-2xl rounded-[2rem] overflow-hidden flex flex-col pointer-events-auto animate-in slide-in-from-top-full duration-500 ease-out border border-slate-100 max-h-[80vh]">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50 bg-slate-50/50">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-amber-50 rounded-full text-amber-600">
                <ShoppingBag size={16} />
              </div>
              <h2 className="text-sm font-bold luxury-font text-slate-900 tracking-tight">Shopping Bag</h2>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
              <X size={16} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="py-10 flex flex-col items-center justify-center text-slate-400 text-center">
                <ShoppingBag size={32} strokeWidth={1} className="mb-3 opacity-20" />
                <p className="text-xs font-medium">Your bag is empty</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex space-x-3 bg-slate-50/50 p-2.5 rounded-2xl border border-slate-100/50">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white flex-shrink-0 shadow-sm">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <h4 className="font-semibold text-slate-800 text-[13px] line-clamp-1">{item.name}</h4>
                      <p className="text-amber-600 font-bold text-[12px] mt-0.5">{formatPrice(item.price)}</p>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center bg-white border border-slate-100 rounded-full px-1 shadow-sm">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 hover:text-amber-600 transition-colors"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="px-1.5 text-[11px] font-bold w-5 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 hover:text-amber-600 transition-colors"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-4 border-t border-slate-100 bg-white">
              <div className="flex justify-between items-center mb-3">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Subtotal</span>
                <span className="text-lg font-bold text-slate-900">{formatPrice(total)}</span>
              </div>
              <button className="w-full py-3.5 bg-slate-900 text-white rounded-xl text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-amber-600 transition-all shadow-lg shadow-slate-100">
                Checkout Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
