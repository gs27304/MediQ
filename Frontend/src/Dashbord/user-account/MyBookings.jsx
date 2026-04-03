import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import DoctorCard from '../../Components/Doctors/DoctorCard';
import Loading from "../../Components/Loader/Loading";
import Error from "../../Components/Error/Error";
import { BsClock } from "react-icons/bs";
import { FaCheckCircle, FaExclamationCircle, FaTimesCircle } from "react-icons/fa";

const MyBookings = () => {
  const { data: appointments, loading, error } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

  // Restyled Status Icons with a more modern feel
  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <FaCheckCircle className="text-emerald-400 shadow-sm" />;
      case 'pending':
        return <FaExclamationCircle className="text-amber-400 animate-pulse" />;
      case 'cancelled':
        return <FaTimesCircle className="text-rose-500" />;
      default:
        return null;
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error errMessage={error} />;

  return (
    <div className="mt-8">
      {appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-900/50 rounded-3xl border border-dashed border-slate-800">
          <div className="bg-slate-800 p-4 rounded-full mb-4">
             <BsClock className="text-slate-500 text-3xl" />
          </div>
          <h2 className="text-slate-400 font-medium text-lg text-center px-4">
            Aapne abhi tak koi doctor book nahi kiya hai! <br />
            <span className="text-sm text-slate-500 font-normal">Your upcoming consultations will appear here.</span>
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {appointments.map((appointment, index) => (
            appointment?.doctor ? (
              <div 
                key={appointment.doctor._id || index} 
                className="group relative bg-[#1e293b] p-5 rounded-2xl border border-slate-800 shadow-xl hover:border-indigo-500/50 transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Doctor Card Wrapper */}
                <div className="mb-4">
                  <DoctorCard doctor={appointment.doctor} />
                </div>

                {/* Info Overlay Bar */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
                  
                  {/* Status Indicator */}
                  <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                    {getStatusIcon(appointment.status)}
                    <span className="capitalize text-xs font-bold tracking-wide text-slate-300">
                      {appointment.status === 'approved' ? 'Confirmed' : appointment.status}
                    </span>
                  </div>

                  {/* Schedule Details */}
                  <div className="flex items-center text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                    <BsClock className="mr-2 text-indigo-400" />
                    <span className="text-xs font-semibold uppercase tracking-tighter">
                      {appointment.timeSlot || "Slot Not Assigned"}
                    </span>
                  </div>

                </div>
              </div>
            ) : null
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;