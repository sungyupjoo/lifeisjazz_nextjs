import { StyledModal } from ".";
import Select from "react-select";
import { categoryOptions } from "./types";
import { Value } from "../calendar/CustomCalendar";
import { ChangeEvent, useState } from "react";

interface AddScheduleModalProps {
  isVisible: boolean;
  selectedDate: Value;
  closeHandler: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const AddScheduleModal: React.FC<AddScheduleModalProps> = ({
  isVisible,
  selectedDate,
  closeHandler,
  handleSubmit,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const imageUploadHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
      const fileReader = new FileReader();
      fileReader.onload = () => setPreview(fileReader.result);
      fileReader.readAsDataURL(selectedFile);
    }
  };

  return (
    <StyledModal
      closeModal={() => {
        setFile(null);
        setPreview(null);
        closeHandler();
      }}
      isModalVisible={isVisible}
    >
      <form onSubmit={handleSubmit} className="font-semibold text-lg  mt-8">
        <div className="mb-4 sm:mb-6 items-center">
          <label
            htmlFor="title"
            className="input input-sm input-bordered flex items-center bg-white gap-2 text-sm "
          >
            제목
            <input
              id="title"
              type="text"
              name="title"
              className="grow text-black"
              required
              placeholder="ex) 라이재 퀄텟 공연"
            />
          </label>
        </div>
        <div className="mb-4 sm:mb-6 items-center flex text-sm">
          <Select
            options={categoryOptions}
            inputId="category"
            name="category"
            className="w-full cursor-pointer text-sm"
            placeholder="종류"
            required
          />
        </div>
        <label htmlFor="image" className="text-sm ml-2">
          사진
        </label>
        {file && (
          <div className="flex">
            <img
              src={(typeof preview === "string" && preview) || ""}
              alt="이미지 미리보기"
              className="h-15 w-15 rounded-lg object-cover text-sm"
              style={{ height: "60px", width: "60px" }}
            />
          </div>
        )}
        <input
          type="file"
          id="image"
          name="image"
          className="file-input file-input-bordered file-input-sm w-full max-w-sm bg-white text-xs mb-4"
          accept="image/jpeg, image/png, image/gif"
          onChange={imageUploadHandler}
          required
        />
        <div className="mb-4 sm:mb-6 items-center">
          <label
            htmlFor="location"
            className="input input-sm input-bordered flex items-center bg-white gap-2 text-sm"
          >
            위치
            <input
              id="location"
              type="text"
              name="location"
              className="grow text-black"
              required
              placeholder="ex) 아이덴하우스"
            />
          </label>
        </div>
        <div className="mb-4 sm:mb-6 items-center">
          <label
            htmlFor="time"
            className="input input-sm input-bordered flex items-center bg-white gap-2 text-sm"
          >
            시간
            <input
              id="time"
              type="text"
              name="time"
              className="grow text-black"
              required
              placeholder="ex) 오후 7시 반~"
            />
          </label>
        </div>
        <div className="mb-4 sm:mb-6 items-center">
          <label
            htmlFor="expense"
            className="input input-sm input-bordered flex items-center bg-white gap-2 text-sm"
          >
            비용
            <input
              id="expense"
              type="text"
              name="expense"
              className="grow text-black"
              required
              placeholder="ex) 인당 10,000원"
            />
          </label>
        </div>
        <textarea
          className="bg-backgroundGray textarea textarea-bordered w-full text-black"
          placeholder="세부 내용"
          name="description"
          id="description"
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-sub text-white rounded-md px-4 py-2 w-1/2 mt-2 hover:bg-subShade"
          >
            등록
          </button>
        </div>
      </form>
    </StyledModal>
  );
};

export default AddScheduleModal;
