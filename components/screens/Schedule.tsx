import React, { useEffect, useState } from "react";
import { Button, Container, Title } from "../common";
import "react-calendar/dist/Calendar.css";
import CustomCalendar, { Value } from "../calendar/CustomCalendar";
import moment, { MomentInput } from "moment";
import { useSession } from "next-auth/react";
import LoginModal from "../common/LoginModal";
import AddScheduleModal from "../common/AddScheduleModal";
import { ScheduleProps, categoryTypes } from "../common/types";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import useStorage from "@/hooks/useStorage";
import { formatDate, getMonth, getYear } from "date-fns";
import ScheduleModal from "../common/ScheduleModal";

interface ScheduleComponentProps {
  formattedDate: string;
  setFormattedDate: React.Dispatch<React.SetStateAction<string>>;
  activeMonth: number;
  setActiveMonth: React.Dispatch<React.SetStateAction<number>>;
  scheduleData: ScheduleProps[];
  setScheduleData: React.Dispatch<React.SetStateAction<ScheduleProps[]>>;
  selectedDateSchedule: ScheduleProps | undefined;
  setSelectedDateSchedule: React.Dispatch<
    React.SetStateAction<ScheduleProps | undefined>
  >;
  participateHandler: () => void;
  date: Value | null;
  setDate: React.Dispatch<React.SetStateAction<Value | null>>;
  isScheduleModalVisible: boolean;
  setIsScheduleModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  amIParticipating: boolean;
  setAmIParticipating: React.Dispatch<React.SetStateAction<boolean>>;
  cancelScheduleHandler: () => void;
  setDocToMain: () => void;
}

const Schedule: React.FC<ScheduleComponentProps> = ({
  formattedDate,
  setFormattedDate,
  activeMonth,
  setActiveMonth,
  scheduleData,
  setScheduleData,
  selectedDateSchedule,
  setSelectedDateSchedule,
  participateHandler,
  date,
  setDate,
  isScheduleModalVisible,
  setIsScheduleModalVisible,
  amIParticipating,
  setAmIParticipating,
  cancelScheduleHandler,
  setDocToMain,
}) => {
  const { data: session, status } = useSession();

  const { startUpload } = useStorage("scheduleImages");
  const [isLoading, setIsLoading] = useState(false);
  const [downloadURL, setDownloadURL] = useState<string>("");

  const [addScheduleModalVisible, setAddScheduleModalVisible] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    const selectedMonth = `${getYear(formattedDate)} ${
      getMonth(formattedDate) + 1
    }`;
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
      id: (fd.get("category") as categoryTypes)
        .concat(formattedDate)
        .concat(fd.get("title") as string),
    };
    try {
      await setDoc(
        doc(db, "schedules", selectedMonth),
        {
          data: [...scheduleData, data],
        },
        { merge: true }
      );
      // 잼데이일 경우 jamdays db에 추가
      if (data.category === "jamday") {
        const jamdayDocRef = doc(db, "jamday", selectedMonth);
        const docSnap = await getDoc(jamdayDocRef);
        let currentJamdays = [];
        if (docSnap.exists()) {
          currentJamdays = docSnap.data().jamday || [];
        }
        if (!currentJamdays.includes(formattedDate)) {
          currentJamdays.push(formattedDate);
          await setDoc(
            jamdayDocRef,
            { jamday: currentJamdays },
            { merge: true }
          );
        }
      }
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
    const dateSchedule = scheduleData.find(
      (schedule) => schedule.date === formatDate(newDate as Date, "yyyy-MM-dd")
    );
    setSelectedDateSchedule(dateSchedule!);
    dateSchedule &&
      setAmIParticipating(
        dateSchedule.participate.some(
          (member) => member.email === session?.user.email
        )
      );
  };

  const handleMonthChange = (direction: "prev" | "next") => {
    setActiveMonth((prev) =>
      direction === "prev" ? (prev -= 1) : (prev += 1)
    );
  };

  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const showLoginModal = () => setIsLoginModalVisible(true);

  return (
    <Container backgroundGray innerPadding>
      <Title titleText="일정" subTitle="모임 일정 및 잼데이 신청" />
      <div className="flex justify-end">
        {status === "authenticated" ? (
          <div className="flex gap-4">
            {session.user.isManager && (
              <Button
                backgroundColor="sub"
                text="일정 +"
                onClick={() => {
                  setAddScheduleModalVisible(true);
                }}
              />
            )}
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

      {isLoginModalVisible && (
        <LoginModal
          isModalVisible={isLoginModalVisible}
          closeModal={() => setIsLoginModalVisible(false)}
        />
      )}
      {isLoading ? (
        <span className="absolute top-1/2 left-1/2 loading loading-spinner loading-lg"></span>
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
          selectedDateSchedule={selectedDateSchedule}
          participateHandler={participateHandler}
          cancelScheduleHandler={cancelScheduleHandler}
          amIParticipating={amIParticipating}
          setDocToMain={setDocToMain}
        />
      )}
    </Container>
  );
};

export default Schedule;
