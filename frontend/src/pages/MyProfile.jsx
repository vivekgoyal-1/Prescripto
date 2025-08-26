// import React, { useContext, useEffect, useState } from 'react'
// import { AppContext } from '../context/AppContext'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import { assets } from '../assets/assets'

// const MyProfile = () => {

//     const [isEdit, setIsEdit] = useState(false)

//     const [image, setImage] = useState(false)

//     const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

//     // Function to update user profile data using API
//     const updateUserProfileData = async () => {

//         try {

//             const formData = new FormData();

//             formData.append('name', userData.name)
//             formData.append('phone', userData.phone)
//             formData.append('address', JSON.stringify(userData.address))
//             formData.append('gender', userData.gender)
//             formData.append('dob', userData.dob)

//             image && formData.append('image', image)

//             const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

//             if (data.success) {
//                 toast.success(data.message)
//                 await loadUserProfileData()
//                 setIsEdit(false)
//                 setImage(false)
//             } else {
//                 toast.error(data.message)
//             }

//         } catch (error) {
//             console.log(error)
//             toast.error(error.message)
//         }

//     }

//     return userData ? (
//         <div className='max-w-lg flex flex-col gap-2 text-sm pt-5'>

//             {isEdit
//                 ? <label htmlFor='image' >
//                     <div className='inline-block relative cursor-pointer'>
//                         <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
//                         <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
//                     </div>
//                     <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
//                 </label>
//                 : <img className='w-36 rounded' src={userData.image} alt="" />
//             }

//             {isEdit
//                 ? <input className='bg-gray-50 text-3xl font-medium max-w-60' type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
//                 : <p className='font-medium text-3xl text-[#262626] mt-4'>{userData.name}</p>
//             }

//             <hr className='bg-[#ADADAD] h-[1px] border-none' />

//             <div>
//                 <p className='text-gray-600 underline mt-3'>CONTACT INFORMATION</p>
//                 <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]'>
//                     <p className='font-medium'>Email id:</p>
//                     <p className='text-blue-500'>{userData.email}</p>
//                     <p className='font-medium'>Phone:</p>

//                     {isEdit
//                         ? <input className='bg-gray-50 max-w-52' type="text" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
//                         : <p className='text-blue-500'>{userData.phone}</p>
//                     }

//                     <p className='font-medium'>Address:</p>

//                     {isEdit
//                         ? <p>
//                             <input className='bg-gray-50' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} />
//                             <br />
//                             <input className='bg-gray-50' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} /></p>
//                         : <p className='text-gray-500'>{userData.address.line1} <br /> {userData.address.line2}</p>
//                     }

//                 </div>
//             </div>
//             <div>
//                 <p className='text-[#797979] underline mt-3'>BASIC INFORMATION</p>
//                 <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600'>
//                     <p className='font-medium'>Gender:</p>

//                     {isEdit
//                         ? <select className='max-w-20 bg-gray-50' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} >
//                             <option value="Not Selected">Not Selected</option>
//                             <option value="Male">Male</option>
//                             <option value="Female">Female</option>
//                         </select>
//                         : <p className='text-gray-500'>{userData.gender}</p>
//                     }

//                     <p className='font-medium'>Birthday:</p>

//                     {isEdit
//                         ? <input className='max-w-28 bg-gray-50' type='date' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
//                         : <p className='text-gray-500'>{userData.dob}</p>
//                     }

//                 </div>
//             </div>
//             <div className='mt-10'>

//                 {isEdit
//                     ? <button onClick={updateUserProfileData} className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'>Save information</button>
//                     : <button onClick={() => setIsEdit(true)} className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'>Edit</button>
//                 }

//             </div>
//         </div>
//     ) : null
// }

