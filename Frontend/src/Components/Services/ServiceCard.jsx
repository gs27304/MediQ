import React from 'react';

const ServiceCard = ({ item }) => {
  return (
    <div className="group flex flex-col items-center p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-500 hover:bg-cyan-500/5 hover:border-cyan-500/50 hover:-translate-y-3 hover:shadow-[0_20px_50px_-20px_rgba(6,182,212,0.3)] cursor-pointer">
      
      {/* Neural Scan Icon Wrapper */}
      <div className="relative flex items-center justify-center">
        
        {/* Animated Outer Pulse Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 scale-110 group-hover:scale-125 group-hover:border-cyan-500/50 transition-all duration-700 animate-pulse"></div>
        
        {/* Scanning Image Container */}
        <div
          className="relative rounded-full border-4 border-white/10 group-hover:border-cyan-400 shadow-2xl overflow-hidden transition-all duration-500"
          style={{
            backgroundImage: `url(${item.img})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat', 
            width: '160px', 
            height: '160px', 
          }}
        >
          {/* Glass Overlay on Image */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0b1120]/40 to-transparent opacity-60"></div>
          
          {/* Scanning Line Effect */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/50 shadow-[0_0_15px_cyan] opacity-0 group-hover:opacity-100 animate-[scan_2s_linear_infinite]"></div>
        </div>
      </div>

      {/* Logic-Safe Labeling */}
      <div className="mt-8 text-center">
        <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-[0.3em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          Module Active
        </p>
        <h3 className="text-xl lg:text-2xl font-extrabold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-300">
          {item.name}
        </h3>
        
        <div className="mt-4 h-[2px] w-0 group-hover:w-12 bg-cyan-500 mx-auto transition-all duration-500 rounded-full"></div>
      </div>

      {/* Custom Keyframes for the "Scan" animation */}
      <style jsx>{`
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
};

export default ServiceCard;