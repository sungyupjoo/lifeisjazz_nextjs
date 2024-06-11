import { Button, StyledModal } from ".";
import { ScheduleProps } from "./types";
import { differenceInDays, formatDate } from "date-fns";
import { ko } from "date-fns/locale";

interface ScheduleModalProps {
  isScheduleModalVisible: boolean;
  closeScheduleModal: () => void;
  scheduleData: ScheduleProps;
  participateHandler: () => void;
  cancelScheduleHandler: () => void;
  jamday?: boolean;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isScheduleModalVisible,
  closeScheduleModal,
  scheduleData,
  participateHandler,
  cancelScheduleHandler,
  jamday = false,
}) => {
  const dday = differenceInDays(scheduleData.date, new Date());
  const formattedDday =
    dday === 0 ? "오늘" : dday < 0 ? "(지난 일정)" : `D-${dday}일`;
  return (
    <StyledModal
      isModalVisible={isScheduleModalVisible}
      closeModal={closeScheduleModal}
    >
      <span
        className={`text-sm font-medium ${
          formattedDday === "오늘" ? "text-sub" : "text-"
        }`}
      >
        {formattedDday}
      </span>
      <div className="flex justify-center flex-col items-center gap-4 mb-4">
        <h3 className="text-2xl">{scheduleData.title} </h3>
        <img
          src={scheduleData.image}
          className="w-40 h-40 justify-center rounded-xl shadow-md hover:scale-110 transition ease-in-out duration-200"
        />
      </div>
      <p className="mb-2">
        <span className="mr-4 text-gray mb-2">위치</span>
        {scheduleData.location}
      </p>
      <p className="mb-2">
        <span className="mr-4 text-gray mb-2">일시</span>
        {formatDate(scheduleData.date, "MM/dd(EE)", { locale: ko })}{" "}
        {scheduleData.time}
      </p>
      <p className="mb-2">
        <span className="mr-4 text-gray">비용</span>
        {scheduleData.expense}
      </p>
      <div className="bg-backgroundGray mb-2 rounded-xl py-3 px-4 text-black">
        {scheduleData.description}
      </div>
      <p>
        <span className="mr-4 text-gray mb-2 ">참석인원</span>
      </p>
      <div
        className={`grid ${
          scheduleData.participate.length > 0 && "grid-cols-2"
        }`}
      >
        {scheduleData.participate.length > 0 ? (
          scheduleData.participate.map((member) => (
            <div
              className="flex bg-backgroundGray py-2 px-2 rounded-xl hover:bg-borderGray"
              key={member.email}
            >
              <img
                src={member.image!}
                alt={`Profile of ${member.name}`}
                className="h-6 w-6 rounded-md object-cover"
              />
              <p className="ml-2 text-black text-[1rem]">{member.name!}</p>
            </div>
          ))
        ) : (
          <div className="bg-backgroundGray py-3 px-4 rounded-xl">
            <p className="font-light text-gray">
              아직 신청한 인원이 없습니다.
              <br /> 처음으로 신청해보세요!
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-4 gap-4">
        {/* TODO: 토글로 만들자 */}
        <Button
          backgroundColor="sub"
          fontColor="white"
          text={"참석/취소"}
          onClick={participateHandler}
        />
        <Button
          backgroundColor="sub"
          fontColor="white"
          text={"일정취소"}
          onClick={cancelScheduleHandler}
        />
      </div>
    </StyledModal>
  );
};

export default ScheduleModal;
