import React, { useState, useEffect, useContext } from "react";
import { authContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { BiCloudUpload, BiInfoCircle } from "react-icons/bi";

const AlzheimerDetection = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const navigate = useNavigate();

  const { token } = useContext(authContext);
  const isLoggedIn = !!token;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
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
    toast.success("Scan Submitted for Neural Analysis!");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] py-16">
      <div className="container mx-auto px-6">
        {/* Localized Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-black text-slate-100 mb-6 tracking-tight">
            Neuro-Imaging <span className="text-indigo-500">Analysis</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed font-medium">
            Upload MRI scans for automated Alzheimer’s detection. Our Bharat-centric AI models 
            assist in early-stage diagnosis with clinical-grade precision.
          </p>
        </div>

        {/* Upload Portal Card */}
        <div className="bg-[#1e293b] shadow-2xl rounded-[2.5rem] p-8 lg:p-12 max-w-2xl mx-auto border border-slate-800 relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl"></div>
          
          <label className="block text-sm font-bold text-slate-300 mb-6 uppercase tracking-widest ml-1">
            Patient MRI Scan (DICOM/PNG/JPG)*
          </label>

          {uploadedImage ? (
            <div className="relative border-2 border-indigo-500/50 rounded-3xl p-4 bg-[#0f172a] flex items-center justify-center group overflow-hidden">
              <img
                src={uploadedImage}
                alt="Uploaded Scan"
                className="max-w-full max-h-72 rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
              />
              <button 
                onClick={() => setUploadedImage(null)}
                className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
          ) : (
            <div className="relative border-2 border-dashed border-slate-700 rounded-3xl p-12 flex flex-col items-center justify-center bg-[#0f172a]/50 hover:bg-[#0f172a] hover:border-indigo-500/50 transition-all cursor-pointer group">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="bg-slate-800 p-5 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <BiCloudUpload className="text-4xl text-indigo-400" />
              </div>
              <p className="text-slate-300 font-bold text-lg mb-1">Upload Patient Scan</p>
              <p className="text-slate-500 text-sm">Drag & Drop or Click to browse files</p>
            </div>
          )}

          {/* Submission Guidelines */}
          <div className="mt-8 flex gap-3 p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10">
            <BiInfoCircle className="text-indigo-400 text-xl shrink-0" />
            <p className="text-[11px] text-slate-400 leading-normal font-medium">
              Ensure the MRI image is clear and focused on the transverse plane for the most accurate neural diagnosis. Patient data is encrypted and secure.
            </p>
          </div>

          <button
            className={`mt-8 w-full font-black text-sm uppercase tracking-[0.2em] py-5 rounded-2xl shadow-2xl transition-all transform ${
              uploadedImage
                ? "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-indigo-900/40 hover:-translate-y-1"
                : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
            }`}
            onClick={handleSubmit}
            disabled={!uploadedImage}
          >
            Initiate AI Analysis
          </button>
        </div>

        {/* Footer Support Section */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 font-medium">
            Technical issues?{" "}
            <Link
              to="/contact"
              className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors border-b border-indigo-400/20"
            >
              Contact Health-E Support
            </Link>
          </p>
          <div className="mt-6 flex justify-center items-center gap-6 opacity-30 grayscale brightness-200">
             {/* Localized trust badges could go here */}
             <p className="text-[10px] text-slate-100 font-black tracking-[0.4em] uppercase">Secure • Verified • Health-E India</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlzheimerDetection;