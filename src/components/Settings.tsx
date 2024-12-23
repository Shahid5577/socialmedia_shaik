import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Handle Logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Handle Switch Account
  const handleSwitchAccount = () => {
    navigate('/login'); // Redirect to login page for switching accounts
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Settings</h1>

        {/* Your Account */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Account</h2>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => navigate('/account-center')}
                className="text-sm text-indigo-600 hover:underline"
              >
                Account Center
              </button>
            </li>
          </ul>
        </div>

        {/* How to Use App */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">How to Use App</h2>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => navigate('/saved')}
                className="text-sm text-indigo-600 hover:underline"
              >
                Saved
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/your-activity')}
                className="text-sm text-indigo-600 hover:underline"
              >
                Your Activity
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/archive')}
                className="text-sm text-indigo-600 hover:underline"
              >
                Archive
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/notifications')}
                className="text-sm text-indigo-600 hover:underline"
              >
                Notifications
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/time-management')}
                className="text-sm text-indigo-600 hover:underline"
              >
                Time Management
              </button>
            </li>
          </ul>
        </div>

        {/* Who Can See Your Content */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Who Can See Your Content</h2>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => navigate('/account-center')}
                className="text-sm text-indigo-600 hover:underline"
              >
                Account Center
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/close-friends')}
                className="text-sm text-indigo-600 hover:underline"
              >
                Close Friends
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/blocked')}
                className="text-sm text-indigo-600 hover:underline"
              >
                Blocked
              </button>
            </li>
          </ul>
        </div>

        {/* More Info and Support */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">More Info and Support</h2>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => navigate('/help')}
                className="text-sm text-indigo-600 hover:underline"
              >
                Help
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/privacy-center')}
                className="text-sm text-indigo-600 hover:underline"
              >
                Privacy Center
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/account-status')}
                className="text-sm text-indigo-600 hover:underline"
              >
                Account Status
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/about')}
                className="text-sm text-indigo-600 hover:underline"
              >
                About
              </button>
            </li>
          </ul>
        </div>

        {/* Logout and Add Account */}
        <div className="flex flex-col space-y-4 mb-14">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
          <button
            onClick={handleSwitchAccount}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
          >
            Add Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
