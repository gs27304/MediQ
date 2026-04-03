import React from 'react';
import about from "../../assets/images/about.png";
import about2 from "../../assets/images/about2.png";
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section className="bg-[#0b1120] py-16 px-6 lg:px-20">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
        
        {/* Left Side: Image Section with Glassmorphism Overlay */}
        <div className="relative lg:w-1/2 w-full flex justify-center lg:justify-start">
          <div className="relative group">
            {/* Subtle Glow behind image */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            
            <img 
              src={about} 
              alt="Medical Technology" 
              className="relative rounded-xl shadow-2xl w-full max-w-[480px] border border-white/10 grayscale-[20%] hover:grayscale-0 transition-all duration-500" 
            />

            {/* CEO Quote Card - Glassmorphism style */}
            <div className="absolute z-20 -bottom-6 -right-4 lg:bottom-8 lg:-right-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6 w-[240px] hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-3">
                <img src={about2} alt="CEO" className="w-12 h-12 rounded-full border-2 border-cyan-400" />
                <div>
                  <h2 className="text-sm font-bold text-white leading-tight">Gajendra Singh</h2>
                  <p className="text-[10px] text-cyan-400 uppercase tracking-widest">Founder, MediQ</p>
                </div>
              </div>
              <p className="text-gray-300 text-xs italic leading-relaxed">
                "We aren't just booking appointments; we are building the neural network of modern healthcare."
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Content Section */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 w-fit mb-4">
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em]">Our Vision</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-6 leading-tight">
            Redefining Healthcare with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Intelligent Systems</span>
          </h2>

          <div className="space-y-6">
            <p className="text-gray-400 text-base lg:text-lg leading-relaxed">
              MediQ is an elite, full-stack ecosystem designed to eliminate the friction in patient-doctor connectivity. By merging <span className="text-white font-medium">MERN stack</span> reliability with cutting-edge <span className="text-white font-medium">AI diagnostics</span>, we empower you to take control of your health journey from anywhere in the world.
            </p>

            <p className="text-gray-400 text-base lg:text-lg leading-relaxed">
              Whether it’s a virtual consultation or an advanced <span className="text-cyan-400">MRI Analysis</span>, our platform uses smart discovery algorithms to ensure you find the exact expertise you need, when you need it.
            </p>

            <div className="grid grid-cols-2 gap-4 py-4">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                  <span className="text-sm text-gray-300">AI Symptom Checker</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-300">Encrypted Reports</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                  <span className="text-sm text-gray-300">Smart Scheduling</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-300">Global Connectivity</span>
               </div>
            </div>
          </div>

          <div className="mt-8">
            <Link to='/services'>
              <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transform hover:-translate-y-1 transition-all duration-300">
                Explore Technology
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;