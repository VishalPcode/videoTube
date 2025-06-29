import React, { useState } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl text-indigo-500 font-bold hover:text-indigo-400">
              videoTube
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6"></div>

          {/* Profile / Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="hover:text-indigo-400">
              Login
            </Link>
            <Link to="/register" className="hover:text-indigo-400">
              Register
            </Link>
            <FaUserCircle className="text-xl" />
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white text-2xl">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-3 space-y-2">
          <Link to="/login" className="block hover:text-indigo-400">
            Login
          </Link>
          <Link to="/register" className="block hover:text-indigo-400">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
