import React from 'react';
import ServiceCard from './ServiceCard';
import { services } from '../../assets/data/services';

const ServicesList = () => {
  // Logic-Safe: Keep the duplication for the infinite effect
  const infiniteServices = [...services, ...services]; 

  return (
    <section className="bg-[#0b1120] py-20 overflow-hidden">
      {/* Section Header */}
      <div className="container mx-auto px-4 lg:px-20 mb-12">
        <div className="flex flex-col items-center text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <span className="text-cyan-400 text-[10px] font-bold uppercase tracking-[0.3em]">System Capability: Active</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white">
            Specialized <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Medical Protocols</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl text-sm lg:text-base">
            Navigate through our high-performance diagnostic modules. Each protocol is optimized for speed, precision, and real-time data analysis.
          </p>
        </div>
      </div>

      {/* Infinite Scroll Container with Side Masks */}
      <div className="relative w-full">
        {/* Left & Right Gradient Masks (Glass/Fade effect) */}
        <div className="absolute top-0 left-0 h-full w-20 lg:w-40 bg-gradient-to-r from-[#0b1120] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-20 lg:w-40 bg-gradient-to-l from-[#0b1120] to-transparent z-10 pointer-events-none"></div>

        <style>
          {`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }

            .infinite-scroll {
              display: flex;
              overflow: hidden;
              position: relative;
              padding: 40px 0;
            }

            .scroll-track {
              display: flex;
              animation: scroll 45s linear infinite; 
              width: max-content;
            }

            .scroll-track:hover {
              animation-play-state: paused; /* Pause on hover for easier interaction */
            }

            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        <div className="infinite-scroll scrollbar-hide">
          <div className="scroll-track">
            {infiniteServices.map((item, index) => (
              <div key={index} className="px-6 lg:px-10">
                <ServiceCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Status Line */}
      <div className="mt-10 flex justify-center">
         <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Endless Protocol Stream Enabled</span>
         </div>
      </div>
    </section>
  );
};

export default ServicesList;