
import React, { useState } from 'react';
import { X, ShieldCheck, Truck, CreditCard, Smartphone, MapPin, Phone, User, CheckCircle2, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface CheckoutPageProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  quantity: number;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ isOpen, onClose, product, quantity }) => {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'mobile' | 'card'>('cod');

  const deliveryFee = 150;
  const subtotal = product.price * quantity;
  const total = subtotal + deliveryFee;

  const formatPrice = (price: number) => 
    new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0,
    }).format(price);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate order placement
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] bg-white flex flex-col animate-in slide-in-from-bottom duration-500 overflow-y-auto pt-safe">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="text-amber-600" size={20} />
          <h2 className="text-sm font-bold luxury-font tracking-widest uppercase text-slate-900">Secure Checkout</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
          <X size={24} />
        </button>
      </div>

      <div className="max-w-5xl mx-auto w-full px-6 py-8 md:py-12">
        {step === 'details' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Form */}
            <div className="lg:col-span-7">
              <h3 className="text-xl font-bold luxury-font mb-8 text-slate-900">Shipping Information</h3>
              
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-600 transition-colors" size={18} />
                      <input 
                        required
                        type="text"
                        placeholder="e.g. Abdullah Ahmed"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/10 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Phone Number</label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-600 transition-colors" size={18} />
                      <input 
                        required
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/10 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Delivery Address</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-5 text-slate-300 group-focus-within:text-amber-600 transition-colors" size={18} />
                    <textarea 
                      required
                      placeholder="Street address, apartment, area, city..."
                      rows={3}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/10 focus:bg-white transition-all resize-none"
                    ></textarea>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Payment Method</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button 
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${paymentMethod === 'cod' ? 'border-amber-600 bg-amber-50/30' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                    >
                      <Truck className={paymentMethod === 'cod' ? 'text-amber-600' : 'text-slate-400'} size={24} />
                      <span className="text-[10px] font-bold uppercase mt-2">Cash on Delivery</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setPaymentMethod('mobile')}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${paymentMethod === 'mobile' ? 'border-amber-600 bg-amber-50/30' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                    >
                      <Smartphone className={paymentMethod === 'mobile' ? 'text-amber-600' : 'text-slate-400'} size={24} />
                      <span className="text-[10px] font-bold uppercase mt-2">bKash / Nagad</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${paymentMethod === 'card' ? 'border-amber-600 bg-amber-50/30' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                    >
                      <CreditCard className={paymentMethod === 'card' ? 'text-amber-600' : 'text-slate-400'} size={24} />
                      <span className="text-[10px] font-bold uppercase mt-2">Card / Online</span>
                    </button>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-amber-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center space-x-3 active:scale-95 disabled:opacity-70"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Place My Order</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Column: Summary */}
            <div className="lg:col-span-5">
              <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-10 sticky top-28 border border-slate-100">
                <h3 className="text-xl font-bold luxury-font mb-8 text-slate-900">Order Details</h3>
                
                <div className="flex space-x-4 mb-8">
                  <div className="w-24 h-32 rounded-2xl overflow-hidden shadow-md flex-shrink-0">
                    <img src={product.image} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">{product.category}</p>
                    <h4 className="font-bold text-slate-900 text-base leading-tight mb-2">{product.name}</h4>
                    <p className="text-sm text-slate-500">Qty: {quantity}</p>
                  </div>
                </div>

                <div className="space-y-4 border-t border-slate-200 pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500 font-medium">Product Price</span>
                    <span className="text-sm font-bold text-slate-900">{formatPrice(product.price)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500 font-medium">Quantity</span>
                    <span className="text-sm font-bold text-slate-900">x {quantity}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500 font-medium">Premium Delivery</span>
                    <span className="text-sm font-bold text-green-600">{formatPrice(deliveryFee)}</span>
                  </div>
                  <div className="pt-4 border-t border-slate-200 flex justify-between items-end">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Total Payable</span>
                      <span className="text-2xl font-bold text-slate-900 luxury-font">{formatPrice(total)}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <ShieldCheck className="text-amber-600 mb-1" size={16} />
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Verified Purchase</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-start space-x-3">
                  <Truck className="text-amber-600 mt-0.5" size={16} />
                  <div>
                    <h5 className="text-[10px] font-bold uppercase text-slate-900">Express Priority</h5>
                    <p className="text-[10px] text-slate-400 leading-tight">Expected delivery: 24 - 48 Hours within Dhaka.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Success View */
          <div className="flex flex-col items-center justify-center text-center py-20 animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mb-8">
              <CheckCircle2 className="text-green-500" size={48} />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold luxury-font text-slate-900 mb-4">Order Confirmed</h2>
            <p className="text-amber-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-12">Thank you for choosing Nashwa BD</p>
            
            <div className="max-w-md w-full bg-slate-50 p-8 rounded-[2rem] border border-slate-100 mb-12">
              <div className="flex justify-between mb-4 pb-4 border-b border-slate-200">
                <span className="text-xs text-slate-500">Order ID</span>
                <span className="text-xs font-bold text-slate-900 uppercase">#NSH-{Math.floor(Math.random() * 900000 + 100000)}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                A confirmation text has been sent to your phone. Our concierge will contact you shortly to verify the delivery schedule.
              </p>
            </div>

            <button 
              onClick={onClose}
              className="px-12 py-5 bg-slate-900 text-white rounded-full font-bold text-[11px] uppercase tracking-[0.3em] hover:bg-amber-600 transition-all shadow-xl active:scale-95"
            >
              Continue Exploration
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
