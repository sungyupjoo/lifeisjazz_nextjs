"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/common";
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
} from "../../components/common/types";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { addWeeks, startOfDay, startOfWeek } from "date-fns";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

const JamDayPortal = () => {
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));
  const [jamDayDate, setJamDayDate] = useState<string[]>([]);
  const [requestedSongs, setRequestedSongs] = useState<SongProps[]>([]);
  const [addSongModalVisible, setAddSongModalVisible] = useState(false);
  const [cancelSongModalVisible, setCancelSongModalVisible] = useState(false);
  const [currentState, setCurrentState] = useState<WeekType>("this");
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
    const formattedSelectedDate = `${selectedDate.getFullYear()} ${
      selectedDate.getMonth() + 1
    }`;

    // 해당 주의 언제가 잼데이인지
    const jamDaysDocRef = doc(db, "jamday", formattedSelectedDate);
    const unsubscribeJamDays = onSnapshot(
      jamDaysDocRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const jamdaysList: string[] = docSnapshot.data().jamday;
          setJamDayDate(jamdaysList);
        } else {
          console.warn("jamdaydate data 받아오는 중 오류");
        }
      },
      (error) => {
        console.error("jamdays subscription에서 오류");
      }
    );

    // 해당 잼데이의 곡들
    const startOfDayDate = startOfDay(selectedDate).toDateString();
    const docRef = doc(db, "jamday", startOfDayDate);
    const unsubscribeSongs = onSnapshot(
      docRef,
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
          doc(db, "jamday", startOfDay(selectedDate).toDateString()),
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

  // Form
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const data: SongProps = {
      id:
        (loginMember?.name ?? "") +
        fd.get("title") +
        (fd.get("details") as string).slice(0, 5),
      date: startOfDay(selectedDate).toDateString(),
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
        doc(db, "jamday", startOfDay(selectedDate).toDateString()),
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
      const jamdaysRef = doc(
        db,
        "jamday",
        `${selectedDate.getFullYear()} ${selectedDate.getMonth() + 1}`
      );
      const jamdaysSnap = await getDoc(jamdaysRef);
      const confirmedJamdays = jamdaysSnap.data()?.jamday;
      setJamdays(confirmedJamdays);
    };
    getJamDays();
  }, []);

  const isJamDay = jamdays?.includes(startOfDay(selectedDate).toDateString());

  const setJamDayHandler = async () => {
    // 잼데이 날짜 지정
    const jamdayDocRef = doc(
      db,
      "jamday",
      `${selectedDate.getFullYear()} ${selectedDate.getMonth() + 1}`
    );
    const docSnap = await getDoc(jamdayDocRef);
    let currentJamdays = [];
    if (docSnap.exists()) {
      currentJamdays = docSnap.data().jamday || [];
    }
    const formattedSelectedDate = startOfDay(selectedDate).toDateString();
    if (!currentJamdays.includes(formattedSelectedDate)) {
      currentJamdays.push(formattedSelectedDate);
      await setDoc(jamdayDocRef, { jamday: currentJamdays }, { merge: true });
      setJamdays(currentJamdays);
    }
  };

  return (
    <div className="relative bg-white min-h-screen">
      <WeeklyCalendar
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        jamDayDate={jamDayDate}
        weekState={currentState}
        setWeekState={toggleWeekState}
      />
      {currentState === "this" && (
        <div className="ml-4 mt-8">
          {isJamDay ? (
            <>
              <p>잼 참석비: 10,000원</p>
              <p className="mt-4">
                신청곡{" "}
                <span className=" font-semibold">{`총 ${requestedSongs.length} 곡`}</span>
              </p>
              <div className="flex mt-4 flex-col align-middle sm:flex-row sm:gap-5 sm:items-center">
                {requestedSongs.length > 0 && (
                  <p className="">참가하실 곡의 악기 파트를 눌러주세요.</p>
                )}
                <div>
                  <Button
                    backgroundColor="sub"
                    text="곡 신청 +"
                    onClick={() => setAddSongModalVisible(true)}
                    big
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
                onClick={setJamDayHandler}
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
            setJamdayHandler={setJamDayHandler}
          />
        </div>
      )}
    </div>
  );
};

export default JamDayPortal;
