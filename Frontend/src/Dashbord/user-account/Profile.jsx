import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, getToken } from "../../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import "react-toastify/dist/ReactToastify.css";

const Profile = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState("");
  const [previewURL, setPreviewURL] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: selectedFile,
    gender: "",
    bloodType: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({ 
      name: user.name, 
      email: user.email, 
      photo: user.photo, 
      gender: user.gender, 
      bloodType: user.bloodType 
    });
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handelFileInputChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    const appendIfNotEmpty = (key, value) => {
      if (value !== null && value !== undefined && value !== '') {
        formDataToSend.append(key, value);
      }
    };

    appendIfNotEmpty("name", formData.name);
    appendIfNotEmpty("email", formData.email);
    appendIfNotEmpty("password", formData.password);
    appendIfNotEmpty("gender", formData.gender);
    appendIfNotEmpty("photo", selectedFile);
    appendIfNotEmpty("bloodType", formData.bloodType);

    const token = getToken();

    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "put",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formDataToSend,
      });

      const { message } = await res.json();
      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success("Profile Updated Successfully");
      navigate("/users/profile/me");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 bg-[#1e293b] p-8 rounded-3xl border border-slate-800 shadow-2xl">
      <div className="mb-8 border-b border-slate-700 pb-4">
        <h2 className="text-slate-100 text-2xl font-black tracking-tight">Personal Health Record</h2>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Update your identity & medical info</p>
      </div>

      <form onSubmit={submitHandler} className="space-y-6">
        <div className="space-y-1">
          <label className="text-slate-400 text-xs font-bold ml-1 uppercase">Full Name (As per Govt. ID)</label>
          <input
            type="text"
            placeholder="Dr./Mr./Ms. Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-5 py-3.5 bg-[#0f172a] border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-100 transition-all"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-slate-400 text-xs font-bold ml-1 uppercase">Email Address (Read-Only)</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            className="w-full px-5 py-3.5 bg-slate-900/40 border border-slate-800 rounded-xl text-slate-500 cursor-not-allowed italic"
            readOnly
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-slate-400 text-xs font-bold ml-1 uppercase">Security Password</label>
            <input
              type="password"
              placeholder="••••••••"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-5 py-3.5 bg-[#0f172a] border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-100 transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-slate-400 text-xs font-bold ml-1 uppercase">Blood Group</label>
            <input
              type="text"
              placeholder="e.g. O+ve"
              name="bloodType"
              value={formData.bloodType}
              onChange={handleInputChange}
              className="w-full px-5 py-3.5 bg-[#0f172a] border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-100 transition-all font-bold"
              required
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-[#0f172a] p-5 rounded-2xl border border-slate-800">
          <div className="w-full">
            <label className="text-slate-400 text-xs font-bold uppercase block mb-2">Gender Identification</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-sm font-semibold rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Others</option>
            </select>
          </div>

          <div className="flex items-center gap-4 w-full">
             {previewURL ? (
                <figure className="w-14 h-14 rounded-2xl border-2 border-indigo-500 shadow-lg shadow-indigo-900/20 flex-shrink-0 overflow-hidden">
                  <img src={previewURL} alt="Preview" className="w-full h-full object-cover" />
                </figure>
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-slate-500 text-xs">No Pic</div>
              )}

              <div className="relative flex-1">
                <input
                  type="file"
                  name="photo"
                  id="customFile"
                  onChange={handelFileInputChange}
                  accept=".jpg, .png"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <label
                  htmlFor="customFile"
                  className="w-full flex items-center justify-center px-4 py-3 bg-slate-800 text-slate-300 text-xs font-black uppercase tracking-tighter rounded-xl border border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer truncate"
                >
                  {selectedFile ? selectedFile.name : 'Change Photo'}
                </label>
              </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-black py-4 rounded-xl text-lg shadow-2xl shadow-indigo-900/40 transition-all flex items-center justify-center"
          >
            {loading ? <HashLoader size={25} color="#ffffff" /> : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;