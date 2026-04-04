import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { BASE_URL, getToken } from "../../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!rating || !reviewText) {
        setLoading(false);
        return toast.error('Kripya Rating aur Review dono bharen.');
      }

      const token = getToken();
      
      const res = await fetch(`${BASE_URL}/doctors/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, reviewText }),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      setLoading(false);
      toast.success("Shukriya! Your feedback has been recorded.");

      // Clear the form
      setRating(0);
      setHover(0);
      setReviewText('');
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmitReview} className="bg-[#1e293b] p-8 rounded-3xl border border-slate-800 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
      <div className="mb-8">
        <h3 className="text-slate-100 text-lg font-black tracking-tight mb-2">
          How was your Consultation?
        </h3>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-6">
          Rate your overall experience with the specialist
        </p>
        
        <div className="flex gap-2 bg-[#0f172a] w-fit p-3 rounded-2xl border border-slate-800 shadow-inner">
          {[...Array(5).keys()].map((_, index) => {
            index += 1;
            return (
              <button
                key={index}
                type="button"
                className={`${
                  index <= (hover || rating)
                    ? "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]"
                    : "text-slate-700"
                } bg-transparent border-none outline-none text-[32px] cursor-pointer transition-all duration-200 transform hover:scale-110`}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
                onDoubleClick={() => {
                  setHover(0);
                  setRating(0);
                }}
              >
                <AiFillStar />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-slate-100 text-lg font-black tracking-tight mb-2">
          Patient Remarks
        </h3>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">
          Share suggestions or details about your visit
        </p>
        
        <textarea
          className="bg-[#0f172a] border border-slate-800 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 w-full px-5 py-4 rounded-2xl text-slate-200 placeholder:text-slate-600 outline-none transition-all resize-none font-medium"
          rows="5"
          placeholder="Describe your experience with the doctor..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
      </div>

      <div className="mt-8">
        <button 
          disabled={loading}
          type="submit" 
          className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-black py-4 rounded-xl text-md shadow-2xl shadow-indigo-900/40 transition-all flex items-center justify-center disabled:opacity-70"
        >
          {loading ? <HashLoader size={25} color="#fff" /> : `Submit Final Review`}
        </button>
        <p className="text-center text-slate-600 text-[10px] mt-4 font-bold uppercase tracking-[0.2em]">
          Secure & Anonymous Feedback • MediQ India
        </p>
      </div>
    </form>
  );
};

export default FeedbackForm;