import { formateDate } from '../../utils/formateDate'
import React from 'react'

const DoctorAbout = ({ name, about, qualifications, experiences }) => {
  return (
    <div className="bg-[#0f172a] p-6 lg:p-10 rounded-[2rem] border border-slate-800 shadow-2xl">
      {/* Biography Section */}
      <div className="mb-12 border-b border-slate-800 pb-8">
        <h3 className="text-2xl lg:text-3xl leading-tight text-slate-100 font-black flex items-center gap-3">
          Profile of 
          <span className='text-indigo-400 bg-indigo-500/10 px-4 py-1 rounded-xl border border-indigo-500/20'>
            Dr. {name}
          </span> 
        </h3>
        <p className='text-slate-400 mt-6 text-base leading-relaxed italic'>
          {about || "Professional biography currently being updated by the medical board."}
        </p>
      </div>

      {/* Education Timeline */}
      <div className='mt-12'>
        <div className="flex items-center gap-4 mb-6">
          <div className="h-8 w-1.5 bg-indigo-500 rounded-full"></div>
          <h3 className='text-xl font-extrabold text-slate-100 tracking-tight'>Medical Education & Degrees</h3>
        </div>
        
        <ul className='space-y-6'>
          {qualifications?.map((item, index) => (
            <li key={index} className='flex flex-col sm:flex-row sm:justify-between sm:items-start p-6 bg-[#1e293b] rounded-2xl border border-slate-800 hover:border-indigo-500/30 transition-all'>
              <div className="space-y-2">
                <span className='inline-block bg-indigo-500/10 text-indigo-400 text-xs px-3 py-1 rounded-full font-black uppercase tracking-widest border border-indigo-500/20'>
                  {formateDate(item.startingDate)} — {formateDate(item.endingDate)}
                </span>
                <p className='text-lg font-bold text-slate-100 tracking-tight'>{item.degree}</p>
                <p className='text-sm font-medium text-slate-500 italic uppercase tracking-wider'>{item.university}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Professional Experience Section */}
      <div className='mt-16'>
        <div className="flex items-center gap-4 mb-6">
          <div className="h-8 w-1.5 bg-amber-500 rounded-full"></div>
          <h3 className='text-xl font-extrabold text-slate-100 tracking-tight'>Clinical & Hospital Residency</h3>
        </div>

        <ul className='grid sm:grid-cols-2 gap-6'>
          {experiences?.map((item, index) => (
            <li key={index} className='p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-slate-800/50 transition-colors group'>
              <span className='text-amber-500 text-xs font-black tracking-widest uppercase mb-3 block opacity-80'>
                {formateDate(item.startingDate)} — {formateDate(item.endingDate)}
              </span>
              <p className='text-lg font-bold text-slate-100 group-hover:text-amber-400 transition-colors'>{item.position}</p>
              <p className='text-sm font-semibold text-slate-500 mt-1 uppercase tracking-wide'>{item.hospital}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Verified Footer */}
      <div className="mt-16 pt-6 border-t border-slate-800 flex items-center justify-center">
         <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em]">
           Verified Medical Practitioner • Health-E India
         </p>
      </div>
    </div>
  )
}

export default DoctorAbout