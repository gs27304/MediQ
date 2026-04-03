import { useContext, useState } from "react";
import { BiMenu, BiArrowBack, BiLogOut, BiTrash } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL, getToken } from "../../config";
import { toast } from "react-toastify";

const TABS = [
  { key: "overview", label: "Dashboard Home" },
  { key: "appointments", label: "Patient Bookings" },
  { key: "settings", label: "Professional Profile" },
];

const Tabs = ({ tab, setTab }) => {
  const { user, dispatch } = useContext(authContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(p => !p);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.reload();
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Kya aap sure hain? This will permanently delete your medical records from our server."
    );
    if (!confirmDelete) return;

    try {
      const token = getToken();
      const res = await fetch(`${BASE_URL}/doctors/${user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const result = await res.json();
        throw Error(result.message);
      }
      dispatch({ type: "LOGOUT" });
      toast.success("Account successfully removed from our database.");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const TabBtn = ({ k, label, full = true, onClickExtra }) => (
    <button
      onClick={() => {
        setTab(k);
        onClickExtra?.();
      }}
      className={`flex items-center gap-3 transition-all duration-300 px-5 py-3.5 mb-2 font-semibold text-[15px] rounded-xl ${
        tab === k 
          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/40" 
          : "bg-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200"
      } ${full ? "w-full" : "px-6"}`}
    >
      {label}
    </button>
  );

  return (
    <div className="relative">
      {/* Mobile Menu Trigger - Indian Dark Style */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#1e293b] rounded-xl border border-slate-700 mb-4">
        <span className="text-slate-200 font-bold">Portal Menu</span>
        <span onClick={toggleMobileMenu} className="p-2 bg-slate-800 rounded-lg">
          <BiMenu className="w-6 h-6 cursor-pointer text-indigo-400" />
        </span>
      </div>

      {/* Desktop Sidebar - Premium Dark Card */}
      <div className="hidden lg:flex flex-col p-6 bg-[#1e293b] border border-slate-700 shadow-2xl items-center h-fit sticky top-10 rounded-2xl w-[280px]">
        <div className="w-full mb-8 border-b border-slate-700 pb-4">
            <h2 className="text-slate-100 font-black text-xl tracking-wide uppercase px-2">Doctor Portal</h2>
            <p className="text-slate-500 text-[10px] px-2 font-bold uppercase tracking-widest mt-1">Health-E India</p>
        </div>

        <div className="w-full">
          {TABS.map(t => (
            <TabBtn key={t.key} k={t.key} label={t.label} />
          ))}
        </div>

        <div className="mt-24 w-full pt-6 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full text-slate-300 bg-slate-800 hover:bg-slate-700 p-3.5 text-sm font-bold rounded-xl transition-all border border-slate-700"
          >
            <BiLogOut className="text-lg" /> Sign Out
          </button>
          
          <button
            onClick={handleDeleteAccount}
            className="flex items-center justify-center gap-2 w-full text-red-400 hover:text-white hover:bg-red-900/40 mt-4 p-3.5 text-xs font-semibold rounded-xl transition-all border border-red-900/20"
          >
            <BiTrash /> Close Account
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Side Drawer - Dark Themed */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[#0f172a] shadow-2xl transform transition-transform duration-500 ease-in-out z-50 lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } border-r border-slate-800`}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <h2 className="text-xl font-black text-slate-100 italic">Health-E</h2>
          <BiArrowBack className="w-6 h-6 cursor-pointer text-slate-400 hover:text-white" onClick={toggleMobileMenu} />
        </div>

        <div className="flex flex-col p-6">
          <p className="text-slate-500 text-[10px] font-bold uppercase mb-4 tracking-widest">Main Navigation</p>
          {TABS.map(t => (
            <TabBtn
              key={t.key}
              k={t.key}
              label={t.label}
              onClickExtra={toggleMobileMenu}
            />
          ))}

          <div className="mt-12 space-y-3">
             <p className="text-slate-500 text-[10px] font-bold uppercase mb-4 tracking-widest border-t border-slate-800 pt-6">Security</p>
            <button
              onClick={handleLogout}
              className="w-full text-slate-300 bg-slate-800 p-4 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <BiLogOut /> Exit Session
            </button>
            <button
              onClick={handleDeleteAccount}
              className="w-full text-red-400 bg-red-900/20 p-4 rounded-xl font-bold text-sm"
            >
              Request Account Deletion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;