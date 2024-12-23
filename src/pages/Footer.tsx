import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaPlus, FaUser, FaCog } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-red-500 py-4 mt-auto fixed bottom-0 w-full">
      <div className="container mx-auto flex justify-between items-center flex-wrap px-4">
        {/* Home Icon */}
        <Link to="/" className="flex flex-col items-center space-y-2">
          <FaHome className="text-2xl hover:text-indigo-300" />
          <span className="text-sm">Home</span>
        </Link>

        {/* Search Icon */}
        <Link to="/search" className="flex flex-col items-center space-y-2">
          <FaSearch className="text-2xl hover:text-indigo-300" />
          <span className="text-sm">Search</span>
        </Link>

        {/* Create Post Icon */}
        <Link to="/create-post" className="flex flex-col items-center space-y-2">
          <FaPlus className="text-2xl hover:text-indigo-300" />
          <span className="text-sm">Post</span>
        </Link>

        {/* Profile Icon */}
        <Link to="/profile" className="flex flex-col items-center space-y-2">
          <FaUser className="text-2xl hover:text-indigo-300" />
          <span className="text-sm">Profile</span>
        </Link>

        {/* Settings Icon */}
        <Link to="/settings" className="flex flex-col items-center space-y-2">
          <FaCog className="text-2xl hover:text-indigo-300" />
          <span className="text-sm">Settings</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
