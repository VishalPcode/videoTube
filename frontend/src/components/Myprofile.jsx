import React, { useEffect, useState } from 'react';

function MyProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/users/getuser", {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.data); // ✅ your data key
          setLoading(false);
        } else {
          setError("Failed to fetch user. Not logged in?");
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Something went wrong.");
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">
        Loading your profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4">
      <div className="bg-gray-900 rounded-2xl shadow-xl p-8 w-full max-w-md text-white">

        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <img
            className="w-28 h-28 rounded-full ring-4 ring-indigo-500 shadow-md"
            src={
              user?.avatar?.url ||
              "https://via.placeholder.com/150"
            }
            alt="Profile"
          />
          <h1 className="mt-4 text-2xl font-bold">
            {user?.fullName || "No name"}
          </h1>
          <p className="text-gray-400">{user?.email || user?.username}</p>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-700"></div>

        {/* Info Section */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-indigo-400">User Information</h2>
          <div className="flex justify-between">
            <span className="text-gray-400">Name:</span>
            <span>{user?.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Email:</span>
            <span>{user?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Username:</span>
            <span>{user?.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Joined:</span>
            <span>{new Date(user?.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Button */}
        <div className="mt-6 text-center">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
            onClick={() => alert("Edit Profile coming soon!")}
          >
            Edit Profile
          </button>
        </div>

      </div>
    </div>
  );
}

export default MyProfile;
