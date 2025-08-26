// import React, { useContext, useEffect, useState } from 'react'
// import { DoctorContext } from '../../context/DoctorContext'
// import { AppContext } from '../../context/AppContext'
// import { toast } from 'react-toastify'
// import axios from 'axios'

// const DoctorProfile = () => {

//     const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
//     const { currency, backendUrl } = useContext(AppContext)
//     const [isEdit, setIsEdit] = useState(false)

//     const updateProfile = async () => {

//         try {

//             const updateData = {
//                 address: profileData.address,
//                 fees: profileData.fees,
//                 about: profileData.about,
//                 available: profileData.available
//             }

//             const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

//             if (data.success) {
//                 toast.success(data.message)
//                 setIsEdit(false)
//                 getProfileData()
//             } else {
//                 toast.error(data.message)
//             }

//             setIsEdit(false)

//         } catch (error) {
//             toast.error(error.message)
//             console.log(error)
//         }

//     }

//     useEffect(() => {
//         if (dToken) {
//             getProfileData()
//         }
//     }, [dToken])

//     return profileData && (
//         <div>
//             <div className='flex flex-col gap-4 m-5'>
//                 <div>
//                     <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
//                 </div>

//                 <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>

//                     {/* ----- Doc Info : name, degree, experience ----- */}

//                     <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
//                     <div className='flex items-center gap-2 mt-1 text-gray-600'>
//                         <p>{profileData.degree} - {profileData.speciality}</p>
//                         <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
//                     </div>

//                     {/* ----- Doc About ----- */}
//                     <div>
//                         <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>About :</p>
//                         <p className='text-sm text-gray-600 max-w-[700px] mt-1'>
//                             {
//                                 isEdit
//                                     ? <textarea onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} type='text' className='w-full outline-primary p-2' rows={8} value={profileData.about} />
//                                     : profileData.about
//                             }
//                         </p>
//                     </div>

//                     <p className='text-gray-600 font-medium mt-4'>
//                         Appointment fee: <span className='text-gray-800'>{currency} {isEdit ? <input type='number' onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} /> : profileData.fees}</span>
//                     </p>

//                     <div className='flex gap-2 py-2'>
//                         <p>Address:</p>
//                         <p className='text-sm'>
//                             {isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : profileData.address.line1}
//                             <br />
//                             {isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : profileData.address.line2}
//                         </p>
//                     </div>

//                     <div className='flex gap-1 pt-2'>
//                         <input type="checkbox" onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} />
//                         <label htmlFor="">Available</label>
//                     </div>

//                     {
//                         isEdit
//                             ? <button onClick={updateProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>
//                             : <button onClick={() => setIsEdit(prev => !prev)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
//                     }

//                 </div>
//             </div>
//         </div>
//     )
// }

// export default DoctorProfile
import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {
    const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
    const { currency, backendUrl } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    const updateProfile = async () => {
        if (isUpdating) return
        try {
            setIsUpdating(true)
            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            }

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        } finally {
            setIsUpdating(false)
        }
    }

    const toggleEdit = () => {
        if (isEdit) {
            if (window.confirm('Discard changes?')) {
                setIsEdit(false)
                getProfileData()
            }
        } else {
            setIsEdit(true)
        }
    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    return profileData && (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-20"></div>
                    <div className="relative px-8 pb-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-16">
                            {/* Profile Image */}
                            <img 
                                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover" 
                                src={profileData.image} 
                                alt={`${profileData.name} profile`} 
                            />
                            
                            {/* Doctor Info */}
                            <div className="flex-1 pt-6">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2 mt-10">{profileData.name}</h1>
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="text-lg text-gray-600">{profileData.degree} - {profileData.speciality}</span>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                                        {profileData.experience}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Details Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                        <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${profileData.available ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                            <span className={`text-sm font-medium ${profileData.available ? 'text-green-600' : 'text-gray-500'}`}>
                                {profileData.available ? 'Available' : 'Unavailable'}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* About Section */}
                        <div>
                            <label className="block text-lg font-semibold text-gray-800 mb-3">About</label>
                            {isEdit ? (
                                <textarea 
                                    onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} 
                                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors resize-none"
                                    rows={6} 
                                    value={profileData.about}
                                    placeholder="Tell patients about yourself..."
                                />
                            ) : (
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <p className="text-gray-700 leading-relaxed">{profileData.about}</p>
                                </div>
                            )}
                        </div>

                        {/* Fee and Address Grid */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Appointment Fee */}
                            <div>
                                <label className="block text-lg font-semibold text-gray-800 mb-3">Appointment Fee</label>
                                {isEdit ? (
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                                            {currency}
                                        </span>
                                        <input 
                                            type="number" 
                                            onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} 
                                            value={profileData.fees}
                                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                                            placeholder="Enter fee amount"
                                        />
                                    </div>
                                ) : (
                                    <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                                        <p className="text-2xl font-bold text-green-700">{currency} {profileData.fees}</p>
                                    </div>
                                )}
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-lg font-semibold text-gray-800 mb-3">Address</label>
                                {isEdit ? (
                                    <div className="space-y-3">
                                        <input 
                                            type="text" 
                                            onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                                            value={profileData.address.line1}
                                            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                                            placeholder="Clinic/Hospital name"
                                        />
                                        <input 
                                            type="text" 
                                            onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                                            value={profileData.address.line2}
                                            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                                            placeholder="Area, City"
                                        />
                                    </div>
                                ) : (
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <p className="text-gray-700">{profileData.address.line1}</p>
                                        <p className="text-gray-700">{profileData.address.line2}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Availability Toggle */}
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                            <input 
                                type="checkbox" 
                                id="availability"
                                onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} 
                                checked={profileData.available}
                                disabled={!isEdit}
                                className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="availability" className="text-lg font-medium text-gray-800">
                                Available for Appointments
                            </label>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-6">
                            {isEdit ? (
                                <>
                                    <button 
                                        onClick={updateProfile}
                                        disabled={isUpdating}
                                        className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isUpdating ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                                </svg>
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                    <button 
                                        onClick={toggleEdit}
                                        disabled={isUpdating}
                                        className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button 
                                    onClick={() => setIsEdit(true)}
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                    </svg>
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile
