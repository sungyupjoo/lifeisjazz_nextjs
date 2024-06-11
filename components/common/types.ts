import { Session } from "next-auth";

export interface InstrumentProps {
  name: InstrumentType;
  participants: Session["user"][];
}

export type VoteData =
  | {
      [date: string]: Session["user"][];
    }
  | undefined;

export type KeyType =
  | "C"
  | "Db"
  | "D"
  | "Eb"
  | "E"
  | "F"
  | "Gb"
  | "G"
  | "Ab"
  | "A"
  | "Bb"
  | "B";

export type RhythmType =
  | "mediumSwing"
  | "mediumUpSwing"
  | "upTempoSwing"
  | "bossaSamba"
  | "latin"
  | "ballad"
  | "funk"
  | "slowSwing"
  | "fast"
  | "variation";

export type InstrumentType =
  | "bass"
  | "drums"
  | "piano"
  | "horn"
  | "guitar"
  | "vocals"
  | "etc";

export interface SongProps {
  // date를 Date 타입으로 관리하지 않게 된 것은,
  // Date로 올리면 firebase에서 timestamp로 변환해서 저장하고
  // 이것을 읽어올 때 SongProps로 받아올 수 없게 되기 때문
  // (Timestamp 타입으로 받아오게 하면 SongProps와 호환하는데 있어 문제 발생)
  id: string;
  date: string;
  requester?: Session["user"];
  title: string;
  key: KeyType;
  rhythm: RhythmType;
  instruments: InstrumentProps[];
  details: string;
  participants?: Session["user"][];
}

export interface ScheduleProps {
  date: string;
  category: "show" | "regular" | "instant" | "festival" | "jamday";
  title: string;
  time: string;
  location: string;
  expense: string;
  description: string;
  image: string;
  totalNumber: number;
  participate: Session["user"][];
}

export const instrumentName = {
  bass: "베이스",
  drums: "드럼",
  piano: "피아노",
  horn: "관악기",
  guitar: "기타",
  vocals: "보컬",
  etc: "그외",
};

export const instruments = [
  "베이스",
  "드럼",
  "피아노",
  "관악기",
  "기타",
  "보컬",
  "그외",
];

export const rhythmName = {
  mediumSwing: "미디엄 스윙",
  mediumUpSwing: "미디엄 업 스윙",
  upTempoSwing: "업템포 스윙",
  bossaSamba: "보사/삼바",
  latin: "라틴",
  ballad: "발라드",
  funk: "펑크",
  slowSwing: "슬로우 스윙",
  fast: "패스트",
  variation: "원곡 박자 변형",
};

export const categoryOptions = [
  { value: "instant", label: "번개" },
  { value: "regular", label: "정모" },
  { value: "show", label: "공연관람" },
  { value: "festival", label: "페스티벌" },
];

export type categoryTypes =
  | "instant"
  | "regular"
  | "show"
  | "festival"
  | "jamday";

export const categories = {
  instant: "번개",
  regular: "정모",
  show: "공연",
  festival: "페스티벌",
  jamday: "잼데이",
};

export const keyOptions = [
  { value: "C", label: "C" },
  { value: "Db", label: "Db" },
  { value: "D", label: "D" },
  { value: "Eb", label: "Eb" },
  { value: "E", label: "E" },
  { value: "F", label: "F" },
  { value: "Gb", label: "Gb" },
  { value: "G", label: "G" },
  { value: "Ab", label: "Ab" },
  { value: "A", label: "A" },
  { value: "Bb", label: "Bb" },
  { value: "B", label: "B" },
  { value: "C-", label: "C-" },
  { value: "Db-", label: "Db-" },
  { value: "D-", label: "D-" },
  { value: "Eb-", label: "Eb-" },
  { value: "E-", label: "E-" },
  { value: "F-", label: "F-" },
  { value: "Gb-", label: "Gb-" },
  { value: "G-", label: "G-" },
  { value: "Ab-", label: "Ab-" },
  { value: "A-", label: "A-" },
  { value: "Bb-", label: "Bb-" },
  { value: "B-", label: "B-" },
];
export const rhythmOptions = [
  {
    value: "mediumSwing",
    label: "미디엄 스윙 (140 ~ 180)",
  },
  { value: "mediumUpSwing", label: "미디엄 업 스윙 (180 ~ 220)" },
  { value: "upTempoSwing", label: "업템포 스윙 (220 ~ 260)" },
  { value: "bossaSamba", label: "보사/삼바" },
  { value: "latin", label: "라틴" },
  { value: "ballad", label: "발라드" },
  { value: "funk", label: "펑크" },
  { value: "slowSwing", label: "슬로우 스윙 (70 ~ 130)" },
  { value: "fast", label: "패스트 (260~ )" },
  { value: "variation", label: "원곡 박자 변형" },
];

export const dateFormat = "eee";

export type WeekType = "this" | "next";
