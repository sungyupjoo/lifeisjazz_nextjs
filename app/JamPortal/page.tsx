"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/common";
import WeeklyCalendar from "@/components/calendar/WeeklyCalendar";
import { Song, AddSongModal, CancelSongModal } from "@/components/JamPortal";
import {
  InstrumentType,
  RhythmType,
  SongProps,
  KeyType,
  UserProps,
} from "../../components/common/types";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { startOfDay } from "date-fns";
import { logo_black } from "../../public/assets";
import { useSession } from "next-auth/react";

const JamDayPortal = () => {
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));
  const [jamDayDate, setJamDayDate] = useState<string[]>([]);
  const [requestedSongs, setRequestedSongs] = useState<SongProps[]>([]);
  const [addSongModalVisible, setAddSongModalVisible] = useState(false);
  const [cancelSongModalVisible, setCancelSongModalVisible] = useState(false);

  const handleDateChange = (day: Date) => {
    setSelectedDate(day);
    setRequestedSongs([]);
  };

  // 로그인 유저 정보
  const { data: session } = useSession();
  const [loginMember, setLoginMember] = useState<UserProps>();

  useEffect(() => {
    const setUserHandler = async () => {
      if (session?.user?.email) {
        const docRef = doc(db, "members", session?.user?.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLoginMember(docSnap.data() as UserProps);
        } else {
          console.log("유저 데이터 세팅 중 에러");
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
          console.warn("no jamdaydate data");
        }
      },
      (error) => {
        console.error("error in subscription");
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
  const updateHandler = async (songId: string, instrument: InstrumentType) => {
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

      const jamdayDocRef = await setDoc(
        doc(
          db,
          "jamday",
          `${selectedDate.getFullYear()} ${selectedDate.getMonth() + 1}`
        ),
        { jamday: [...jamDayDate, selectedDate.toDateString()] },
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
    console.log("click됌");
    const docRef = await setDoc(
      doc(db, "jamday", startOfDay(selectedDate).toDateString()),
      {
        data: updatedData,
      },
      { merge: true }
    );
    console.log(songId);
  };

  return (
    <div className="relative">
      <div className=" ml-4 w-24 h-24">
        <Link href="/">
          <img src={logo_black} alt="Logo" className="w-full h-full" />
        </Link>
      </div>
      <WeeklyCalendar
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        jamDayDate={jamDayDate}
      />
      <p className="ml-4 mt-8">
        신청곡{" "}
        <span className=" font-semibold">{`총 ${requestedSongs.length} 곡`}</span>
      </p>
      <div className="flex p-4 flex-col align-middle sm:flex-row sm:gap-5 sm:items-center">
        {requestedSongs.length > 0 && (
          <p className="">참가하실 곡의 악기 파트를 눌러주세요.</p>
        )}
        <div>
          <Button
            backgroundColor="sub"
            text="곡 신청 +"
            onClick={() => setAddSongModalVisible(true)}
          />
        </div>
      </div>
      <Song
        requestedSongs={requestedSongs}
        updateParticipant={updateHandler}
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
  );
};

export default JamDayPortal;
