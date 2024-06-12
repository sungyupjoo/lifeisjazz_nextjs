interface RecruitProps {
  id: number;
  url: any;
  teamName: string;
  teamSubName: string;
  introduction: string;
}

export const recruit: RecruitProps[] = [
  {
    id: 1,
    url: "",
    teamName: "공연기획팀",
    teamSubName: "행사 기획 및 운영",
    introduction: "라이재의 각종 정모, 공연 및 행사를 기획해요.",
  },
  {
    id: 2,
    url: "",
    teamName: "촬영팀",
    teamSubName: "사진 및 영상 촬영",
    introduction: "라이재의 각종 행사 사진 및 영상을 촬영",
  },
  {
    id: 3,
    url: "",
    teamName: "연주팀",
    teamSubName: "",
    introduction: "",
  },
];
