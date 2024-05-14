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
    introduction: `"Confirmation 6박 하면 재밌던데...${"\n"}도나리도 6박 하면 재밌음"`,
  },
  {
    id: 4,
    url: `${manager_bins}`,
    name: "빈즈",
    position: "피아노/운영진",
    introduction: `"Misty 치고 왔습니다."`,
  },
];
