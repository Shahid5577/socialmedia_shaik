import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const storage = getStorage();

export const uploadFile = async (file: File, folder: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileRef = ref(storage, `${folder}/${file.name}-${Date.now()}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      () => {}, // Progress handler (optional)
      (error) => reject(error),
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};
