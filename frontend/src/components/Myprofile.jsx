import React from 'react';

function MyProfile() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4">
      <div className="bg-gray-900 rounded-2xl shadow-xl p-8 w-full max-w-md text-white">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <img
            className="w-28 h-28 rounded-full ring-4 ring-indigo-500 shadow-md"
            src="https://via.placeholder.com/150"
            alt="Profile"
          />
          <h1 className="mt-4 text-2xl font-bold">John Doe</h1>
          <p className="text-gray-400">john.doe@example.com</p>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-700"></div>

        {/* Info Section */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-indigo-400">User Information</h2>
          <div className="flex justify-between">
            <span className="text-gray-400">Name:</span>
            <span>John Doe</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Email:</span>
            <span>john.doe@example.com</span>
          </div>
        </div>

        {/* Button */}
        <div className="mt-6 text-center">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
