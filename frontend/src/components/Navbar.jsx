import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../apiURL";
function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  // ✅ Real cookie + localStorage check
useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/users/getuser`, {
        credentials: "include", // Include cookies for authentication
      });

      if (res.ok) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
      } else {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
      }
    } catch (err) {
      console.error(err);
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
    }
  };

  checkAuth();
}, []);


  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/users/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
        alert("Logged out!");
        navigate("/login");
      } else {
        alert("Logout failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Error logging out");
    }
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl text-red-600 font-bold hover:text-red-500"
            >
              videoTube
            </Link>
          </div>

          <div className="hidden md:flex space-x-6"></div>

          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleLogout}
                  className="hover:text-indigo-400"
                >
                  Logout
                </button>
                <Link to="/profile" className="hover:text-indigo-400">
                  <FaUserCircle className="text-xl" />
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-indigo-400">
                  Login
                </Link>
                <Link to="/register" className="hover:text-indigo-400">
                  Register
                </Link>
                <FaUserCircle className="text-xl" />
              </>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white text-2xl">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-3 space-y-2">
          {isLoggedIn ? (
            <>
              <button
                onClick={handleLogout}
                className="block w-full text-left hover:text-indigo-400"
              >
                Logout
              </button>
              <Link to="/profile" className="block hover:text-indigo-400">
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="block hover:text-indigo-400">
                Login
              </Link>
              <Link to="/register" className="block hover:text-indigo-400">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
