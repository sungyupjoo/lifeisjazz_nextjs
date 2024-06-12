import { Dispatch, SetStateAction, useState } from "react";
import { signIn } from "next-auth/react";
import StyledModal from "./StyledModal";

interface LoginModalProps {
  isModalVisible: boolean;
  closeModal: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isModalVisible,
  closeModal,
}) => {
  const loginHandler = async () => {
    await signIn("kakao", {
      redirect: true,
      callbackUrl: "/",
    });
    closeModal();
  };

  return (
    <StyledModal isModalVisible={isModalVisible} closeModal={closeModal}>
      <h3 className="text-center text-lg mt-10 mb-14">로그인</h3>
      <div
        className="flex justify-center cursor-pointer"
        onClick={loginHandler}
      >
        <img
          src="https://firebasestorage.googleapis.com/v0/b/life-is-jazz-web-app.appspot.com/o/Src%2Fkakao_login_medium_narrow%20(1).png?alt=media&token=e108cf5f-b0a4-4ed0-a87c-67ede8259107"
          width="150"
          alt="Kakao Login"
        />
      </div>
    </StyledModal>
  );
};

export default LoginModal;
