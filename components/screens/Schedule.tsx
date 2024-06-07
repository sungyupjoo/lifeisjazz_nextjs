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
import { formatDate, getMonth, getYear, startOfDay } from "date-fns";
import ScheduleModal from "./ScheduleModal";

const Schedule: React.FC = () => {
  const { data: session, status } = useSession();
  const today = new Date();
  const [date, setDate] = useState<Value | null>(null);
  const [activeMonth, setActiveMonth] = useState<number>(getMonth(new Date()));
  const [scheduleData, setScheduleData] = useState<ScheduleProps[]>([]);
  const { startUpload, progress, deleteImage } = useStorage("scheduleImages");
  const [isLoading, setIsLoading] = useState(false);
  const [downloadURL, setDownloadURL] = useState<string>("");
  const [formattedDate, setFormattedDate] = useState<string>(
    moment(today as MomentInput).format("YYYY-MM-DD")
  );
  const [addScheduleModalVisible, setAddScheduleModalVisible] = useState(false);
  const [isScheduleModalVisible, setIsScheduleModalVisible] = useState(false);
  const [selectedDateSchedule, setSelectedDateSchedule] =
    useState<ScheduleProps>();
  const [amIParticipating, setAmIParticipating] = useState(false);

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
    scheduleData.find(
      (schedule) => schedule.date === formatDate(newDate as Date, "yyyy-MM-dd")
    )
      ? setIsScheduleModalVisible(true)
      : setIsScheduleModalVisible(false);
    setSelectedDateSchedule(
      scheduleData.find(
        (schedule) =>
          schedule.date === formatDate(newDate as Date, "yyyy-MM-dd")
      )
    );
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

  // 참여 신청
  const participateHandler = async () => {
    if (status === "authenticated") {
      const scheduleIndex = scheduleData.findIndex(
        (schedule) => schedule.date === selectedDateSchedule?.date
      );
      if (scheduleIndex === -1) {
        return;
      }
      const updatedSchedule = { ...scheduleData[scheduleIndex] };
      const participantIndex = updatedSchedule.participate.findIndex(
        (participant) => participant.email === session.user.email
      );
      if (participantIndex === -1) {
        updatedSchedule.participate.push(session.user);
      } else {
        updatedSchedule.participate.splice(participantIndex, 1);
      }
      const updatedScheduleData = [...scheduleData];
      updatedScheduleData[scheduleIndex] = updatedSchedule;
      try {
        await setDoc(
          doc(db, "schedules", `${getYear(formattedDate)} ${activeMonth + 1}`),
          {
            data: updatedScheduleData,
          },
          { merge: true }
        );
        setScheduleData(updatedScheduleData);
      } catch (error) {
        console.warn(error, "참석 신청 중 에러");
      }
    }
  };

  // 일정 취소
  const cancelScheduleHandler = async () => {
    const updatedScheduleData = scheduleData.filter(
      (schedule) => schedule.date !== selectedDateSchedule!.date
    );
    try {
      await setDoc(
        doc(db, "schedules", `${getYear(formattedDate)} ${activeMonth + 1}`),
        {
          data: updatedScheduleData,
        },
        { merge: true }
      );
      setScheduleData(updatedScheduleData);
      setIsScheduleModalVisible(false);
      setSelectedDateSchedule(undefined);
    } catch (error) {
      console.warn(error, "일정 취소 중 에러");
    }
  };

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

      <CustomCalendar
        date={date}
        onDateChange={handleDateChange}
        scheduleData={scheduleData}
        handleMonthChange={handleMonthChange}
      />

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
      {isScheduleModalVisible && selectedDateSchedule && (
        <ScheduleModal
          isScheduleModalVisible={isScheduleModalVisible}
          closeScheduleModal={() => setIsScheduleModalVisible(false)}
          scheduleData={selectedDateSchedule}
          participateHandler={participateHandler}
          cancelScheduleHandler={cancelScheduleHandler}
        />
      )}
    </Container>
  );
};

export default Schedule;
