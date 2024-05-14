import {
  manager_las,
  manager_jaehyuck,
  manager_js,
  manager_bins,
  member_skipper,
} from "../../public/assets";
import { Member } from "../common/types";

export const exampleMembers: Member[] = [
  {
    id: 1,
    nickName: "라스",
    instrument: ["콘트라베이스"],
    isManager: true,
    profileImageUrl: `${manager_las}`,
  },
  {
    id: 2,
    nickName: "winter in 쟂바",
    instrument: ["피아노"],
    isManager: true,
    profileImageUrl: `${manager_js}`,
  },
  {
    id: 3,
    nickName: "신재혁",
    instrument: ["피아노"],
    isManager: true,
    profileImageUrl: `${manager_jaehyuck}`,
  },
  {
    id: 4,
    nickName: "윈튼",
    instrument: ["피아노"],
    isManager: false,
    profileImageUrl: `${member_skipper}`,
  },
];
