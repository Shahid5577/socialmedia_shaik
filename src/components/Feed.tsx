import React, { useState, useEffect } from 'react';
import { db } from '../utils/firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { FaTrash, FaHeart, FaComment, FaShare, FaTag, FaEllipsisH } from 'react-icons/fa';

const Feed: React.FC = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const postsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsList);
    };

    fetchPosts();
  }, []);

  const handleDeletePost = async (postId: string) => {
    await deleteDoc(doc(db, 'posts', postId));
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const handleViewMore = (postId: string) => {
    console.log('View more clicked for post:', postId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg space-y-4 max-w-full md:max-w-2xl mx-auto">
            {/* Post Header (Profile Section) */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={post.userProfileImage || '/default-profile.png'}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p className="font-semibold">{post.userName}</p>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <FaEllipsisH />
              </button>
            </div>

            {/* Post Image Section */}
            {post.mediaUrls?.length > 0 ? (
              <div className="space-y-4">
                {post.mediaUrls.map((url: string, index: number) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Post media ${index}`}
                    className="w-full rounded-lg object-cover md:w-3/4 md:mx-auto"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-image.png';
                    }}
                  />
                ))}
              </div>
            ) : null}

            {/* Action Icons */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-6">
                <FaHeart className="text-gray-500 hover:text-red-500 cursor-pointer" />
                <FaComment className="text-gray-500 hover:text-blue-500 cursor-pointer" />
                <FaShare className="text-gray-500 hover:text-green-500 cursor-pointer" />
              </div>
              <FaTag className="text-gray-500 hover:text-purple-500 cursor-pointer" />
            </div>

            {/* Likes Count */}
            <div className="mt-2 text-sm text-gray-500">
              <p>{post.likesCount} Likes</p>
            </div>

            {/* Post Details */}
            <div className="mt-4">
              <p className="font-semibold">{post.userName}</p>

              {/* Description and View More */}
              <div className="text-sm text-gray-600">
                {post.description?.length > 100
                  ? `${post.description.substring(0, 100)}...`
                  : post.description}
                {post.description?.length > 100 && (
                  <button
                    onClick={() => handleViewMore(post.id)}
                    className="text-blue-500 text-sm mt-1"
                  >
                    View More
                  </button>
                )}
              </div>
            </div>

            {/* Delete Button */}
            {currentUser?.uid === post.userId && (
              <div className="mt-4">
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="flex items-center text-red-600 hover:text-red-800"
                >
                  <FaTrash className="mr-2" />
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
