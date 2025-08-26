// import React from 'react'
// import { useContext } from 'react'
// import { useEffect } from 'react'
// import { DoctorContext } from '../../context/DoctorContext'
// import { assets } from '../../assets/assets'
// import { AppContext } from '../../context/AppContext'

// const DoctorDashboard = () => {

//   const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
//   const { slotDateFormat, currency } = useContext(AppContext)


//   useEffect(() => {

//     if (dToken) {
//       getDashData()
//     }

//   }, [dToken])

//   return dashData && (
//     <div className='m-5'>

//       <div className='flex flex-wrap gap-3'>
//         <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
//           <img className='w-14' src={assets.earning_icon} alt="" />
//           <div>
//             <p className='text-xl font-semibold text-gray-600'>{currency} {dashData.earnings}</p>
//             <p className='text-gray-400'>Earnings</p>
//           </div>
//         </div>
//         <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
//           <img className='w-14' src={assets.appointments_icon} alt="" />
//           <div>
//             <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
//             <p className='text-gray-400'>Appointments</p>
//           </div>
//         </div>
//         <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
//           <img className='w-14' src={assets.patients_icon} alt="" />
//           <div>
//             <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
//             <p className='text-gray-400'>Patients</p></div>
//         </div>
//       </div>

//       <div className='bg-white'>
//         <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
//           <img src={assets.list_icon} alt="" />
//           <p className='font-semibold'>Latest Bookings</p>
//         </div>

//         <div className='pt-4 border border-t-0'>
//           {dashData.latestAppointments.slice(0, 5).map((item, index) => (
//             <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
//               <img className='rounded-full w-10' src={item.userData.image} alt="" />
//               <div className='flex-1 text-sm'>
//                 <p className='text-gray-800 font-medium'>{item.userData.name}</p>
//                 <p className='text-gray-600 '>Booking on {slotDateFormat(item.slotDate)}</p>
//               </div>
//               {item.cancelled
//                 ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
//                 : item.isCompleted
//                   ? <p className='text-green-500 text-xs font-medium'>Completed</p>
//                   : <div className='flex'>
//                     <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
//                     <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
//                   </div>
//               }
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   )
// }

// export default DoctorDashboard
import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

// Stat Card component for dashboard summary
const StatCard = ({ icon, value, label, color }) => (
  <div className={`flex items-center gap-4 bg-white rounded-lg shadow-md p-5 min-w-52 border border-gray-100 cursor-pointer hover:scale-105 transition`}>
    <div className={`rounded-xl w-14 h-14 flex items-center justify-center ${color}`}>
      <img className="w-8 h-8 object-contain" src={icon} alt={label} />
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-700">{value}</p>
      <p className="text-gray-500">{label}</p>
    </div>
  </div>
);

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  if (!dashData) return null;

  return (
    <div className="m-6">
      {/* Stats */}
      <div className="flex flex-wrap gap-6 mb-8">
        <StatCard icon={assets.earning_icon} value={currency + " " + dashData.earnings} label="Earnings" color="bg-green-100" />
        <StatCard icon={assets.appointments_icon} value={dashData.appointments} label="Appointments" color="bg-blue-100" />
        <StatCard icon={assets.patients_icon} value={dashData.patients} label="Patients" color="bg-yellow-100" />
      </div>

      {/* Latest Bookings */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="flex items-center gap-3 px-5 py-4 border-b">
          <img src={assets.list_icon} alt="Bookings" className="w-5 h-5" />
          <p className="font-semibold text-gray-700">Latest Bookings</p>
        </div>
        <div className="divide-y">
          {dashData.latestAppointments.length === 0 ? (
            <div className="text-center p-6 text-gray-400">No recent bookings.</div>
          ) : (
            dashData.latestAppointments.slice(0, 5).map((item, index) => (
              <div className="flex items-center px-6 py-4 gap-4 hover:bg-gray-50 transition" key={index}>
                <img className="rounded-full w-12 h-12 object-cover border" src={item.userData.image} alt={item.userData.name + " avatar"} />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{item.userData.name}</p>
                  <p className="text-gray-500">Booking on {slotDateFormat(item.slotDate)}</p>
                </div>
                <div>
                  {item.cancelled ? (
                    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold">Cancelled</span>
                  ) : item.isCompleted ? (
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold">Completed</span>
                  ) : (
                    <div className="flex gap-1">
                      <button
                        type="button"
                        title="Cancel Appointment"
                        onClick={() => cancelAppointment(item._id)}
                        className="p-1 hover:scale-110 transition"
                      >
                        <img className="w-8" src={assets.cancel_icon} alt="Cancel" />
                      </button>
                      <button
                        type="button"
                        title="Mark as Completed"
                        onClick={() => completeAppointment(item._id)}
                        className="p-1 hover:scale-110 transition"
                      >
                        <img className="w-8" src={assets.tick_icon} alt="Mark complete" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
