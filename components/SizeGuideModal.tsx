
import React from 'react';
import { X, Ruler, Watch, Scissors, Info, Smartphone, Droplets } from 'lucide-react';
import { Category } from '../types';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, category }) => {
  if (!isOpen) return null;

  const getGuideContent = () => {
    const cat = category.toLowerCase();
    
    if (cat.includes('fashion')) {
      return {
        icon: <Scissors size={20} />,
        title: "Apparel Guide",
        subtitle: "Fashion & Modest Wear",
        headers: ["Size", "Chest", "Waist", "Hips"],
        rows: [
          ["S", "34-36\"", "28-30\"", "35-37\""],
          ["M", "38-40\"", "32-34\"", "39-41\""],
          ["L", "42-44\"", "36-38\"", "43-45\""],
          ["XL", "46-48\"", "40-42\"", "47-49\""]
        ],
        tips: "Measure around the fullest part of your chest and narrowest part of your waist. Our collection is Premium Slim Fit; consider sizing up for a relaxed look."
      };
    }
    
    if (cat.includes('watches')) {
      return {
        icon: <Watch size={20} />,
        title: "Timepiece Guide",
        subtitle: "Watch Case & Fit",
        headers: ["Case", "Wrist Circ.", "Style", "Fit"],
        rows: [
          ["36mm", "6.0-6.5\"", "Classic", "Small"],
          ["38mm", "6.5-7.0\"", "Elegant", "Medium"],
          ["40mm", "7.0-7.5\"", "Modern", "Standard"],
          ["42mm+", "7.5\"+", "Sport", "Oversized"]
        ],
        tips: "The case diameter should be proportionate to your wrist. Standard men's wrists usually favor 38-40mm for a classic look."
      };
    }

    if (cat.includes('accessories')) {
      return {
        icon: <Ruler size={20} />,
        title: "Jewelry Guide",
        subtitle: "Rings & Bracelets",
        headers: ["Standard", "Circum.", "Inner Dia.", "Region"],
        rows: [
          ["6", "51.9mm", "16.5mm", "US/CAN"],
          ["7", "54.4mm", "17.3mm", "US/CAN"],
          ["8", "57.0mm", "18.1mm", "US/CAN"],
          ["9", "59.5mm", "18.9mm", "US/CAN"]
        ],
        tips: "For rings, measure your finger at the end of the day when it's largest. For bracelets, add 1-2cm to your wrist circumference for a comfort fit."
      };
    }

    if (cat.includes('electronics')) {
      return {
        icon: <Smartphone size={20} />,
        title: "Tech Compatibility",
        subtitle: "Cases & Devices",
        headers: ["Model", "Display", "Dimensions", "Fit"],
        rows: [
          ["iPhone Pro", "6.1\"", "146.6mm", "Precision"],
          ["iPhone Max", "6.7\"", "159.9mm", "Precision"],
          ["Ultra Watch", "49mm", "Custom", "Rugged"],
          ["MacBook 14", "14.2\"", "Sleeve", "Snug"]
        ],
        tips: "Ensure you select the exact model number. Our cases are crafted for zero-latency button response and heat dissipation."
      };
    }

    // Default / Perfumes / Others
    return {
      icon: <Droplets size={20} />,
      title: "Volume Guide",
      subtitle: "Fragrance & Care",
      headers: ["Volume", "Sprays", "Duration", "Type"],
      rows: [
        ["50ml", "~500", "2-3 Months", "Travel"],
        ["100ml", "~1000", "5-6 Months", "Signature"],
        ["200ml", "~2000", "12 Months", "Value"],
        ["10ml", "~100", "2-3 Weeks", "Discovery"]
      ],
      tips: "A standard 100ml bottle lasts approximately 6 months with daily use (3-5 sprays). Store in a cool, dark place to preserve the oud notes."
    };
  };

  const content = getGuideContent();

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-[1.5rem] p-5 md:p-7 overflow-y-auto max-h-[85vh] shadow-2xl animate-in zoom-in-95 duration-300 border border-amber-100/20">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-900 transition-colors bg-slate-50 rounded-full"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col items-center mb-5">
          <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mb-2">
            {content.icon}
          </div>
          <h2 className="text-xl font-bold luxury-font text-slate-900 text-center">{content.title}</h2>
          <p className="text-amber-600 font-bold text-[8px] uppercase tracking-[0.2em] mt-1">{content.subtitle}</p>
        </div>

        <div className="space-y-5">
          {/* Dynamic Table */}
          <div className="overflow-x-auto rounded-lg border border-slate-100 bg-white shadow-sm">
            <table className="w-full text-left border-collapse min-w-[300px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {content.headers.map((header, idx) => (
                    <th key={idx} className={`px-3 py-2 text-[9px] font-bold uppercase tracking-wider text-slate-400 ${idx === 0 ? 'pl-4' : ''}`}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-[10px] text-slate-600">
                {content.rows.map((row, rowIdx) => (
                  <tr key={rowIdx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className={`px-3 py-2 ${cellIdx === 0 ? 'font-bold text-slate-900 pl-4' : ''}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tips Section */}
          <div className="space-y-3">
            <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100">
              <div className="flex items-center space-x-2 mb-1.5 text-slate-900">
                <Info size={14} className="text-amber-600" />
                <h4 className="text-[9px] font-bold uppercase tracking-widest">Expert Advice</h4>
              </div>
              <p className="text-[9px] text-slate-500 leading-relaxed">
                {content.tips}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-[9px] uppercase tracking-[0.2em] hover:bg-amber-600 transition-all shadow-md active:scale-[0.98]"
          >
            I've Selected My Size
          </button>
        </div>
      </div>
    </div>
  );
};

export default SizeGuideModal;
