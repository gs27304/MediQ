import React from 'react'
import HashLoader from 'react-spinners/HashLoader'

const Loading = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full min-h-[400px] gap-6'>
      {/* Neural Link Spinner */}
      <div className="relative">
        {/* Subtle background glow for the loader */}
        <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full"></div>
        <HashLoader color="#22d3ee" size={50} />
      </div>

      {/* System Status Label */}
      <div className="flex flex-col items-center">
        <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.4em] animate-pulse">
          Initializing Neural Link
        </span>
        <div className="flex gap-1 mt-2">
           <div className="w-1 h-1 bg-white/20 rounded-full animate-bounce"></div>
           <div className="w-1 h-1 bg-white/20 rounded-full animate-bounce [animation-delay:-.3s]"></div>
           <div className="w-1 h-1 bg-white/20 rounded-full animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    </div>
  )
}

export default Loading