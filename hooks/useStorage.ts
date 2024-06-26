import { db, storage } from "@/firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type StorageType = "profile" | "gallery" | "scheduleImages";

const useStorage = (storagetype: StorageType) => {
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<Error | null>(null);
  const { data: session } = useSession();

  const startUpload = async (file: File) => {
    if (!file) {
      return;
    }
    const fileId = uuidv4();
    const formatFile = file.type.split("/")[1];
    const storageRef = ref(
      storage,
      `${
        storagetype === "gallery" ? "Gallery" : "Profile"
      }/${fileId}.${formatFile}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);
    return new Promise((resolve, reject) =>
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          setError(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setProgress(progress);
            // firestore에 데이터 저장
            await addDoc(collection(db, storagetype), {
              imageUrl: downloadURL,
              createdAt: new Date(),
              userEmail: session?.user.email,
            });
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      )
    );
  };
  const deleteImage = async (url: string) => {
    try {
      // storage에서 삭제
      const storageRef = ref(storage, url);
      await deleteObject(storageRef);
      // firestore에서 데이터 삭제
      const q = query(
        collection(db, storagetype),
        where("imageUrl", "==", url)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    } catch (error) {
      setError(error as Error);
    }
  };

  return { progress, error, startUpload, deleteImage };
};

export default useStorage;
