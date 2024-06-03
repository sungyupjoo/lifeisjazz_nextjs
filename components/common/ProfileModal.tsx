import React, { ChangeEvent, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { StyledModal } from ".";
import { useSession } from "next-auth/react";
import useStorage from "@/hooks/useStorage";

interface ProfileModalProps {
  isProfileModalVisible: boolean;
  closeProfileModal: () => void;
  logoutHandler: () => void;
  handleSubmit?: (event: { nickname: string; imageUrl: string }) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isProfileModalVisible,
  closeProfileModal,
  logoutHandler,
  handleSubmit,
}) => {
  const { data: session } = useSession();
  const { name, image } = session?.user!;
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [nickname, setNickname] = useState(name!);
  const { startUpload, progress, deleteImage } = useStorage("profile");
  const [error, setError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadURL, setDownloadURL] = useState<string>("");

  // 닉네임 유효성 검사
  const validateNickname = (value: string) => {
    const regex = /^[a-zA-Z가-힣]*$/;
    if (!regex.test(value)) {
      return "한글 또는 알파벳만 가능합니다.";
    }
    let length = 0;
    for (let i = 0; i < value.length; i++) {
      length += /[가-힣]/.test(value[i]) ? 2 : 1;
    }
    if (length > 12) {
      return "닉네임은 한글 6자 / 알파벳 12자까지만 가능합니다.";
    }
    return "";
  };

  const nicknameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const validationResult = validateNickname(value);
    setNickname(value);
    setError(validationResult);
  };

  // 프로필 사진 변경
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFile(file);

    const fileReader = new FileReader();
    fileReader.onload = () => setPreview(fileReader.result);
    fileReader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    let newDownloadURL = downloadURL;
    if (file) {
      newDownloadURL = (await startUpload(file)) as string;
      setDownloadURL(newDownloadURL);
    }
    if (handleSubmit) {
      handleSubmit({ nickname: nickname, imageUrl: newDownloadURL });
    }
    setIsLoading(false);
    closeProfileModal();
  };
  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <StyledModal
      closeModal={closeProfileModal}
      isModalVisible={isProfileModalVisible}
    >
      <div className="mt-6">
        <h3 className="text-center mb-4">내 프로필</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-3 gap-y-4 items-start">
            <label
              htmlFor="nickname"
              className="font-semibold text-black text-center"
            >
              닉네임
            </label>
            <div className="col-span-2">
              <input
                type="text"
                id="nickname"
                name="nickname"
                defaultValue={name!}
                onChange={nicknameChangeHandler}
                required
                className="bg-white text-black p-2 border rounded-md w-full border-gray"
              />
              {error ? (
                <p className="text-sub text-[10px]">{error}</p>
              ) : (
                <p className="text-white text-[10px]">유효한 닉네임입니다.</p>
              )}
            </div>
            <label
              htmlFor="profileImage"
              className="col-span-1 font-semibold text-black"
            >
              사진
            </label>
            <div className="col-span-2">
              <img
                src={(typeof preview === "string" ? preview : image) || ""}
                alt="Profile"
                className="h-15 w-15 rounded-lg object-cover"
                style={{ height: "60px", width: "60px" }}
              />
              <div
                {...getRootProps()}
                className="mt-2 flex flex-col items-center px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer"
              >
                <input
                  {...getInputProps()}
                  id="profileImage"
                  name="profileImage"
                  accept="image/jpeg, image/png, image/gif"
                />
                {isDragActive ? (
                  <p>파일을 여기에 드랍하세요</p>
                ) : (
                  <p>{`여기를 눌러 파일을 선택하거나 끌어서 드랍하세요`}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-sub hover:bg-subShade text-white font-semibold py-2 px-4 rounded-lg mx-2"
              disabled={Boolean(error)}
            >
              변경사항 저장
            </button>
            <button
              type="button"
              onClick={logoutHandler}
              className="bg-main hover:bg-mainShade text-white font-semibold py-2 px-4 rounded-lg"
            >
              로그아웃
            </button>
          </div>
        </form>
      </div>
    </StyledModal>
  );
};

export default ProfileModal;
