"use client";

import { logo_white } from "../public/assets";
import React, { RefObject, forwardRef, useState } from "react";
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
  labelEnglish: string;
  activeSection: string;
  scrollToRef: (ref: RefObject<HTMLDivElement>) => void;
}

const Anchor = React.memo(
  forwardRef<HTMLDivElement, AnchorProps>(
    ({ label, labelEnglish, activeSection, scrollToRef }, ref) => {
      return (
        <a
          className={`font-semibold  no-underline cursor-pointer hover:text-sub focus:text-sub active:text-sub visited:text-sub text-sub ${
            activeSection === labelEnglish ? "text-sub" : "text-white"
          }`}
          onClick={() => scrollToRef(ref as RefObject<HTMLDivElement>)}
        >
          {label}
        </a>
      );
    }
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
    <section className="h-20 flex-row justify-between items-center z-10 left-0 lg:h-screen lg:fixed lg:top-0 lg:bottom-0 bg-main flex lg:flex-col lg:justify-center lg:items-stretch relative lg:w-[329px]">
      <a
        className={`flex justify-center ${
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
        className={`justify-between items-center lg:bg-main lg:p-16 p-6 flex-col gap-7  ${
          isNavOpen ? "flex" : "hidden"
        } lg:relative lg:flex
       top-20 bg-mainTint w-full fixed z-30 `}
      >
        <Anchor
          label="홈"
          labelEnglish="home"
          activeSection={activeSection}
          ref={homeRef}
          scrollToRef={scrollToRef}
        />
        <Anchor
          label="소개"
          labelEnglish="about"
          activeSection={activeSection}
          ref={aboutRef}
          scrollToRef={scrollToRef}
        />
        <Anchor
          label="운영진"
          labelEnglish="manager"
          activeSection={activeSection}
          ref={managerRef}
          scrollToRef={scrollToRef}
        />
        <Anchor
          label="사진첩"
          labelEnglish="gallery"
          activeSection={activeSection}
          ref={galleryRef}
          scrollToRef={scrollToRef}
        />
        <Anchor
          label="일정"
          labelEnglish="schedule"
          activeSection={activeSection}
          ref={scheduleRef}
          scrollToRef={scrollToRef}
        />
        <Anchor
          label="연락"
          labelEnglish="contact"
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
