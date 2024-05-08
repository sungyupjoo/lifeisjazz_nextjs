export interface ScheduleProps {
  date: string;
  category: string;
  title: string;
  location: string;
  expense: string;
  specific: string;
  image: string;
  totalNumber: number;
  participate: number[];
}

export const exampleSchedule: ScheduleProps[] = [
  {
    date: "2024-04-14",
    category: "잼데이",
    title: "라이재 잼데이",
    location: "내방 합주실",
    expense: "10,000원",
    specific:
      "연주자들의 화려한 잼을 관람하실 분, 조금 참여하실 분, 참관하실 분, 직접 뛰어드실 분 모두 환영합니다!",
    image:
      "https://firebasestorage.googleapis.com/v0/b/life-is-jazz-web-app.appspot.com/o/Src%2Fimage_jam.jpeg?alt=media&token=6eb01106-9e38-4fa9-b59f-c724979faee1",
    totalNumber: 20,
    participate: [1, 2, 3],
  },
  {
    date: "2024-04-18",
    category: "공연",
    title: "라이재 쿼텟 공연",
    location: "아이덴하우스",
    expense: "20,000원+",
    specific:
      "라이재 멤버들로 구성된 쿼텟입니다. 목요일 밤을 아이덴 하우스에서 재즈와 함께 즐겨보시는건 어떠실런지요.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/life-is-jazz-web-app.appspot.com/o/Src%2Fposter_0419.jpeg?alt=media&token=7baf4b79-8330-4f4e-b989-9eb226c47e01",
    totalNumber: 6,
    participate: [1, 3, 4],
  },
  {
    date: "2024-04-22",
    category: "공연",
    title: "이호른 재즈 커뮤니티",
    location: "숲길",
    expense: "20,000원+",
    specific: "이호른 재즈 커뮤니티의 숲길 공연입니다.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/life-is-jazz-web-app.appspot.com/o/Src%2Fphoto_club.jpeg?alt=media&token=511424ae-c6f2-4049-9908-7d6a0cd6a936",
    totalNumber: 10,

    participate: [3, 4],
  },
];
