import { differenceInDays, formatDate, parseISO, startOfDay } from "date-fns";
import { ko } from "date-fns/locale";
import ScheduleModal from "./common/ScheduleModal";
import { HeroProps } from "./screens/Hero";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/pagination.css";
import { Pagination, AutoPlay, Fade } from "@egjs/flicking-plugins";
import { toZonedTime } from "date-fns-tz";

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
  const plugins = [
    new AutoPlay({ duration: 4500, direction: "NEXT" }),
    new Fade("", 1),
    new Pagination({ type: "bullet" }),
  ];
  const content = scheduleData
    .filter((schedule) => schedule.isMain === true)
    .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())
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
  // Dday 추가
  const formattedDday = (date: string) => {
    const timeZone = "Asia/Seoul";
    const today = startOfDay(toZonedTime(new Date(), timeZone));
    const timezoneDate = toZonedTime(date, timeZone);
    const dday = differenceInDays(timezoneDate, today);
    const formatDday =
      dday === 0 ? "오늘" : dday < 0 ? "(지난 일정)" : `D-${dday}일`;
    return formatDday;
  };

  const openModal = (id: string) => {
    const dateSchedule = scheduleData.find((schedule) => schedule.id === id);
    setSelectedDateSchedule(dateSchedule);
    setIsScheduleModalVisible!(true);
  };

  return (
    <>
      <Flicking
        align="center"
        viewportTag="div"
        cameraTag="div"
        circular={true}
        plugins={plugins}
      >
        {content.map((item, index) => (
          <div
            className={`max-w-40 flex-col mr-4`}
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
        <ViewportSlot>
          <div className="flicking-pagination"></div>
        </ViewportSlot>
      </Flicking>

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
