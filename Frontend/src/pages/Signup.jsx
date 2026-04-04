import React, { useState } from "react";
import signupImg from "../assets/images/signup.gif";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { BiMapPin, BiCloudUpload } from "react-icons/bi";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [previewURL, setPreviewURL] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    role: "patient",
    phone: "",
    address: "", // Now shared by all roles
    lat: "", // Optional
    lng: "", // Optional
    icuBeds: 0,
    generalBeds: 0,
    bloodA: 0,
    bloodB: 0,
    bloodO: 0,
    bloodAB: 0,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file)); 
    }
  };

  // Optional Location Fetcher
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFormData(prev => ({
            ...prev,
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }));
          setLocationLoading(false);
          toast.success("Location captured!");
        },
        () => {
          setLocationLoading(false);
          toast.error("Location access denied. You can still register.");
        }
      );
    } else {
      toast.error("Geolocation not supported");
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      // Appending core fields
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("role", formData.role);
      data.append("phone", formData.phone);
      data.append("address", formData.address); // Address sent for all roles

      // Only append lat/lng if the user clicked the button
      if (formData.lat && formData.lng) {
        data.append("lat", formData.lat);
        data.append("lng", formData.lng);
      }

      if (formData.role !== "hospital") {
        data.append("gender", formData.gender);
      } else {
        data.append("icuBeds", formData.icuBeds);
        data.append("generalBeds", formData.generalBeds);
        data.append("bloodA", formData.bloodA);
        data.append("bloodB", formData.bloodB);
        data.append("bloodO", formData.bloodO);
        data.append("bloodAB", formData.bloodAB);
      }

      if (selectedFile) {
        data.append("photo", selectedFile);
      }

      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        body: data, 
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      toast.success(result.message);
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-5 xl:px-0 py-10 bg-[#0f172a] min-h-screen">
      <div className="max-w-[1170px] mx-auto bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          <div className="hidden lg:block bg-indigo-600/5 p-10">
            <img src={signupImg} alt="" className="w-full rounded-2xl mix-blend-screen" />
          </div>

          <div className="p-8 lg:p-12">
            <h3 className="text-white text-2xl font-bold mb-8">Create Account</h3>
            
            <form onSubmit={submitHandler} className="space-y-4">
              <input type="text" name="name" placeholder="Full Name" onChange={handleInputChange} className="w-full bg-slate-800 p-3 rounded-xl text-white outline-none border border-slate-700" required />
              <input type="email" name="email" placeholder="Email" onChange={handleInputChange} className="w-full bg-slate-800 p-3 rounded-xl text-white outline-none border border-slate-700" required />
              <input type="password" name="password" placeholder="Password" onChange={handleInputChange} className="w-full bg-slate-800 p-3 rounded-xl text-white outline-none border border-slate-700" required />
              
              <div className="grid grid-cols-2 gap-4">
                <select name="role" value={formData.role} onChange={handleInputChange} className="bg-slate-800 p-3 rounded-xl text-slate-300 border border-slate-700">
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="hospital">Hospital</option>
                </select>
                
                {formData.role !== 'hospital' && (
                  <select name="gender" onChange={handleInputChange} className="bg-slate-800 p-3 rounded-xl text-slate-300 border border-slate-700" required>
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                )}
              </div>

              {/* COMMON ADDRESS FIELD FOR EVERYONE */}
              <input type="text" name="address" placeholder="Full Address / Location" onChange={handleInputChange} className="w-full bg-slate-800 p-3 rounded-xl text-white outline-none border border-slate-700" required />

              {/* OPTIONAL GEOLOCATION */}
              <div className="flex items-center gap-4 bg-slate-800/50 p-3 rounded-xl border border-slate-700">
                <button type="button" onClick={handleGetLocation} className="bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 px-3 py-2 rounded text-xs flex items-center gap-1 hover:bg-indigo-600 hover:text-white transition-all font-bold">
                  <BiMapPin /> {locationLoading ? "Fetching..." : (formData.lat ? "Coordinates Set" : "Get GPS Location (Optional)")}
                </button>
                <span className="text-[10px] text-slate-500">
                  {formData.lat ? `${formData.lat.toFixed(4)}, ${formData.lng.toFixed(4)}` : "Boosts nearby search accuracy"}
                </span>
              </div>

              {/* HOSPITAL SPECIFIC DATA */}
              {formData.role === 'hospital' && (
                <div className="space-y-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="number" name="icuBeds" placeholder="ICU Beds" onChange={handleInputChange} className="bg-slate-800 p-3 rounded-xl text-white border border-slate-700" />
                    <input type="number" name="generalBeds" placeholder="General Beds" onChange={handleInputChange} className="bg-slate-800 p-3 rounded-xl text-white border border-slate-700" />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 font-bold mb-2">Blood Units Available:</p>
                    <div className="grid grid-cols-4 gap-2">
                      <input type="number" name="bloodA" placeholder="A+" onChange={handleInputChange} className="bg-slate-800 p-2 text-xs rounded text-white border border-slate-700" />
                      <input type="number" name="bloodB" placeholder="B+" onChange={handleInputChange} className="bg-slate-800 p-2 text-xs rounded text-white border border-slate-700" />
                      <input type="number" name="bloodO" placeholder="O+" onChange={handleInputChange} className="bg-slate-800 p-2 text-xs rounded text-white border border-slate-700" />
                      <input type="number" name="bloodAB" placeholder="AB+" onChange={handleInputChange} className="bg-slate-800 p-2 text-xs rounded text-white border border-slate-700" />
                    </div>
                  </div>
                </div>
              )}

              {/* IMAGE UPLOAD */}
              <div className="flex items-center gap-4 pt-2">
                {previewURL && <img src={previewURL} className="w-12 h-12 rounded-full border-2 border-indigo-500 object-cover" />}
                <label className="flex-1 bg-slate-800 border border-dashed border-slate-600 p-3 rounded-xl text-slate-400 text-sm cursor-pointer hover:border-indigo-500 transition-all flex items-center justify-center gap-2">
                  <BiCloudUpload className="text-xl"/> {selectedFile ? "File Selected" : "Upload Photo"}
                  <input type="file" onChange={handleFileInputChange} className="hidden" accept="image/*" />
                </label>
              </div>

              <button disabled={loading} type="submit" className="w-full bg-indigo-600 p-4 rounded-2xl text-white font-bold hover:bg-indigo-500 flex justify-center mt-6">
                {loading ? <HashLoader size={25} color="#fff" /> : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;