// export default MyProfile
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {
  const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)
  const [loading, setLoading] = useState(false)

  // Function to update user profile data
  const updateUserProfileData = async () => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      if (image) formData.append('image', image)

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Fetch user data on load
  useEffect(() => {
    if (userData) loadUserProfileData()
  }, [])

  return userData ? (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Profile Image and Name */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        {/* Image with overlay upload icon */}
        <div className="relative cursor-pointer">
          <img
            className="w-36 h-36 object-cover rounded-full border-4 border-white shadow-lg opacity-95 hover:opacity-100 transition"
            src={image ? URL.createObjectURL(image) : userData.image}
            alt="Profile"
          />
          {isEdit && (
            <label htmlFor="profileImage" className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow cursor-pointer hover:bg-gray-100 transition">
              <img src={assets.upload_icon} alt="Upload" className="w-6 h-6" />
              <input
                type="file"
                id="profileImage"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
              />
            </label>
          )}
        </div>
        {/* Name and Tagline */}
        <div className='text-center md:text-left'>
          {isEdit ? (
            <input
              className="text-3xl font-semibold bg-gray-100 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full max-w-lg"
              type="text"
              value={userData.name}
              onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
            />
          ) : (
            <h1 className='text-3xl font-semibold text-gray-700'>{userData.name}</h1>
          )}
        </div>
      </div>

      {/* Contact & Basic Info */}
      <div className='bg-white rounded-3xl shadow-md p-8 space-y-6 mb-8'>
        {/* Contact Information */}
        <div>
          <h2 className='text-xl font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-200'>Contact Information</h2>
          <div className='grid md:grid-cols-2 gap-6'>
            {/* Email */}
            <div>
              <label className='block text-gray-600 mb-1 font-medium'>Email</label>
              <p className='text-blue-500 font-semibold'>{userData.email}</p>
            </div>
            {/* Phone */}
            <div>
              <label className='block text-gray-600 mb-1 font-medium'>Phone</label>
              {isEdit ? (
                <input
                  className='w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
                  type="text"
                  value={userData.phone}
                  onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                />
              ) : (
                <p className='text-blue-500 font-semibold'>{userData.phone}</p>
              )}
            </div>
            {/* Address */}
            <div>
              <label className='block text-gray-600 mb-1 font-medium'>Address</label>
              {isEdit ? (
                <div className='space-y-2'>
                  <input
                    className='w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
                    type="text"
                    placeholder='Line 1'
                    value={userData.address.line1}
                    onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                  />
                  <input
                    className='w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
                    type="text"
                    placeholder='Line 2'
                    value={userData.address.line2}
                    onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                  />
                </div>
              ) : (
                <div className='text-gray-700'>
                  <p>{userData.address.line1}</p>
                  <p>{userData.address.line2}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div>
          <h2 className='text-xl font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-200'>Basic Information</h2>
          <div className='grid md:grid-cols-2 gap-6'>
            {/* Gender */}
            <div>
              <label className='block text-gray-600 mb-1 font-medium'>Gender</label>
              {isEdit ? (
                <select
                  className='w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
                  value={userData.gender}
                  onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                >
                  <option value="Not Selected">Not Selected</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p className='text-gray-700'>{userData.gender}</p>
              )}
            </div>
            {/* DOB */}
            <div>
              <label className='block text-gray-600 mb-1 font-medium'>Birthday</label>
              {isEdit ? (
                <input
                  className='w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
                  type='date'
                  value={userData.dob}
                  onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                />
              ) : (
                <p className='text-gray-700'>{userData.dob}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className='flex justify-center'>
        {isEdit ? (
          <>
            <button
              onClick={updateUserProfileData}
              disabled={loading}
              className='mr-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
            >
              {loading && (
                <svg className='w-5 h-5 animate-spin' fill='none' stroke='currentColor' strokeWidth={2} viewBox='0 0 24 24'>
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeLinecap='round'></circle>
                  <path className='opacity-75' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' d='M4 12a8 8 0 018-8v8'></path>
                </svg>
              )}
              Save Changes
            </button>
            <button
              onClick={() => { setIsEdit(false); loadUserProfileData(); }}
              className=' px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-xl hover:bg-gray-400 transition'
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className=' px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition'
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  ) : null
}

export default MyProfile
