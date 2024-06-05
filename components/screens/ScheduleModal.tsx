import { useEffect, useState } from "react";
import { Button, StyledModal } from "../common";
import { ScheduleProps } from "../common/types";
import { useSession } from "next-auth/react";

interface ScheduleModalProps {
  isScheduleModalVisible: boolean;
  closeScheduleModal: () => void;
  scheduleData: ScheduleProps;
  participateHandler: () => void;
  cancelScheduleHandler: () => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isScheduleModalVisible,
  closeScheduleModal,
  scheduleData,
  participateHandler,
  cancelScheduleHandler,
}) => {
  return (
    <StyledModal
      isModalVisible={isScheduleModalVisible}
      closeModal={closeScheduleModal}
    >
      <div className="flex justify-center flex-col items-center gap-4 mb-4">
        <h3 className="text-xl">{scheduleData.title}</h3>
        <img
          src={scheduleData.image}
          className="w-40 h-40 justify-center rounded-xl shadow-md hover:scale-110 transition ease-in-out duration-200"
        />
      </div>
      <p className="mb-2">
        <span className="mr-4 text-gray mb-2">장소</span>
        {scheduleData.location}
      </p>
      <p className="mb-2">
        <span className="mr-4 text-gray mb-2">시간</span>
        {scheduleData.time}
      </p>
      <p className="mb-2">
        <span className="mr-4 text-gray">비용</span>
        {scheduleData.expense}
      </p>
      <div className="bg-borderGray mb-2 rounded-xl py-4 px-2 text-black">
        {scheduleData.description}
      </div>
      <p>
        <span className="mr-4 text-gray mb-2 ">참석인원</span>
      </p>
      <div className="grid grid-cols-2">
        {scheduleData.participate.map((member) => (
          <div
            className="flex bg-backgroundGray py-2 px-2 rounded-xl"
            key={member.email}
          >
            <img
              src={member.image!}
              alt={`Profile of ${member.name}`}
              className="h-6 w-6 rounded-md object-cover"
            />
            <p className="ml-2 text-black text-[1rem]">{member.name!}</p>
          </div>
        ))}
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
