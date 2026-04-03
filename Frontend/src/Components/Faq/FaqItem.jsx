import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const FaqItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div 
      className={`p-4 lg:p-6 rounded-2xl border transition-all duration-500 cursor-pointer mb-5 ${
        isOpen 
        ? "bg-cyan-500/5 border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.1)]" 
        : "bg-white/5 border-white/10 hover:border-white/20"
      }`}
      onClick={toggleAccordion}
    >
      <div className="flex items-center justify-between gap-5">
        <h4 className={`text-base lg:text-lg font-bold leading-7 lg:leading-8 transition-colors duration-300 ${
          isOpen ? "text-cyan-400" : "text-white"
        }`}>
          {item.question}
        </h4>
        
        <div
          className={`w-8 h-8 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
            isOpen 
            ? "bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)] rotate-180" 
            : "bg-white/10 text-gray-400 border border-white/10"
          }`}
        >
          {isOpen ? <AiOutlineMinus size={18} /> : <AiOutlinePlus size={18} />}
        </div>
      </div>

      {isOpen && (
        <div className="mt-5 pt-5 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-medium text-gray-400">
            {item.content}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div className="h-[2px] w-4 bg-cyan-500/50"></div>
            <span className="text-[10px] text-cyan-500/70 uppercase tracking-widest font-bold">MediQ Verified Protocol</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaqItem;