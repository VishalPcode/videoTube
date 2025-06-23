import React, { useState } from "react";
import { useRef } from "react";


function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    avatar: null,
    coverImage: null,
  });
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      const res = await fetch("http://localhost:8000/api/v1/users/register", {
        method: "POST",
        body: data,
      });

      const text = await res.text(); // <-- use text first
      let result;

      try {
        result = JSON.parse(text);
      } catch (err) {
        console.error("Response is not valid JSON:", text);
        alert("Unexpected server response. Please check backend logs.");
        return;
      }


      if (res.status === 409){
        alert("User already exists. Please try a different email or username.");
        return;
      }

      if (res.ok) {
        alert("User registered successfully!");
        console.log(result);
        formRef.current.reset();
      } else {
        alert(result?.message || "Registration failed");
      }
    } catch (error) {
      alert("Network or server error");
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4 py-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-900 text-white p-8 rounded-2xl shadow-xl space-y-3"
        encType="multipart/form-data"
        ref={formRef}
      >
        <h2 className="text-3xl font-bold text-indigo-500 text-center">
          Create Account
        </h2>

        <div>
          <label className="text-sm text-gray-300 block mb-0">Full Name</label>
          <input
            type="text"
            name="fullName"
            onChange={handleChange}
            className="w-full px-4 py-1 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-300 block mb-0">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="w-full px-4 py-1 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-300 block mb-0">Username</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            className="w-full px-4 py-1 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-300 block mb-0">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="w-full px-4 py-1 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-300 block mb-0">
            Avatar Image
          </label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-sm text-gray-400 file:bg-indigo-600 file:text-white file:px-3 file:py-1.5 file:rounded file:border-none"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-300 block mb-0">
            Cover Image (optional)
          </label>
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-sm text-gray-400 file:bg-indigo-600 file:text-white file:px-3 file:py-1.5 file:rounded file:border-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 py-1 rounded-lg font-semibold transition cursor-pointer text-white"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
