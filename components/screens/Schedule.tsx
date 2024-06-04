import React, { useEffect, useState } from "react";
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
import AddScheduleModal from "../common/AddScheduleModal";
import { ScheduleProps, categoryTypes } from "../common/types";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import useStorage from "@/hooks/useStorage";
import { getMonth, getYear, startOfDay } from "date-fns";

const Schedule: React.FC = () => {
  const { data: session, status } = useSession();
  const today = new Date();
  const [date, setDate] = useState<Value | null>(null);
  const [activeMonth, setActiveMonth] = useState<number>(getMonth(new Date()));
  const [scheduleData, setScheduleData] = useState<ScheduleProps[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<
    ScheduleProps | undefined
  >();
  const { startUpload, progress, deleteImage } = useStorage("scheduleImages");
  const [isLoading, setIsLoading] = useState(false);
  const [downloadURL, setDownloadURL] = useState<string>("");

  const [formattedDate, setFormattedDate] = useState<string>(
    moment(today as MomentInput).format("YYYY-MM-DD")
  );
  const [addScheduleModalVisible, setAddScheduleModalVisible] = useState(false);

  // 스케쥴 데이터 받아오기
  useEffect(() => {
    const selectedMonth = `${getYear(formattedDate)} ${activeMonth + 1}`;
    const docRef = doc(db, "schedules", selectedMonth);
    const unsubscribeSchedules = onSnapshot(
      docRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const schedules: ScheduleProps[] = docSnapshot.data().data || [];
          setScheduleData(schedules);
        }
      },
      (error) => {
        console.error("no songs data");
      }
    );
    return () => unsubscribeSchedules();
  }, [activeMonth]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();

    // 이미지 업로드

    const fd = new FormData(event.currentTarget);
    const image = fd.get("image") as File;
    let newDownloadURL = downloadURL;
    newDownloadURL = (await startUpload(image)) as string;
    setDownloadURL(newDownloadURL);

    const data: ScheduleProps = {
      date: formattedDate,
      category: (fd.get("category") as categoryTypes) || "",
      expense: (fd.get("expense") as string) || "",
      image: newDownloadURL || "",
      location: (fd.get("location") as string) || "",
      time: (fd.get("time") as string) || "",
      participate: [],
      description: (fd.get("description") as string) || "",
      title: (fd.get("title") as string) || "",
      // TODO: totalNumber는 나중에 필요에 따라 개발
      totalNumber: 5,
    };
    try {
      const docRef = await setDoc(
        doc(db, "schedules", `${getYear(formattedDate)} ${activeMonth + 1}`),
        {
          data: [...scheduleData, data],
        },
        { merge: true }
      );
    } catch (e) {
      console.error("에러메시지", e);
    }
    setIsLoading(false);
    setAddScheduleModalVisible(false);
  };

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
    setFormattedDate(moment(newDate as MomentInput).format("YYYY-MM-DD"));
  };

  const handleMonthChange = (direction: "prev" | "next") => {
    setActiveMonth((prev) =>
      direction === "prev" ? (prev -= 1) : (prev += 1)
    );
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
          <div className="flex gap-4">
            <Button
              backgroundColor="sub"
              text="일정 +"
              onClick={() => {
                setAddScheduleModalVisible(true);
              }}
            />
            <Button backgroundColor="sub" text="잼데이" link />
          </div>
        ) : (
          <Button
            backgroundColor="sub"
            text="잼데이"
            onClick={showLoginModal}
          />
        )}
      </div>

      <FlexWrapper>
        <CustomCalendar
          date={date}
          onDateChange={handleDateChange}
          scheduleData={scheduleData}
          handleMonthChange={handleMonthChange}
        />
        <div className="hidden sm:flex flex-col gap-8 mt-4 w-full">
          <div className="flex justify-center items-center mt-6">
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <h3 className="text-xl font-semibold">일정</h3>
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
                      className="w-32 h-32 rounded-lg mr-4 object-cover"
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
                <p className="mt-2">{selectedSchedule?.description}</p>
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
      {isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : (
        <AddScheduleModal
          isVisible={addScheduleModalVisible}
          selectedDate={date}
          closeHandler={() => {
            setAddScheduleModalVisible(false);
          }}
          handleSubmit={handleSubmit}
        />
      )}
    </Container>
  );
};

export default Schedule;
