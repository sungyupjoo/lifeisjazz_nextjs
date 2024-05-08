"use client";

import { logo_white } from "../public/assets";
import { RefObject, useState } from "react";
// import Login from "./Login/Login";
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

const Anchor = ({
  label,
  activeSection,
  ref,
  scrollToRef,
}: {
  label: string;
  activeSection: string;
  ref: RefObject<HTMLDivElement>;
  scrollToRef: (ref: RefObject<HTMLDivElement>) => void;
}) => (
  <a
    className={`font-semibold text-base text-white no-underline cursor-pointer hover:text-sub focus:text-sub active:text-sub visited:text-sub ${
      activeSection === label.toLowerCase() ? "text-sub" : ""
    }`}
    onClick={() => scrollToRef(ref)}
  >
    {label}
  </a>
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
    console.log("open");
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
    <section className="fixed left-0 top-0 bottom-0 w-80 bg-main flex flex-col justify-center items-stretch lg:relative lg:top-10 lg:w-full lg:h-20 lg:flex-row lg:justify-between lg:items-center">
      <a
        className={`flex flex-1 justify-center items-end lg:items-center lg:ml-2.5 ${
          activeSection === "home" ? "active" : ""
        }`}
        onClick={() => scrollToRef(homeRef)}
      >
        <img
          alt="logo"
          src={logo_white}
          className="w-39 h-39 lg:w-25 lg:h-25"
        />
      </a>
      <div className="flex flex-col justify-between ">
        <Hamburger onClick={toggleNav} size={30} />
      </div>
      <section
        className={`flex flex-col justify-between items-center transition-max-height duration-300 ease-in-out lg:absolute lg:flex-col lg:overflow-hidden lg:top-20 lg:bg-mainTint lg:w-full lg:z-30 ${
          isNavOpen ? "lg:flex lg:max-h-125" : "lg:max-h-0"
        }`}
      >
        {/* <Anchor
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
        /> */}
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
