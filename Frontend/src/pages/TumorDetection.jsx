import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { BiScan, BiCloudUpload, BiShieldQuarter, BiXCircle } from "react-icons/bi";

const TumorDetection = () => {
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
      toast.error("Kripya login karein to access neural diagnostics.", {
        onClose: () => {
          setTimeout(() => navigate("/login"), 1500); 
        },
      });
      return;
    }

    navigate("/result");
    toast.success("Scan successfully uploaded for AI analysis!");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] py-16">
      <div className="container mx-auto px-6">
        
        {/* Localized Professional Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full mb-6">
            <BiScan className="text-indigo-400 text-sm" />
            <span className="text-indigo-400 text-xs font-black uppercase tracking-[0.2em]">Neural Diagnostic Portal</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-slate-100 mb-6 tracking-tight">
            Brain Tumor <span className="text-indigo-500">Identification</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed font-medium">
            Upload MRI scans for automated volumetric analysis. Our Bharat-centric AI assist in 
            detecting early oncological signs with clinical-grade precision.
          </p>
        </div>

        {/* Upload Portal Card */}
        <div className="bg-[#1e293b] shadow-2xl rounded-[2.5rem] p-8 lg:p-12 max-w-2xl mx-auto border border-slate-800 relative overflow-hidden">
          {/* Background Glow Effect */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-600/5 rounded-full blur-3xl"></div>
          
          <label className="block text-xs font-bold text-slate-500 mb-6 uppercase tracking-widest ml-1">
            MRI Scan Image (JPG/PNG/DICOM)*
          </label>

          {uploadedImage ? (
            <div className="relative border-2 border-indigo-500/30 rounded-3xl p-4 bg-[#0f172a] flex items-center justify-center group overflow-hidden shadow-inner">
              <img
                src={uploadedImage}
                alt="Patient MRI"
                className="max-h-80 w-full object-contain rounded-2xl transition-transform duration-700 group-hover:scale-105"
              />
              <button 
                onClick={() => setUploadedImage(null)}
                className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md text-red-500 p-2 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-xl"
              >
                <BiXCircle className="text-2xl" />
              </button>
            </div>
          ) : (
            <div className="relative border-2 border-dashed border-slate-700 rounded-3xl p-12 flex flex-col items-center justify-center bg-[#0f172a]/50 hover:bg-[#0f172a] hover:border-indigo-500/40 transition-all cursor-pointer group">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                onChange={handleFileChange}
                accept="image/*"
              />
              <div className="bg-slate-800 p-6 rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
                <BiCloudUpload className="text-4xl text-indigo-400" />
              </div>
              <p className="text-slate-200 font-bold text-lg mb-2">Upload Patient Scan</p>
              <p className="text-slate-500 text-sm font-medium text-center">Click to browse or drop medical files here</p>
            </div>
          )}

          {/* Secure Information Block */}
          <div className="mt-8 flex items-center gap-4 p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
            <BiShieldQuarter className="text-emerald-500 text-2xl shrink-0" />
            <p className="text-[11px] text-slate-500 leading-normal font-semibold">
              Scan data is processed via encrypted neural pipelines. 
              Compliance with Indian Digital Health standards for data privacy ensured.
            </p>
          </div>

          <button
            className={`mt-8 w-full font-black text-sm uppercase tracking-[0.2em] py-5 rounded-2xl shadow-2xl transition-all transform flex items-center justify-center gap-2 ${
              uploadedImage
                ? "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-indigo-900/40 hover:-translate-y-1"
                : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
            }`}
            onClick={handleSubmit}
            disabled={!uploadedImage} 
          >
            {uploadedImage ? "Initiate AI Diagnosis" : "Waiting for Upload..."}
          </button>
        </div>

        {/* Localized Support Section */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 font-medium">
            Facing technical issues?{" "}
            <Link
              to="/contact"
              className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors border-b border-indigo-400/20"
            >
              Contact Health-E Support
            </Link>
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 opacity-20 grayscale brightness-200">
             <div className="h-[1px] w-32 bg-slate-800"></div>
             <p className="text-[10px] text-slate-100 font-black tracking-[0.4em] uppercase text-center">Secure • Verified • Health-E India</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TumorDetection;