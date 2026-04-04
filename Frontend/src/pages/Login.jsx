import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import { authContext } from "../context/AuthContext";
import HashLoader from "react-spinners/HashLoader";
import { BiLockAlt, BiEnvelope } from "react-icons/bi";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  // Ensure dataLayer is available (Logic Untouched)
  window.dataLayer = window.dataLayer || [];

  useEffect(() => {
    const formMeta = {
      name: "login form",
      formType: "authentication",
    };

    window.dataLayer.push({
      event: "login.form.load",
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

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Trigger form submit event (Logic Untouched)
    window.dataLayer.push({
      event: "login.form.submit",
      web: {
        webPageDetails: {
          form: {
            name: "login form",
            formType: "authentication",
          },
        },
      },
    });

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        const error = new Error(result.message);
        error.statusCode = res.status;
        throw error;
      }

      let { token, ...newresult } = result.data;

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: newresult,
          token: token,
          role: newresult.role,
        },
      });

      // Trigger form complete event (Logic Untouched)
      window.dataLayer.push({
        event: "login.form.complete",
        web: {
          webPageDetails: {
            form: {
              name: "login form",
              formType: "authentication",
              status: "login success",
            },
          },
        },
      });

      setLoading(false);
      toast.success("Welcome back to MediQ India!");
      navigate("/home");
    } catch (error) {
      if (error.statusCode === 500)
        toast.error("Internal server error");
      else toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <section className="px-5 lg:px-0 min-h-[80vh] flex items-center justify-center bg-[#0f172a]">
      <div className="w-full max-w-[500px] mx-auto rounded-[2.5rem] shadow-2xl p-8 md:p-12 bg-[#1e293b] border border-slate-800 relative overflow-hidden">
        {/* Decorative Background Accent */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-10">
            <h3 className="text-slate-100 text-3xl font-black tracking-tight mb-2">
              Namaste! <span className="text-indigo-400">Welcome</span> Back
            </h3>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
              Access your medical dashboard
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            <div className="space-y-2">
              <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Registered Email</label>
              <div className="relative group">
                <BiEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 bg-[#0f172a] border border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-100 placeholder:text-slate-600 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">Secure Password</label>
              <div className="relative group">
                <BiLockAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="password"
                  placeholder="••••••••"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 bg-[#0f172a] border border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-100 placeholder:text-slate-600 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-black py-4 rounded-2xl text-lg shadow-2xl shadow-indigo-900/40 transition-all transform hover:-translate-y-1 flex justify-center items-center gap-3 disabled:opacity-70 disabled:transform-none"
              >
                {loading ? <HashLoader size={25} color="#fff" /> : "Access Account"}
              </button>
            </div>

            <p className="mt-8 text-slate-500 text-center text-sm font-medium">
              Naye user hain?{" "}
              <Link to="/register" className="text-indigo-400 font-black hover:text-indigo-300 border-b border-indigo-400/20 transition-all">
                Join MediQ India
              </Link>
            </p>
          </form>
          
          <div className="mt-10 pt-6 border-t border-slate-800 text-center">
             <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.3em]">
               Secure Encryption • Verified Medical Portal
             </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;