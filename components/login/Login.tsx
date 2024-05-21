import { Button } from "../common";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { UserProps } from "../common/types";
import Profile from "../common/Profile";
import ProfileModal from "../common/ProfileModal";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import LoginModal from "../common/LoginModal";
import { RotatingLines } from "react-loader-spinner";

declare global {
  interface Window {
    Kakao: any;
  }
}

const Login = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [user, setUser] = useState<UserProps | null>(null);
  const { data: session, status, update } = useSession();

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
          console.warn(error, "로그인 중 에러");
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
    const image = fd.get("profileImage" as string);

    try {
      if (user?.email) {
        const docRef = doc(db, "members", user?.email);
        await updateDoc(docRef, {
          name: name,
          // image: image,
        });
        update({ name: name });
      } else {
        console.warn("이메일 없음");
      }
    } catch (e) {
      console.error("에러메시지", e);
    }
    setIsProfileModalVisible(false);
  };
  if (status === "loading") {
    return (
      <RotatingLines
        strokeColor="gray"
        strokeWidth="40"
        animationDuration="0.75"
        width="40"
        visible
      />
    );
  }
  if (user?.name) {
    return (
      <>
        <Profile onClick={openProfileModal} user={user} />
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
  }

  return (
    <>
      <Button
        backgroundColor="sub"
        text={"로그인"}
        logoUrl=""
        href=""
        onClick={clickHandler}
      />

      {isModalVisible && (
        <LoginModal isModalVisible={isModalVisible} closeModal={closeModal} />
      )}
    </>
  );
};
export default Login;
