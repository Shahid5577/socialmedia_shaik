import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Ensure this is correctly implemented

const Header: React.FC = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  // Check if the current path is /login or /register
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <header className="bg-white p-4 fixed w-full z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-red-500 hover:text-red-600">
            App
          </Link>
        </div>

        {/* Login/Register */}
        <div className="flex items-center space-x-4">
          {!currentUser && !isAuthPage && (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold text-lime-600 hover:text-indigo-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold text-purple-800 hover:text-indigo-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
