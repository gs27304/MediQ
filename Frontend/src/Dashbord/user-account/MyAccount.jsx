import React, { useContext, useState, useEffect } from "react";
import { authContext } from "../../context/AuthContext";
import Loading from "../../Components/Loader/Loading";
import MyBookings from "./MyBookings";
import Profile from "./Profile";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL, getToken } from "../../config";
import Error from "../../Components/Error/Error";
import { toast } from "react-toastify";

const MyAccount = () => {
  const [tab, setTab] = useState("bookings");
  const { dispatch } = useContext(authContext);

  const {
    data: userData,
    loading,
    error,
    fetchData: fetchUserData,
  } = useFetchData(`${BASE_URL}/users/profile/me`);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.reload();
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Kya aap sure hain? This will permanently delete your MediQ account and medical history. This cannot be undone."
    );
  
    if (confirmDelete) {
      try {
        const token = getToken();
        const res = await fetch(`${BASE_URL}/users/${userData._id}`, {
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
        toast.success("Account successfully removed from our records.");
      } catch (error) {
        toast.error(error.message || 'Kuch error aagaya. Please try again.');
      }
    }
  };

  return (
    <section className="min-h-screen bg-[#0f172a] py-12">
      <div className="max-w-[1170px] px-6 mx-auto mt-5">
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}

        {!loading && !error && userData && (
          <div className="grid md:grid-cols-3 gap-10">
            
            {/* User Info Sidebar Card */}
            <div className="pb-10 px-8 rounded-2xl bg-[#1e293b] border border-slate-800 shadow-2xl h-fit">
              <div className="flex flex-col items-center justify-center pt-8">
                <figure className="w-[120px] h-[120px] rounded-2xl border-4 border-indigo-500/30 overflow-hidden shadow-xl ring-4 ring-slate-900">
                  <img
                    src={userData.photo}
                    alt="User Profile"
                    className="w-full h-full object-cover"
                  />
                </figure>
                
                <div className="text-center mt-6">
                  <h3 className="text-2xl font-black text-slate-100 tracking-tight">
                    {userData.name}
                  </h3>
                  <p className="text-slate-400 text-sm font-medium mt-1">
                    {userData.email}
                  </p>
                  
                  <div className="mt-6 inline-flex items-center gap-3 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-700">
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Blood Group</span>
                    <span className="text-red-500 text-xl font-black">
                      {userData.bloodType || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-12 space-y-4">
                <button
                  onClick={handleLogout}
                  className="w-full text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 py-3 font-bold rounded-xl transition-all shadow-lg"
                >
                  Sign Out
                </button>
                <button 
                  onClick={handleDeleteAccount} 
                  className="w-full text-red-400 hover:text-white hover:bg-red-600/20 py-3 text-sm font-semibold rounded-xl transition-all border border-red-900/10"
                >
                  Close My Account
                </button>
              </div>
            </div>

            {/* Content Tabs Area */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-8 bg-[#1e293b] p-2 rounded-2xl border border-slate-800 w-fit">
                <button
                  onClick={() => setTab("bookings")}
                  className={`${
                    tab === "bookings" 
                    ? "bg-indigo-600 text-white shadow-indigo-900/40 shadow-lg" 
                    : "text-slate-400 hover:text-slate-200"
                  } py-2.5 px-6 rounded-xl font-bold text-sm transition-all duration-300`}
                >
                  Appointments & History
                </button>
                <button
                  onClick={() => setTab("settings")}
                  className={`${
                    tab === "settings" 
                    ? "bg-indigo-600 text-white shadow-indigo-900/40 shadow-lg" 
                    : "text-slate-400 hover:text-slate-200"
                  } py-2.5 px-6 rounded-xl font-bold text-sm transition-all duration-300`}
                >
                  Kyc & Settings
                </button>
              </div>

              <div className="bg-[#1e293b] rounded-3xl p-6 md:p-10 border border-slate-800 shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-4">
                {tab === "bookings" && (
                  <div>
                    <h2 className="text-slate-100 text-xl font-bold mb-6">Your Consultation History</h2>
                    <MyBookings />
                  </div>
                )}
                {tab === "settings" && (
                  <div>
                    <h2 className="text-slate-100 text-xl font-bold mb-6">Personal Identity Records</h2>
                    <Profile user={userData} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAccount;