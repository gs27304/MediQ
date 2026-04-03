import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiSupport, BiSend } from "react-icons/bi";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Fire form load event (Logic Untouched)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "web.webPageDetails.form.load",
      web: {
        webPageDetails: {
          form: {
            name: "global contact us",
            formType: "contact",
          },
        },
      },
    });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Track first interaction (Logic Untouched)
  const handleFirstInteraction = (e) => {
    if (!hasInteracted) {
      window.dataLayer.push({
        event: "web.webPageDetails.form.initiate",
        web: {
          webPageDetails: {
            form: {
              name: "global contact us",
              formType: "contact",
            },
          },
        },
      });
      setHasInteracted(true);
    }
    handleChange(e);
  };

  // Track field errors (Logic Untouched)
  const handleBlur = (e) => {
    if (!e.target.checkValidity()) {
      window.dataLayer.push({
        event: "web.webPageDetails.form.fieldsWithError",
        web: {
          webPageDetails: {
            form: {
              name: "global contact us",
              formType: "contact",
              fieldsWithErrors: e.target.id,
            },
          },
        },
      });
    }
  };

  // Submit handler (Logic Untouched)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Initiating Secure Send...");

    window.dataLayer.push({
      event: "web.webPageDetails.form.submit",
      web: {
        webPageDetails: {
          form: {
            name: "global contact us",
            formType: "contact",
          },
        },
      },
    });

    try {
      const result = await emailjs.send(
        "service_rtdbpts",        
        "template_b1lyz1o",       
        formData,
        "zcdmren8ioOPY7Z2K"       
      );

      toast.success("Shukriya! Your message reached our team.", {
        position: "top-center",
        theme: "dark"
      });

      window.dataLayer.push({
        event: "web.webPageDetails.form.complete",
        web: {
          webPageDetails: {
            form: {
              name: "global contact us",
              formType: "contact",
              formData: { ...formData },
            },
          },
        },
      }, []);

      setStatus("");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setHasInteracted(false);
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to reach servers. Please check your connection.", {
        position: "top-center",
        theme: "dark"
      });
      setStatus("");
    }
  };

  return (
    <section className="bg-[#0f172a] min-h-screen py-16">
      <div className="px-6 mx-auto max-w-screen-md">
        {/* Localized Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="bg-indigo-500/10 p-3 rounded-2xl mb-4 border border-indigo-500/20">
            <BiSupport className="text-3xl text-indigo-400" />
          </div>
          <h2 className="text-4xl font-black text-slate-100 tracking-tight text-center">
            Patient Support Center
          </h2>
          <p className="mt-4 text-slate-400 text-center font-medium leading-relaxed max-w-md">
            Facing an issue with your scan or have feedback? Reach out to our Bharat-based support team.
          </p>
        </div>

        {/* Premium Dark Form Card */}
        <div className="bg-[#1e293b] p-8 md:p-12 rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-slate-300 text-xs font-bold uppercase tracking-widest ml-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleFirstInteraction}
                  onBlur={handleBlur}
                  placeholder="Enter Name"
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-5 py-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600 font-medium"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-slate-300 text-xs font-bold uppercase tracking-widest ml-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleFirstInteraction}
                  onBlur={handleBlur}
                  placeholder="name@example.com"
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-5 py-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600 font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-slate-300 text-xs font-bold uppercase tracking-widest ml-1">Query Subject</label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={handleFirstInteraction}
                onBlur={handleBlur}
                placeholder="Ex: Technical Issue, Feedback, Medical Query"
                className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-5 py-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600 font-medium"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-slate-300 text-xs font-bold uppercase tracking-widest ml-1">Detailed Message</label>
              <textarea
                rows="5"
                id="message"
                value={formData.message}
                onChange={handleFirstInteraction}
                onBlur={handleBlur}
                placeholder="How can we assist you today?"
                className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-5 py-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600 font-medium resize-none"
                required
              />
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={status !== ""}
                className="w-full group flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-black py-4 rounded-2xl text-lg shadow-2xl shadow-indigo-900/40 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status ? status : (
                  <>
                    Send Secure Message <BiSend className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
          
          {/* Support Micro-copy */}
          <div className="mt-8 text-center border-t border-slate-800 pt-6">
             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">
               Average response time: 4 Hours • Health-E India
             </p>
          </div>
        </div>
      </div>
      <ToastContainer theme="dark" />
    </section>
  );
};

export default Contact;