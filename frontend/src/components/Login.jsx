import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4">
      <div className="w-full max-w-md bg-gray-900 text-white p-8 rounded-2xl shadow-lg">
        {/* Logo or Title */}
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-500">Login to Your Account</h2>

        {/* Form */}
        <form className="space-y-5">
          {/* Email or Username */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email or Username</label>
            <input
              type="text"
              placeholder="you@example.com or username"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Log In
          </button>
        </form>

        {/* Additional Links */}
        <div className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account? <Link to="/register" className="text-indigo-400 hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
