import { Button } from "../common";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import Profile from "../common/Profile";
import ProfileModal from "../common/ProfileModal";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import LoginModal from "../common/LoginModal";
import { AnimatePresence } from "framer-motion";

declare global {
  interface Window {
    Kakao: any;
  }
}

const Login = () => {
  const { data: session, update, status } = useSession();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const clickHandler = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const userSettingHandler = async () => {
      if (session?.user?.email) {
        setIsLoading(true);
        try {
          // next-auth에서 email받아 그걸로 firebase doc 찾고 거기서 닉네임과 이미지 가져오기
          const docRef = doc(db, "members", session?.user?.email);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            const { email, image, name, isManager } = userData;
            await update({ image: image, name: name, isManager: isManager });
          } else {
            // firebase에 해당되는 doc이 없다면 계정 생성
            const { email, image, name } = session.user;
            // 매니저 권한은 Firebase에서 직접 부여
            setDoc(docRef, { email, image, name, isManager: false });
          }
        } catch (error) {
          console.warn(error, "로그인 중 에러");
        }
      }
      setIsLoading(false);
    };
    userSettingHandler();
  }, [session?.user?.name]);

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

  const saveProfileHandler = async (event: {
    nickname: string;
    imageUrl: string;
  }) => {
    try {
      if (session?.user?.email) {
        const docRef = doc(db, "members", session.user?.email);
        await updateDoc(docRef, {
          name: event.nickname || session.user.name,
          image: event.imageUrl || session.user.image,
        });
        update({
          name: event.nickname || session.user.name,
          image: event.imageUrl || session.user.image,
        });
      } else {
        console.warn("이메일 없음");
      }
    } catch (e) {
      console.error("에러메시지", e);
    }
    setIsProfileModalVisible(false);
  };
  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-middle bg-mainTint rounded-lg p-2">
        <span className="loading loading-spinner loading-md"></span>
        <p className="ml-2 text-white text-sm">로딩 중...</p>
      </div>
    );
  }
  if (!isLoading && session?.user?.isManager !== undefined) {
    return (
      <>
        <Profile onClick={openProfileModal} session={session} />
        <AnimatePresence>
          {isProfileModalVisible && session.user && (
            <ProfileModal
              isProfileModalVisible={isProfileModalVisible}
              closeProfileModal={closeProfileModal}
              logoutHandler={logOutHandler}
              handleSubmit={saveProfileHandler}
              session={session}
            />
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      {status === "unauthenticated" && (
        <Button
          backgroundColor="sub"
          text={"로그인"}
          logoUrl=""
          href=""
          onClick={clickHandler}
        />
      )}
      <AnimatePresence>
        {isModalVisible && (
          <LoginModal isModalVisible={isModalVisible} closeModal={closeModal} />
        )}
      </AnimatePresence>
    </>
  );
};
export default Login;
