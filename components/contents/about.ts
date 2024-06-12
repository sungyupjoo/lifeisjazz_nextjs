import {
  photo_club,
  photo_festival,
  photo_jam,
  photo_ski,
} from "../../public/assets";

interface AboutProps {
  id: number;
  url: any;
  title: string;
  content: string;
}

export const about: AboutProps[] = [
  {
    id: 1,
    url: `${photo_club}`,
    title: "재즈 클럽 탐방",
    content:
      "서울 및 수도권 각지의 분위기 좋은 여러 재즈 클럽들을 찾아다니며 음악을 감상하고 친목도 다져요",
  },
  {
    id: 2,
    url: `${photo_festival}`,
    title: "페스티벌 참여",
    content:
      "자라섬 재즈 페스티벌, 서울 재즈 페스티벌, EDM페스티벌 등 각종 음악 페스티벌에 함께 참여하며 잊지 못할 추억을 쌓아요",
  },
  {
    id: 3,
    url: `${photo_jam}`,
    title: "자체 잼데이",
    content: `매주 라이재 전용 연습실에서 자유롭게 열리는 잼데이!${"\n"}연주자라면 다른 회원들과 함께 잼을, 비연주자라면 참관하며 음악으로 교류해요`,
  },
  {
    id: 4,
    url: `${photo_ski}`,
    title: "정모/액티비티",
    content:
      "매월 있는 라이재 정모와 반기에 한번씩 있는 대정모, 그 외에도 런닝/등산/스키/서핑 등 각종 액티비티를 즐겨요",
  },
];
