"use client";
import { Container, Title } from "../common";
import { manager } from "../contents/manager";
import { useEffect, useRef, useState } from "react";

const Manager = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return (
    <Container innerPadding backgroundGray>
      <Title titleText="운영진" subTitle="2024년 라이재를 이끌어가는 운영진" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6 ">
        {manager.map((item, index) => (
          <div
            key={item.id}
            ref={ref}
            className={`flex flex-col justify-center items-center gap-4 mx-12 my-3 px-5 py-6 sm:px-2 sm:mx-2 sm:my-2 sm:py-4 rounded-3xl shadow-md ${
              isVisible ? `animate-bounce-${index}` : ""
            } hover:bg-borderGray hover:scale-110 transition-transform duration-300 md:flex-row text-center`}
          >
            <div className="flex justify-center items-center min gap-4">
              <img
                src={item.url}
                alt=""
                className="w-32 h-32 rounded-full shadow-md"
              />
            </div>
            <div className="sm:w-1/2">
              <h4 className="text-sm mb-1.5 ml-0.5">{item.position}</h4>
              <h3 className="mb-2">{item.name}</h3>
              <p className="text-sm leading-5">{item.introduction}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Manager;
