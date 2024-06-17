import { useEffect, useState } from "react";

const goToOtherImage = (
  index: number,
  carouselId: string,
  carouselLength: number
) => {
  const carousel = document.getElementById(carouselId);
  if (carousel) {
    const target = carousel.children[index] as HTMLDivElement;
    const left = target.offsetLeft * (1 - 1 / carouselLength);
    carousel.scrollTo({ left: left, behavior: "smooth" });
  }
};

interface CarouselProps {
  content: { title: string; date: string; image: string }[];
}

const Carousel: React.FC<CarouselProps> = ({ content }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const clickHandler = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    i: number
  ) => {
    event.preventDefault();
    setCurrentIndex(i);
    goToOtherImage(i, "carousel", content.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newCurrentIndex =
        currentIndex + 1 === content.length ? 0 : currentIndex + 1;
      setCurrentIndex(newCurrentIndex);
      goToOtherImage(newCurrentIndex, "carousel", content.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <>
      <div
        id="carousel"
        className="w-full carousel carousel-center max-w-md sm:max-w-full px-14 space-x-4"
      >
        {content.map((item, index) => (
          <div
            id={`item${index}`}
            className={`carousel-item max-w-52 sm:max-w-40 flex-col ${
              index === currentIndex ? "" : "opacity-35"
            }`}
            key={index}
          >
            <img
              src={item.image}
              className="flex-grow w-52 h-52 sm:w-40 sm:h-40 sm:max-h-40 sm:min-h-40 object-fit rounded-t-3xl shadow-2xl"
              alt={"메인 이벤트 이미지"}
            />
            <div className="bg-main sm:h-20 flex flex-col w-full p-4 rounded-b-3xl sm:px-3 sm:py-2">
              <h2 className="text-lg sm:text-sm font-semibold text-backgroundGray text-left break-keep mb-4 sm:mb-2">
                {item.title.slice(0, 24)}
                {item.title.length > 24 && "..."}
              </h2>
              <p className="text-borderGray text-left text-light text-xs">
                {item.date}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="justify-center flex w-full py-2 gap-2">
        {content.map((_, index) => (
          <a
            href={`#item${index}`}
            key={index}
            className={`badge badge-sm ${
              index === currentIndex ? "bg-mainBrightTint" : "bg-mainShade"
            }`}
            onClick={(e) => clickHandler(e, index)}
          ></a>
        ))}
      </div>
    </>
  );
};

export default Carousel;
