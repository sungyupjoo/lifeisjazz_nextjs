import {
  grand_fest,
  logo_instagram,
  logo_kakao,
  logo_somoim,
  logo_white,
} from "@/public/assets";
import { Button, Container, LoginModal } from "../common";
import { useState } from "react";
import Carousel from "../Carousel";
import { ScheduleProps } from "../common/types";
import { ScheduleModalProps } from "../common/ScheduleModal";
import { useSession } from "next-auth/react";

export interface HeroProps extends ScheduleModalProps {
  setSelectedDateSchedule: React.Dispatch<
    React.SetStateAction<ScheduleProps | undefined>
  >;
  scheduleData: ScheduleProps[];
}

const Hero: React.FC<HeroProps> = ({
  isScheduleModalVisible,
  setIsScheduleModalVisible,
  amIParticipating,
  cancelScheduleHandler,
  closeScheduleModal,
  participateHandler,
  selectedDateSchedule,
  setSelectedDateSchedule,
  scheduleData,
  setDocToMain,
  jamday,
}) => {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const { status } = useSession();
  const showLoginModal = () => setIsLoginModalVisible(true);

  return (
    <Container key="Hero">
      <div
        className="h-screen w-full bg-black bg-cover bg-no-repeat bg-center relative"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0,0,0,0) 70%, rgba(0, 0, 0, 0.9) 100%), url(${grand_fest})`,
        }}
      >
        <div className="h-full w-full bg-[#000000] bg-opacity-70 bg-cover bg-no-repeat bg-center relative" />
        <div className="absolute top-[16%] w-full flex flex-col items-center justify-center text-center animate-bounce-fadeIn sm:top-[10%]">
          <h1 className="text-white mb-4 text-6xl sm:text-8xl sm:mb-4">
            Life is <span className="text-sub">JAZZ</span>
          </h1>
          <p className="text-white font-light text-sm mb-6 leading-6">
            연주자, 리스너 구분 없이 모두가
            <br /> <span className="text-sub">재즈</span>를 감상하고 연주하고
            즐기는 모임
          </p>
          <div className="grid grid-cols-2 gap-6 sm:gap-4  md:mt-2 sm:w-auto sm:flex">
            <Button
              text={"소모임 링크"}
              backgroundColor="main"
              logoUrl={logo_somoim}
              href="https://somoim.friendscube.com/g/7aef26c8-9205-11ea-a0ae-0a6725d6f2001"
            />
            <Button
              text={"카카오 오픈채팅"}
              backgroundColor="main"
              logoUrl={logo_kakao}
              href="https://open.kakao.com/o/g1pb2wmc"
            />
            <Button
              text={"인스타그램"}
              backgroundColor="main"
              logoUrl={logo_instagram}
              href="https://www.instagram.com/life_isjazz?igsh=bzNwOWRiNDFrcDZn"
            />
            {status === "authenticated" ? (
              <Button
                backgroundColor="main"
                text="라이재 잼데이"
                link
                logoUrl={logo_white}
              />
            ) : (
              <Button
                logoUrl={logo_white}
                backgroundColor="main"
                text="라이재 잼데이"
                onClick={showLoginModal}
              />
            )}

            {isLoginModalVisible && (
              <LoginModal
                isModalVisible={isLoginModalVisible}
                closeModal={() => setIsLoginModalVisible(false)}
              />
            )}
          </div>
          <div className="w-full flex mt-10 justify-center ">
            <Carousel
              amIParticipating={amIParticipating}
              cancelScheduleHandler={cancelScheduleHandler}
              closeScheduleModal={closeScheduleModal}
              isScheduleModalVisible={isScheduleModalVisible}
              setIsScheduleModalVisible={setIsScheduleModalVisible}
              participateHandler={participateHandler}
              selectedDateSchedule={selectedDateSchedule}
              setSelectedDateSchedule={setSelectedDateSchedule}
              scheduleData={scheduleData}
              setDocToMain={setDocToMain}
              jamday={jamday}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Hero;
