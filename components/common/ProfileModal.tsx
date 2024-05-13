import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UserProps } from "./types";

interface ProfileModalProps {
  isProfileModalVisible: boolean;
  closeProfileModal: () => void;
  user: UserProps;
  logoutHandler: () => void;
  handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isProfileModalVisible,
  closeProfileModal,
  user,
  logoutHandler,
  handleSubmit,
}) => {
  const { name, image } = user;
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const fileReader = new FileReader();
    fileReader.onload = () => setPreview(fileReader.result);
    fileReader.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className={`modal ${
        isProfileModalVisible ? "flex" : "hidden"
      } fixed inset-0 z-50`}
    >
      <div
        className="modal-content bg-white p-4 rounded-lg shadow-lg mx-auto my-20"
        style={{ width: "25rem", height: "30rem" }}
      >
        <h3 className="text-center text-xl font-semibold mb-4">내 프로필</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-4 gap-4 items-center">
            <label htmlFor="nickname" className="col-span-1 font-semibold">
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              required
              defaultValue={name}
              className="col-span-3 p-2 border rounded-md"
            />

            <label htmlFor="profileImage" className="col-span-1 font-semibold">
              사진
            </label>
            <div className="col-span-3">
              <img
                src={(typeof preview === "string" ? preview : image) || ""}
                alt="Profile"
                className="h-15 w-15 rounded-lg"
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
              className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg mx-2"
            >
              변경사항 저장
            </button>
            <button
              type="button"
              onClick={logoutHandler}
              className="bg-secondary-500 hover:bg-secondary-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              로그아웃
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
