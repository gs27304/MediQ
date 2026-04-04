import { useEffect, useRef, useContext, useState } from "react";
import logo from "../../assets/images/logo01.png";
import defaultPhoto from "../../assets/images/user.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";

const navLinks = [
  { path: "/home", display: "Portal Home" },
  { path: "/doctors", display: "Specialist Hub" },
  { path: "/hospitals", display: "Nearby Hospital" },
  { path: "/services", display: "Core Protocols" },
  { path: "/blog", display: "Clinical Ledger" },
  { path: "/contact", display: "Neural Support" },
];

function Header() {
  const { user, role, token } = useContext(authContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);

  const apiUrl =
    role === "doctor"
      ? `${BASE_URL}/doctors/profile/me`
      : `${BASE_URL}/users/profile/me`;

  const { data: userData } = useFetchData(token ? apiUrl : null);

  useEffect(() => {
    const handleStickyHeader = () => {
      if (window.scrollY > 50) {
        headerRef.current?.classList.add("sticky_header_active");
      } else {
        headerRef.current?.classList.remove("sticky_header_active");
      }
    };

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
        link: {
          text: text.toLowerCase(),
          url: fullUrl.toLowerCase(),
          section: "header",
        },
        componentname: "header",
      },
    });
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-[1000] bg-[#020617] border-b border-white/[0.05] transition-all duration-500"
      >
        <div className="container mx-auto px-4 lg:px-20">
          <div
            id="header_inner"
            className="flex items-center justify-between h-[55px] lg:h-[60px] transition-all duration-500"
          >
            {/* LOGO */}
            <Link
              to="/"
              onClick={() => pushDataLayerEvent("Logo", "/")}
              className="flex items-center gap-3"
            >
              <img
                src={logo}
                alt="MediQ Logo"
                className="w-7 h-7 lg:w-8 lg:h-8"
              />
              <span className="text-lg font-black text-white uppercase hidden sm:block">
                Medi<span className="text-indigo-500">Q</span>
              </span>
            </Link>

            {/* NAV LINKS */}
            <div className="hidden md:flex">
              <ul className="flex items-center gap-8">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      to={link.path}
                      end
                      onClick={() =>
                        pushDataLayerEvent(link.display, link.path)
                      }
                      className={({ isActive }) =>
                        isActive
                          ? "text-indigo-400 text-[11px] font-bold uppercase tracking-[0.15em]"
                          : "text-slate-400 text-[11px] font-bold uppercase tracking-[0.15em] hover:text-white"
                      }
                    >
                      {link.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* USER */}
            <div className="flex items-center gap-4">
              {token && user ? (
                <Link
                  to={
                    role === "doctor"
                      ? "/doctors/profile/me"
                      : "/users/profile/me"
                  }
                  className="flex items-center gap-2"
                >
                  <figure className="w-[30px] h-[30px] rounded-full overflow-hidden">
                    <img
                      src={userData?.photo || defaultPhoto}
                      className="w-full h-full object-cover"
                      alt="User"
                    />
                  </figure>
                  <span className="hidden lg:block text-[10px] text-slate-400 uppercase">
                    {role}
                  </span>
                </Link>
              ) : (
                <Link to="/login">
                  <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-[11px] uppercase font-bold">
                    Login
                  </button>
                </Link>
              )}

              <span
                className="md:hidden text-white cursor-pointer"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <BiMenu className="w-5 h-5" />
              </span>
            </div>
          </div>
        </div>

        <style jsx>{`
          .sticky_header_active {
            background: rgba(2, 6, 23, 0.96) !important;
            backdrop-filter: blur(18px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
          }

          .sticky_header_active #header_inner {
            height: 50px !important;
          }
        `}</style>
      </header>

      {/* IMPORTANT: Prevent hidden hero section */}
      <div className="h-[55px] lg:h-[60px]" />
    </>
  );
}

export default Header;