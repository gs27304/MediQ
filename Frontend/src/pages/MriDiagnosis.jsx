import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import sicon1 from "../assets/images/Tumor.jpg";
import sicon2 from "../assets/images/alzimer.jpg";
import sicon3 from "../assets/images/Hammourage.jpg";
import { FaRobot, FaHandsHelping, FaBullseye, FaMicroscope } from "react-icons/fa";
/* FIXED: Changed BiShieldCheck to BiShield which is the correct export name */
import { BiChevronRight, BiShield } from "react-icons/bi";

const MRIDiagnosis = () => {
  const [showSecondPage, setShowSecondPage] = useState(false);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  
  const handleCardClick = (path) => {
    navigate(path);
  };

  const steps = [
    "Patient Data Input",
    "Neural Pre-processing",
    "Brain Segmentation",
    "AI Feature Extraction",
    "Neural Classification",
    "Diagnostic Generation",
  ];

  const handleExploreClick = () => {
    setShowSecondPage(true);
    setTimeout(() => {
      const element = document.getElementById("secondPage");
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="bg-[#0f172a] text-slate-200">
      {/* --- PREMIUM WELCOME HERO --- */}
      <section className="min-h-screen bg-[#1e293b]/30 flex flex-col justify-center items-center px-6 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-600/5 rounded-full blur-[100px]"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full mb-8">
            {/* FIXED: Using BiShield here */}
            <BiShield className="text-indigo-400" />
            <span className="text-indigo-400 text-xs font-black uppercase tracking-widest">Bharat Digital Health Mission Compliant</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black text-slate-100 mb-6 tracking-tight leading-tight">
            Advanced Neural <br /> <span className="text-indigo-500">Diagnostic Suite</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            From seamless Aadhaar-linked bookings to AI-powered MRI analysis, 
            we empower Indian healthcare with clinical-grade precision tools.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              className="bg-indigo-600 text-white font-black px-8 py-4 rounded-2xl shadow-2xl shadow-indigo-900/40 hover:bg-indigo-500 transition-all flex items-center gap-2"
              onClick={() => navigate("/doctors")}
            >
              Book Physical OPD <BiChevronRight className="text-xl" />
            </button>
            <button
              className="bg-slate-800 text-slate-200 font-bold px-8 py-4 rounded-2xl border border-slate-700 hover:bg-slate-700 transition-all"
              onClick={() => navigate("/doctors")}
            >
              Virtual Clinic
            </button>
            <button
              onClick={handleExploreClick}
              className="bg-emerald-600 text-white font-black px-8 py-4 rounded-2xl shadow-2xl shadow-emerald-900/40 hover:bg-emerald-500 transition-all flex items-center gap-2"
            >
              Launch AI Sandbox <FaMicroscope className="ml-1" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* --- EXPLORATION SECTION --- */}
      <AnimatePresence>
        {showSecondPage && (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            id="secondPage" 
            className="py-24 bg-[#0f172a]"
          >
            <div className="container mx-auto px-6 text-center mb-24">
              <h2 className="text-3xl lg:text-5xl font-black text-slate-100 mb-6 tracking-tight">
                Why Doctors Trust MedIQ
              </h2>
              <div className="grid gap-8 grid-cols-1 md:grid-cols-3 mt-16">
                {[
                  { icon: <FaBullseye />, t: "Clinical Precision", d: "Neural-Net models achieving 98.4% diagnostic accuracy.", c: "text-emerald-400" },
                  { icon: <FaHandsHelping />, t: "Scalable Outreach", d: "Trusted by medical professionals across India.", c: "text-indigo-400" },
                  { icon: <FaRobot />, t: "Deep AI Integration", d: "Cutting-edge segmentation for complex brain morphology.", c: "text-cyan-400" }
                ].map((item, i) => (
                  <div key={i} className="p-10 bg-[#1e293b] rounded-[2rem] border border-slate-800 shadow-xl hover:border-indigo-500/30 transition-all">
                    <div className={`${item.c} text-5xl mb-6 flex justify-center`}>{item.icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-slate-100 uppercase tracking-tight">{item.t}</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Sandbox Demo */}
            <div className="container mx-auto px-6 mb-32">
              <div className="bg-slate-900/50 p-1 rounded-[3rem] border border-slate-800 shadow-inner">
                <div className="bg-[#1e293b] rounded-[2.8rem] p-12 text-center relative overflow-hidden">
                  <h2 className="text-3xl font-black text-slate-100 mb-4 tracking-tight">Neural Processing Sandbox</h2>
                  <div className="relative mx-auto w-full max-w-2xl h-80 bg-[#0f172a] rounded-3xl shadow-2xl border border-slate-700 overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 w-1/2 h-full bg-indigo-500/10 border-r border-indigo-400/50 shadow-[20px_0_40px_-20px_rgba(129,140,248,0.5)]"
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "linear",
                      }}
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center z-10 px-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
                        <h3 className="text-xl font-black text-slate-100 tracking-widest uppercase">Analyzing Voxel Data</h3>
                      </div>
                      <div className="bg-[#1e293b]/80 backdrop-blur-md px-8 py-4 rounded-2xl border border-slate-700">
                        <motion.p
                          key={currentStep}
                          className="text-lg font-black text-indigo-400 uppercase tracking-wider"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          Step 0{currentStep + 1}: {steps[currentStep]}
                        </motion.p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-600 py-16 text-center">
              <h2 className="text-2xl lg:text-4xl text-white font-black tracking-tight px-4">
                Redefine Patient Care with Precision Diagnostics.
              </h2>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MRIDiagnosis;