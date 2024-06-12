import {
  manager_jaehyuck,
  manager_las,
  manager_js,
  manager_bins,
} from "../../public/assets";

interface ManagerProps {
  id: number;
  url: any;
  name: string;
  position: string;
  introduction: string;
}

export const manager: ManagerProps[] = [
  {
    id: 1,
    url: `${manager_las}`,
    name: "라스",
    position: "콘트라베이스/창립자",
    introduction: `"일요일은 술과 고기 좀 먹어야 될것 같습니다.${"\n"}재즈 음악이 나오는 와인과 스테이크에서 해방촌 한잔 어떠실런지요."`,
  },
  {
    id: 2,
    url: `${manager_js}`,
    name: "쟂바스찬",
    position: "피아노/운영진",
    introduction: `"아무리 업템포 하드밥이 흥분되고 좋다지만 결국 사람 머리속에 남는건 발라드가 가장 기억에 남더라고요"`,
  },
  {
    id: 3,
    url: `${manager_jaehyuck}`,
    name: "신재혁",
    position: "피아노, 클라리넷/운영진",
    introduction: `"재즈는 저항의 음악"`,
  },
  {
    id: 4,
    url: `${manager_bins}`,
    name: "페북",
    position: "피아노/운영진",
    introduction: `"건강하게 운동하고 뒤풀이 참석은 자유, 뒤풀이만 참석도 자유, 앞풀이 제안도 자유, 고유가 시대에 음악과 희망은 자유"`,
  },
];
