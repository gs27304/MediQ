import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo01.png";
import { RiLinkedinFill } from "react-icons/ri";
import {
  AiFillYoutube,
  AiFillGithub,
  AiFillInstagram,
} from "react-icons/ai";

const Links = [
  {
    label: "YouTube",
    path: "https://www.youtube.com/",
    icon: <AiFillYoutube className="w-5 h-5" />,
  },
  {
    label: "GitHub",
    path: "https://github.com/gs27304", // Updated to your GitHub
    icon: <AiFillGithub className="w-5 h-5" />,
  },
  {
    label: "Instagram",
    path: "https://www.instagram.com/",
    icon: <AiFillInstagram className="w-5 h-5" />,
  },
  {
    label: "LinkedIn",
    path: "https://www.linkedin.com/in/gajendra-singh-006a11219/", // Updated to your LinkedIn
    icon: <RiLinkedinFill className="w-5 h-5" />,
  },
];

const quickLinks01 = [
  {
    path: "/home",
    display: "Neural Home",
  },
  {
    path: "/",
    display: "Platform Vision",
  },
  {
    path: "/services",
    display: "System Services",
  },
  {
    path: "/",
    display: "Medical Ledger",
  },
];

const quickLinks02 = [
  {
    path: "/doctors",
    display: "Specialist Directory",
  },
  {
    path: "/doctors",
    display: "Sync Appointment",
  },
  {
    path: "/services",
    display: "AI MRI Diagnosis",
  },
  {
    path: "/",
    display: "Expert Insights",
  },
];

const quickLinks03 = [
  {
    path: "/",
    display: "Support Ecosystem",
  },
  {
    path: "/contact",
    display: "Terminal Contact",
  },
];

const pushFooterLinkClick = (label, url) => {
  const isAbsoluteUrl = url.startsWith("http");
  const fullUrl = isAbsoluteUrl ? url : `${window.location.origin}${url}`;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "web.webinteractionlink.click",
    web: {
      componentname: "footer",
      interactiontype: "link click",
      link: {
        section: "footer",
        text: label.toLowerCase() || "unknown",
        url: fullUrl,
      },
    },
  });
};

const openCookiePreferences = () => {
  if (window.openCookieSettings) {
    window.openCookieSettings();
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "web.webinteractionlink.click",
    web: {
      componentname: "footer",
      interactiontype: "link click",
      link: {
        section: "footer",
        text: "cookie preferences",
        url: window.location.origin + "#cookie-preferences",
      },
    },
  });
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#080d1a] pb-16 pt-16 border-t border-white/5">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[40px]">

          {/* BRANDING SECTION */}
          <div className="max-w-[300px]">
            <div className="flex items-center gap-2 mb-4">
               <img src={logo} alt="MediQ Logo" className="w-10 h-10 brightness-110 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]" />
               <span className="text-2xl font-bold text-white tracking-tight">MediQ</span>
            </div>

            <p className="text-[14px] leading-7 font-medium text-gray-400 mb-6">
              Empowering global health through intelligent connectivity and AI-driven diagnostics. Built with precision at IIIT Jabalpur.
            </p>
            
            <p className="text-[12px] text-gray-500 font-bold uppercase tracking-widest">
              © {year} MediQ Ecosystem | D-CODER
            </p>

            <div className="flex items-center gap-3 mt-6">
              {Links.map((link, index) => (
                <a
                  href={link.path}
                  key={index}
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => pushFooterLinkClick(link.label, link.path)}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 1: NAVIGATION */}
          <div>
            <h2 className="text-[18px] font-bold mb-8 text-white uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Navigation
            </h2>

            <ul className="space-y-4">
              {quickLinks01.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-[15px] font-medium text-gray-400 hover:text-cyan-400 transition-colors"
                    onClick={() => pushFooterLinkClick(item.display, item.path)}
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 2: PATIENT SERVICES */}
          <div>
            <h2 className="text-[18px] font-bold mb-8 text-white uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Services
            </h2>

            <ul className="space-y-4">
              {quickLinks02.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-[15px] font-medium text-gray-400 hover:text-cyan-400 transition-colors"
                    onClick={() => pushFooterLinkClick(item.display, item.path)}
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: SUPPORT & LEGAL */}
          <div>
            <h2 className="text-[18px] font-bold mb-8 text-white uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              System Support
            </h2>

            <ul className="space-y-4">
              {quickLinks03.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-[15px] font-medium text-gray-400 hover:text-cyan-400 transition-colors"
                    onClick={() => pushFooterLinkClick(item.display, item.path)}
                  >
                    {item.display}
                  </Link>
                </li>
              ))}

              <li>
                <button
                  onClick={openCookiePreferences}
                  className="text-[15px] font-medium text-gray-500 hover:text-white transition-colors cursor-pointer italic"
                >
                  Privacy Protocols
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;