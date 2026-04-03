import React from "react";
import { motion } from "framer-motion";

const AIDemo = () => {
  return (
    <section className="bg-[#0f172a] py-20 border-y border-slate-800 relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-600/5 blur-[120px] rounded-full"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.h2
          className="text-4xl lg:text-5xl font-black text-slate-100 mb-6 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Neural Intelligence for <span className="text-indigo-400">Advanced Diagnosis</span>
        </motion.h2>
        
        <motion.p
          className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Harnessing Bharat-centric AI models trained to identify Brain Tumors, Alzheimer’s, 
          and Hemorrhages with precision. Empowering Indian doctors with rapid Neuro-Imaging insights.
        </motion.p>

        <motion.div
          className="relative w-full lg:w-4/5 mx-auto h-[400px] bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-700/50 group"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Main Visual */}
          <motion.img
            src="https://cdn.pixabay.com/photo/2020/04/01/10/56/ai-4988026_1280.jpg"
            alt="AI Diagnostic Interface"
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 1, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Precision Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-[#0f172a]/40" />
          
          {/* Scanning Line Animation */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-[2px] bg-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.8)] z-20"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute bottom-0 left-0 w-full p-10 text-left"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-2">
               <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
               <h3 className="text-slate-100 text-2xl font-black tracking-tight">Precision MRI Scan Analysis</h3>
            </div>
            <p className="text-slate-400 font-medium">Real-time Automated Report Generation & Feature Extraction</p>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <button className="relative group overflow-hidden bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-2xl font-black text-lg transition-all shadow-2xl shadow-indigo-900/40">
            <span className="relative z-10 flex items-center gap-3">
              Launch Diagnostic Sandbox
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
            </span>
          </button>
          
          <p className="text-slate-600 text-[10px] mt-4 font-bold uppercase tracking-[0.3em]">
            Approved for Research & Educational Clinical Use
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AIDemo;