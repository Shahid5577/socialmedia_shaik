import React, { useState } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/20/solid'; // Heroicons v2 import
import { useNavigate } from 'react-router-dom';

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Example: Submit the post data to an API or handle the save logic
    console.log({ title, description, file });
    alert('Post created successfully!');
    
    // Clear input fields after saving
    setTitle('');
    setDescription('');
    setFile(null);

    // Show success message
    setSuccessMessage('Post created successfully!');

    // Hide the success message after a few seconds
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <button
          onClick={handleBack}
          className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold flex-grow text-center">Create Post</h1>
      </div>
      {successMessage && (
        <div className="bg-green-500 text-white p-3 rounded-md mb-4">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            //required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows={4}
            //required
          ></textarea>
        </div>
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">
            Upload Image or Video
          </label>
          <input
            id="file"
            type="file"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            accept="image/*,video/*"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
