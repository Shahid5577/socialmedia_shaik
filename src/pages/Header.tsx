import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../context/AuthContext'; // Make sure this is correctly implemented

const Header: React.FC = () => {
  const { currentUser } = useAuth();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the current path is /login or /register
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (currentUser && currentUser.uid) {
        try {
          const storage = getStorage();
          const profileRef = ref(storage, `profile_pictures/${currentUser.uid}/profile.jpg`);

          // Fetch the download URL
          const url = await getDownloadURL(profileRef);
          setProfilePicture(url);
        } catch (error) {
          console.error('Error fetching profile picture:', error);
          setProfilePicture('/default-profile.png'); // Default fallback image
        }
      }
    };

    if (currentUser) {
      fetchProfilePicture();
    }
  }, [currentUser]);

  return (
    <header className="bg-white p-4 fixed w-full z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-red-500 hover:text-red-600">
            MyApp
          </Link>
        </div>

        {/* Login/Register or Profile Icon */}
        <div className="flex items-center space-x-4">
          {!currentUser ? (
            !isAuthPage && (
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
            )
          ) : (
            !isAuthPage && (
              <div className="flex items-center space-x-2">
                <Link
                  to="/profile"
                  aria-label="Profile"
                  className="text-gray-600 hover:text-gray-800"
                >
                  {profilePicture ? (
                    <img
                      src={profilePicture}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                      {/* Default profile fallback */}
                      <span>{currentUser.displayName?.[0]?.toUpperCase() || '?'}</span>
                    </div>
                  )}
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
