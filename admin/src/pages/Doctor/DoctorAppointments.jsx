// import React from 'react'
// import { useContext, useEffect } from 'react'
// import { DoctorContext } from '../../context/DoctorContext'
// import { AppContext } from '../../context/AppContext'
// import { assets } from '../../assets/assets'

// const DoctorAppointments = () => {

//   const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
//   const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

//   useEffect(() => {
//     if (dToken) {
//       getAppointments()
//     }
//   }, [dToken])

//   return (
//     <div className='w-full max-w-6xl m-5 '>

//       <p className='mb-3 text-lg font-medium'>All Appointments</p>

//       <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
//         <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
//           <p>#</p>
//           <p>Patient</p>
//           <p>Payment</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Fees</p>
//           <p>Action</p>
//         </div>
//         {appointments.map((item, index) => (
//           <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
//             <p className='max-sm:hidden'>{index+1}</p>
//             <div className='flex items-center gap-2'>
//               <img src={item.userData.image} className='w-8 rounded-full' alt="" /> <p>{item.userData.name}</p>
//             </div>
//             <div>
//               <p className='text-xs inline border border-primary px-2 rounded-full'>
//                 {item.payment?'Online':'CASH'}
//               </p>
//             </div>
//             <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
//             <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
//             <p>{currency}{item.amount}</p>
//             {item.cancelled
//               ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
//               : item.isCompleted
//                 ? <p className='text-green-500 text-xs font-medium'>Completed</p>
//                 : <div className='flex'>
//                   <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
//                   <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
//                 </div>
//             }
//           </div>
//         ))}
//       </div>

//     </div>
//   )
// }

// export default DoctorAppointments
import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) getAppointments();
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl mx-auto m-5">
      <p className="mb-5 text-xl font-semibold text-gray-800">All Appointments</p>

      <div className="bg-white border rounded-lg shadow-sm text-sm max-h-[80vh] overflow-y-auto">
        {/* Table Headers */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-2 py-3 px-6 border-b bg-gray-50 text-gray-600 font-medium">
          <span>#</span>
          <span>Patient</span>
          <span>Payment</span>
          <span>Age</span>
          <span>Date &amp; Time</span>
          <span>Fees</span>
          <span>Action</span>
        </div>

        {/* Table Rows */}
        {appointments.length === 0 ? (
          <div className="py-10 text-center text-gray-400">No appointments found.</div>
        ) : (
          appointments.map((item, index) => (
            <div
              key={index}
              className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-2 items-center text-gray-700 py-4 px-6 border-b hover:bg-gray-50 transition"
            >
              <span className="max-sm:hidden">{index + 1}</span>
              <div className="flex items-center gap-2">
                <img src={item.userData.image} alt={`${item.userData.name} avatar`} className="w-8 h-8 rounded-full object-cover" />
                <span>{item.userData.name}</span>
              </div>
              <div>
                <span
                  className={`inline-block text-xs px-3 py-1 rounded-full font-semibold ${
                    item.payment ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.payment ? "Online" : "CASH"}
                </span>
              </div>
              <span className="max-sm:hidden">{calculateAge(item.userData.dob)}</span>
              <span>{slotDateFormat(item.slotDate)}, {item.slotTime}</span>
              <span>{currency}{item.amount}</span>
              <span>
                {item.cancelled ? (
                  <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold">Cancelled</span>
                ) : item.isCompleted ? (
                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold">Completed</span>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      title="Cancel Appointment"
                      onClick={() => cancelAppointment(item._id)}
                      className="w-10 p-1 hover:bg-red-50 rounded transition"
                    >
                      <img src={assets.cancel_icon} alt="Cancel Appointment" className="w-full" />
                    </button>
                    <button
                      type="button"
                      title="Mark as Completed"
                      onClick={() => completeAppointment(item._id)}
                      className="w-10 p-1 hover:bg-green-50 rounded transition"
                    >
                      <img src={assets.tick_icon} alt="Complete Appointment" className="w-full" />
                    </button>
                  </div>
                )}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
