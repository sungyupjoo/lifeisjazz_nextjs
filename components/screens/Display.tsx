"use client";
import { useEffect, useRef, useState } from "react";
import { Hero, About, Gallery } from ".";
import Navigation from "../Navigation";
import Manager from "./Manager";
import Schedule from "./Schedule";
import Contact from "./Contact";

const Display = () => {
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const managerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    const sections = [
      homeRef.current,
      aboutRef.current,
      managerRef.current,
      galleryRef.current,
      scheduleRef.current,
      contactRef.current,
    ];
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [homeRef, aboutRef, managerRef, galleryRef, scheduleRef, contactRef]);
  return (
    <>
      <Navigation
        homeRef={homeRef}
        aboutRef={aboutRef}
        managerRef={managerRef}
        galleryRef={galleryRef}
        scheduleRef={scheduleRef}
        contactRef={contactRef}
        activeSection={activeSection}
      />
      <div id="home" ref={homeRef}>
        <Hero />
      </div>
      <div id="about" ref={aboutRef}>
        <About />
      </div>
      <div id="manager" ref={managerRef}>
        <Manager />
      </div>
      <div id="gallery" ref={galleryRef}>
        <Gallery />
      </div>
      <div id="schedule" ref={scheduleRef}>
        <Schedule />
      </div>
      <div id="contact" ref={contactRef}>
        <Contact />
      </div>
    </>
  );
};

export default Display;
