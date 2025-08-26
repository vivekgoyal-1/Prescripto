import React from 'react';

const JobPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
        {/* Optional icon or image */}
        <div className="mb-4">
          <svg
            className="mx-auto w-12 h-12 text-indigo-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">
          Job Openings Coming Soon
        </h1>
        <p className="text-gray-600 mb-4">
          We will update any job openings here. Stay tuned for updates!
        </p>
        {/* Optional: add a simple note or footer */}
        <p className="text-sm text-gray-500">Thank you for your patience.</p>
      </div>
    </div>
  );
};

export default JobPage;
