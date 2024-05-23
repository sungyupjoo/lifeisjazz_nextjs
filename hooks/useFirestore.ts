import { db } from "@/firebase/config";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

type Image = {
  createdAt: Date;
  userEmail: string;
  imageUrl: string;
};

const useFirestore = (collectionName: string) => {
  const [docs, setDocs] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let unsubscribe: () => void;
    const getData = async () => {
      try {
        const q = query(
          collection(db, "gallery"),
          orderBy("createdAt", "desc"),
          limit(8)
        );
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const images: Image[] = [];
          querySnapshot.forEach((doc) => {
            const imageUrl = doc.data().imageUrl;
            const userEmail = doc.data().userEmail;
            const createdAt = doc.data().createdAt.toDate();
            images.push({ imageUrl, userEmail, createdAt });
          });
          setDocs(images);
          setIsLoading(false);
        });
      } catch (error) {
        console.warn(error, "파이어스토어 훅 에러");
        setIsLoading(false);
      }
    };
    getData();
    return () => unsubscribe && unsubscribe();
  }, [collectionName]);

  return {
    docs,
    isLoading,
  };
};

export default useFirestore;
