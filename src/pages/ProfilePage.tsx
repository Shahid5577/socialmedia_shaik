import React, { useState, useEffect } from 'react';
import { db } from '../utils/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext'; // Get user context
import { storage } from '../utils/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState('');

  useEffect(() => {
    if (currentUser) {
      // Fetch existing user profile from Firestore
      const fetchProfile = async () => {
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setName(userSnap.data().name);
          setBio(userSnap.data().bio);
          setProfileImageUrl(userSnap.data().profileImageUrl || '');
        }
      };

      fetchProfile();
    }
  }, [currentUser]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If a new profile picture is selected, upload it
    if (profilePicture) {
      const storageRef = ref(storage, `profile_pictures/${currentUser?.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, profilePicture);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // You can show upload progress here if you want
        },
        (error) => {
          console.error('Error uploading profile picture:', error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          // Save profile information with the new profile picture URL
          await setDoc(doc(db, 'users', currentUser?.uid), {
            name,
            bio,
            profileImageUrl: downloadURL,
          });
          setProfileImageUrl(downloadURL); // Update state with new profile image URL
        }
      );
    } else {
      // Save profile info without changing the profile picture
      await setDoc(doc(db, 'users', currentUser?.uid), {
        name,
        bio,
        profileImageUrl,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Profile</h2>
      {profileImageUrl && (
        <div className="mt-6 text-center">
          <img
            src={profileImageUrl}
            alt="Profile"
            className="rounded-full h-32 w-32 mx-auto object-cover"
          />
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

        <div className="mb-4">
          <label htmlFor="profilePicture" className="block text-sm font-semibold text-gray-700">Profile Picture</label>
          <input
            type="file"
            id="profilePicture"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full mt-2 text-sm text-gray-700"
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
