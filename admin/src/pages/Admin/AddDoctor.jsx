// import React, { useContext, useState } from 'react'
// import { assets } from '../../assets/assets'
// import { toast } from 'react-toastify'
// import axios from 'axios'
// import { AdminContext } from '../../context/AdminContext'
// import { AppContext } from '../../context/AppContext'

// const AddDoctor = () => {

//     const [docImg, setDocImg] = useState(false)
//     const [name, setName] = useState('')
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [experience, setExperience] = useState('1 Year')
//     const [fees, setFees] = useState('')
//     const [about, setAbout] = useState('')
//     const [speciality, setSpeciality] = useState('General physician')
//     const [degree, setDegree] = useState('')
//     const [address1, setAddress1] = useState('')
//     const [address2, setAddress2] = useState('')

//     const { backendUrl } = useContext(AppContext)
//     const { aToken } = useContext(AdminContext)

//     const onSubmitHandler = async (event) => {
//         event.preventDefault()

//         try {

//             if (!docImg) {
//                 return toast.error('Image Not Selected')
//             }

//             const formData = new FormData();

//             formData.append('image', docImg)
//             formData.append('name', name)
//             formData.append('email', email)
//             formData.append('password', password)
//             formData.append('experience', experience)
//             formData.append('fees', Number(fees))
//             formData.append('about', about)
//             formData.append('speciality', speciality)
//             formData.append('degree', degree)
//             formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

//             // console log formdata            
//             formData.forEach((value, key) => {
//                 console.log(`${key}: ${value}`);
//             });

//             const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
//             if (data.success) {
//                 toast.success(data.message)
//                 setDocImg(false)
//                 setName('')
//                 setPassword('')
//                 setEmail('')
//                 setAddress1('')
//                 setAddress2('')
//                 setDegree('')
//                 setAbout('')
//                 setFees('')
//             } else {
//                 toast.error(data.message)
//             }

//         } catch (error) {
//             toast.error(error.message)
//             console.log(error)
//         }

//     }

//     return (
//         <form onSubmit={onSubmitHandler} className='m-5 w-full'>

//             <p className='mb-3 text-lg font-medium'>Add Doctor</p>

//             <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
//                 <div className='flex items-center gap-4 mb-8 text-gray-500'>
//                     <label htmlFor="doc-img">
//                         <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
//                     </label>
//                     <input onChange={(e) => setDocImg(e.target.files[0])} type="file" name="" id="doc-img" hidden />
//                     <p>Upload doctor <br /> picture</p>
//                 </div>

//                 <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>

//                     <div className='w-full lg:flex-1 flex flex-col gap-4'>

//                         <div className='flex-1 flex flex-col gap-1'>
//                             <p>Your name</p>
//                             <input onChange={e => setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Name' required />
//                         </div>

//                         <div className='flex-1 flex flex-col gap-1'>
//                             <p>Doctor Email</p>
//                             <input onChange={e => setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type="email" placeholder='Email' required />
//                         </div>


//                         <div className='flex-1 flex flex-col gap-1'>
//                             <p>Set Password</p>
//                             <input onChange={e => setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type="password" placeholder='Password' required />
//                         </div>

//                         <div className='flex-1 flex flex-col gap-1'>
//                             <p>Experience</p>
//                             <select onChange={e => setExperience(e.target.value)} value={experience} className='border rounded px-2 py-2' >
//                                 <option value="1 Year">1 Year</option>
//                                 <option value="2 Year">2 Years</option>
//                                 <option value="3 Year">3 Years</option>
//                                 <option value="4 Year">4 Years</option>
//                                 <option value="5 Year">5 Years</option>
//                                 <option value="6 Year">6 Years</option>
//                                 <option value="8 Year">8 Years</option>
//                                 <option value="9 Year">9 Years</option>
//                                 <option value="10 Year">10 Years</option>
//                             </select>
//                         </div>

//                         <div className='flex-1 flex flex-col gap-1'>
//                             <p>Fees</p>
//                             <input onChange={e => setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type="number" placeholder='Doctor fees' required />
//                         </div>

//                     </div>

//                     <div className='w-full lg:flex-1 flex flex-col gap-4'>

//                         <div className='flex-1 flex flex-col gap-1'>
//                             <p>Speciality</p>
//                             <select onChange={e => setSpeciality(e.target.value)} value={speciality} className='border rounded px-2 py-2'>
//                                 <option value="General physician">General physician</option>
//                                 <option value="Gynecologist">Gynecologist</option>
//                                 <option value="Dermatologist">Dermatologist</option>
//                                 <option value="Pediatricians">Pediatricians</option>
//                                 <option value="Neurologist">Neurologist</option>
//                                 <option value="Gastroenterologist">Gastroenterologist</option>
//                             </select>
//                         </div>


//                         <div className='flex-1 flex flex-col gap-1'>
//                             <p>Degree</p>
//                             <input onChange={e => setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type="text" placeholder='Degree' required />
//                         </div>

