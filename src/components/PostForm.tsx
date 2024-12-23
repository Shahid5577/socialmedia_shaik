import React, { useState } from 'react';
import { db, storage } from '../utils/firebaseConfig';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext'; 
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const PostForm: React.FC = () => {
  const { currentUser } = useAuth();
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const postRef = collection(db, 'posts');

    // Handle image upload
    let imageUrl = '';
    if (image) {
      const imageRef = ref(storage, `posts/images/${Date.now()}`);
      const uploadTask = uploadBytesResumable(imageRef, image);

      imageUrl = await new Promise<string>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          null,
          (error) => reject(error),
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    }

    // Handle video upload
    let videoUrl = '';
    if (video) {
      const videoRef = ref(storage, `posts/videos/${Date.now()}`);
      const uploadTask = uploadBytesResumable(videoRef, video);

      videoUrl = await new Promise<string>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          null,
          (error) => reject(error),
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    }

    // Create post in Firestore
    await addDoc(postRef, {
      text,
      userId: currentUser?.uid,
      timestamp: Timestamp.fromDate(new Date()),
      images: imageUrl ? [imageUrl] : [],
      video: videoUrl || '',
      userName: currentUser?.displayName || 'Unknown',
      userProfileImage: currentUser?.photoURL || '',
    });

    // Reset form
    setText('');
    setImage(null);
    setVideo(null);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto mt-6">
      <div className="mb-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
          required
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input 
          type="file" 
          onChange={handleImageChange} 
          accept="image/*" 
          className="text-sm text-gray-700" 
        />
        <input 
          type="file" 
          onChange={handleVideoChange} 
          accept="video/*" 
          className="text-sm text-gray-700" 
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Post
      </button>
    </form>
  );
};

export default PostForm;
