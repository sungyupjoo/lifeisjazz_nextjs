"use client";
import { Button } from "../common";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { UserProps } from "../common/types";
import Profile from "../common/Profile";
import ProfileModal from "../common/ProfileModal";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import LoginModal from "../common/LoginModal";

declare global {
  interface Window {
    Kakao: any;
  }
}

const Login = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [user, setUser] = useState<UserProps | null>(null);
  const { data: session, status } = useSession();

  const clickHandler = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const userSettingHandler = async () => {
      if (session?.user?.email) {
        try {
          const docRef = doc(db, "members", session?.user?.email);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
          } else {
            if (user) {
              const { email, image, name } = user;
              setDoc(docRef, { email, image, name, isManager: false });
            }
          }
          setUser(docSnap.data() as UserProps);
        } catch (error) {
          console.warn(error);
        }
      }
    };
    userSettingHandler();
  }, [session]);

  const logOutHandler = () => {
    setUser(null);
    signOut();
    setIsProfileModalVisible(false);
  };

  const openProfileModal = () => {
    setIsProfileModalVisible(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalVisible(false);
  };

  const saveProfileHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const name = fd.get("nickname" as string);
    const image = fd.get("profileImage");
    console.log(image);

    try {
      if (user?.email) {
        const docRef = doc(db, "members", user?.email);
        await updateDoc(docRef, {
          name: name,
          // image: fd.get("profileImage" as string),
        });
      } else {
        console.warn("이메일 없음");
      }
    } catch (e) {
      console.error("에러메시지", e);
    }
    setIsProfileModalVisible(false);
  };

  return (
    <>
      {!user?.name ? (
        <Button
          backgroundColor="sub"
          text={"로그인"}
          logoUrl=""
          href=""
          onClick={clickHandler}
        />
      ) : (
        <Profile onClick={openProfileModal} user={user} />
      )}

      {isModalVisible && (
        <LoginModal isModalVisible={isModalVisible} closeModal={closeModal} />
      )}
      {isProfileModalVisible && user && (
        <ProfileModal
          isProfileModalVisible={isProfileModalVisible}
          closeProfileModal={closeProfileModal}
          user={user}
          logoutHandler={logOutHandler}
          handleSubmit={saveProfileHandler}
        />
      )}
    </>
  );
};
export default Login;
