import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const CheckoutSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f172a] px-4">
      {/* Premium Glassmorphic Card */}
      <div className="bg-[#1e293b] p-10 rounded-[2rem] border border-slate-800 shadow-2xl max-w-md w-full relative overflow-hidden">
        
        {/* Subtle Background Accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl"></div>
        
        <div className="flex flex-col items-center relative z-10">
          {/* Animated Success Icon */}
          <div className="bg-emerald-500/10 p-4 rounded-full mb-6 ring-8 ring-emerald-500/5 animate-bounce-slow">
            <AiOutlineCheckCircle className="text-emerald-400 text-7xl" />
          </div>

          <h1 className="text-3xl font-black text-slate-100 mb-3 tracking-tight text-center">
            Booking Confirmed!
          </h1>
          
          <p className="text-slate-400 text-center leading-relaxed mb-8">
            Shukriya! Your payment was received successfully. We have sent the digital receipt and appointment details to your registered mobile number and email.
          </p>

          {/* Transaction Summary Placeholder */}
          <div className="w-full bg-[#0f172a]/50 rounded-2xl p-4 mb-8 border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Status</span>
              <span className="text-emerald-400 text-xs font-black uppercase tracking-widest">Paid via UPI/Card</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Ref No.</span>
              <span className="text-slate-300 text-xs font-mono">TXN_HEALTH_9921</span>
            </div>
          </div>

          <div className="flex flex-col w-full gap-3">
            <Link 
              to="/home" 
              className="w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-xl transition-all shadow-xl shadow-indigo-900/40"
            >
              Go to Dashboard
            </Link>
            
            <button className="text-slate-500 hover:text-slate-300 text-sm font-bold transition-all py-2">
              Download E-Receipt (PDF)
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Footer Context */}
      <p className="mt-10 text-slate-600 text-xs font-medium tracking-widest uppercase">
        Securely processed by MediQ India
      </p>
    </div>
  );
};

export default CheckoutSuccess;