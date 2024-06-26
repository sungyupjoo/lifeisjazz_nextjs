import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button, StyledModal } from ".";
import { ScheduleProps } from "./types";
import { differenceInDays, formatDate, startOfDay } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { ko } from "date-fns/locale";
import { useSession } from "next-auth/react";

export interface ScheduleModalProps {
  isScheduleModalVisible: boolean;
  setIsScheduleModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  closeScheduleModal: () => void;
  selectedDateSchedule: ScheduleProps | undefined;
  participateHandler: () => void;
  cancelScheduleHandler: () => void;
  jamday?: boolean;
  amIParticipating: boolean;
  setDocToMain: () => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isScheduleModalVisible,
  closeScheduleModal,
  selectedDateSchedule,
  participateHandler,
  cancelScheduleHandler,
  jamday,
  amIParticipating = false,
  setDocToMain,
}) => {
  const {
    date,
    title,
    category,
    description,
    expense,
    id,
    image,
    location,
    participate,
    time,
    totalNumber,
    isMain,
  } = selectedDateSchedule!;
  const { data: session } = useSession();
  const timeZone = "Asia/Seoul";
  const today = startOfDay(toZonedTime(new Date(), timeZone));
  const formattedScheduleDate = toZonedTime(date, timeZone);
  const dday = differenceInDays(formattedScheduleDate, today);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const formattedDday =
    dday === 0 ? "오늘" : dday < 0 ? "(지난 일정)" : `D-${dday}일`;
  jamday = category === "jamday";
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
        <div className="flex text-center">
          <h3 className="text-2xl">{title} </h3>
        </div>
        <img
          src={image}
          className="w-60 h-60 justify-center rounded-2xl shadow-md hover:scale-110 transition ease-in-out duration-200"
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
        {location}
      </p>
      <p className="mb-2">
        <span className="mr-4 text-gray mb-2">일시</span>
        {formatDate(date, "MM/dd(EE)", { locale: ko })} {time}
      </p>
      <p className="mb-2">
        <span className="mr-4 text-gray">비용</span>
        {expense}
      </p>
      {description.length > 0 && (
        <div className="bg-backgroundGray mb-2 rounded-xl py-3 px-4 text-gray border-none whitespace-pre-line break-keep text-sm">
          {description}
        </div>
      )}
      <p className="my-4">
        <span className="text-gray">
          참석인원
          <span className="text-sm ml-1">({participate.length}명)</span>
        </span>
      </p>
      <AnimatePresence>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          className={`grid ${participate.length > 0 && "grid-cols-2 gap-4"}`}
        >
          {participate.length > 0 &&
            participate.map((member) => (
              <motion.div
                className="flex bg-backgroundGray py-1 px-2 rounded-xl hover:bg-borderGray items-middle"
                key={member.email}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
              >
                <img
                  src={member.image!}
                  alt={`Profile of ${member.name}`}
                  className="h-6 w-6 rounded-md object-cover"
                />
                <p className="ml-2 text-black text-[1rem]">{member.name!}</p>
              </motion.div>
            ))}
        </motion.div>

        {participate.length === 0 && (
          <motion.div
            key="fallback"
            className="bg-backgroundGray py-3 px-4 rounded-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            <p className="font-light text-gray text-sm">
              아직 신청한 인원이 없습니다.
              <br /> 처음으로 신청해보세요!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex justify-center mt-4 gap-4 mb-4">
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
          <>
            {session?.user.isManager && (
              <div className="flex justify-center gap-4">
                <Button
                  backgroundColor="sub"
                  text="일정 취소하기"
                  onClick={() => setShowCancelConfirmation(true)}
                />
                <Button
                  backgroundColor="main"
                  text={isMain ? "메인에서 내림" : "메인에 공지"}
                  onClick={setDocToMain}
                />
              </div>
            )}
          </>
        )}
      </div>
    </StyledModal>
  );
};

export default ScheduleModal;
