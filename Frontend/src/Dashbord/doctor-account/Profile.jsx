import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BASE_URL, getToken } from "../../config";
import { toast } from "react-toastify";

const Profile = ({ doctorData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: "",
    qualifications: [],
    experiences: [],
    timeSlots: [],
    about: "",
    photo: "",
  });

  useEffect(() => {
    setFormData({
      name: doctorData?.name,
      email: doctorData?.email,
      phone: doctorData?.phone,
      bio: doctorData?.bio,
      gender: doctorData?.gender,
      specialization: doctorData?.specialization,
      ticketPrice: doctorData?.ticketPrice,
      qualifications: doctorData?.qualifications,
      experiences: doctorData?.experiences,
      timeSlots: doctorData?.timeSlots,
      about: doctorData?.about,
      photo: doctorData?.photo || "",
    });
  }, [doctorData]);

  const [previewURL, setPreviewURL] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

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

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("bio", formData.bio);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("specialization", formData.specialization);
    formDataToSend.append("ticketPrice", formData.ticketPrice);
    formDataToSend.append("qualifications", JSON.stringify(formData.qualifications));
    formDataToSend.append("experiences", JSON.stringify(formData.experiences));
    formDataToSend.append("timeSlots", JSON.stringify(formData.timeSlots));
    formDataToSend.append("about", formData.about);

    if (selectedFile) {
      formDataToSend.append("photo", selectedFile);
    }

    const token = getToken();
    try {
      const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const result = await res.json();

      if (!res.ok) {
        throw Error(result.message);
      }

      toast.success("Profile updated successfully for Dr. " + formData.name);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addItem = (key, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item],
    }));
  };

  const handleReusableInputChangefunc = (key, index, event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const updateItems = [...prevFormData[key]];
      updateItems[index][name] = value;
      return {
        ...prevFormData,
        [key]: updateItems,
      };
    });
  };

  const deleteItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i != index),
    }));
  };

  const addQualification = (e) => {
    e.preventDefault();
    addItem("qualifications", { startingDate: "", endingDate: "", degree: "", university: "" });
  };

  const handleQualificationChange = (event, index) => handleReusableInputChangefunc("qualifications", index, event);
  const deleteQualification = (e, index) => { e.preventDefault(); deleteItem("qualifications", index); };

  const addExperience = (e) => {
    e.preventDefault();
    addItem("experiences", { startingDate: "", endingDate: "", position: "", hospital: "" });
  };

  const handleExperienceChange = (event, index) => handleReusableInputChangefunc("experiences", index, event);
  const deleteExperience = (e, index) => { e.preventDefault(); deleteItem("experiences", index); };

  const addTimeSlot = (e) => {
    e.preventDefault();
    addItem("timeSlots", { day: "", startingTime: "", endingTime: "" });
  };

  const handleTimeSlotChange = (event, index) => handleReusableInputChangefunc("timeSlots", index, event);
  const deleteTimeSlot = (e, index) => { e.preventDefault(); deleteItem("timeSlots", index); };

  return (
    <div className="bg-[#0f172a] p-8 rounded-2xl border border-slate-800 shadow-2xl">
      <h2 className="text-slate-100 font-extrabold text-[28px] leading-tight mb-2">
        Kyc & Personal Records
      </h2>
      <p className="text-slate-400 mb-10 text-sm italic">Manage your professional identity and clinic availability.</p>

      <form className="space-y-8">
        {/* Basic Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-slate-300 text-sm font-semibold ml-1">Full Name (As per MCI/NMC)*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-slate-300 text-sm font-semibold ml-1">Email ID (Registered)*</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              className="w-full bg-[#0f172a] border border-slate-800 rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed"
              readOnly
            />
          </div>
          <div className="space-y-2">
            <label className="text-slate-300 text-sm font-semibold ml-1">Mobile Number (+91)*</label>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-slate-300 text-sm font-semibold ml-1">Brief Catchphrase/Bio*</label>
            <input
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Categories Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#1e293b]/50 p-6 rounded-2xl border border-slate-800">
          <div className="space-y-2">
            <label className="text-slate-300 text-sm font-semibold">Gender Identity*</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-slate-300 text-sm font-semibold">Medical Specialty*</label>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select</option>
              <option value="surgeon">Surgeon</option>
              <option value="neurologist">Neurologist</option>
              <option value="dermatologist">Dermatologist</option>
              <option value="medicine">General Physician</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-slate-300 text-sm font-semibold">Consultation Fee (INR)*</label>
            <input
              type="number"
              name="ticketPrice"
              value={formData.ticketPrice}
              onChange={handleInputChange}
              className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-emerald-400 font-bold"
            />
          </div>
        </div>

        {/* Dynamic List Sections (Qualifications/Experience) */}
        <div className="space-y-6">
          <h3 className="text-slate-200 font-bold text-lg border-l-4 border-indigo-500 pl-3">Educational Qualifications</h3>
          {formData.qualifications?.map((item, index) => (
            <div key={index} className="p-5 bg-[#1e293b] rounded-xl border border-slate-700 relative group">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="date" name="startingDate" value={item.startingDate} onChange={(e) => handleQualificationChange(e, index)} className="bg-[#0f172a] border border-slate-700 p-3 rounded-lg text-slate-300" />
                <input type="date" name="endingDate" value={item.endingDate} onChange={(e) => handleQualificationChange(e, index)} className="bg-[#0f172a] border border-slate-700 p-3 rounded-lg text-slate-300" />
                <input type="text" name="degree" placeholder="Degree (e.g. MBBS, MD)" value={item.degree} onChange={(e) => handleQualificationChange(e, index)} className="bg-[#0f172a] border border-slate-700 p-3 rounded-lg text-slate-100" />
                <input type="text" name="university" placeholder="Medical College / University" value={item.university} onChange={(e) => handleQualificationChange(e, index)} className="bg-[#0f172a] border border-slate-700 p-3 rounded-lg text-slate-100" />
              </div>
              <button onClick={(e) => deleteQualification(e, index)} className="absolute -top-3 -right-3 bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white p-2 rounded-full transition-all border border-red-500/50">
                <AiOutlineDelete />
              </button>
            </div>
          ))}
          <button onClick={addQualification} className="text-indigo-400 hover:text-indigo-300 font-bold text-sm flex items-center gap-2 bg-indigo-500/10 px-4 py-2 rounded-lg border border-indigo-500/20 transition-all">
            + Add Academic Record
          </button>
        </div>

        {/* Time Slots Section */}
        <div className="space-y-6 bg-[#0f172a] p-6 rounded-2xl border border-dashed border-slate-700">
          <h3 className="text-slate-200 font-bold text-lg">Weekly OPD Schedule</h3>
          {formData.timeSlots?.map((item, index) => (
            <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
              <select name="day" value={item.day} onChange={(e) => handleTimeSlotChange(e, index)} className="bg-[#1e293b] border border-slate-700 p-3 rounded-lg text-slate-100">
                <option value="">Select Day</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
              </select>
              <input type="time" name="startingTime" value={item.startingTime} onChange={(e) => handleTimeSlotChange(e, index)} className="bg-[#1e293b] border border-slate-700 p-3 rounded-lg text-slate-100" />
              <input type="time" name="endingTime" value={item.endingTime} onChange={(e) => handleTimeSlotChange(e, index)} className="bg-[#1e293b] border border-slate-700 p-3 rounded-lg text-slate-100" />
              <button onClick={(e) => deleteTimeSlot(e, index)} className="bg-red-900/30 text-red-400 p-3 rounded-lg hover:bg-red-600 hover:text-white transition-all w-fit">
                <AiOutlineDelete size={20} />
              </button>
            </div>
          ))}
          <button onClick={addTimeSlot} className="bg-slate-800 text-slate-200 px-6 py-2 rounded-lg font-bold border border-slate-700 hover:bg-slate-700">
            + Add Slot
          </button>
        </div>

        {/* About Section */}
        <div className="space-y-2">
          <label className="text-slate-300 text-sm font-semibold ml-1">Professional Summary / About</label>
          <textarea
            name="about"
            rows={5}
            value={formData.about}
            placeholder="Introduce yourself to patients (Experience, Philosophy, etc.)"
            onChange={handleInputChange}
            className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:ring-2 focus:ring-indigo-500 transition-all"
          ></textarea>
        </div>

        {/* Photo Upload Section */}
        <div className="flex items-center gap-6 p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
          {previewURL && (
            <div className="relative">
              <img src={previewURL} alt="Profile" className="w-20 h-20 rounded-2xl object-cover ring-4 ring-indigo-500/20 shadow-xl" />
            </div>
          )}
          <div className="flex-1">
            <p className="text-slate-300 font-bold mb-1">Profile Photograph</p>
            <p className="text-slate-500 text-xs mb-3 italic">Max size 2MB. JPG or PNG only.</p>
            <div className="relative">
              <input type="file" name="photo" id="customFile" onChange={handelFileInputChange} accept=".jpg, .png" className="hidden" />
              <label htmlFor="customFile" className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-6 rounded-lg cursor-pointer transition-all shadow-lg shadow-indigo-500/20">
                {selectedFile ? "File Selected" : "Choose Image"}
              </label>
              {selectedFile && <span className="ml-3 text-slate-400 text-sm truncate max-w-[150px] inline-block">{selectedFile.name}</span>}
            </div>
          </div>
        </div>

        <button
          type="submit"
          onClick={updateProfileHandler}
          className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-black py-4 rounded-xl text-lg shadow-2xl shadow-indigo-900/40 transition-all transform hover:-translate-y-1"
        >
          Save & Update Professional Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;