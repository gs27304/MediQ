import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BiFileFind, BiCheckShield, BiSupport, BiRedo } from "react-icons/bi";
import HashLoader from "react-spinners/HashLoader";

const MRIResult = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResult = async () => {
      setLoading(true);
      try {
        // Mocking the AI Neural API Response
        setTimeout(() => {
          const mockData = [
            {
              diagnosis: "Glioma",
              confidence: "92.3%",
              advice: "Immediate consultation with a Neuro-Oncologist is required. Further biopsy may be suggested.",
              severity: "High",
            },
            {
              diagnosis: "Meningioma",
              confidence: "89.8%",
              advice: "Schedule a specialized evaluation at a Tertiary Care center for surgical assessment.",
              severity: "Moderate",
            },
            {
              diagnosis: "No Significant Findings",
              confidence: "98.7%",
              advice: "No tumorous growth detected. Maintain annual routine screenings as per NMC guidelines.",
              severity: "Normal",
            },
            {
              diagnosis: "Pituitary Adenoma",
              confidence: "85.2%",
              advice: "Consult an Endocrinologist and Neurologist for a combined hormonal evaluation.",
              severity: "Moderate",
            },
          ];

          const randomResult = mockData[Math.floor(Math.random() * mockData.length)];

          setResult(randomResult);
          setLoading(false);
        }, 2500);
      } catch (error) {
        toast.error("An error occurred during neural analysis. Please retry.");
        navigate("/tumor-detection");
      }
    };

    fetchResult();
  }, [navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] py-16 flex flex-col items-center">
      <div className="container mx-auto px-6 max-w-3xl">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full mb-6">
            <BiCheckShield className="text-indigo-400" />
            <span className="text-indigo-400 text-xs font-black uppercase tracking-widest">Neural Analysis Complete</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-100 tracking-tight">
            Diagnostic <span className="text-indigo-500">Report</span>
          </h1>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-80 bg-[#1e293b] rounded-[2.5rem] border border-slate-800 shadow-2xl w-full">
            <HashLoader color="#6366f1" size={50} />
            <p className="mt-6 text-slate-400 font-bold animate-pulse uppercase tracking-[0.2em] text-xs">
              Generating Final Report...
            </p>
          </div>
        ) : (
          <div className="bg-[#1e293b] shadow-2xl rounded-[2.5rem] p-8 md:p-12 border border-slate-800 relative overflow-hidden animate-in fade-in zoom-in-95 duration-500">
            {/* Background Aesthetic */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/5 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-700/50">
                <BiFileFind className="text-indigo-400 text-3xl" />
                <h2 className="text-xl font-black text-slate-100 uppercase tracking-tight">Report Summary</h2>
              </div>

              <div className="space-y-8">
                {/* Diagnosis Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">AI Prediction</p>
                    <p className={`text-2xl font-black tracking-tight ${result.severity === 'Normal' ? 'text-emerald-400' : 'text-slate-100'}`}>
                      {result.diagnosis}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Confidence Score</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(129,140,248,0.5)]" 
                          style={{ width: result.confidence }}
                        ></div>
                      </div>
                      <p className="text-lg font-black text-indigo-400">{result.confidence}</p>
                    </div>
                  </div>
                </div>

                {/* Advice Box */}
                <div className="bg-[#0f172a] p-6 rounded-2xl border border-slate-800">
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3">Professional Advice</p>
                  <p className="text-slate-300 font-medium leading-relaxed italic">
                    "{result.advice}"
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-12">
                <button
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-black text-sm uppercase tracking-widest rounded-xl transition-all border border-slate-700 shadow-xl"
                  onClick={() => navigate("/tumor-detection")}
                >
                  <BiRedo className="text-xl" /> New Analysis
                </button>
                <Link
                  to="/doctors"
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-black text-sm uppercase tracking-widest rounded-xl shadow-2xl shadow-indigo-900/40 transition-all transform hover:-translate-y-1"
                >
                  Consult Specialist
                </Link>
              </div>

              <p className="mt-8 text-center text-slate-600 text-[9px] font-bold uppercase tracking-[0.3em]">
                This is an AI-generated screening report • Not a final medical prescription
              </p>
            </div>
          </div>
        )}

        {/* Support Section */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm font-medium">
            Prashn ya sahayata? {" "}
            <Link
              to="/contact"
              className="text-indigo-400 hover:text-indigo-300 font-black transition-colors border-b border-indigo-400/20 inline-flex items-center gap-1"
            >
              <BiSupport /> MediQ Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MRIResult;