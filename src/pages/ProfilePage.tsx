import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { db } from '../utils/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext'; // Get user context

// Import Heroicons for the Back Icon (Updated path for Heroicons v2)
import { ChevronLeftIcon } from '@heroicons/react/20/solid';

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigation hook

  useEffect(() => {
    if (currentUser?.uid) {
      // Fetch existing user profile from Firestore
      const fetchProfile = async () => {
        try {
          const userRef = doc(db, 'users', currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setName(userSnap.data().name);
            setBio(userSnap.data().bio);
          }
        } catch (error) {
          setErrorMessage('Failed to load profile.');
        }
      };

      fetchProfile();
    }
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser?.uid) {
      setErrorMessage('User is not authenticated.');
      return;
    }

    try {
      // Save profile information to Firestore
      await setDoc(doc(db, 'users', currentUser.uid), {
        name,
        bio,
      });

      // Show success message
      setSuccessMessage('Profile saved successfully!');

      // Clear the success message after a few seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Failed to save profile.');
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button
          onClick={handleBack}
          className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <h2 className="text-3xl font-bold text-center flex-grow">Profile</h2>
      </div>
      {successMessage && (
        <div className="text-center mb-4 text-green-600 font-semibold">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="text-center mb-4 text-red-600 font-semibold">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="bio" className="block text-sm font-semibold text-gray-700">Bio</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
            rows={3}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
