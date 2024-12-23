import React, { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const Profile: React.FC<{ user: any }> = ({ user }) => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (user && user.uid) {
        try {
          const storage = getStorage();
          const profileRef = ref(storage, `profile_pictures/${user.uid}/profile.jpg`);
          
          // Fetch the download URL
          const url = await getDownloadURL(profileRef);
          setProfilePicture(url);
        } catch (error) {
          console.error("Error fetching profile picture:", error);
          setProfilePicture("/default-profile.png"); // Default fallback image
        }
      }
    };

    fetchProfilePicture();
  }, [user]);

  return (
    <div>
      <img 
        src={profilePicture || "/default-profile.png"} // Show profile or fallback
        alt="Profile Icon" 
        className="w-16 h-16 rounded-full object-cover" 
      />
    </div>
  );
};

export default Profile;
