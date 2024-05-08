"use client";

import { logo_white } from "../public/assets";
import { RefObject, forwardRef, useState } from "react";
import { Hamburger } from "./common/icons/Hamburger";

interface NavigationProps {
  homeRef: RefObject<HTMLDivElement>;
  aboutRef: RefObject<HTMLDivElement>;
  managerRef: RefObject<HTMLDivElement>;
  galleryRef: RefObject<HTMLDivElement>;
  scheduleRef: RefObject<HTMLDivElement>;
  contactRef: RefObject<HTMLDivElement>;
  activeSection: string;
}

interface AnchorProps {
  label: string;
  activeSection: string;
  scrollToRef: (ref: RefObject<HTMLDivElement>) => void;
}

const Anchor = forwardRef<HTMLDivElement, AnchorProps>(
  ({ label, activeSection, scrollToRef }, ref) => (
    <a
      className={`font-semibold text-white no-underline cursor-pointer hover:text-sub focus:text-sub active:text-sub visited:text-sub ${
        activeSection === label.toLowerCase() ? "text-sub" : ""
      }`}
      onClick={() => scrollToRef(ref as RefObject<HTMLDivElement>)}
    >
      {label}
    </a>
  )
);

const Navigation: React.FC<NavigationProps> = ({
  homeRef,
  aboutRef,
  managerRef,
  galleryRef,
  scheduleRef,
  contactRef,
  activeSection,
}) => {
  // NavBar 오픈/클로즈
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  const scrollToRef = (ref: RefObject<HTMLDivElement>) => {
    setIsNavOpen(false);
    if (ref.current) {
      window.scrollTo({
        top: ref.current?.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="left-0 lg:h-screen lg:fixed lg:top-0 lg:bottom-0 lg:w-[329px] bg-main flex lg:flex-col lg:justify-center lg:items-stretch relative w-full h-20 flex-row justify-between items-center z-10">
      <a
        className={`flex bg-black justify-center ${
          activeSection === "home" ? "active" : ""
        } z-30 cursor-pointer`}
        onClick={() => scrollToRef(homeRef)}
      >
        <img
          alt="logo"
          src={logo_white}
          className="lg:w-[156px] lg:h-[156px] w-[100px] h-[100px] justify-self-center"
        />
      </a>
      <div className="lg:hidden flex flex-col justify-between ">
        <Hamburger onClick={toggleNav} size={30} />
      </div>
      <section
        className={`lg:flex lg:justify-between lg:items-center lg:absolute flex-col  overflow-hidden  top-20  lg:bg-main bg-mainTint  w-full  z-30 sm:${
          isNavOpen ? "flex max-h-125" : "max-h-0"
        }`}
      >
        <Anchor
          label="홈"
          activeSection={activeSection}
          ref={homeRef}
          scrollToRef={scrollToRef}
        />
        <Anchor
          label="소개"
          activeSection={activeSection}
          ref={aboutRef}
          scrollToRef={scrollToRef}
        />
        <Anchor
          label="운영진"
          activeSection={activeSection}
          ref={managerRef}
          scrollToRef={scrollToRef}
        />
        <Anchor
          label="사진첩"
          activeSection={activeSection}
          ref={galleryRef}
          scrollToRef={scrollToRef}
        />
        <Anchor
          label="일정"
          activeSection={activeSection}
          ref={scheduleRef}
          scrollToRef={scrollToRef}
        />
        <Anchor
          label="연락"
          activeSection={activeSection}
          ref={contactRef}
          scrollToRef={scrollToRef}
        />
        {/* <Anchor
          className={activeSection === "personalInfo" ? "active" : ""}
          onClick={() => scrollToRef(personalInfoRef)}
        >
          설정
        </Anchor> */}
      </section>
      <div className="flex justify-center items-center w-full mb-5 lg:justify-end lg:mr-20">
        {/* <Login /> */}
      </div>
    </section>
  );
};

export default Navigation;
