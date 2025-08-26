
import React from 'react';


const PrivacyPolicy = () => {
    
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4 text-gray-800">Privacy Policy</h1>
      
      <p className="mb-4 text-gray-700">
        At Prescripto, we are committed to protecting your privacy and ensuring the security of your personal health information. This Privacy Policy explains how we collect, use, and safeguard your data in compliance with healthcare regulations such as HIPAA.
      </p>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">1. Information We Collect</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Personal Identifiable Information (name, contact details)</li>
          <li>Health and Medical Data (prescriptions, medical history)</li>
          <li>Technical Data (device info, IP address)</li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">2. How We Use Your Data</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Providing healthcare services and prescriptions</li>
          <li>Appointment scheduling and management</li>
          <li>Secure communication and updates</li>
          <li>Improving our platform and customer support</li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">3. Data Security</h2>
        <p className="text-gray-700 mb-2">
          We implement robust security measures including encryption, access controls, and HIPAA-aligned protocols to safeguard your health information.
        </p>
        <p className="text-gray-700">
          Your data is only accessible to authorized personnel involved in your healthcare management.
        </p>
      </section>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">4. Your Rights & Choices</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Access your health data</li>
          <li>Request corrections or updates</li>
          <li>Delete or restrict data processing</li>
          <li>Data portability and transfer rights</li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">5. Contact Us</h2>
        <p className="text-gray-700 mb-2">
          For any privacy-related inquiries or requests, please contact us at:
        </p>
        <ul className="text-gray-700 list-disc list-inside">
          <li>Phone: +91-7496006833</li>
          <li>Email: <a href="mailto:vivekgoyal314@gmail.com" className="text-blue-600 hover:underline">vivekgoyal314@gmail.com</a></li>
        </ul>
      </section>
      
      <p className="mt-8 text-center text-gray-600">
        Last updated: August 2025. We reserve the right to update this policy as necessary.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
