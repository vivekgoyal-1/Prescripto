// import React, { useEffect } from 'react'
// import { assets } from '../../assets/assets'
// import { useContext } from 'react'
// import { AdminContext } from '../../context/AdminContext'
// import { AppContext } from '../../context/AppContext'

// const AllAppointments = () => {

//   const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
//   const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

//   useEffect(() => {
//     if (aToken) {
//       getAllAppointments()
//     }
//   }, [aToken])

//   return (
//     <div className='w-full max-w-6xl m-5 '>

//       <p className='mb-3 text-lg font-medium'>All Appointments</p>

//       <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
//         <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
//           <p>#</p>
//           <p>Patient</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Doctor</p>
//           <p>Fees</p>
//           <p>Action</p>
//         </div>
//         {appointments.map((item, index) => (
//           <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
//             <p className='max-sm:hidden'>{index+1}</p>
//             <div className='flex items-center gap-2'>
//               <img src={item.userData.image} className='w-8 rounded-full' alt="" /> <p>{item.userData.name}</p>
//             </div>
//             <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
//             <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
//             <div className='flex items-center gap-2'>
//               <img src={item.docData.image} className='w-8 rounded-full bg-gray-200' alt="" /> <p>{item.docData.name}</p>
//             </div>
//             <p>{currency}{item.amount}</p>
//             {item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> : item.isCompleted ? <p className='text-green-500 text-xs font-medium'>Completed</p> : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />}
//           </div>
//         ))}
//       </div>

//     </div>
//   )
// }

// export default AllAppointments
import React, { useEffect, useContext } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AllAppointments = () => {
  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl mx-auto m-5">
      <p className="mb-4 text-xl font-semibold text-gray-800">All Appointments</p>

      <div className="bg-white border rounded-lg shadow text-sm max-h-[80vh] overflow-y-auto">
        {/* Table Headers */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] py-3 px-6 border-b bg-gray-50">
          <span>#</span>
          <span>Patient</span>
          <span>Age</span>
          <span>Date & Time</span>
          <span>Doctor</span>
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
              className="flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] items-center text-gray-700 py-3 px-6 border-b hover:bg-gray-100 transition"
            >
              <span className="max-sm:hidden">{index + 1}</span>
              <div className="flex items-center gap-2">
                <img src={item.userData.image} className="w-8 h-8 rounded-full object-cover" alt={`${item.userData.name}'s avatar`} />
                <span>{item.userData.name}</span>
              </div>
              <span className="max-sm:hidden">{calculateAge(item.userData.dob)}</span>
              <span>
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </span>
              <div className="flex items-center gap-2">
                <img src={item.docData.image} className="w-8 h-8 rounded-full bg-gray-200 object-cover" alt={`${item.docData.name}'s avatar`} />
                <span>{item.docData.name}</span>
              </div>
              <span>
                {currency}
                {item.amount}
              </span>
              <span>
                {item.cancelled ? (
                  <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">Cancelled</span>
                ) : item.isCompleted ? (
                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">Completed</span>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-8 cursor-pointer hover:scale-110 hover:bg-red-50 transition rounded-full"
                    src={assets.cancel_icon}
                    alt="Cancel Appointment"
                    title="Cancel Appointment"
                  />
                )}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
