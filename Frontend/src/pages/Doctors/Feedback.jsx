import React, { useState } from "react";
import { formateDate } from "../../utils/formateDate";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";

const Feedback = ({ reviews, totalRating }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  return (
    <div className="mb-8">
      <div className="mb-[50px]">
        {/* Header with localized context */}
        <div className="flex items-center justify-between mb-[40px] border-b border-slate-800 pb-4">
          <h4 className="text-[22px] font-black text-slate-100 tracking-tight">
            Patient Testimonials ({totalRating})
          </h4>
          <span className="text-slate-500 text-xs font-bold uppercase tracking-widest bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
            Verified Reviews
          </span>
        </div>

        {reviews?.length === 0 ? (
          <p className="text-slate-500 italic text-center py-10 bg-slate-900/30 rounded-2xl border border-dashed border-slate-800">
            No reviews yet. Be the first to share your experience with this doctor.
          </p>
        ) : (
          <div className="space-y-8">
            {reviews?.map((review, index) => (
              <div 
                key={index} 
                className="flex flex-col sm:flex-row justify-between gap-6 p-6 bg-[#1e293b] rounded-2xl border border-slate-800 shadow-xl transition-all hover:bg-slate-800/50"
              >
                <div className="flex gap-4">
                  <figure className="w-12 h-12 rounded-2xl border-2 border-slate-700 overflow-hidden shrink-0 shadow-lg">
                    <img className="w-full h-full object-cover" src={review.user.photo} alt="Patient" />
                  </figure>
                  
                  <div>
                    <h5 className="text-[16px] leading-6 text-indigo-400 font-black tracking-tight uppercase">
                      {review?.user?.name}
                    </h5>
                    <p className="text-[12px] leading-5 text-slate-500 font-bold uppercase tracking-tighter">
                      Visited on {formateDate(review?.createdAt)}
                    </p>
                    <p className="text-slate-300 mt-4 font-medium text-[15px] leading-relaxed italic border-l-2 border-slate-700 pl-4">
                      "{review.reviewText}"
                    </p>
                  </div>
                </div>

                {/* Star Rating Section - Localized Color (Gold/Indigo) */}
                <div className="flex gap-1 bg-slate-900/50 h-fit p-2 rounded-xl border border-slate-800">
                  {[...Array(review?.rating).keys()].map((_, index) => (
                    <AiFillStar key={index} className="text-amber-400 text-lg shadow-amber-900" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Localized Action Button */}
      {!showFeedbackForm && (
        <div className="text-center mt-12 bg-slate-900/50 p-10 rounded-[2rem] border border-dashed border-slate-800">
          <p className="text-slate-400 mb-6 text-sm">
            Aapka feedback dusre patients ki madad kar sakta hai.
          </p>
          <button 
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-2xl font-black transition-all shadow-2xl shadow-indigo-900/40 transform hover:-translate-y-1" 
            onClick={() => setShowFeedbackForm(true)}
          >
            Share Your Experience
          </button>
        </div>
      )}

      {showFeedbackForm && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          <FeedbackForm />
        </div>
      )}
    </div>
  );
};

export default Feedback;