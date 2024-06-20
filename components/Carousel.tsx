import { differenceInDays, formatDate } from "date-fns";
import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";
import ScheduleModal from "./common/ScheduleModal";
import { HeroProps } from "./screens/Hero";
import { useSession } from "next-auth/react";

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

const Carousel: React.FC<HeroProps> = ({
  amIParticipating,
  cancelScheduleHandler,
  closeScheduleModal,
  isScheduleModalVisible,
  setIsScheduleModalVisible,
  selectedDateSchedule,
  setSelectedDateSchedule,
  participateHandler,
  scheduleData,
  setDocToMain,
  jamday,
}) => {
  const { data: session } = useSession();
  const content = scheduleData
    .filter((schedule) => schedule.isMain === true)
    .map((schedule) => {
      return {
        title: schedule.title,
        date: schedule.date,
        image: schedule.image,
        time: schedule.time,
        id: schedule.id,
        category: schedule.category,
      };
    });
  const [currentIndex, setCurrentIndex] = useState(0);
  // Dday 추가
  const formattedDday = (date: string) => {
    const today = new Date();
    const dday = differenceInDays(date, today);
    const formatDday =
      dday === -1 ? "오늘" : dday < -1 ? "(지난 일정)" : `D-${dday + 1}일`;
    return formatDday;
  };

  const clickHandler = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLDivElement, MouseEvent>,
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

  useEffect(() => {
    const carousel = document.getElementById("carousel");

    const onScroll = () => {
      if (carousel) {
        const itemWidth = carousel.children[0].getBoundingClientRect().width;
        const scrollLeft = carousel.scrollLeft;
        const newIndex = Math.round(scrollLeft / itemWidth);
        setCurrentIndex(newIndex);
      }
    };

    carousel?.addEventListener("scroll", onScroll);

    return () => {
      carousel?.removeEventListener("scroll", onScroll);
    };
  }, []);

  const openModal = (id: string) => {
    const dateSchedule = scheduleData.find((schedule) => schedule.id === id);
    setSelectedDateSchedule(dateSchedule);
    setIsScheduleModalVisible!(true);
  };

  return (
    <>
      <div
        id="carousel"
        className="w-full sm:justify-center carousel carousel-center max-w-md sm:max-w-full px-14 space-x-4"
      >
        {content.map((item, index) => (
          <div
            id={`item${index}`}
            className={`carousel-item max-w-40 flex-col ${
              index === currentIndex ? "" : "opacity-35"
            }`}
            key={index}
            onClick={() => openModal(item.id)}
          >
            <img
              src={item.image}
              className="flex-grow max-w-40 max-h-40 min-w-40 min-h-40 object-fit rounded-t-3xl shadow-2xl"
              alt={"메인 이벤트 이미지"}
            />
            <div className="bg-main sm:h-20 flex flex-col w-full py-2 px-4 rounded-b-3xl sm:px-3 sm:py-2">
              <h2 className="text-sm leading-6 sm:text-sm font-semibold text-backgroundGray text-left break-keep mb-2">
                {item.title.slice(0, 24)}
                {item.title.length > 24 && "..."}
              </h2>
              <div className="flex items-center gap-2">
                <p className="text-borderGray text-left text-light text-xs">
                  {formatDate(item.date, "MM/dd (EE)", { locale: ko })}
                </p>
                <p
                  className={`${
                    formattedDday(item.date) === "오늘"
                      ? "text-sub"
                      : "text-backgroundGray"
                  } text-xs`}
                >
                  {formattedDday(item.date)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="justify-center flex w-full py-2 gap-2">
        {content.map((_, index) => (
          <a
            href={`#item${index}`}
            key={index}
            className={`badge badge-sm border-none ${
              index === currentIndex ? "bg-mainBrightTint" : "bg-mainShade"
            }`}
            onClick={(e) => clickHandler(e, index)}
          ></a>
        ))}
      </div>
      {isScheduleModalVisible && selectedDateSchedule && (
        <ScheduleModal
          isScheduleModalVisible={isScheduleModalVisible}
          closeScheduleModal={closeScheduleModal}
          selectedDateSchedule={selectedDateSchedule}
          participateHandler={participateHandler}
          cancelScheduleHandler={cancelScheduleHandler}
          amIParticipating={amIParticipating}
          setDocToMain={setDocToMain}
        />
      )}
    </>
  );
};

export default Carousel;
