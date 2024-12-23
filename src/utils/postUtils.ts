import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore();

export const createPost = async (userId: string, postContent: { text: string; mediaUrls: string[] }) => {
  const post = {
    userId,
    text: postContent.text,
    mediaUrls: postContent.mediaUrls,
    timestamp: new Date(),
  };

  try {
    const docRef = await addDoc(collection(db, "posts"), post);
    return docRef.id;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};
