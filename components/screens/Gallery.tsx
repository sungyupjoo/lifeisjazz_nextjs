import { Container, Title } from "../common";

const Gallery = () => {
  const photos = [
    "https://firebasestorage.googleapis.com/v0/b/life-is-jazz-web-app.appspot.com/o/Src%2Fgallery_1.jpeg?alt=media&token=76a1c6ea-f2b9-4cff-aeaf-a772fb1cec3a",
    "https://firebasestorage.googleapis.com/v0/b/life-is-jazz-web-app.appspot.com/o/Src%2Fgallery_2.jpeg?alt=media&token=e77491f2-df0a-48fc-a55d-e1a3fe64942a",
    "https://firebasestorage.googleapis.com/v0/b/life-is-jazz-web-app.appspot.com/o/Src%2Fgallery_3.jpeg?alt=media&token=6745a630-d6a4-48a5-9d87-3c043202e147",
    "https://firebasestorage.googleapis.com/v0/b/life-is-jazz-web-app.appspot.com/o/Src%2Fgallery_4.jpeg?alt=media&token=1e2f2744-d138-428b-b45a-907364c9c7ec",
    "https://firebasestorage.googleapis.com/v0/b/life-is-jazz-web-app.appspot.com/o/Src%2Fgallery_5.jpeg?alt=media&token=5a4fa690-9567-4664-94b2-8a71a13b85af",
    "https://firebasestorage.googleapis.com/v0/b/life-is-jazz-web-app.appspot.com/o/Src%2Fgallery_6.jpeg?alt=media&token=a0972a3f-2bcc-436f-aa09-054dc1450617",
    "https://firebasestorage.googleapis.com/v0/b/life-is-jazz-web-app.appspot.com/o/Src%2Fgallery_7.jpeg?alt=media&token=79ff2131-e852-4a6b-b0c0-e768d7b3108c",
  ];
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
      </div>
    </Container>
  );
};

export default Gallery;
