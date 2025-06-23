// src/components/Sidebar.jsx

import React, { useState } from 'react';
import { FiHome, FiUser, FiSettings, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: <FiHome />, label: 'Home' },
    { icon: <FiUser />, label: 'Profile' },
    { icon: <FiSettings />, label: 'Settings' },
  ];

  return (
    <div className={`flex h-screen bg-gray-100`}>
      {/* Sidebar */}
      <div
        className={`bg-black  transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-14'
        }`}
      >
        <div className="flex justify-between items-center p-4">
          {isOpen && <h1 className="text-xl font-bold text-amber-50">videoTube</h1>}
          <button onClick={() => setIsOpen(!isOpen)} className="text-xl text-white  ">
            {isOpen ? <FiChevronLeft /> : <FiChevronRight />}
          </button>
        </div>

        {/* Menu */}
        <ul className="p-2 space-y-2">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center space-x-3 p-2 rounded cursor-pointer hover:bg-red-600 hover:text-amber-50 transition-colors duration-200"
              onClick={() => console.log(`${item.label} clicked`)}
            >
              <span className="text-xl text-amber-50 ">{item.icon}</span>
              {isOpen && <span className="text-sm text-amber-50">{item.label}</span>}
            </li>
          ))}
        </ul>
      </div>

      {/* Main content placeholder */}
      <div className="flex-1 p-6 bg-gray-950">
      </div>
    </div>
  );
};

export default Sidebar;
