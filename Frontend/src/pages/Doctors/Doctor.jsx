import React, { useEffect, useState } from "react";
import DoctorCard from "../../Components/Doctors/DoctorCard";
import TestimonialComponent from "../../Components/Testimonials/Testimonials";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../Components/Loader/Loading";
import Error from "../../Components/Error/Error";
import { BiSearchAlt } from "react-icons/bi";

const Doctor = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");
  const [searchStarted, setSearchStarted] = useState(false);

  // Ensure dataLayer exists
  window.dataLayer = window.dataLayer || [];

  // Event: search overlay opened
  const triggerSearchOverlayEvent = () => {
    window.dataLayer.push({
      event: "web.search.overlay",
      web: {
        webInteractionDetails: {
          interactionType: "search",
          interactionAction: "overlay open",
        },
      },
    });
  };

  // Event: push search results event
  const triggerSearchResultsLoadedEvent = (searchQuery) => {
    if (!searchQuery) return;

    window.dataLayer.push({
      event: "web.search.loadResults",
      web: {
        webPageDetails: {
          pageName: "specialist search results",
          pageType: "search result",
          siteSection: "medical experts"
        },
        search: {
          searchTerm: searchQuery.toLowerCase()
        }
      }
    });
  };

  // Manual Search Execution
  const handleSearch = () => {
    const trimmed = query.trim();
    setQuery(trimmed);
    triggerSearchResultsLoadedEvent(trimmed);
  };

  // Debounce logic for real-time filtering
  useEffect(() => {
    const timeout = setTimeout(() => {
      const trimmed = query.trim();
      setDebounceQuery(trimmed);

      if (trimmed !== "") {
        triggerSearchResultsLoadedEvent(trimmed);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  const {
    data: doctors,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors?query=${debounceQuery}`);

  return (
    <div className="bg-[#0f172a] min-h-screen">
      {/* Search Hero Section */}
      <section className="bg-[#1e293b] py-16 border-b border-slate-800">
        <div className="container text-center">
          <h2 className="text-4xl lg:text-5xl font-black text-slate-100 tracking-tight mb-4">
            Find Your Specialist
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-10 font-medium">
            Consult with top-rated medical experts in India. Search by name, department, or health concern.
          </p>

          <div className="max-w-[680px] mx-auto relative group">
            <div className="flex items-center bg-[#0f172a] rounded-2xl border border-slate-700 p-2 shadow-2xl focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all">
              <BiSearchAlt className="text-slate-500 text-2xl ml-4" />
              <input
                type="search"
                className="py-4 pl-4 pr-2 bg-transparent w-full outline-none text-slate-100 placeholder:text-slate-500 font-medium"
                placeholder="Ex: Cardiologist, Neurologist, or Dr. Sharma..."
                value={query}
                onFocus={() => {
                  if (!searchStarted) {
                    triggerSearchOverlayEvent();
                    setSearchStarted(true);
                  }
                }}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-black transition-all shadow-lg shadow-indigo-900/40"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
            
            {/* Quick Filter Tags Placeholder */}
            <div className="flex gap-3 mt-4 justify-center">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Popular:</span>
                <button onClick={() => setQuery("Physician")} className="text-[10px] text-slate-400 hover:text-indigo-400 font-bold uppercase tracking-wider">Physician</button>
                <button onClick={() => setQuery("Surgeon")} className="text-[10px] text-slate-400 hover:text-indigo-400 font-bold uppercase tracking-wider">Surgeon</button>
                <button onClick={() => setQuery("Dentist")} className="text-[10px] text-slate-400 hover:text-indigo-400 font-bold uppercase tracking-wider">Dentist</button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16">
        <div className="container">
          {loading && <div className="flex justify-center py-20"><Loader /></div>}
          {error && <Error />}
          
          {!loading && !error && (
            <>
              <div className="flex items-center justify-between mb-10 px-2">
                <h3 className="text-slate-100 font-bold text-lg">
                  {debounceQuery ? `Results for "${debounceQuery}"` : "Verified Experts Near You"}
                </h3>
                <span className="bg-slate-800 text-slate-400 px-3 py-1 rounded text-xs font-bold uppercase tracking-tighter border border-slate-700">
                  {doctors.length} Doctors Found
                </span>
              </div>

              {doctors.length === 0 ? (
                <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-dashed border-slate-800">
                   <p className="text-slate-500 font-medium italic italic">No matching experts found. Try searching for a different specialization.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {doctors.map((doctor, index) => (
                    <DoctorCard key={`${doctor.id}-${index}`} doctor={doctor} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[#1e293b] py-20 border-t border-slate-800">
        <div className="container">
          <div className="xl:w-[600px] mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-slate-100 text-center tracking-tight">
              Feedback from Our Patients
            </h2>
            <p className="text-slate-400 text-center mt-4 font-medium leading-relaxed">
              Trusted by thousands of families across India. Our medical network is committed to providing world-class care with transparency and empathy.
            </p>
          </div>
          <div className="bg-[#0f172a]/50 p-8 rounded-[2rem] border border-slate-800 shadow-2xl">
            <TestimonialComponent />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Doctor;