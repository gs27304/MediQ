import React from "react";
import hero from "../assets/images/hero.png";
import hero2 from "../assets/images/hero2.png";
import sicon1 from "../assets/images/Clinical-Computer.jpg";
import sicon2 from "../assets/images/accurate.jpg";
import sicon3 from "../assets/images/report.png";
import sicon4 from "../assets/images/expert.jpg";
import icon1 from "../assets/images/icon01.png";
import icon2 from "../assets/images/location.png";
import icon3 from "../assets/images/icon03.png";
import faq from "../assets/images/faq2.png";
import feature1 from "../assets/images/features1.png";
import videoIcon from "../assets/images/video-icon.png";
import user from "../assets/images/user.png";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowRightCircle, BsCameraVideo, BsShieldCheck } from "react-icons/bs";
import { FaMicroscope, FaUsers, FaUserMd } from "react-icons/fa";
import About from "../Components/About/About";
import ServicesList from "../Components/Services/ServicesList";
import FaqList from "../Components/Faq/FaqList";
import TestimonialComponent from "../Components/Testimonials/Testimonials";
import { motion } from "framer-motion";
import News from "../Components/Blog/News";

const Home = () => {
  const navigate = useNavigate();

  const fireBreadcrumbTracking = (type) => {
    const _dl = {
      event: "web.webInteractions.linkClicks",
      siteSection: { level1: "home", level2: "hero", level3: "navigation" },
      siteBrand: "healthe",
      pageName: type,
      siteName: "doctor appointment",
      clickhref: type,
    };

    if (type === "direct call") {
      if (window._satellite && typeof window._satellite.track === "function") {
        window._satellite.track("breadcrumb", _dl);
      }
    }

    if (type === "custom event") {
      window.dispatchEvent(new CustomEvent("breadcrumbClick", { detail: { _dl } }));
    }
  };

  const handleRequestAppointment = () => {
    fireBreadcrumbTracking("direct call");
    navigate("/doctors");
  };

  const handleCardClick = (path) => {
    fireBreadcrumbTracking("custom event");
    navigate(path);
  };

  return (
    <div className="bg-[#0f172a] text-slate-200 overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-32 border-b border-slate-800 bg-[#1e293b]/30">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-[1440px] px-8 mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center justify-between">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full mb-6">
                <BsShieldCheck className="text-indigo-400" />
                <span className="text-indigo-400 text-xs font-black uppercase tracking-widest">Aadhaar Verified Network</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-black text-slate-100 leading-tight mb-6 tracking-tight">
                Holistic Healthcare <br /> 
                <span className="text-indigo-500 italic">Redefined.</span>
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-xl">
                Health-E is Bharat's pioneering medical ecosystem. Connect with top-rated 
                specialists across the country via virtual clinics or physical visits. 
                Experience a modern, user-friendly approach to complete wellness.
              </p>
              <button onClick={handleRequestAppointment} className="group relative bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-2xl font-black text-lg transition-all shadow-2xl shadow-indigo-900/40 flex items-center gap-3">
                Book Consultation
                <BsArrowRightCircle className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="flex gap-8 lg:w-1/2 justify-end">
              <div className="relative group">
                <img className="w-64 h-80 object-cover rounded-3xl border-4 border-slate-800 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]" src={hero} alt="Doctor" />
                <div className="absolute -bottom-6 -left-6 bg-slate-900 border border-slate-700 p-4 rounded-2xl shadow-2xl flex items-center gap-3">
                  <div className="bg-indigo-500/20 p-2 rounded-lg"><FaUsers className="text-indigo-400" /></div>
                  <div>
                    <p className="text-xl font-black text-slate-100">10K+</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Happy Indians</p>
                  </div>
                </div>
              </div>
              <div className="mt-12 relative group">
                <img className="w-64 h-80 object-cover rounded-3xl border-4 border-slate-800 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]" src={hero2} alt="Expert" />
                <div className="absolute -top-6 -right-6 bg-slate-900 border border-slate-700 p-4 rounded-2xl shadow-2xl flex items-center gap-3">
                   <div className="bg-emerald-500/20 p-2 rounded-lg"><FaUserMd className="text-emerald-400" /></div>
                   <div>
                    <p className="text-xl font-black text-slate-100">5K+</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Verified Experts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- QUICK ACTION CARDS --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-black text-slate-100 tracking-tight mb-4">India's Smartest Medical Services</h2>
            <p className="text-slate-500 max-w-xl mx-auto font-medium">World-class diagnostic and clinical care at your fingertips.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: icon1,
                title: "Find a Specialist",
                description: `Connect with Aadhaar-verified doctors for physical examinations or rapid online consultations across all specialities.`,
                link: "/doctors",
                clickIcon: <BsArrowRightCircle className="w-8 h-8 text-indigo-400" />,
              },
              {
                icon: icon2,
                title: "Neural AI Diagnostics",
                description: `Detect Brain Tumors, Alzheimer's, and Hemorrhages instantly using our advanced AI models. Precision diagnostics for Bharat.`,
                link: "/mri-diagnosis",
                clickIcon: <FaMicroscope className="w-8 h-8 text-indigo-400" />,
                latest: true,
              },
              {
                icon: icon3,
                title: "Virtual OPD",
                description: `Skip the queue. Consult top specialists from your home via encrypted high-definition video calls and instant chat.`,
                link: "/doctors",
                clickIcon: <BsCameraVideo className="w-8 h-8 text-indigo-400" />,
              },
            ].map((item, index) => (
              <div
                onClick={() => handleCardClick(item.link)}
                key={index}
                className="cursor-pointer group relative bg-[#1e293b] p-10 rounded-[2.5rem] border border-slate-800 hover:border-indigo-500/50 transition-all shadow-xl hover:-translate-y-2"
              >
                {item.latest && (
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-indigo-600 to-indigo-400 text-white text-[10px] font-black uppercase px-4 py-2 rounded-full shadow-lg animate-pulse tracking-widest">
                    Live Now
                  </div>
                )}
                <div className="bg-slate-900 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 border border-slate-800">
                  <img src={item.icon} alt="" className="w-12 h-12 grayscale brightness-150 group-hover:grayscale-0 transition-all" />
                </div>
                <h3 className="text-2xl font-black text-slate-100 mb-4 tracking-tight">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">{item.description}</p>
                <div className="flex items-center justify-end">{item.clickIcon}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- AI PROMO SECTION --- */}
      <section className="py-24 bg-slate-900/50 border-y border-slate-800">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl lg:text-5xl font-black text-slate-100 leading-tight mb-6">Neural MRI Analysis for Faster Recovery</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed italic">
              "Detecting neurological irregularities with 99% precision using our proprietary Neural-Net models."
            </p>
            <button onClick={() => handleCardClick("/mri-diagnosis")} className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-black transition-all">
              Launch Diagnostic Sandbox
            </button>
          </div>
          <div className="lg:w-1/2 relative group">
            <img src={sicon1} alt="AI" className="rounded-[2.5rem] border-4 border-slate-800 shadow-2xl opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-indigo-500/10 rounded-[2.5rem] pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* --- SERVICES & FEATURES --- */}
      <section className="py-24">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12">
          {[
            { img: sicon2, t: "Accurate Results", d: "High-resolution neural processing for clinical-grade precision." },
            { img: sicon3, t: "Instant Reports", d: "Zero wait time. Automated report generation for rapid triage." },
            { img: sicon4, t: "Expert Oversight", d: "Verified radiologists to validate complex neural findings." }
          ].map((feat, i) => (
            <div key={i} className="text-center p-8 bg-[#1e293b]/50 rounded-3xl border border-slate-800/50">
              <img src={feat.img} className="w-16 h-16 mx-auto mb-6 rounded-xl grayscale" />
              <h3 className="text-xl font-bold text-slate-100 mb-2 uppercase tracking-tight">{feat.t}</h3>
              <p className="text-slate-500 text-sm">{feat.d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-slate-900 py-16">
        <ServicesList />
      </div>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 bg-[#0f172a]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <div className="md:w-1/2 sticky top-20">
               <h2 className="text-4xl lg:text-6xl font-black text-slate-100 mb-8 tracking-tighter italic">FAQ.</h2>
               <img src={faq} alt="FAQ" className="rounded-3xl opacity-50 grayscale" />
            </div>
            <div className="md:w-1/2 bg-[#1e293b] p-8 lg:p-12 rounded-[2.5rem] border border-slate-800 shadow-2xl">
              <FaqList />
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-24 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-100 uppercase tracking-widest">Citizen Feedback</h2>
            <p className="text-slate-500 mt-2">Real experiences from our Indian health network.</p>
          </div>
          <div className="bg-slate-900/50 p-10 rounded-[3rem] border border-slate-800/50 shadow-inner">
            <TestimonialComponent />
          </div>
        </div>
      </section>

      {/* --- BLOG SECTION --- */}
      <section className="py-24 bg-[#1e293b]/20">
        <div className="container mx-auto px-6 text-center mb-12">
          <h2 className="text-4xl font-black text-slate-100 tracking-tight">Global Medical Insights</h2>
          <p className="text-slate-500 mt-4 italic">"Svaasthya hi sabse bada dhan hai." — Health is the greatest wealth.</p>
        </div>
        <div className="container mx-auto px-6">
          <News />
        </div>
      </section>

      <About />
    </div>
  );
};

export default Home;