import React from 'react';

const Newsitem = ({ title, description, imageUrl, newsUrl, author, date, source }) => {
    // Default medical placeholder image
    const placeholder = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=500";

    return (
        <div className='my-6 h-full'>
            <div 
                className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-[#1a2236]/50 backdrop-blur-md border border-white/10 transition-all duration-500 hover:border-cyan-500/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(6,182,212,0.3)]"
            >
                {/* Neon Source Badge */}
                <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full backdrop-blur-md">
                        {source || "Medical Journal"}
                    </span>
                </div>

                {/* Image Section with Overlay */}
                <div className="relative h-52 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a2236] via-transparent to-transparent z-10 opacity-60"></div>
                    <img 
                        src={imageUrl || placeholder} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0" 
                        alt="Medical Insight" 
                    />
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-grow">
                    <h5 className="text-xl font-bold text-white leading-snug mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                        {title || "Breaking: New Medical Breakthrough Detected"}
                    </h5>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                        {description || "Advanced clinical data and research insights are currently being analyzed by our AI systems. Click read more for a full breakdown."}
                    </p>

                    {/* Meta Data Section */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/5 mt-auto">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                            {(author ? author[0] : 'M')}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[11px] text-gray-300 font-medium">
                                {author || "MediQ Specialist"}
                            </span>
                            <span className="text-[10px] text-gray-500 uppercase tracking-tighter">
                                {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <a 
                        href={newsUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="mt-6 flex items-center justify-center py-2.5 rounded-lg bg-white/5 border border-white/10 text-cyan-400 text-sm font-bold tracking-wide hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all duration-300"
                    >
                        Read Intelligence Report
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Newsitem;