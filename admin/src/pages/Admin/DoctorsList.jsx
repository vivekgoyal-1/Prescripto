// import React, { useContext, useEffect } from 'react'
// import { AdminContext } from '../../context/AdminContext'

// const DoctorsList = () => {

//   const { doctors, changeAvailability , aToken , getAllDoctors} = useContext(AdminContext)

//   useEffect(() => {
//     if (aToken) {
//         getAllDoctors()
//     }
// }, [aToken])

//   return (
//     <div className='m-5 max-h-[90vh] overflow-y-scroll'>
//       <h1 className='text-lg font-medium'>All Doctors</h1>
//       <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
//         {doctors.map((item, index) => (
//           <div className='border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
//             <img className='bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
//             <div className='p-4'>
//               <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
//               <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
//               <div className='mt-2 flex items-center gap-1 text-sm'>
//                 <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} />
//                 <p>Available</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default DoctorsList
import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) getAllDoctors()
  }, [aToken])

  return (
    <div className="m-5 max-h-[90vh] overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-6 pt-2">
        {doctors.length === 0 ? (
          <p className="text-gray-400 mx-auto p-8">No doctors found.</p>
        ) : (
          doctors.map((item, index) => (
            <div
              key={index}
              className="border border-[#C9D8FF] rounded-xl max-w-56 w-full bg-white shadow-sm hover:shadow-lg transition hover:scale-105 overflow-hidden cursor-pointer group"
            >
              <div className="p-0 flex items-center justify-center bg-[#EAEFFF] group-hover:bg-primary transition-all duration-300">
                <img
                  className="w-24 h-24 object-cover rounded-full border-4 border-white mt-4"
                  src={item.image}
                  alt={`${item.name} profile`}
                />
              </div>
              <div className="p-4">
                <p className="text-[#262626] text-lg font-bold">{item.name}</p>
                <p className="text-[#5C5C5C] text-base mb-3">{item.speciality}</p>
                <div className="flex items-center gap-2 text-sm mt-1">
                  <label
                    className={`inline-flex relative items-center cursor-pointer`}
                  >
                    <input
                      type="checkbox"
                      checked={!!item.available}
                      onChange={() => changeAvailability(item._id)}
                      className="sr-only peer"
                      aria-checked={item.available}
                      aria-label={`Toggle availability for ${item.name}`}
                    />
                    <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-green-400 transition-all"></div>
                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow peer-checked:translate-x-4 transition-all duration-200 ${item.available ? 'border-green-500' : 'border-gray-300'}`}></div>
                  </label>
                  <span className={`ml-2 text-xs font-semibold ${item.available ? "text-green-600" : "text-gray-500"}`}>
                    {item.available ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default DoctorsList
