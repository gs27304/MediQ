import React, { useState } from "react";
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "./DoctorAbout";
import Feedback from "./Feedback";
import SidePanel from "./SidePanel";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../Components/Loader/Loading";
import Error from "../../Components/Error/Error";
import { useParams } from "react-router-dom";

const DoctorDetails = () => {
  const [tab, setTab] = useState("about");
  const { id } = useParams();
  const {
    data: doctor,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors/${id}`);

  // Destructuring with fallback values for safety
  const {
    name,
    qualifications,
    experiences,
    timeSlots,
    reviews,
    bio,
    about,
    averageRating,
    specialization,
    totalRating,
    ticketPrice,
    photo,
  } = doctor || {};

  return (
    <section className="min-h-screen bg-[#0f172a] py-10">
      <div className="max-w-[1200px] px-6 mx-auto">
        {loading && <Loader />}
        {error && <Error />}

        {!loading && !error && doctor && (
          <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
            
            {/* Primary Profile Section */}
            <div className="md:col-span-2">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 bg-[#1e293b] p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
                
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-3xl rounded-full"></div>

                <figure className="w-full max-w-[220px] shrink-0">
                  <img 
                    src={photo} 
                    className="w-full h-auto rounded-2xl border-4 border-slate-900 shadow-xl object-cover ring-2 ring-indigo-500/20" 
                    alt="Doctor" 
                  />
                </figure>

                <div className="text-center sm:text-left flex-1">
                  <span className="inline-block bg-cyan-900/40 text-cyan-400 py-1.5 px-5 rounded-full text-xs font-black uppercase tracking-widest border border-cyan-800/50 mb-4">
                    {specialization} Specialist
                  </span>
                  
                  <h3 className="text-slate-100 text-3xl font-black tracking-tight leading-tight">
                    Dr. {name}
                  </h3>

                  <div className="flex items-center justify-center sm:justify-start gap-3 mt-3 mb-5">
                    <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 shadow-inner">
                      <img src={starIcon} alt="Rating" className="w-4 h-4" />
                      <span className="text-slate-100 text-sm font-bold">
                        {averageRating}
                      </span>
                    </div>
                    <span className="text-slate-400 text-sm font-medium tracking-wide">
                      ({totalRating} Patient Testimonials)
                    </span>
                  </div>

                  <p className="text-slate-400 text-base leading-relaxed italic border-l-2 border-slate-700 pl-4">
                    "{bio}"
                  </p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="mt-12 flex items-center gap-2 border-b border-slate-800">
                <button
                  onClick={() => setTab("about")}
                  className={`relative py-4 px-8 text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
                    tab === "about"
                      ? "text-indigo-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-indigo-500 after:rounded-t-full shadow-[0_10px_20px_-10px_rgba(99,102,241,0.3)]"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  Expert Overview
                </button>
                <button
                  onClick={() => setTab("feedback")}
                  className={`relative py-4 px-8 text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
                    tab === "feedback"
                      ? "text-indigo-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-indigo-500 after:rounded-t-full shadow-[0_10px_20px_-10px_rgba(99,102,241,0.3)]"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  Patient Feedback
                </button>
              </div>

              {/* Dynamic Content Area */}
              <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {tab === "about" && (
                  <DoctorAbout
                    name={name}
                    about={about}
                    qualifications={qualifications}
                    experiences={experiences}
                  />
                )}
                {tab === "feedback" && (
                  <div className="bg-[#1e293b] p-8 rounded-3xl border border-slate-800 shadow-xl">
                    <Feedback reviews={reviews} totalRating={totalRating} />
                  </div>
                )}
              </div>
            </div>

            {/* Sticky Side Booking Panel */}
            <div className="relative">
              <div className="sticky top-10">
                <SidePanel
                  doctorId={doctor._id}
                  ticketPrice={ticketPrice}
                  timeSlots={timeSlots}
                />
                
                {/* Trust Badge for Indian Patients */}
                <div className="mt-6 p-4 bg-slate-900/50 rounded-2xl border border-slate-800 flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                   </div>
                   <div>
                     <p className="text-slate-200 text-xs font-black uppercase tracking-wider">Verified Profile</p>
                     <p className="text-slate-500 text-[10px] font-medium leading-tight">MCI Registered Practitioner</p>
                   </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorDetails;