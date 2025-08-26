// import React, { useContext, useEffect } from 'react'
// import { assets } from '../../assets/assets'
// import { AdminContext } from '../../context/AdminContext'
// import { AppContext } from '../../context/AppContext'

// const Dashboard = () => {

//   const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
//   const { slotDateFormat } = useContext(AppContext)

//   useEffect(() => {
//     if (aToken) {
//       getDashData()
//     }
//   }, [aToken])

//   return dashData && (
//     <div className='m-5'>

//       <div className='flex flex-wrap gap-3'>
//         <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
//           <img className='w-14' src={assets.doctor_icon} alt="" />
//           <div>
//             <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
//             <p className='text-gray-400'>Doctors</p>
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
//               <img className='rounded-full w-10' src={item.docData.image} alt="" />
//               <div className='flex-1 text-sm'>
//                 <p className='text-gray-800 font-medium'>{item.docData.name}</p>
//                 <p className='text-gray-600 '>Booking on {slotDateFormat(item.slotDate)}</p>
//               </div>
//               {item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> : item.isCompleted ? <p className='text-green-500 text-xs font-medium'>Completed</p> : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />}
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   )
// }

// export default Dashboard
import React, { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

// Reusable Stat Card Component
const StatCard = ({ icon, value, label, color }) => (
  <div
    className={`flex items-center gap-3 bg-white shadow-md p-5 min-w-52 rounded-lg border cursor-pointer hover:scale-105 hover:shadow-lg transition-all`}
  >
    <div className={`w-14 h-14 flex items-center justify-center rounded-xl ${color}`}>
      <img className="w-8" src={icon} alt={label} />
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-700">{value}</p>
      <p className="text-gray-500">{label}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  if (!dashData) return null;

  return (
    <div className="m-6">
      {/* Stats Section */}
      <div className="flex flex-wrap gap-6">
        <StatCard icon={assets.doctor_icon} value={dashData.doctors} label="Doctors" color="bg-blue-100" />
        <StatCard icon={assets.appointments_icon} value={dashData.appointments} label="Appointments" color="bg-green-100" />
        <StatCard icon={assets.patients_icon} value={dashData.patients} label="Patients" color="bg-yellow-100" />
      </div>

      {/* Latest Bookings */}
      <div className="bg-white mt-12 rounded-lg shadow-md overflow-hidden">
        <div className="flex items-center gap-2.5 px-5 py-4 border-b">
          <img src={assets.list_icon} alt="list" className="w-5 h-5" />
          <p className="font-semibold text-gray-700">Latest Bookings</p>
        </div>

        <div className="divide-y">
          {dashData.latestAppointments.length > 0 ? (
            dashData.latestAppointments.slice(0, 5).map((item, index) => (
              <div
                key={index}
                className="flex items-center px-6 py-4 gap-4 hover:bg-gray-50 transition"
              >
                <img
                  className="rounded-full w-12 h-12 object-cover border"
                  src={item.docData.image}
                  alt={item.docData.name}
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{item.docData.name}</p>
                  <p className="text-gray-500">Booking on {slotDateFormat(item.slotDate)}</p>
                </div>

                {item.cancelled ? (
                  <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600 font-medium">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
                    Completed
                  </span>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-9 cursor-pointer hover:scale-110 transition"
                    src={assets.cancel_icon}
                    alt="cancel"
                  />
                )}
              </div>
            ))
          ) : (
            <p className="p-6 text-center text-gray-500 text-sm">No recent bookings</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
