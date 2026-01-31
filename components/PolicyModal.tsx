
import React from 'react';
import { X, ShieldCheck, Truck, RefreshCw, CheckCircle2 } from 'lucide-react';

export type PolicyType = 'authentic' | 'delivery' | 'returns';

interface PolicyModalProps {
  type: PolicyType | null;
  onClose: () => void;
}

const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const content = {
    authentic: {
      icon: <ShieldCheck className="text-amber-600 mb-6" size={48} />,
      title: "Authenticity Guaranteed",
      subtitle: "Our promise of genuine luxury",
      description: "At Nashwa, every item undergoes a rigorous multi-point inspection by our team of in-house experts. We specialize in curating only 100% authentic masterpieces.",
      points: [
        "Direct sourcing from authorized boutiques and designers.",
        "Verified serial numbers and certificates of authenticity included.",
        "Double-verification process for high-value watches and jewelry.",
        "Lifetime guarantee: If an item is proven non-authentic, we offer a 200% refund."
      ]
    },
    delivery: {
      icon: <Truck className="text-amber-600 mb-6" size={48} />,
      title: "Priority Luxury Shipping",
      subtitle: "Swift, safe, and sophisticated",
      description: "We understand that luxury is about more than just the product—it's about the experience. Our logistics are designed for the most discerning clients.",
      points: [
        "Complimentary 24-48 hour delivery within Dhaka metropolitan area.",
        "Temperature-controlled transport for sensitive items like perfumes.",
        "Discreet, premium packaging to protect your privacy and the product.",
        "Insured shipping: Every package is fully insured during transit."
      ]
    },
    returns: {
      icon: <RefreshCw className="text-amber-600 mb-6" size={48} />,
      title: "Hassle-Free Returns",
      subtitle: "Our 7-Day White-Glove Exchange",
      description: "Your satisfaction is our ultimate priority. If your selection isn't perfectly suited to your taste, we provide a seamless exchange process.",
      points: [
        "7-day window for exchange or store credit from the date of delivery.",
        "Complimentary pick-up service for returns at your preferred location.",
        "Items must be in original condition with Nashwa security tags intact.",
        "Transparent process: No hidden fees or complex paperwork."
      ]
    }
  };

  const active = content[type];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center text-center">
          {active.icon}
          <h2 className="text-3xl font-bold luxury-font text-slate-900 mb-2">{active.title}</h2>
          <p className="text-amber-600 font-bold text-[10px] uppercase tracking-[0.3em] mb-6">{active.subtitle}</p>
          
          <div className="w-12 h-0.5 bg-slate-100 mb-8" />
          
          <p className="text-slate-500 text-sm leading-relaxed mb-8 italic">
            "{active.description}"
          </p>

          <div className="w-full space-y-4 text-left">
            {active.points.map((point, i) => (
              <div key={i} className="flex items-start space-x-3">
                <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={16} />
                <span className="text-xs text-slate-600 font-medium leading-relaxed">{point}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={onClose}
            className="mt-10 w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-amber-600 transition-all"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;
