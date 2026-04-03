import React, { useState } from "react";
import { formateDate } from "../../utils/formateDate";
import { AiOutlineDelete } from "react-icons/ai";
import { BASE_URL, getToken } from "../../config";
import { toast } from "react-toastify";

const Appointments = ({ initialAppointments }) => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [statusState, setStatusState] = useState({});

  const handleStatusChange = async (id, event) => {
    const newStatus = event.target.value;

    setStatusState((prevStatus) => ({
      ...prevStatus,
      [id]: { status: newStatus, changed: true },
    }));

    const token = getToken();
    try {
      const res = await fetch(`${BASE_URL}/bookings/statusChange/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newStatus }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw Error(result.message);
      }

      toast.success(`Booking updated to ${newStatus}`);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleDelete = async (id, index) => {
    const token = getToken();

    try {
      const res = await fetch(`${BASE_URL}/bookings/deleteBooking/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (!res.ok) {
        throw Error(result.message);
      }

      setAppointments((prevAppointments) =>
        prevAppointments.filter((_, i) => i !== index)
      );

      toast.success("Record removed successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-900 shadow-2xl">
      <table className="w-full text-left text-sm text-slate-400">
        <thead className="text-xs text-slate-300 uppercase bg-slate-800/50 border-b border-slate-700">
          <tr>
            <th scope="col" className="px-6 py-4 font-bold">Patient Details</th>
            <th scope="col" className="px-6 py-4">Gender</th>
            <th scope="col" className="px-6 py-4">Fee</th>
            <th scope="col" className="px-6 py-4">Registration Date</th>
            <th scope="col" className="px-6 py-4">Schedule</th>
            <th scope="col" className="px-6 py-4">Live Status</th>
            <th scope="col" className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {appointments?.map((item, index) => (
            <tr key={item._id} className="hover:bg-slate-800/30 transition-colors duration-200">
              <th
                scope="row"
                className="flex items-center px-6 py-5 text-slate-100 whitespace-nowrap"
              >
                <img 
                  src={item.user.photo} 
                  className="w-12 h-12 rounded-lg object-cover border-2 border-slate-700" 
                  alt="Avatar" 
                />
                <div className="pl-4">
                  <div className="text-base font-bold tracking-tight">{item.user.name}</div>
                  <div className="text-xs font-medium text-slate-500">{item.user.email}</div>
                </div>
              </th>
              <td className="px-6 py-4 font-medium">{item.user.gender}</td>
              <td className="px-6 py-4">
                <span className="text-emerald-400 font-semibold">${item.ticketPrice}</span>
              </td>
              <td className="px-6 py-4 text-slate-500">{formateDate(item.createdAt)}</td>
              <td className="px-6 py-4 font-medium text-slate-300">
                <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">{item.timeSlot}</span>
              </td>
              <td className="px-6 py-4">
                <select
                  value={statusState[item._id]?.status || item.status || "pending"}
                  onChange={(event) => handleStatusChange(item._id, event)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 transition-all outline-none"
                  style={{ minWidth: "130px" }}
                  disabled={statusState[item._id]?.changed || item.status === "approved" || item.status === "cancelled"}
                >
                  <option value="pending" className="bg-slate-900">🕒 Pending Review</option>
                  <option value="approved" className="bg-slate-900">✅ Confirmed</option>
                  <option value="cancelled" className="bg-slate-900">❌ Cancelled</option>
                </select>
              </td>

              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => handleDelete(item._id, index)}
                  className="group relative bg-slate-800 hover:bg-red-900/40 p-2.5 rounded-xl text-slate-400 hover:text-red-400 transition-all duration-300 border border-slate-700 hover:border-red-800"
                  title="Remove Entry"
                >
                  <AiOutlineDelete className="text-xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;