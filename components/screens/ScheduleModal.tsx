import { StyledModal } from "../common";
import { ScheduleProps } from "../common/types";

interface ScheduleModalProps {
  isScheduleModalVisible: boolean;
  closeScheduleModal: () => void;
  scheduleData: ScheduleProps;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isScheduleModalVisible,
  closeScheduleModal,
  scheduleData,
}) => {
  return (
    <StyledModal
      isModalVisible={isScheduleModalVisible}
      closeModal={closeScheduleModal}
    >
      <div className="flex justify-center">
        <h3 className="text-lg">{scheduleData.title}</h3>
      </div>
      <img src={scheduleData.image} className="w-52 h-52" />
      <div className="flex">
        <p>
          <span>장소</span>
          {scheduleData.location}
        </p>
      </div>
      <div>{scheduleData.time}</div>
      <div>{scheduleData.expense}</div>
      <div>{scheduleData.description}</div>
      <div>참석 인원</div>
      {/* <div>{scheduleData.participate.map()}</div> */}
    </StyledModal>
  );
};

export default ScheduleModal;
