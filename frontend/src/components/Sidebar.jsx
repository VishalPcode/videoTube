  // src/components/Sidebar.jsx

  import React, { useState } from 'react';
  import { FiHome, FiUser, FiSettings, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
  import MyProfile from './Myprofile';

  const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [item, setItem] = useState({ label: '' });

    const menuItems = [
      { icon: <FiHome />, label: 'Home' },
      { icon: <FiUser />, label: 'Profile' },
      { icon: <FiSettings />, label: 'Settings' },
    ];

    const handleItemClick = (label) => {
      setItem({ label });
    };

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
                onClick={handleItemClick.bind(null, item.label)}
              >
                <span className="text-xl text-amber-50 ">{item.icon}</span>
                {isOpen && <span className="text-sm text-amber-50"> {item.label}</span>}
              </li>
            ))}
          </ul>
        </div>

        {/* Main content placeholder */}
        <div className="flex-1 bg-gray-950">
          {/* <h2 className="text-2xl font-bold text-white">
            {isOpen ? item.label : ''}
          </h2> */}
         {item.label === 'Profile' && <MyProfile />}

        </div>
      </div>
    );
  };

  export default Sidebar;
