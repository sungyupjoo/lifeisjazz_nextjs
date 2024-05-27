import { Button } from "../common";
import { useState, useEffect } from "react";
import { getSession, signOut, useSession } from "next-auth/react";
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
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const clickHandler = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const refreshSession = async () => {
    const updatedSession = await getSession();
    await update(updatedSession);
  };

  useEffect(() => {
    const userSettingHandler = async () => {
      setIsLoading(true);
      if (session?.user?.email) {
        try {
          // next-auth에서 email받아 그걸로 firebase doc 찾고 거기서 닉네임과 이미지 가져오기
          const docRef = doc(db, "members", session?.user?.email);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            const { email, image, name } = userData;
            await update({ email: email, image: image, name: name });
            await refreshSession();
          } else {
            const { email, image, name } = session.user;
            // 매니저 권한은 Firebase에서 직접 부여 or 별도 페이지 만들어서 관리 예정
            setDoc(docRef, { email, image, name, isManager: false });
          }
        } catch (error) {
          console.warn(error, "로그인 중 에러");
        }
      }
      setIsLoading(false);
    };
    userSettingHandler();
  }, [session?.user.name, session?.user.image]);

  const logOutHandler = () => {
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
    console.log(image);
    try {
      if (session?.user?.email) {
        const docRef = doc(db, "members", session.user?.email);
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
  if (isLoading === true) {
    return <div>로딩 중...</div>;
  }
  if (session?.user?.name) {
    return (
      <>
        <Profile onClick={openProfileModal} />
        {isProfileModalVisible && session.user && (
          <ProfileModal
            isProfileModalVisible={isProfileModalVisible}
            closeProfileModal={closeProfileModal}
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
