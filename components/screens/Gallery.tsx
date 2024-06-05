import { ChangeEvent, useState } from "react";
import { Container, Title } from "../common";
import useStorage from "@/hooks/useStorage";
import useFirestore from "@/hooks/useFirestore";
import { formatDate } from "@/utils/formatDateString";
import { useSession } from "next-auth/react";

const ITEMS_PER_PAGE = 8;

const Gallery = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [selectedImage, setSelectedImage] = useState<string | null>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { startUpload, progress, deleteImage } = useStorage("gallery");
  const { docs: images, isLoading } = useFirestore("gallery");
  const { data: session } = useSession();

  const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE);
  const currentImages = images.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const imageUploadHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // 운영자만 업로드 가능하게 바꿔야함
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFile) {
      startUpload(selectedFile);
    }
    setSelectedFile(null);
  };

  if (isLoading) {
    return (
      <div className="text-center mt-10">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <Container innerPadding>
      <Title titleText="사진첩" subTitle="라이재의 활동 내역" />
      {session?.user && (
        <div className="text-center mt-10">
          <form
            className="flex items-center flex-col gap-4 "
            onSubmit={submitHandler}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept="image/jpeg, image/png, image/gif"
              onChange={imageUploadHandler}
            />
            <div className="flex items-middle">
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-main text-white py-1 px-2 rounded-l-xl border-[1px] border-main"
              >
                파일 추가
              </label>
              <span className="px-2 py-1 rounded-r-xl border-solid border-[1px] border-l-0">
                {selectedFile ? selectedFile.name : "선택된 파일이 없습니다"}
              </span>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className={`${
                  selectedFile
                    ? "bg-main text-white"
                    : "bg-gray text-borderGray"
                } px-2 py-1 rounded-lg ${Boolean(progress) && "loading"}`}
                disabled={!selectedFile}
              >
                업로드
              </button>
              <button
                type="button"
                className={`
                  ${
                    selectedImage
                      ? "bg-sub text-white"
                      : "bg-gray text-borderGray"
                  }
                    rounded-lg px-2 py-1`}
                onClick={() => {
                  deleteImage(selectedImage!);
                  setSelectedImage(null);
                }}
              >
                삭제
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="mt-8 mb-4 grid grid-cols-2 grid-rows-4 lg:grid-cols-4 gap-5 border-b-backgroundGray max-h-full">
        {currentImages.map((image) => (
          <div key={image.imageUrl} className="gallery-image">
            <img
              className="opacity-90 rounded-lg w-full h-full max-h-40 object-cover block transition-transform duration-300 hover:scale-110 hover:opacity-100 hover:shadow-lg"
              alt="Gallery Image"
              src={image.imageUrl}
              key={image.imageUrl}
              onClick={() => {
                setSelectedImage(image.imageUrl);
              }}
            />
            <p className="text-sm text-center">
              {formatDate(image.createdAt.toDateString())}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 text-gray rounded-l-lg disabled:opacity-30"
        >
          이전
        </button>
        <span className="px-3 py-1 bg-white border-t border-b">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-gray rounded-r-lg disabled:opacity-30"
        >
          다음
        </button>
      </div>
    </Container>
  );
};

export default Gallery;
