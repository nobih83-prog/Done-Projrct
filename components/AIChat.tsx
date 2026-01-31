
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Sparkles } from 'lucide-react';
import { geminiService } from '../services/gemini';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I am your Luxury Concierge. How can I help you find something exquisite today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const response = await geminiService.sendMessage(userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "I'm having a spot of trouble connecting. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-[60]">
      {/* Chat Window */}
      {isOpen ? (
        <div className="bg-white w-[calc(100vw-2rem)] md:w-[380px] h-[60vh] md:h-[600px] rounded-3xl shadow-2xl flex flex-col border border-slate-100 animate-in slide-in-from-bottom-4 duration-300 overflow-hidden">
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold text-xs uppercase tracking-widest">Luxury Concierge</h3>
                <div className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-[9px] opacity-70 uppercase tracking-tighter">Available Now</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-slate-900 text-white rounded-br-none shadow-md' 
                    : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-slate-100 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-5 border-t border-slate-100 bg-white">
            <div className="relative flex items-center space-x-2">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Message your concierge..."
                className="flex-1 pl-4 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="p-3 bg-slate-900 text-white rounded-xl disabled:opacity-50 hover:bg-amber-600 transition-all flex-shrink-0"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-3 p-4 px-6 gradient-gold text-white rounded-full shadow-2xl hover:scale-105 transition-all group border-2 border-white/20"
        >
          <div className="relative">
            <Sparkles className="animate-pulse" size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full border border-white" />
          </div>
          <span className="font-bold tracking-widest uppercase text-[10px]">Concierge</span>
          <MessageSquare className="group-hover:rotate-12 transition-transform" size={18} />
        </button>
      )}
    </div>
  );
};

export default AIChat;