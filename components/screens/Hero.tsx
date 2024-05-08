import { grand_fest, logo_kakao, logo_somoim } from "@/public/assets";
import { Button, Container } from "../common";
import colors from "@/styles/theme";

const Hero = () => {
  return (
    <Container>
      <div
        className="h-screen w-full bg-black bg-opacity-65 bg-cover bg-no-repeat bg-center relative"
        style={{
          backgroundImage: `url(${grand_fest})`,
        }}
      >
        <div className="h-screen w-full bg-[#000000] bg-opacity-65 bg-cover bg-no-repeat bg-center relative" />
        <div className="absolute top-1/3 w-full flex flex-col items-center justify-center text-center animate-bounce-fadeIn">
          <h1 className="text-white mb-4">
            Life is <span className="text-sub">JAZZ</span>
          </h1>
          <p className="text-white text-lg leading-8">
            연주자, 리스너 구분 없이 모두가
            <br /> <span className="text-sub">재즈</span>를 감상하고 연주하고
            즐기는 모임
          </p>
          <div className="flex mt-12 gap-5 md:mt-2">
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
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Hero;
