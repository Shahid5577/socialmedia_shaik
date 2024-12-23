import React from 'react';
import user1 from './users/user1.png';
import user2 from './users/user2.png';
import user3 from './users/user3.png';
import user4 from './users/user4.png';
import user5 from './users/user5.png';
import user6 from './users/user6.png';
import user7 from './users/user7.png';
import user8 from './users/user8.png';
import user9 from './users/user9.png';
import user10 from './users/user10.png';
import user11 from './users/user11.png';
import user12 from './users/user12.png';
import user13 from './users/user13.png';
import user14 from './users/user14.png';
import user15 from './users/user15.png';
import user16 from './users/user16.png';
import user17 from './users/user17.png';
import user18 from './users/user18.png';
import user19 from './users/user19.png';
import user20 from './users/user20.png';

import { FaHeart, FaComment, FaShare, FaTag, FaEllipsisV } from 'react-icons/fa';

const Feed: React.FC = () => {
  // User list with posts
  const userList = [
    {
      id: '1',
      userProfileImage: user3,
      userName: 'CrimsonCrunch',
      postImage: user3,
      description: 'Enjoying the crisp crunch of this perfect apple. A delight for the senses!',
    },
    {
      id: '2',
      userProfileImage: user2,
      userName: 'YellowSplit',
      postImage: user2,
      description: 'The banana that never disappoints! Sweetness overload in every bite.',
    },
    {
      id: '3',
      userProfileImage: user1,
      userName: 'CherryChaser',
      postImage: user1,
      description: 'Cherry season is here! These juicy gems are absolutely irresistible.',
    },
    {
      id: '4',
      userProfileImage: user4,
      userName: 'DesertDates',
      postImage: user4,
      description: 'Fueling up with nature’s candy: dates! Sweet, nutritious, and energizing.',
    },
    {
      id: '5',
      userProfileImage: user5,
      userName: 'BerryBliss',
      postImage: user5,
      description: 'Elderberries: the tiny berries with big health benefits and a bold taste.',
    },
    {
      id: '6',
      userProfileImage: user6,
      userName: 'FigFanatic',
      postImage: user6,
      description: 'Fresh figs and happy vibes! Sweet, savory, and everything in between.',
    },
    {
      id: '7',
      userProfileImage: user7,
      userName: 'AppleAmbassador',
      postImage: user7,
      description: 'This apple reminds me why it’s the king of fruits. A classic never fades!',
    },
    {
      id: '8',
      userProfileImage: user8,
      userName: 'BananaBuff',
      postImage: user8,
      description: 'A banana a day keeps the blues away. Nature’s perfect snack!',
    },
    {
      id: '9',
      userProfileImage: user9,
      userName: 'CherryExplorer',
      postImage: user9,
      description: 'Exploring the sweet life with these cherries. A burst of joy in every bite!',
    },
    {
      id: '10',
      userProfileImage: user10,
      userName: 'DateDelight',
      postImage: user10,
      description: 'Dates to power through the day! Packed with energy and sweetness.',
    },
    {
      id: '11',
      userProfileImage: user11,
      userName: 'ElderWonder',
      postImage: user11,
      description: 'Elderberries are small but mighty! Perfect for every health enthusiast.',
    },
    {
      id: '12',
      userProfileImage: user12,
      userName: 'FigDreamer',
      postImage: user12,
      description: 'Dreaming of figs and sunshine. A perfect snack for any time of the day.',
    },
    {
      id: '13',
      userProfileImage: user13,
      userName: 'AppleAddict',
      postImage: user13,
      description: 'Can’t get enough of these delicious apples! Crunchy, sweet, and oh-so-good.',
    },
    {
      id: '14',
      userProfileImage: user14,
      userName: 'BananaKing',
      postImage: user14,
      description: 'The ultimate fruit companion: a banana! Reliable, delicious, and healthy.',
    },
    {
      id: '15',
      userProfileImage: user15,
      userName: 'CherryChampion',
      postImage: user15,
      description: 'A cherry a day keeps the bad vibes away. Sweet, tangy, and irresistible!',
    },
    {
      id: '16',
      userProfileImage: user16,
      userName: 'DateCraze',
      postImage: user16,
      description: 'Crazy about dates! Perfectly sweet and naturally healthy.',
    },
    {
      id: '17',
      userProfileImage: user17,
      userName: 'ElderGem',
      postImage: user17,
      description: 'Elderberries are little gems of flavor and health! Loving every bit.',
    },
    {
      id: '18',
      userProfileImage: user18,
      userName: 'FigFusion',
      postImage: user18,
      description: 'Figs are the best blend of flavor and nutrition. A perfect treat!',
    },
    {
      id: '19',
      userProfileImage: user19,
      userName: 'BerryGuardian',
      postImage: user19,
      description: 'Elderberries: guardians of health and flavor. A berry like no other!',
    },
    {
      id: '20',
      userProfileImage: user20,
      userName: 'FigLover',
      postImage: user20,
      description: 'Loving every bite of this fig! Sweet, soft, and full of memories.',
    },
    
  ];

  return (
    <div className="container mx-auto max-w-screen-md">
      {userList.map((user) => (
        <div key={user.id} className="mb-6">
          {/* Post Header (Profile Section) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={user.userProfileImage || '/default-profile.png'}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <p className="font-semibold">{user.userName}</p>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <FaEllipsisV />
            </button>
          </div>

          {/* Post Image */}
          <div className="mt-4 flex justify-center">
            <img
              src={user.postImage || '/default-post.png'}
              alt="Post"
              className="w-full max-w-lg h-96 sm:h-96 object-cover" // Increased height for mobile view and responsive
            />
          </div>

          {/* Action Icons */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex space-x-6">
              <FaHeart className="text-gray-500 hover:text-red-500 cursor-pointer" />
              <FaComment className="text-gray-500 hover:text-blue-500 cursor-pointer" />
              <FaShare className="text-gray-500 hover:text-green-500 cursor-pointer" />
            </div>
            <FaTag className="text-gray-500 hover:text-purple-500 cursor-pointer" />
          </div>
          
          {/* Post Description */}
          <div className="mt-4 text-sm text-gray-600">
            <p>{user.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
