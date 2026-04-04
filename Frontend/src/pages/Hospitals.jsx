import { useEffect, useState, useContext } from "react";
import { BASE_URL } from "../config";
import HashLoader from "react-spinners/HashLoader";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";

const Hospitals = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. Extract 'user' from context alongside 'token'
    const { token, user } = useContext(authContext);
    const navigate = useNavigate();

    const fallbackImage = "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=800&auto=format&fit=crop";

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        // Helper 1: Fetch Hospitals WITH sorting (requires lat/lng)
        const fetchSortedHospitals = (latitude, longitude) => {
            fetch(`${BASE_URL}/hospitals?lat=${latitude}&lng=${longitude}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => res.json())
            .then(json => {
                setData(json.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to fetch nearby facilities.");
                setLoading(false);
            });
        };

        // Helper 2: Fetch ALL Hospitals WITHOUT sorting (absolute worst-case fallback)
        const fetchUnsortedHospitals = () => {
            fetch(`${BASE_URL}/hospitals`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => res.json())
            .then(json => {
                setData(json.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to fetch facilities.");
                setLoading(false);
            });
        };

        // 2. Safely extract user's saved coordinates from DB (Remember: [lng, lat])
        const savedLng = user?.location?.coordinates?.[0];
        const savedLat = user?.location?.coordinates?.[1];
        
        // Ensure they aren't [0,0] (Null Island)
        const hasValidSavedLocation = savedLat && savedLng && (savedLat !== 0 || savedLng !== 0);

        // 3. Centralized Fallback Logic
        const handleLocationFallback = () => {
            if (hasValidSavedLocation) {
                // Radial sort based on their registered Home Address!
                fetchSortedHospitals(savedLat, savedLng); 
            } else {
                // If geocoding failed during signup too, just show all randomly
                fetchUnsortedHospitals(); 
            }
        };

        // 4. Trigger Browser GPS
        if (!navigator.geolocation) {
            handleLocationFallback();
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                // GPS ALLOWED: Sort from their exact live physical location
                fetchSortedHospitals(pos.coords.latitude, pos.coords.longitude);
            },
            () => {
                // GPS DENIED: Fallback to their registered Address!
                handleLocationFallback();
            }
        );
    }, [token, navigate, user]);

    if (loading) return <div className="flex items-center justify-center h-screen"><HashLoader color="#4f46e5" /></div>;


    return (
        <div className="container py-16 px-6">
            <div className="mb-10">
                <h1 className="text-4xl font-black text-white tracking-tight">Emergency Resource Hub</h1>
                <p className="text-slate-400 mt-2">Real-time inventory for ICU beds and blood banks based on your proximity.</p>
            </div>

            {error ? (
                <div className="bg-red-900/20 border border-red-800 p-6 rounded-2xl text-red-400">{error}</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.map(h => (
                        <div key={h._id} className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] hover:border-indigo-500/50 transition-all group flex flex-col">
                            
                            {/* NEW: Hospital Image Section */}
                            <div className="w-full h-48 mb-5 rounded-2xl overflow-hidden bg-slate-800 shrink-0">
                                <img 
                                    src={h.photo || fallbackImage} 
                                    alt={h.name} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">{h.name}</h2>
                                <p className="text-slate-500 text-sm mt-1">{h.address}</p>
                            </div>

                            {h.calculatedDistance !== undefined && (
                                <div className="bg-indigo-900/50 text-indigo-300 border border-indigo-700/50 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                                    {(h.calculatedDistance / 1000).toFixed(1)} km away
                                </div>
                            )}

                            {/* Resource: ICU Beds */}
                            <div className="mt-6 bg-red-950/30 p-4 rounded-2xl border border-red-900/30 flex justify-between items-center">
                                <div>
                                    <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">ICU Status</p>
                                    <p className="text-slate-300 text-sm">Unbooked Beds</p>
                                </div>
                                <span className="text-3xl font-black text-red-500">
                                    {h.icuBeds?.available || h.icuBedsUnbooked || 0}
                                </span>
                            </div>

                            {/* Resource: Blood Inventory */}
                            <div className="mt-6 flex-grow">
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3">Blood Bank (Units)</p>
                                <div className="grid grid-cols-4 gap-2">
                                    {Object.entries(h.bloodInventory || {}).map(([type, bloodObj]) => (
                                        <div key={type} className="text-center bg-slate-800/50 p-2 rounded-xl border border-slate-700">
                                            <p className="text-[10px] text-indigo-400 font-bold">{type}</p>
                                            <p className="text-xs text-white font-bold">{bloodObj?.available || 0}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => {
                                    // Remember: MongoDB stores coordinates as [longitude, latitude]
                                    const lng = h.location.coordinates[0];
                                    const lat = h.location.coordinates[1];
                                    
                                    // Construct the Google Maps Directions URL
                                    const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
                                    
                                    // Open in a new tab
                                    window.open(mapUrl, "_blank", "noopener,noreferrer");
                                }}
                                className="w-full mt-8 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all"
                            >
                                Get Directions
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Hospitals;