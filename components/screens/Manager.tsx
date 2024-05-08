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
      <div className="grid grid-cols-2 gap-9 mt-16 md:grid-cols-1">
        {manager.map((item, index) => (
          <div
            key={item.id}
            ref={ref}
            className={`flex flex-row justify-center items-center gap-4 p-5 rounded-xl ${
              isVisible ? `animate-bounce-${index}` : ""
            } hover:bg-gray-300 md:flex-col md:text-center`}
          >
            <div className="flex justify-center items-center gap-4">
              <img
                src={item.url}
                alt=""
                className="w-32 h-32 rounded-full shadow-md"
              />
            </div>
            <div className="flex-grow">
              <h4 className="text-gray-500 text-sm mb-1.5 ml-0.5">
                {item.position}
              </h4>
              <h3 className="mb-4">{item.name}</h3>
              <p className="text-sm leading-5">{item.introduction}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Manager;
