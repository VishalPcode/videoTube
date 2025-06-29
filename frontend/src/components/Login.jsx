import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Login(props) {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("isLoggedIn", "true");
        props.setIsLoggedIn(true); // 👈 update parent Navbar immediately
        alert("Login successful!");
        navigate("/"); // Redirect to home page
      } else {
        alert(result.message || "Login failed");
      }
    } catch (error) {
      alert("Network or server error");
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4">
      <div className="w-full max-w-md bg-gray-900 text-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-500">
          Login to Your Account
        </h2>

        <form
          className="space-y-5"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email or Username
            </label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              placeholder="you@example.com or username"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-400 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
