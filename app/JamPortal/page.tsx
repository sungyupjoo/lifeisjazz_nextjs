"use client";

import React, { useEffect, useState } from "react";
import { Button, StyledModal } from "@/components/common";
import WeeklyCalendar from "@/components/calendar/WeeklyCalendar";
import {
  Song,
  AddSongModal,
  CancelSongModal,
  Vote,
} from "@/components/JamPortal";
import {
  InstrumentType,
  RhythmType,
  SongProps,
  KeyType,
  WeekType,
  ScheduleProps,
} from "../../components/common/types";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import {
  addMonths,
  addWeeks,
  getMonth,
  getYear,
  startOfDay,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import Rules from "@/components/contents/Rules";
import { jam_image, photo_jam } from "@/public/assets";
import moment from "moment";
import AddScheduleModal from "@/components/common/AddScheduleModal";

const JamDayPortal = () => {
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));
  const [jamdayDate, setJamdayDate] = useState<string[]>([]);
  const [requestedSongs, setRequestedSongs] = useState<SongProps[]>([]);
  const [scheduleData, setScheduleData] = useState<ScheduleProps[]>([]);
  const [addSongModalVisible, setAddSongModalVisible] = useState(false);
  const [cancelSongModalVisible, setCancelSongModalVisible] = useState(false);
  const [currentState, setCurrentState] = useState<WeekType>("this");
  const [ruleModalVisible, setRuleModalVisible] = useState(false);
  const [addJamdayModalVisible, setAddJamdayModalVisible] = useState(false);
  const formattedDate = `${moment(selectedDate).format("YYYY-MM-DD")}`;
  const toggleWeekState = () => {
    if (currentState === "this") {
      setSelectedDate(startOfWeek(addWeeks(selectedDate, 1)));
    } else {
      setSelectedDate(new Date());
    }
    setCurrentState((prev) => {
      if (prev === "this") {
        return "next";
      } else {
        return "this";
      }
    });
  };

  const handleDateChange = (day: Date) => {
    setSelectedDate(day);
    setRequestedSongs([]);
  };

  // 로그인 유저 정보
  const { data: session } = useSession();
  const [loginMember, setLoginMember] = useState<Session["user"]>();

  useEffect(() => {
    const setUserHandler = async () => {
      if (session?.user?.email) {
        const docRef = doc(db, "members", session?.user?.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLoginMember(docSnap.data() as Session["user"]);
        } else {
          ("유저 데이터 세팅 중 에러");
        }
      }
    };
    setUserHandler();
  }, [session]);

  useEffect(() => {
    // 해당 주의 언제가 잼데이인지
    const jamdaysDocRef = doc(db, "jamday", formattedDate);
    const unsubscribeJamDays = onSnapshot(
      jamdaysDocRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const jamdaysList: string[] = docSnapshot.data().jamday;
          setJamdayDate(jamdaysList);
        } else {
          setJamdayDate([]);
        }
      },
      (error) => {
        console.error("jamdays subscription에서 오류");
      }
    );

    // 해당 잼데이의 곡들
    const unsubscribeSongs = onSnapshot(
      jamdaysDocRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const songsData: SongProps[] = docSnapshot.data().data || [];
          setRequestedSongs(songsData);
        }
      },
      (error) => {
        console.error("no songs data");
      }
    );

    return () => {
      unsubscribeJamDays();
      unsubscribeSongs();
    };
  }, [selectedDate]);

  // 참가자 업데이트
  const updateSongParticipantHandler = async (
    songId: string,
    instrument: InstrumentType
  ) => {
    if (loginMember) {
      const updatedSongs = requestedSongs.map((song) => {
        // 곡들 중 id로 일치하는 곡 데이터 찾기
        if (song.id === songId) {
          const updatedInstruments = song.instruments.map((inst) => {
            // 선택한 악기에 유저가 있는지 확인
            if (inst.name === instrument) {
              const participantExists = inst.participants.some(
                (participant) => participant.email === loginMember?.email
              );
              const updatedParticipants = participantExists
                ? inst.participants.filter(
                    (participant) => participant.email !== loginMember?.email
                  )
                : [...inst.participants, loginMember];
              return { ...inst, participants: updatedParticipants };
            }
            return inst;
          });
          // 일치하는 곡에 업데이트한 목록 return
          return { ...song, instruments: updatedInstruments };
        }
        return song;
      });
      setRequestedSongs(updatedSongs);
      try {
        const docRef = await setDoc(
          doc(db, "jamday", formattedDate),
          {
            data: updatedSongs,
          },
          { merge: true }
        );
      } catch (e) {
        console.error(e);
      }
    }
  };

  // 신청곡 제출 관련
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const data: SongProps = {
      id:
        (loginMember?.name ?? "") +
        fd.get("title") +
        (fd.get("details") as string).slice(0, 5),
      date: formattedDate,
      requester: loginMember,
      title: fd.get("title") as string,
      key: fd.get("key") as KeyType,
      rhythm: fd.get("rhythm") as RhythmType,
      instruments: fd.getAll("instruments").map((name) => ({
        name: name as InstrumentType,
        participants: [],
      })),
      details: fd.get("details") as string,
    };
    setAddSongModalVisible(false);
    setRequestedSongs((prev) => [...prev, data]);
    try {
      const docRef = await setDoc(
        doc(db, "jamday", formattedDate),
        {
          data: [...requestedSongs, data],
        },
        { merge: true }
      );
    } catch (e) {
      console.error("에러메시지", e);
    }
  };

  // 취소
  const cancelHandler = async (songId: string) => {
    // setCancelSongModalVisible((prev) => !prev);
    const updatedData = requestedSongs.filter((song) => song.id !== songId);
    const docRef = await setDoc(
      doc(db, "jamday", startOfDay(selectedDate).toDateString()),
      {
        data: updatedData,
      },
      { merge: true }
    );
    console.log(songId, "곡ID");
  };

  // 잼데이 날짜 받아오기
  const [jamdays, setJamdays] = useState<string[]>([]);
  useEffect(() => {
    const getJamDays = async () => {
      const currentMonth = `${selectedDate.getFullYear()} ${
        selectedDate.getMonth() + 1
      }`;
      const previousMonthDate = subMonths(selectedDate, 1);
      const nextMonthDate = addMonths(selectedDate, 1);
      const previousMonth = `${previousMonthDate.getFullYear()} ${
        previousMonthDate.getMonth() + 1
      }`;
      const nextMonth = `${nextMonthDate.getFullYear()} ${
        nextMonthDate.getMonth() + 1
      }`;
      const fetchJamDays = async (month: string) => {
        const jamdaysRef = doc(db, "jamday", month);
        const jamdaysSnap = await getDoc(jamdaysRef);
        return jamdaysSnap.exists() ? jamdaysSnap.data().jamday || [] : [];
      };
      try {
        const [prevJamdays, currJamdays, nextJamdays] = await Promise.all([
          fetchJamDays(previousMonth),
          fetchJamDays(currentMonth),
          fetchJamDays(nextMonth),
        ]);
        const allJamdays = [...prevJamdays, ...currJamdays, ...nextJamdays];
        setJamdays(allJamdays);
      } catch (error) {
        console.warn("잼데이 페치 중 오류", error);
      }
    };
    getJamDays();
  }, [selectedDate]);

  const isJamDay = jamdays?.includes(formattedDate);

  useEffect(() => {
    const selectedMonth = `${getYear(selectedDate)} ${
      getMonth(selectedDate) + 1
    }`;
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
  }, [selectedDate]);

  const setJamDayHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedMonth = `${getYear(selectedDate)} ${
      getMonth(selectedDate) + 1
    }`;
    const fd = new FormData(event.currentTarget);
    // 잼데이 날짜 지정 (잼데이 지정 모달 제출 시)
    const jamdayDocRef = doc(db, "jamday", selectedMonth);
    const data: ScheduleProps = {
      date: formattedDate,
      category: "jamday",
      expense: fd.get("expense") as string,
      image: jam_image,
      location: fd.get("location") as string,
      time: fd.get("time") as string,
      participate: [],
      description: fd.get("description") as string,
      title: fd.get("title") as string,
      // TODO: totalNumber는 나중에 필요에 따라 개발
      totalNumber: 5,
    };
    try {
      // schedules db에 추가
      const docRef = doc(db, "schedules", selectedMonth);

      await setDoc(docRef, { data: [...scheduleData, data] }, { merge: true });
      // jamdays db에 추가
      const docSnap = await getDoc(jamdayDocRef);
      let currentJamdays = [];
      if (docSnap.exists()) {
        currentJamdays = docSnap.data().jamday || [];
      }
      if (!currentJamdays.includes(formattedDate)) {
        currentJamdays.push(formattedDate);
        await setDoc(jamdayDocRef, { jamday: currentJamdays }, { merge: true });
        setJamdays(currentJamdays);
      }
    } catch (e) {
      console.error("에러메시지", e);
    }
    setAddJamdayModalVisible(false);
  };

  const cancelJamdayHandler = async () => {
    const selectedMonth = `${getYear(selectedDate)} ${
      getMonth(selectedDate) + 1
    }`;
    // jamdays db에서 삭제
    try {
      const jamdayDocRef = doc(db, "jamday", selectedMonth);
      const docSnap = await getDoc(jamdayDocRef);
      let currentJamdays = [];
      if (docSnap.exists()) {
        currentJamdays = docSnap.data().jamday || [];
      }
      if (currentJamdays.includes(formattedDate)) {
        const updatedJamdays = currentJamdays.filter(
          (jamday: string) => jamday !== formattedDate
        );
        await setDoc(jamdayDocRef, { jamday: updatedJamdays }, { merge: true });
        setJamdays(updatedJamdays);
      }
      // schedules db에서 삭제
      const scheduleDocRef = doc(db, "schedules", selectedMonth);
      const updatedSchedule = scheduleData.filter(
        (schedule) => schedule.date !== formattedDate
      );
      await updateDoc(scheduleDocRef, {
        data: updatedSchedule,
      });
    } catch (e) {
      console.error("지우는 중 에러", e);
    }
  };

  const showRuleModal = () => {
    setRuleModalVisible(true);
  };

  return (
    <div className="relative bg-white min-h-screen">
      <WeeklyCalendar
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        jamDayDate={jamdays}
        weekState={currentState}
        setWeekState={toggleWeekState}
      />
      {currentState === "this" && (
        <div className="mx-4 mt-8">
          {isJamDay ? (
            <>
              <div className="flex justify-between">
                <p>잼 참석비: 10,000원</p>
                <Button
                  backgroundColor="sub"
                  text="이용수칙"
                  onClick={showRuleModal}
                />
              </div>
              <div className="flex justify-between mt-4">
                <p>
                  신청곡{" "}
                  <span className=" font-semibold">{`총 ${requestedSongs.length} 곡`}</span>
                </p>
                <Button
                  backgroundColor="sub"
                  text="잼데이 취소"
                  onClick={cancelJamdayHandler}
                />
              </div>
              <div className="flex mt-4 flex-col align-middle sm:flex-row sm:gap-5 sm:items-center">
                {requestedSongs.length > 0 && (
                  <p className="">
                    참가하실 곡을 선택해 악기 파트를 눌러주세요.
                  </p>
                )}
                <div className="mt-2 my-4">
                  <Button
                    backgroundColor="main"
                    text="곡 신청 +"
                    onClick={() => setAddSongModalVisible(true)}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col mt-16 justify-center items-center h-full gap-10 bg-white">
              <h3>잼데이 날이 아닙니다</h3>
              <Button
                backgroundColor="sub"
                text="잼데이 지정"
                big
                onClick={() => setAddJamdayModalVisible(true)}
              />
            </div>
          )}
          <Song
            requestedSongs={requestedSongs}
            updateParticipant={updateSongParticipantHandler}
            selectedDate={selectedDate}
            onCancel={cancelHandler}
          />
          {addSongModalVisible && (
            <AddSongModal
              isVisible={addSongModalVisible}
              closeHandler={() => {
                setAddSongModalVisible(false);
              }}
              handleSubmit={handleSubmit}
            />
          )}
          {cancelSongModalVisible && (
            <CancelSongModal
              isVisible={cancelSongModalVisible}
              closeHandler={() => setCancelSongModalVisible(false)}
            />
          )}
        </div>
      )}
      {currentState === "next" && (
        <div>
          <Vote
            selectedDate={selectedDate}
            loginMember={loginMember!}
            setJamdayHandler={() => setAddJamdayModalVisible(true)}
            jamdays={jamdays}
            cancelJamdayHandler={cancelJamdayHandler}
          />
        </div>
      )}
      {ruleModalVisible && (
        <StyledModal
          isModalVisible={ruleModalVisible}
          closeModal={() => setRuleModalVisible(false)}
        >
          <Rules />
        </StyledModal>
      )}
      {addJamdayModalVisible && (
        <AddScheduleModal
          isVisible={addJamdayModalVisible}
          selectedDate={selectedDate}
          closeHandler={() => {
            setAddJamdayModalVisible(false);
          }}
          handleSubmit={setJamDayHandler}
          jamday={true}
        />
      )}
    </div>
  );
};

export default JamDayPortal;
