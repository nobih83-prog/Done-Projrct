
import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Github, Chrome, ArrowLeft, CheckCircle2 } from 'lucide-react';

export type AuthMode = 'login' | 'register' | 'forgot';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: AuthMode;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode }) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  if (!isOpen) return null;

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);
    
    // Simulate API call for login/register/forgot
    setTimeout(() => {
      setIsLoading(false);
      if (mode === 'forgot') {
        setStatus({ type: 'success', message: 'Recovery instructions sent to your email.' });
      } else {
        onClose();
      }
    }, 1800);
  };

  const handleSocialAuth = (provider: 'Google' | 'Apple') => {
    setIsLoading(true);
    setStatus(null);
    // Simulate social handshake
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 2000);
  };

  const renderForm = () => {
    if (status && mode === 'forgot') {
      return (
        <div className="text-center py-6 animate-in zoom-in-95">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="text-green-500" size={48} />
          </div>
          <p className="text-slate-600 text-sm mb-6">{status.message}</p>
          <button 
            onClick={() => { setStatus(null); setMode('login'); }}
            className="text-[10px] font-bold text-amber-600 uppercase tracking-widest hover:underline"
          >
            Return to Login
          </button>
        </div>
      );
    }

    return (
      <form onSubmit={handleEmailSubmit} className="w-full space-y-4">
        {mode === 'register' && (
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors" size={18} />
            <input 
              type="text" 
              required
              placeholder="Full Name"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all"
            />
          </div>
        )}

        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors" size={18} />
          <input 
            type="email" 
            required
            placeholder="Email Address"
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all"
          />
        </div>

        {mode !== 'forgot' && (
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors" size={18} />
            <input 
              type="password" 
              required
              placeholder="Password"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all"
            />
          </div>
        )}

        {mode === 'login' && (
          <div className="flex justify-end">
            <button 
              type="button" 
              onClick={() => setMode('forgot')}
              className="text-[10px] font-bold text-slate-400 hover:text-amber-600 uppercase tracking-widest transition-colors"
            >
              Forgot Password?
            </button>
          </div>
        )}

        <button 
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-amber-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center space-x-2 active:scale-95 disabled:opacity-70"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>
                {mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Reset Password'}
              </span>
              <ArrowRight size={14} />
            </>
          )}
        </button>

        {mode === 'forgot' && (
          <button 
            type="button"
            onClick={() => setMode('login')}
            className="w-full flex items-center justify-center space-x-2 text-slate-400 hover:text-slate-600 py-2 transition-colors"
          >
            <ArrowLeft size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Back to Login</span>
          </button>
        )}
      </form>
    );
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center mb-6 shadow-lg shadow-amber-200">
            <User className="text-white" size={32} />
          </div>

          <h2 className="text-3xl font-bold luxury-font text-slate-900 mb-2">
            {mode === 'login' ? 'Welcome Back' : mode === 'register' ? 'Join Nashwa' : 'Account Recovery'}
          </h2>
          <p className="text-amber-600 font-bold text-[10px] uppercase tracking-[0.3em] mb-8 text-center">
            {mode === 'login' ? 'The Art of Elegance Awaits' : mode === 'register' ? 'Begin Your Journey of Refinement' : 'Enter your email to receive reset link'}
          </p>
          
          {renderForm()}

          {mode !== 'forgot' && !status && (
            <>
              <div className="w-full mt-8 mb-6 flex items-center space-x-4">
                <div className="flex-1 h-px bg-slate-100" />
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Or Continue With</span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <button 
                  onClick={() => handleSocialAuth('Google')}
                  disabled={isLoading}
                  className="flex items-center justify-center space-x-2 py-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors active:scale-95 disabled:opacity-50"
                >
                  <div className="w-5 h-5 bg-white shadow-sm rounded-full flex items-center justify-center">
                    <Chrome size={14} className="text-red-500" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Google</span>
                </button>
                <button 
                  onClick={() => handleSocialAuth('Apple')}
                  disabled={isLoading}
                  className="flex items-center justify-center space-x-2 py-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors active:scale-95 disabled:opacity-50"
                >
                  <Github size={18} className="text-slate-900" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Apple</span>
                </button>
              </div>

              <p className="mt-8 text-[11px] text-slate-500">
                {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
                <button 
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  className="text-amber-600 font-bold uppercase tracking-wider hover:underline ml-1"
                >
                  {mode === 'login' ? 'Sign Up' : 'Log In'}
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
