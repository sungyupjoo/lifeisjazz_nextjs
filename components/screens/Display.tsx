"use client";
import { useEffect, useRef, useState } from "react";
import { Hero, About, Gallery, Recruit, Schedule, Contact, Manager } from ".";
import Navigation from "../Navigation";
import { ScheduleProps } from "../common/types";
import moment, { MomentInput } from "moment";
import { Value } from "../calendar/CustomCalendar";
import { getMonth, getYear } from "date-fns";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useSession } from "next-auth/react";

const Display = () => {
  const { data: session, status } = useSession();

  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const managerRef = useRef<HTMLDivElement>(null);
  const recruitRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    const sections = [
      homeRef.current,
      aboutRef.current,
      managerRef.current,
      galleryRef.current,
      scheduleRef.current,
      contactRef.current,
    ];
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [homeRef, aboutRef, managerRef, galleryRef, scheduleRef, contactRef]);

  // 스케쥴 관련
  const today = new Date();
  const [date, setDate] = useState<Value | null>(null);
  const [activeMonth, setActiveMonth] = useState<number>(getMonth(new Date()));
  const [jamdayDates, setJamdayDates] = useState<string[]>([]);
  const [formattedDate, setFormattedDate] = useState<string>(
    moment(today as MomentInput).format("YYYY-MM-DD")
  );
  const [scheduleData, setScheduleData] = useState<ScheduleProps[]>([]);
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
          const filterJamdayDates = schedules
            ?.filter((schedule) => schedule.category === "jamday")
            .map((schedule) => schedule.date);
          setJamdayDates(filterJamdayDates);
        }
      },
      (error) => {
        console.error("no songs data");
      }
    );
    return () => unsubscribeSchedules();
  }, [activeMonth]);
  // 일정 취소
  const cancelScheduleHandler = async () => {
    const updatedScheduleData = scheduleData.filter(
      (schedule) => schedule.date !== selectedDateSchedule!.date
    );
    const updatedJamdayDates = jamdayDates.filter(
      (dates) => dates !== selectedDateSchedule!.date
    );
    try {
      // schedule db에서 삭제
      await setDoc(
        doc(db, "schedules", `${getYear(formattedDate)} ${activeMonth + 1}`),
        {
          data: updatedScheduleData,
        },
        { merge: true }
      );
      setScheduleData(updatedScheduleData);
      // jamday일 경우 jamday db에서 삭제
      await setDoc(
        doc(db, "jamday", `${getYear(formattedDate)} ${activeMonth + 1}`),
        {
          jamday: updatedJamdayDates,
        },
        { merge: true }
      );
      setJamdayDates(updatedJamdayDates);
      setIsScheduleModalVisible(false);
      setSelectedDateSchedule(undefined);
    } catch (error) {
      console.warn(error, "일정 취소 중 에러");
    }
  };

  // 해당 일정을 메인으로 / 메인이면 메인에서 내리기
  const setDocToMain = async () => {
    if (selectedDateSchedule) {
      const scheduleIndex = scheduleData.findIndex(
        (schedule) => schedule.date === selectedDateSchedule?.date
      );
      if (scheduleIndex === -1) {
        setIsScheduleModalVisible(false);
        return;
      }
      const updatedSchedule = { ...scheduleData[scheduleIndex] };

      try {
        updatedSchedule.isMain ? false : true;
        const updatedScheduleData = [...scheduleData];
        updatedScheduleData[scheduleIndex] = updatedSchedule;

        await setDoc(
          doc(db, "schedules", `${getYear(formattedDate)} ${activeMonth + 1}`),
          {
            data: updatedScheduleData,
          },
          { merge: true }
        );
      } catch (e) {
        console.error("에러메시지", e);
      }
    }
    setIsScheduleModalVisible(false);
  };

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
        setSelectedDateSchedule(updatedSchedule);
        setAmIParticipating(
          updatedSchedule.participate.some(
            (member) => member.email === session?.user.email
          )
        );
      } catch (error) {
        console.warn(error, "참석 신청 중 에러");
      }
    }
  };

  const closeScheduleModal = () => {
    setIsScheduleModalVisible(false);
  };

  return (
    <>
      <Navigation
        homeRef={homeRef}
        aboutRef={aboutRef}
        managerRef={managerRef}
        recruitRef={recruitRef}
        galleryRef={galleryRef}
        scheduleRef={scheduleRef}
        contactRef={contactRef}
        activeSection={activeSection}
      />
      <div id="home" ref={homeRef}>
        <Hero
          amIParticipating={amIParticipating}
          cancelScheduleHandler={cancelScheduleHandler}
          closeScheduleModal={closeScheduleModal}
          isScheduleModalVisible={isScheduleModalVisible}
          setIsScheduleModalVisible={setIsScheduleModalVisible}
          participateHandler={participateHandler}
          selectedDateSchedule={selectedDateSchedule}
          setSelectedDateSchedule={setSelectedDateSchedule}
          scheduleData={scheduleData}
          setDocToMain={setDocToMain}
        />
      </div>
      <div id="about" ref={aboutRef}>
        <About />
      </div>
      <div id="manager" ref={managerRef}>
        <Manager />
      </div>
      {/* <div id="recruit" ref={recruitRef}>
        <Recruit />
      </div> */}
      <div id="gallery" ref={galleryRef}>
        <Gallery />
      </div>
      <div id="schedule" ref={scheduleRef}>
        <Schedule
          formattedDate={formattedDate}
          setFormattedDate={setFormattedDate}
          activeMonth={activeMonth}
          amIParticipating={amIParticipating}
          cancelScheduleHandler={cancelScheduleHandler}
          date={date}
          participateHandler={participateHandler}
          isScheduleModalVisible={isScheduleModalVisible}
          setIsScheduleModalVisible={setIsScheduleModalVisible}
          scheduleData={scheduleData}
          selectedDateSchedule={selectedDateSchedule}
          setSelectedDateSchedule={setSelectedDateSchedule}
          setActiveMonth={setActiveMonth}
          setAmIParticipating={setAmIParticipating}
          setDate={setDate}
          setDocToMain={setDocToMain}
          setScheduleData={setScheduleData}
        />
      </div>
      <div id="contact" ref={contactRef}>
        <Contact />
      </div>
    </>
  );
};

export default Display;
