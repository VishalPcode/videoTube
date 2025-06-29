  import React, { useEffect, useState } from "react";

  function MyProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
      fullName: "",
      email: "",
    });

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await fetch("http://localhost:8000/api/v1/users/getuser", {
            credentials: "include",
          });

          if (res.ok) {
            const data = await res.json();
            setUser(data.data);
            setFormData({
              fullName: data.data.fullName,
              email: data.data.email,
            });
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

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
      e.preventDefault();

      try {
        const res = await fetch(
          "http://localhost:8000/api/v1/users/update-account",
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              fullName: formData.fullName,
              email: formData.email,
            }),
          }
        );

        if (res.ok) {
          const data = await res.json();
          console.log("PUT RESPONSE:", data);

          console.log("Old user:", user);

          setUser((prev) => ({
            ...prev,
            ...data.message,
          }));

          console.log("USER STATE AFTER FIX:", data.message);

          setFormData({
            fullName: data.message.fullName,
            email: data.message.email,
          });

          setEditMode(false);
          alert("Profile updated successfully!");
        } else {
          alert("Failed to update profile");
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong.");
      }
    };

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
              src={user?.avatar?.url || "https://via.placeholder.com/150"}
              alt="Profile"
            />
            <h1 className="mt-4 text-2xl font-bold">{user?.fullName}</h1>
            <p className="text-gray-400">{user?.email}</p>
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-gray-700"></div>

          {editMode ? (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block mb-1 text-gray-400">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-400">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-indigo-400">
                  User Information
                </h2>
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
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Edit Profile
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  export default MyProfile;
