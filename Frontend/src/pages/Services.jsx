import React from 'react'
import { services } from '../assets/data/services';
import ServiceCard from '../Components/Services/ServiceCard';

const Services = () => {
  return (
    <section className="bg-[#0f172a] py-20 min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* Localized Header Section */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-black text-slate-100 tracking-tight mb-4">
            Specialized <span className="text-indigo-500">Medical Care</span>
          </h2>
          <p className="text-slate-400 font-medium leading-relaxed">
            Health-E Bharat offers a comprehensive suite of digital and physical healthcare 
            services tailored for the modern Indian lifestyle.
          </p>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((item, index) => (
            <ServiceCard item={item} index={index} key={index} />
          ))}
        </div>

        {/* Support Micro-copy */}
        <div className="mt-20 pt-10 border-t border-slate-800 text-center">
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.4em]">
            Verified Healthcare Services • Trusted Across India
          </p>
        </div>
      </div>
    </section>
  )
}

export default Services