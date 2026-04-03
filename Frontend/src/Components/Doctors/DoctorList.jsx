import React, { useState } from "react";
import DoctorCard from "./DoctorCard";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../Loader/Loading";
import Error from "../Error/Error";

const DoctorList = () => {
  const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctors`);

  return (
    <section className="bg-[#0b1120] py-16 px-4 lg:px-20">
      <div className="container mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 text-center lg:text-left">
          <div className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <span className="text-cyan-400 text-[10px] font-bold uppercase tracking-[0.3em]">Network Status: Online</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
            Verified <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Specialist Network</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl text-base lg:text-lg">
            Access our encrypted registry of world-class medical professionals. Every specialist is vetted through our 
            multi-layer verification protocol for clinical excellence.
          </p>
        </div>

        {/* Dynamic Content States */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
             <Loader />
             <p className="text-cyan-500 text-sm font-bold mt-4 animate-pulse">Synchronizing Specialist Data...</p>
          </div>
        )}

        {error && (
          <div className="flex justify-center py-20">
            <Error message="Neural Link Error: Unable to fetch registry data." />
          </div>
        )}

        {!loading && !error && (
          <>
            {doctors?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-10">
                {doctors.map((doctor) => (
                  <div key={doctor._id} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <DoctorCard doctor={doctor} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
                <p className="text-gray-400 text-lg italic">No specialists currently active in this sector.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default DoctorList;