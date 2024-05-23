import { storage } from "@/firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const useStorage = () => {
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<Error | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const startUpload = (file: File) => {
    if (!file) {
      return;
    }
    const fileId = uuidv4();
    const formatFile = file.type.split("/")[1];
    const storageRef = ref(storage, `Gallery/${fileId}.${formatFile}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
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
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
          setUrl(downloadURL);
        });
      }
    );
  };

  return { progress, error, url, startUpload };
};

export default useStorage;
