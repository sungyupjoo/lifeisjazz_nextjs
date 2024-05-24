import React, { useState } from "react";
import {
  Button,
  Container,
  FlexWrapper,
  InputBox,
  StyledModal,
  Title,
} from "../common";
import "react-calendar/dist/Calendar.css";
import CustomCalendar, { Value } from "../calendar/CustomCalendar";
import {
  IconArrowRight,
  IconCalendar,
  IconPen,
  IconPeople,
  IconPlace,
  IconTime,
} from "../common/icons";
import moment, { MomentInput } from "moment";
import { useSession } from "next-auth/react";
import LoginModal from "../common/LoginModal";
import { exampleSchedule, ScheduleProps } from "../contents/exampleSchedule";

const Schedule: React.FC = () => {
  const { data: session, status } = useSession();
  const today = new Date();
  const [date, setDate] = useState<Value | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<
    ScheduleProps | undefined
  >(
    exampleSchedule.find(
      (schedule) =>
        schedule.date === moment(date as MomentInput).format("YYYY-MM-DD")
    )
  );
  const [formattedDate, setFormattedDate] = useState<string>(
    moment(today as MomentInput).format("YYYY-MM-DD")
  );

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
    setFormattedDate(moment(newDate as MomentInput).format("YYYY-MM-DD"));
  };

  const [isAddEventModalVisible, setIsAddEventModalVisible] = useState(false);
  const addEventHandler = () => setIsAddEventModalVisible(true);

  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const showLoginModal = () => setIsLoginModalVisible(true);

  return (
    <Container backgroundGray innerPadding>
      <Title titleText="일정" subTitle="모임 일정 및 잼데이 신청" />
      <div className="flex justify-end">
        {status === "authenticated" ? (
          <Button backgroundColor="sub" text="잼데이" link />
        ) : (
          <Button
            backgroundColor="sub"
            text="잼데이"
            onClick={showLoginModal}
          />
        )}
      </div>
      <FlexWrapper>
        <CustomCalendar date={date} onDateChange={handleDateChange} />
        <div className="hidden sm:flex flex-col gap-8 mt-4 w-full">
          <div className="flex justify-center items-center mt-6">
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <h3 className="text-xl font-semibold">
                    일정 ({exampleSchedule.length})
                  </h3>
                  <button
                    onClick={addEventHandler}
                    className="ml-6 bg-blue-500 text-white text-2xl w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="p-5 rounded-lg shadow-md hover:bg-gray-300">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg">{formattedDate}</h3>
                  <Button
                    backgroundColor="main"
                    text="참석"
                    href=""
                    onClick={() => {}}
                  />
                </div>
                <h4 className="mt-2 text-lg">
                  {selectedSchedule?.title || (
                    <span className="text-gray-500">
                      해당 날짜엔 일정이 없습니다
                    </span>
                  )}
                </h4>
                <div className="flex mt-2">
                  {selectedSchedule?.image && (
                    <img
                      src={selectedSchedule.image}
                      className="w-32 h-32 rounded-lg mr-4"
                    />
                  )}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center">
                      <span className="font-semibold">위치:</span>
                      <p>{selectedSchedule?.location}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold">비용:</span>
                      <p>{selectedSchedule?.expense}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold">참석:</span>
                      <p className="text-red-500">
                        {selectedSchedule?.participate.length} /{" "}
                        {selectedSchedule?.totalNumber}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-2">{selectedSchedule?.specific}</p>
              </div>
            </div>
          </div>
          {isAddEventModalVisible && (
            <StyledModal
              isModalVisible={isAddEventModalVisible}
              closeModal={() => setIsAddEventModalVisible(false)}
            >
              <div className="space-y-4">
                <InputBox placeholder="일정 제목" icon={IconPen} />
                <InputBox
                  placeholder="날짜"
                  icon={IconCalendar}
                  onClick={() => {}}
                />
                <div className="grid grid-cols-3 gap-4">
                  <InputBox placeholder="시작 시간" icon={IconTime} />
                  <IconArrowRight size={16} />
                  <InputBox placeholder="종료 시간" icon={IconTime} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputBox placeholder="장소" icon={IconPlace} />
                  <InputBox placeholder="정원" icon={IconPeople} />
                </div>
                <InputBox placeholder="상세 내용" height="8rem" />
                <Button
                  text="등록"
                  backgroundColor="sub"
                  onClick={() => {}}
                  href=""
                />
              </div>
            </StyledModal>
          )}
          {isLoginModalVisible && (
            <LoginModal
              isModalVisible={isLoginModalVisible}
              closeModal={() => setIsLoginModalVisible(false)}
            />
          )}
        </div>
      </FlexWrapper>
    </Container>
  );
};

export default Schedule;
