import React, { useState, useEffect } from "react";
import Loader from "../../Components/Loader/Loading";
import Error from "../../Components/Error/Error";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Tabs from "./Tabs";
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "../../pages/Doctors/DoctorAbout";
import Profile from "./Profile";
import Appointments from "./Appointments";

const Dashbord = () => {
  const { data, loading, error, fetchData } = useFetchData(
    `${BASE_URL}/doctors/profile/me`
  );

  const [tab, setTab] = useState("overview");

  useEffect(() => {
    if (!data) {
      fetchData();
    }
  }, [data, fetchData]);

  return (
    <section className="min-h-screen bg-[#0f172a] py-12">
      <div className="max-w-[1280px] px-6 mx-auto">
        {loading && !error && <Loader />}
        {error && !loading && <Error />}
        {!loading && !error && data && (
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
               <Tabs tab={tab} setTab={setTab} />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 bg-[#1e293b] rounded-2xl p-6 lg:p-10 shadow-2xl border border-slate-700/50">
              
              {/* Verification Alert */}
              {data.isApproved === "pending" && (
                <div className="flex items-center p-5 mb-8 text-amber-200 bg-amber-900/30 border border-amber-700/50 rounded-xl animate-pulse">
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <div className="ml-4 text-sm font-semibold tracking-wide">
                    Account Pending Verification: Please ensure your professional credentials are 
                    accurate. Our medical board reviews all profiles within 72 hours.
                  </div>
                </div>
              )}

              <div className="transition-all duration-500">
                {tab === "overview" && (
                  <div className="fade-in">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12 border-b border-slate-700 pb-12">
                      <figure className="relative group">
                        <img
                          src={data?.photo}
                          alt="Doctor"
                          className="w-48 h-48 rounded-2xl object-cover ring-4 ring-slate-700/50 shadow-2xl transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </figure>
                      
                      <div className="text-center md:text-left flex-1">
                        <span className="bg-cyan-900/40 text-cyan-400 py-1.5 px-5 rounded-full text-xs lg:text-sm font-bold uppercase tracking-wider border border-cyan-800/50">
                          {data.specialization}
                        </span>
                        
                        <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-100 mt-4 tracking-tight">
                          {data.name}
                        </h3>
                        
                        <div className="flex items-center justify-center md:justify-start gap-3 mt-3">
                          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1 rounded-md border border-slate-700">
                            <img src={starIcon} alt="rating" className="w-4 h-4" />
                            <span className="text-slate-100 text-sm font-bold">
                              {data.averageRating}
                            </span>
                          </div>
                          <span className="text-slate-400 text-sm font-medium">
                            ({data.totalRating} Patient Reviews)
                          </span>
                        </div>
                        
                        <p className="text-slate-400 mt-5 text-base leading-relaxed max-w-xl italic">
                          "{data?.bio}"
                        </p>
                      </div>
                    </div>

                    <div className="bg-[#0f172a]/50 p-6 rounded-2xl border border-slate-700/30">
                        <DoctorAbout
                          name={data.name}
                          about={data.about}
                          qualifications={data.qualifications}
                          experiences={data.experiences}
                        />
                    </div>
                  </div>
                )}

                {tab === "appointments" && (
                  <div className="fade-in">
                    <h2 className="text-2xl font-bold text-slate-100 mb-6">Patient Schedule</h2>
                    <Appointments initialAppointments={data.appointments} />
                  </div>
                )}

                {tab === "settings" && (
                  <div className="fade-in">
                    <h2 className="text-2xl font-bold text-slate-100 mb-6">Account Configurations</h2>
                    <Profile doctorData={data} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashbord;