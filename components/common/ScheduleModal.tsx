import { useState } from "react";
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
  amIParticipating: boolean;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isScheduleModalVisible,
  closeScheduleModal,
  scheduleData,
  participateHandler,
  cancelScheduleHandler,
  jamday,
  amIParticipating = false,
}) => {
  const dday = differenceInDays(scheduleData.date, new Date());
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const formattedDday =
    dday === 0 ? "오늘" : dday < 0 ? "(지난 일정)" : `D-${dday + 1}일`;
  jamday = scheduleData.category === "jamday";
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
      <div className="flex justify-center flex-col items-center gap-4 mb-4 mt-4">
        <div className="flex">
          <h3 className="text-2xl">{scheduleData.title} </h3>
        </div>
        <img
          src={scheduleData.image}
          className="w-40 h-40 justify-center rounded-xl shadow-md hover:scale-110 transition ease-in-out duration-200"
        />
      </div>
      <div className="flex">
        <p className="mb-2">
          <span className="mr-4 text-gray mb-2">참석</span>
        </p>

        <input
          type="checkbox"
          className="toggle [--tglbg:white] toggle-success"
          onClick={participateHandler}
          defaultChecked={amIParticipating}
        />
        {jamday && amIParticipating && (
          <div className="absolute right-6">
            <Button backgroundColor="main" text="곡 신청" link />
          </div>
        )}
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
      {scheduleData.description.length > 0 && (
        <div className="bg-backgroundGray mb-2 rounded-xl py-3 px-4 text-black">
          {scheduleData.description}
        </div>
      )}
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
            <p className="font-light text-gray text-sm">
              아직 신청한 인원이 없습니다.
              <br /> 처음으로 신청해보세요!
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-4 gap-4">
        {showCancelConfirmation ? (
          <div className="flex flex-col items-center">
            <p className="mb-2 transition">해당 일정을 취소할까요?</p>
            <div className="flex gap-2">
              <Button
                backgroundColor="sub"
                text="네, 취소합니다"
                onClick={cancelScheduleHandler}
              />
              <Button
                backgroundColor="main"
                text="아니오"
                onClick={() => setShowCancelConfirmation(false)}
              />
            </div>
          </div>
        ) : (
          <Button
            backgroundColor="sub"
            text="일정 취소"
            onClick={() => setShowCancelConfirmation(true)}
          />
        )}
      </div>
    </StyledModal>
  );
};

export default ScheduleModal;
