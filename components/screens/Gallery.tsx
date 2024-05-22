import { Container, Title } from "../common";

const Gallery = () => {
  const photos = [""];

  const imageUploadHandler = () => {};
  return (
    <Container innerPadding>
      <Title titleText="사진첩" subTitle="라이재의 활동 내역" />
      <div className="mt-8 mb-4 grid grid-cols-2 grid-rows-4 lg:grid-cols-4 gap-5 ">
        {photos.map((url) => (
          <img
            className="opacity-90 rounded-lg w-full h-full max-h-40 object-cover block transition-transform duration-300 hover:scale-110 hover:opacity-100 hover:shadow-lg"
            alt="Gallery Image"
            src={url}
            key={url}
          />
        ))}
        <div className="rounded-lg w-full h-full object-cover block bg-borderGray cursor-pointer text-center ">
          <input
            type="file"
            className="absolute opacity-0 w-full h-full cursor-pointer"
            onChange={imageUploadHandler}
          />
        </div>
      </div>
    </Container>
  );
};

export default Gallery;
