import React, { useState, useEffect, useContext } from "react";
import { authContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { BiPlusMedical, BiCloudUpload, BiShieldQuarter } from "react-icons/bi";

const HemorrhageDetection = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const navigate = useNavigate();

  const { token } = useContext(authContext);
  const isLoggedIn = !!token;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setUploadedImage(imageURL);
    }
  };

  const handleSubmit = () => {
    if (!isLoggedIn) {
      toast.error("Kripya login karein to submit the MRI scan.", {
        onClose: () => {
          setTimeout(() => navigate("/login"), 1500);
        },
      });
      return;
    }
    navigate("/result");
    toast.success("Scan Submitted for Emergency Neural Analysis!");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] py-16">
      <div className="container mx-auto px-6">
        {/* Localized Professional Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-950/30 border border-red-900/50 px-4 py-1.5 rounded-full mb-6">
            <BiPlusMedical className="text-red-500 animate-pulse text-sm" />
            <span className="text-red-400 text-xs font-black uppercase tracking-[0.2em]">Emergency Diagnostic Portal</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-slate-100 mb-6 tracking-tight">
            Hemorrhage <span className="text-red-600">Identification</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed font-medium">
            Upload MRI scans for rapid detection of intracranial hemorrhages. Our AI provides 
            early warnings to assist Indian medical professionals in critical decision-making.
          </p>
        </div>

        {/* Diagnostic Upload Card */}
        <div className="bg-[#1e293b] shadow-2xl rounded-[2.5rem] p-8 lg:p-12 max-w-2xl mx-auto border border-slate-800 relative overflow-hidden">
          {/* Subtle Emergency Glow */}
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-red-600/5 rounded-full blur-3xl"></div>
          
          <label className="block text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest ml-1">
            Clinical MRI Scan (Cross-Sectional)*
          </label>

          {uploadedImage ? (
            <div className="relative border-2 border-red-900/30 rounded-3xl p-4 bg-[#0f172a] flex items-center justify-center group overflow-hidden shadow-inner">
              <img
                src={uploadedImage}
                alt="Uploaded Scan"
                className="max-h-80 w-full object-contain rounded-2xl transition-transform duration-700 group-hover:scale-105"
              />
              <button 
                onClick={() => setUploadedImage(null)}
                className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md text-red-500 p-2.5 rounded-xl border border-red-900/20 hover:bg-red-600 hover:text-white transition-all shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
          ) : (
            <div className="relative border-2 border-dashed border-slate-700 rounded-3xl p-12 flex flex-col items-center justify-center bg-[#0f172a]/50 hover:bg-[#0f172a] hover:border-red-600/40 transition-all cursor-pointer group">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                onChange={handleFileChange}
                accept="image/*"
              />
              <div className="bg-slate-800 p-6 rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
                <BiCloudUpload className="text-4xl text-red-500" />
              </div>
              <p className="text-slate-200 font-bold text-lg mb-2">Upload Scan Data</p>
              <p className="text-slate-500 text-sm font-medium">Click to browse or drop medical files here</p>
            </div>
          )}

          {/* Secure Processing Info */}
          <div className="mt-8 flex items-center gap-4 p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
            <BiShieldQuarter className="text-emerald-500 text-2xl shrink-0" />
            <p className="text-[11px] text-slate-500 leading-normal font-semibold">
              Scan data is processed via secure, HIPAA-compliant neural pipelines. 
              Results are encrypted and accessible only to authorized medical personnel.
            </p>
          </div>

          <button
            className={`mt-8 w-full font-black text-sm uppercase tracking-[0.2em] py-5 rounded-2xl shadow-2xl transition-all transform ${
              uploadedImage
                ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-red-900/40 hover:-translate-y-1"
                : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
            }`}
            onClick={handleSubmit}
            disabled={!uploadedImage}
          >
            {uploadedImage ? "Run Neural Diagnostics" : "Waiting for File..."}
          </button>
        </div>

        {/* Localized Footer Support */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 font-medium">
            Need urgent assistance?{" "}
            <Link
              to="/contact"
              className="text-red-500 hover:text-red-400 font-bold transition-colors border-b border-red-500/10"
            >
              Contact Health-E Support
            </Link>
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 opacity-30">
             <div className="h-[1px] w-32 bg-slate-800"></div>
             <p className="text-[10px] text-slate-100 font-black tracking-[0.4em] uppercase">Emergency Services • Health-E India</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HemorrhageDetection;