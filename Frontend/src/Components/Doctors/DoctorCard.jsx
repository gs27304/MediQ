import React from "react";
import starIcon from "../../assets/images/Star.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const DoctorCard = ({ doctor }) => {
  const {
    name,
    avgRating,
    totalRating,
    photo,
    specialization,
    experiences,
  } = doctor;

  return (
    <div className="group p-4 lg:p-6 bg-[#1a2236]/50 backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_20px_50px_-15px_rgba(6,182,212,0.2)]">
      
      {/* Profile Image Section */}
      <div className="relative overflow-hidden rounded-xl border border-white/5">
        <img 
          src={photo} 
          className="w-full h-[220px] object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
          alt={name} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2236] via-transparent to-transparent opacity-60"></div>
      </div>

      {/* Specialist Identity */}
      <h2 className="text-[20px] leading-[30px] lg:text-[24px] lg:leading-9 text-white font-bold mt-4 lg:mt-6 group-hover:text-cyan-400 transition-colors">
        {name}
      </h2>

      <div className="mt-3 flex items-center justify-between">
        <span className="bg-cyan-500/10 text-cyan-400 py-1 px-3 lg:px-4 text-[12px] leading-4 lg:text-[14px] lg:leading-7 font-bold uppercase tracking-widest rounded-full border border-cyan-500/20">
          {specialization}
        </span>
        
        <div className="flex items-center gap-[6px]">
          <span className="flex items-center gap-[4px] text-[14px] lg:text-[16px] font-bold text-white">
            <img src={starIcon} alt="Rating" className="w-4 h-4 mb-1" />
            {avgRating}
          </span>
          <span className="text-[12px] lg:text-[14px] font-medium text-gray-500">
            ({totalRating} verified reviews)
          </span>
        </div>
      </div>

      {/* Clinical Affiliation & Action */}
      <div className="mt-6 flex items-center justify-between pt-5 border-t border-white/5">
        <div>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Affiliated Intelligence Hub</p>
          <p className="text-[13px] font-medium text-gray-300">
             {experiences && experiences[0]?.hospital ? experiences[0].hospital : "MediQ Global Network"} 
          </p>
        </div>

        <Link
          to={`/doctors/${doctor._id}`}
          onClick={() => {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: "web.webinteractionlink.click",
              component_name: "doctorcard",
              interaction_type: "link click",
              section: "doctor list",
              doctor_name: name ? name.toLowerCase() : "",
              specialization: specialization ? specialization.toLowerCase() : "",
              hospital:
                experiences && experiences[0]?.hospital
                  ? experiences[0].hospital.toLowerCase()
                  : "",
              destination_url: `/doctors/${doctor._id}`
            });
          }}
          className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center bg-white/5 text-white hover:bg-cyan-500 hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(6,182,212,0.6)] transition-all duration-300"
        >
          <BsArrowRight className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;