import { useState } from 'react';
import { toast } from 'react-toastify';
import { BASE_URL, getToken } from "../../config";
import convertTime from "../../utils/convertTime";
import { BiCalendarCheck, BiRupee } from "react-icons/bi";

const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState("");

  const handleTimeSlotChange = (e) => {
    const selectedId = e.target.value;
    setSelectedTimeSlotId(selectedId);

    // 🔹 Data layer for tracking (Untouched)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "appointmentbooking.initiate",
      web: {
        componentname: "sidepanel",
        interactiontype: "dropdown",
        form: {
          section: "appointment booking",
          timeslotId: selectedId.toLowerCase()
        }
      }
    });

    localStorage.setItem("appointment_timeslotId", selectedId);
  };

  const bookingHandler = async (e) => {
    e.preventDefault();
    const token = getToken();

    if (!token) {
      toast.error("Kripya login karein to book your slot.");
      setTimeout(() => { window.location.href = "/login"; }, 2000);
      return;
    }

    if (!/^([A-Za-z0-9-_]+\.){2}[A-Za-z0-9-_]+$/.test(token)) {
      toast.error("Session expired. Please log in again.");
      localStorage.removeItem('token');
      setTimeout(() => { window.location.href = "/login"; }, 2000);
      return;
    }

    if (!selectedTimeSlotId) {
      toast.error("Please select an available time slot first.");
      return;
    }

    // 🔸 Data layer for form submission (Untouched)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "appointmentbooking.submit",
      web: {
        componentname: "sidepanel",
        interactiontype: "submit",
        form: {
          section: "appointment booking",
          doctorId: doctorId.toLowerCase(),
          timeslotId: selectedTimeSlotId.toLowerCase(),
          buttonText: "book appointment",
          price: `${ticketPrice} inr`
        }
      }
    });

    localStorage.setItem("appointment_doctorId", doctorId);
    localStorage.setItem("appointment_price", ticketPrice);

    setIsLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timeSlot: selectedTimeSlotId,
          ticketPrice,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Payment gateway error. Please try again.');
      }

      if (data.data?.url) {
        window.location.href = data.data.url;
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#1e293b] p-6 lg:p-8 rounded-[2rem] border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Aesthetic Glow */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full"></div>

      <div className="relative z-10">
        {/* Pricing Section */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-700/50">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Consultation Fee</p>
          <span className="flex items-center text-2xl lg:text-3xl text-emerald-400 font-black tracking-tighter">
            <BiRupee /> {ticketPrice}
          </span>
        </div>

        {/* Slot Selection */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4 text-slate-200">
             <BiCalendarCheck className="text-indigo-400 text-xl" />
             <p className="text-sm font-bold uppercase tracking-wide">Select Schedule</p>
          </div>
          
          <div className="relative group">
            <select 
              onChange={handleTimeSlotChange} 
              value={selectedTimeSlotId} 
              className="w-full bg-[#0f172a] border border-slate-700 text-slate-200 text-sm font-medium rounded-xl px-4 py-4 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer" 
              aria-label="Select a time slot"
            >
              <option value="">Available Timings</option>
              {timeSlots?.map((slot) => (
                <option key={slot.id} value={slot.id} className="bg-slate-900">
                  {slot.day.charAt(0).toUpperCase() + slot.day.slice(1)}: {convertTime(slot.startingTime)} - {convertTime(slot.endingTime)}
                </option>
              ))}
            </select>
            {/* Custom Dropdown Arrow */}
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={bookingHandler} 
          className={`w-full py-4 mt-8 rounded-xl font-black text-sm uppercase tracking-[0.1em] transition-all duration-300 transform shadow-2xl flex items-center justify-center gap-2 ${
            isLoading 
            ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
            : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-indigo-900/40 hover:-translate-y-1'
          }`}
          disabled={isLoading} 
          aria-label="Book appointment"
        >
          {isLoading ? (
            <span className="flex items-center gap-2 italic">Proceeding to Gateway...</span>
          ) : (
            'Confirm Booking'
          )}
        </button>

        {/* Security Micro-copy */}
        <div className="mt-6 flex flex-col items-center gap-2 opacity-50">
           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest text-center">
             Instant Confirmation • GST Included
           </p>
           <div className="flex gap-4 grayscale brightness-50">
              {/* Add small payment icons or text placeholders if needed */}
           </div>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;