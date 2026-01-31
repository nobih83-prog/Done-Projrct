
import React from 'react';
import { X, Lock, FileText, Mail, MapPin, Phone, Clock, MessageCircle } from 'lucide-react';

export type LegalType = 'privacy' | 'terms' | 'contact';

interface LegalModalProps {
  type: LegalType | null;
  onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const content = {
    privacy: {
      icon: <Lock className="text-amber-600 mb-6" size={48} />,
      title: "Privacy Policy",
      subtitle: "Securing your personal elegance",
      sections: [
        {
          heading: "Information Collection",
          text: "We collect personal information such as name, address, and payment details solely to facilitate your luxury shopping experience."
        },
        {
          heading: "Data Protection",
          text: "Your data is encrypted using state-of-the-art SSL technology. We never share your personal information with third parties for marketing purposes."
        },
        {
          heading: "Cookie Policy",
          text: "We use cookies to enhance navigation and provide a personalized concierge experience via our AI assistant."
        }
      ]
    },
    terms: {
      icon: <FileText className="text-amber-600 mb-6" size={48} />,
      title: "Terms of Service",
      subtitle: "The Nashwa Standard",
      sections: [
        {
          heading: "Intellectual Property",
          text: "All content, designs, and curated selections on Nashwa are protected by copyright laws. Unauthorized reproduction is strictly prohibited."
        },
        {
          heading: "Product Representation",
          text: "We strive for absolute accuracy in photography and descriptions. Note that natural variations may occur in high-end materials."
        },
        {
          heading: "Governing Law",
          text: "These terms are governed by the laws of the People's Republic of Bangladesh. Disputes are handled via our designated arbitration process."
        }
      ]
    },
    contact: {
      icon: <Mail className="text-amber-600 mb-6" size={48} />,
      title: "Contact & Concierge",
      subtitle: "Personalized assistance, always",
      sections: [
        {
          heading: "Headquarters",
          icon: <MapPin size={16} className="text-amber-600 mr-2" />,
          text: "Manikdi, Namapara, Dhaka Cantonment, Dhaka",
          href: "https://maps.google.com/?q=Manikdi,Namapara,Dhaka+Cantonment"
        },
        {
          heading: "WhatsApp Chat",
          icon: <MessageCircle size={16} className="text-green-600 mr-2" />,
          text: "Chat with us on WhatsApp",
          href: "https://wa.me/8801718952852"
        },
        {
          heading: "Digital Concierge",
          icon: <Mail size={16} className="text-amber-600 mr-2" />,
          text: "Nobih83@gmail.com",
          href: "mailto:Nobih83@gmail.com"
        },
        {
          heading: "Direct Line",
          icon: <Phone size={16} className="text-amber-600 mr-2" />,
          text: "01718952852",
          href: "tel:01718952852"
        },
        {
          heading: "Business Hours",
          icon: <Clock size={16} className="text-amber-600 mr-2" />,
          text: "Saturday — Thursday: 10:00 AM - 09:00 PM"
        }
      ]
    }
  };

  const active = content[type];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] p-8 md:p-12 overflow-y-auto max-h-[90vh] shadow-2xl animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center">
          {active.icon}
          <h2 className="text-3xl font-bold luxury-font text-slate-900 mb-2">{active.title}</h2>
          <p className="text-amber-600 font-bold text-[10px] uppercase tracking-[0.3em] mb-10">{active.subtitle}</p>
          
          <div className="w-full space-y-8">
            {active.sections.map((section, i) => (
              <div key={i} className="border-b border-slate-50 pb-6 last:border-0">
                <div className="flex items-center mb-2">
                  {section.icon}
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900">{section.heading}</h3>
                </div>
                {section.href ? (
                  <a 
                    href={section.href} 
                    target={section.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="text-sm text-amber-600 hover:text-amber-700 transition-colors font-medium underline-offset-4 hover:underline"
                  >
                    {section.text}
                  </a>
                ) : (
                  <p className="text-sm text-slate-500 leading-relaxed font-light">
                    {section.text}
                  </p>
                )}
              </div>
            ))}
          </div>

          <button 
            onClick={onClose}
            className="mt-10 w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-amber-600 transition-all shadow-lg shadow-slate-100"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
