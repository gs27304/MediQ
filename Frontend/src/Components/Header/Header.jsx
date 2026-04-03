import { useEffect, useRef, useContext, useState } from "react";
import logo from "../../assets/images/logo01.png";
import defaultPhoto from "../../assets/images/user.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu, BiArrowBack } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";

const navLinks = [
  { path: "/home", display: "Portal Home" },
  { path: "/doctors", display: "Specialist Hub" },
  { path: "/services", display: "Core Protocols" },
  { path: "/blog", display: "Clinical Ledger" },
  { path: "/contact", display: "Neural Support" },
];

function Header() {
  const { user, role, token } = useContext(authContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const apiUrl =
    role === "doctor"
      ? `${BASE_URL}/doctors/profile/me`
      : `${BASE_URL}/users/profile/me`;

  const { data: userData, loading } = useFetchData(token ? apiUrl : null);
  const headerRef = useRef(null);

  const handleStickyHeader = () => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      headerRef.current?.classList.add("sticky_header_active");
    } else {
      headerRef.current?.classList.remove("sticky_header_active");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyHeader);
    return () => window.removeEventListener("scroll", handleStickyHeader);
  }, []);

  const pushDataLayerEvent = (text, relativeUrl) => {
    const fullUrl = new URL(relativeUrl, window.location.origin).href;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "web.webinteractionlink.click",
      web: {
        interactiontype: "link click",
        link: { text: text.toLowerCase(), url: fullUrl.toLowerCase(), section: "header" },
        componentname: "header",
      },
    });
  };

  return (
    <header 
      /* SLIMMER UI: Reduced height and fixed base position */
      className="flex items-center bg-[#020617] border-b border-white/[0.05] transition-all duration-500 z-[1000] fixed top-0 left-0 w-full" 
      ref={headerRef}
    >
      <div className="container mx-auto px-4 lg:px-20">
        {/* HEIGHT DECREASED: Changed h-[100px] to h-[75px] */}
        <div className="flex items-center justify-between h-[65px] lg:h-[75px] transition-all duration-500" id="header_inner">
          
          {/* BRANDING ENGINE */}
          <div className="flex items-center gap-2">
            <Link to="/" onClick={() => pushDataLayerEvent("Logo", "/")} className="flex items-center gap-3 group">
              <img
                src={logo}
                alt="MediQ Logo"
                className="w-8 h-8 lg:w-9 lg:h-9 brightness-125"
              />
              <span className="text-xl font-black text-white tracking-tighter hidden sm:block uppercase">
                Medi<span className="text-indigo-500">Q</span>
              </span>
            </Link>
          </div>

          {/* NEURAL NAVIGATION */}
          <div className="hidden md:flex">
            <ul className="flex items-center gap-[2.2rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    end
                    className={({ isActive }) =>
                      isActive
                        ? "text-indigo-400 text-[12px] font-black uppercase tracking-[0.15em] relative transition-all"
                        : "text-slate-500 text-[12px] font-bold uppercase tracking-[0.15em] hover:text-slate-200 transition-all"
                    }
                    onClick={() => pushDataLayerEvent(link.display, link.path)}
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* AUTH SYSTEM */}
          <div className="flex items-center gap-4">
            {token && user ? (
              <Link
                to={role === "doctor" ? "/doctors/profile/me" : "/users/profile/me"}
                className="flex items-center gap-2.5 p-1 rounded-lg border border-white/5 bg-white/[0.02]"
                onClick={() => pushDataLayerEvent("Profile", role === "doctor" ? "/doctors/profile/me" : "/users/profile/me")}
              >
                <figure className="w-[30px] h-[30px] rounded overflow-hidden border border-white/10">
                  <img src={userData?.photo || defaultPhoto} className="w-full h-full object-cover" alt="User" />
                </figure>
                <span className="hidden lg:block text-[10px] font-black text-slate-400 uppercase tracking-widest">{role}</span>
              </Link>
            ) : (
              <Link to="/login" onClick={() => pushDataLayerEvent("Login", "/login")}>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-6 text-[11px] font-black uppercase tracking-widest rounded-lg transition-all">
                  Secure Access
                </button>
              </Link>
            )}

            <span className="md:hidden text-white bg-white/5 p-2 rounded-lg" onClick={() => setIsMobileMenuOpen(true)}>
              <BiMenu className="w-5 h-5 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ULTRA SLIM STICKY STATE */
        .sticky_header_active {
          background: rgba(2, 6, 23, 0.98) !important;
          backdrop-filter: blur(20px);
          height: 60px !important;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }
        .sticky_header_active #header_inner {
          height: 60px !important;
        }
      `}</style>
    </header>
  );
}

export default Header;