//                         <div className='flex-1 flex flex-col gap-1'>
//                             <p>Address</p>
//                             <input onChange={e => setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2' type="text" placeholder='Address 1' required />
//                             <input onChange={e => setAddress2(e.target.value)} value={address2} className='border rounded px-3 py-2' type="text" placeholder='Address 2' required />
//                         </div>

//                     </div>

//                 </div>

//                 <div>
//                     <p className='mt-4 mb-2'>About Doctor</p>
//                     <textarea onChange={e => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' rows={5} placeholder='write about doctor'></textarea>
//                 </div>

//                 <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add doctor</button>

//             </div>


//         </form>
//     )
// }

// export default AddDoctor
import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { backendUrl } = useContext(AppContext)
  const { aToken } = useContext(AdminContext)

  const resetForm = () => {
    setDocImg(null)
    setName('')
    setPassword('')
    setEmail('')
    setAddress1('')
    setAddress2('')
    setDegree('')
    setAbout('')
    setFees('')
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    if (isSubmitting) return
    try {
      if (!docImg) return toast.error('Image Not Selected')
      setIsSubmitting(true)
      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))
      const { data } = await axios.post(
        backendUrl + '/api/admin/add-doctor',
        formData,
        { headers: { aToken } }
      )
      if (data.success) {
        toast.success(data.message)
        resetForm()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="m-5 w-full"
      autoComplete="off"
    >
      <p className="mb-5 text-2xl font-bold">Add Doctor</p>
      <div className="bg-white px-8 py-8 border rounded-xl w-full max-w-4xl max-h-[80vh] overflow-y-auto shadow-md">

        {/* IMAGE UPLOAD */}
        <div className="flex items-center gap-6 mb-8">
          <label htmlFor="doc-img" className="shrink-0">
            <img
              className="w-20 h-20 object-cover bg-gray-100 rounded-full cursor-pointer border"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt={docImg ? "Doctor selected preview" : "Upload doctor picture"}
            />
          </label>
          <input
            onChange={e => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
            accept="image/*"
          />
          <div>
            <p className="font-medium text-gray-600">Upload doctor picture</p>
            <p className="text-xs text-gray-400">.jpg, .png, etc. (max 2MB)</p>
            {docImg && (
              <button
                type="button"
                onClick={() => setDocImg(null)}
                className="mt-2 text-xs text-red-500 underline"
              >Remove</button>
            )}
          </div>
        </div>

        {/* FORM FIELDS */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left column */}
          <div className="flex-1 flex flex-col gap-5">
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Name</label>
              <input
                onChange={e => setName(e.target.value)}
                value={name}
                className="border rounded px-3 py-2 w-full"
                type="text"
                placeholder="Enter name"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Email</label>
              <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                className="border rounded px-3 py-2 w-full"
                type="email"
                placeholder="Enter email"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Set Password</label>
              <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                className="border rounded px-3 py-2 w-full"
                type="password"
                minLength={6}
                placeholder="Enter password"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Experience</label>
              <select
                onChange={e => setExperience(e.target.value)}
                value={experience}
                className="border rounded px-2 py-2 w-full"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={(i + 1) + ' Year'}>
                    {i + 1} {i === 0 ? "Year" : "Years"}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Fees</label>
              <input
                onChange={e => setFees(e.target.value)}
                value={fees}
                className={`border rounded px-3 py-2 w-full ${fees && Number(fees) <= 0 ? "border-red-400" : ""}`}
                type="number"
                placeholder="Doctor fees"
                min={0}
                required
              />
              {fees && Number(fees) <= 0 && (
                <span className="text-xs text-red-500">Enter a valid amount</span>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="flex-1 flex flex-col gap-5">
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Speciality</label>
              <select
                onChange={e => setSpeciality(e.target.value)}
                value={speciality}
                className="border rounded px-2 py-2 w-full"
              >
                <option>General physician</option>
                <option>Gynecologist</option>
                <option>Dermatologist</option>
                <option>Pediatricians</option>
                <option>Neurologist</option>
                <option>Gastroenterologist</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Degree</label>
              <input
                onChange={e => setDegree(e.target.value)}
                value={degree}
                className="border rounded px-3 py-2 w-full"
                type="text"
                placeholder="Enter degree"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Address 1</label>
              <input
                onChange={e => setAddress1(e.target.value)}
                value={address1}
                className="border rounded px-3 py-2 w-full"
                type="text"
                placeholder="Address line 1"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Address 2</label>
              <input
                onChange={e => setAddress2(e.target.value)}
                value={address2}
                className="border rounded px-3 py-2 w-full"
                type="text"
                placeholder="Address line 2"
                required
              />
            </div>
          </div>
        </div>

        {/* About Field */}
        <div className="mt-6">
          <label className="block mb-2 text-gray-700 font-medium">About Doctor</label>
          <textarea
            onChange={e => setAbout(e.target.value)}
            value={about}
            className="w-full px-4 py-2 border rounded min-h-[100px]"
            placeholder="Write about doctor"
            rows={5}
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-primary px-10 py-3 mt-6 text-white rounded-full shadow hover:bg-primary-dark transition disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Doctor"}
        </button>
      </div>
    </form>
  )
}

export default AddDoctor
