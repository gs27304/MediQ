import React, { useEffect, useState } from "react";
import signupImg from "../assets/images/signup.gif";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import "react-toastify/dist/ReactToastify.css";
import { BiUser, BiEnvelope, BiLockAlt, BiCloudUpload } from "react-icons/bi";

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: selectedFile,
    gender: "",
    role: "patient",
  });

  const navigate = useNavigate();

  // Setup dataLayer (Logic Untouched)
  window.dataLayer = window.dataLayer || [];

  useEffect(() => {
    const formMeta = {
      name: "signup form",
      formType: "authentication",
    };

    window.dataLayer.push({
      event: "signup.form.load",
      web: {
        webPageDetails: {
          form: formMeta,
        },
      },
    });
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handelFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Trigger tracking (Logic Untouched)
    window.dataLayer.push({
      event: "signup.form.submit",
      web: {
        webPageDetails: {
          form: {
            name: "signup form",
            formType: "authentication",
          },
        },
      },
    });

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("role", formData.role);
    formDataToSend.append("photo", selectedFile);

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();

      if (!res.ok) {
        const error = new Error(data.message);
        error.statusCode = res.status;
        throw error;
      }

      window.dataLayer.push({
        event: "signup.form.complete",
        web: {
          webPageDetails: {
            form: {
              name: "signup form",
              formType: "authentication",
              status: "signup success",
            },
          },
        },
      });

      setLoading(false);
      toast.success("Registration Successful! Welcome to Health-E Bharat.");
      navigate("/login");
    } catch (error) {
      if (error.statusCode === 500) {
        toast.error("Internal server error");
      } else {
        toast.error(error.message);
      }
      setLoading(false);
    }
  };

  return (
    <section className="px-5 xl:px-0 min-h-screen bg-[#0f172a] py-12 flex items-center">
      <div className="max-w-[1000px] mx-auto bg-[#1e293b] rounded-[2.5rem] shadow-2xl border border-slate-800 overflow-hidden relative">
        {/* Aesthetic Glow */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-600/5 rounded-full blur-[100px]"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
          {/* Left Side: Branding/Image */}
          <div className="hidden lg:flex flex-col justify-center items-center bg-indigo-600 p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <h2 className="text-white text-4xl font-black mb-6 tracking-tight leading-tight text-center">
              Bharat's Smartest <br/> Health Network
            </h2>
            <figure className="relative z-10 w-full drop-shadow-2xl">
              <img src={signupImg} alt="Signup" className="w-full h-auto rounded-3xl mix-blend-lighten opacity-90" />
            </figure>
            <p className="text-indigo-100 mt-8 text-center font-medium opacity-80 italic text-sm">
              "Svaasthya hi sabse bada uphar hai."
            </p>
          </div>

          {/* Right Side: Form */}
          <div className="p-8 lg:p-16">
            <div className="mb-10">
              <h3 className="text-slate-100 text-3xl font-black tracking-tight mb-2">
                Join the <span className="text-indigo-400">Network</span>
              </h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">Create your digital health profile</p>
            </div>

            <form onSubmit={submitHandler} className="space-y-5">
              <div className="space-y-1">
                <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <BiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl group-focus-within:text-indigo-400 transition-colors" />
                  <input
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-[#0f172a] border border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-100 placeholder:text-slate-600 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <BiEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl group-focus-within:text-indigo-400 transition-colors" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-[#0f172a] border border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-100 placeholder:text-slate-600 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Create Password</label>
                <div className="relative group">
                  <BiLockAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl group-focus-within:text-indigo-400 transition-colors" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-[#0f172a] border border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-100 placeholder:text-slate-600 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 bg-[#0f172a] p-5 rounded-2xl border border-slate-800">
                <div className="flex-1">
                  <label className="text-slate-500 text-[9px] font-black uppercase block mb-2 tracking-widest">Healthcare Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Medical Expert</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="text-slate-500 text-[9px] font-black uppercase block mb-2 tracking-widest">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4 py-2">
                {previewURL ? (
                  <figure className="w-14 h-14 rounded-2xl border-2 border-indigo-500 shadow-lg shadow-indigo-900/20 overflow-hidden shrink-0">
                    <img src={previewURL} alt="Preview" className="w-full h-full object-cover" />
                  </figure>
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border-2 border-slate-800 flex items-center justify-center text-slate-600"><BiUser size={24}/></div>
                )}

                <div className="relative flex-1">
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                    onChange={handelFileInputChange}
                    accept=".jpg, .png"
                    className="hidden"
                  />
                  <label
                    htmlFor="customFile"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-slate-800 text-slate-300 text-[10px] font-black uppercase tracking-widest rounded-xl border border-slate-700 hover:bg-slate-700 transition-all cursor-pointer"
                  >
                    <BiCloudUpload className="text-lg" /> Upload Avatar
                  </label>
                </div>
              </div>

              <div className="pt-4">
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-black py-4 rounded-2xl text-lg shadow-2xl shadow-indigo-900/40 transition-all transform hover:-translate-y-1 flex justify-center items-center gap-3"
                >
                  {loading ? <HashLoader size={25} color="#ffffff" /> : "Verify & Register"}
                </button>
              </div>

              <p className="mt-5 text-slate-500 text-center text-sm font-medium">
                Pehle se account hai?
                <Link to="/login" className="text-indigo-400 font-black ml-1 hover:text-indigo-300 border-b border-indigo-400/20">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;