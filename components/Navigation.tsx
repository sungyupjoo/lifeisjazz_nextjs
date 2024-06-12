"use client";

import { logo_white } from "../public/assets";
import React, { RefObject, forwardRef, useState } from "react";
import Login from "./login/Login";

interface NavigationProps {
  homeRef: RefObject<HTMLDivElement>;
  aboutRef: RefObject<HTMLDivElement>;
  managerRef: RefObject<HTMLDivElement>;
  recruitRef: RefObject<HTMLDivElement>;
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
  recruitRef,
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
    <section className="h-20 flex-row justify-between items-center z-10 left-0  absolute lg:fixed lg:h-screen lg:top-0 lg:bottom-0 lg:pt-20 bg-main flex w-screen lg:flex-col lg:justify-center lg:w-[329px]">
      <a
        className={`flex justify-center ${
          activeSection === "home" ? "active" : ""
        } z-30 cursor-pointer`}
        onClick={() => scrollToRef(homeRef)}
      >
        <img
          alt="logo"
          src={logo_white}
          className="ml-4 lg:w-[156px] lg:h-[156px] w-[100px] h-[100px] justify-self-center lg:ml-0"
        />
      </a>
      <section
        className={`justify-between items-center lg:bg-main lg:p-16 p-6 flex-col gap-7 ${
          isNavOpen ? "flex animate-fadeIn" : "hidden fade-out"
        } lg:relative lg:flex
       top-20 bg-mainTint w-full absolute z-30 lg:top-0`}
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
        {/* <Anchor
          label="팀원모집"
          labelEnglish="recruit"
          activeSection={activeSection}
          ref={recruitRef}
          scrollToRef={scrollToRef}
        /> */}
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
      </section>
      <div className="absolute items-center right-0 lg:relative flex justify-center mr-2 lg:mr-0 lg:mb-28">
        <Login />
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle lg:hidden"
          onClick={toggleNav}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke={isNavOpen ? "#cf404d" : "white"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Navigation;
