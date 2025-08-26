import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>

        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>Prescripto is dedicated to transforming the way healthcare works by offering seamless prescription management and smarter digital solutions. Our platform ensures accuracy, convenience, and security, empowering both patients and healthcare providers to connect effortlessly. Together, we’re building a healthier, more connected future.</p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li><Link to="/" onClick={() => window.scrollTo(0, 0)}>Home</Link></li>
            <li><Link to="/about" onClick={() => window.scrollTo(0, 0)}>About us</Link></li>
            <li><Link to="/privacy-policy" onClick={() => window.scrollTo(0, 0)}>Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91-7496006833</li>
            <li>vivekgoyal314@gmail.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Made with care and for care by Vivek!!!!!</p>
      </div>

    </div>
  )
}

export default Footer
