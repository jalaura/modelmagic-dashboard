
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { AuthService } from '../authService';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('sending');
    
    // Simulate magic link flow
    setTimeout(async () => {
      try {
        await AuthService.sendMagicLink(email)
        setStatus('success');
      } catch (error) {
        setStatus('error');
      }
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-[#F5F3F0] flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full p-8 rounded-xl border border-[#E5E7EB] shadow-lg text-center animate-fadeIn">
          <div className="w-16 h-16 bg-[#22C55E]/10 text-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={32} />
          </div>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">Magic Link Sent!</h2>
          <p className="text-[#6B7280] mb-8">
            Check your email for the login link. <br/>
            (Simulation: You are logged in)
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-[#1F6B55] text-white py-3 rounded-md font-bold hover:bg-[#164f3f] transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F3F0] flex items-center justify-center p-4 font-sans">
      <div className="bg-white max-w-md w-full p-8 rounded-xl border border-[#E5E7EB] shadow-sm">
        <div className="text-center mb-8">
          <div className="w-10 h-10 bg-[#1F6B55] rounded-md flex items-center justify-center shadow-sm mx-auto mb-4">
            <span className="text-white text-xl font-bold">M</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Welcome to ModelMagic</h1>
          <p className="text-[#6B7280] mt-2">Enter your email to sign in or create an account.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full px-4 py-3 rounded-md border border-[#E5E7EB] bg-[#F9FAFB] focus:bg-white focus:ring-2 focus:ring-[#1F6B55] outline-none transition-all text-[#1A1A1A]"
              required
            />
          </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-[#1A1A1A] text-white py-3 rounded-md font-bold hover:bg-black transition-colors flex items-center justify-center"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  Send Magic Link <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#E5E7EB] text-center">
            <p className="text-xs text-[#9CA3AF] mb-4 uppercase tracking-wider font-bold">Demo Accounts</p>
            <div className="space-y-2 text-sm text-[#6B7280]">
              <div onClick={() => setEmail('sarah@luxeboutique.com')} className="cursor-pointer hover:text-[#1F6B55]">Click to use: sarah@luxeboutique.com</div>
              <div onClick={() => setEmail('admin@modelmagic.com')} className="cursor-pointer hover:text-[#1F6B55]">Admin: admin@modelmagic.com</div>
              <div onClick={() => setEmail('jessica@modelmagic.com')} className="cursor-pointer hover:text-[#1F6B55]">Editor: jessica@modelmagic.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
