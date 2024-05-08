"use client";

import { Container, Title } from "../common";
import { about } from "../contents/about";

const About = () => (
  <Container innerPadding>
    <Title
      titleText="모임 소개"
      subTitle="음악을 좋아하는 누구나 참여할 수 있는 라이재의 활동들"
    />
    <div className="pt-12 grid grid-cols-4 gap-8 ">
      {about.map((item) => (
        <div
          key={item.id}
          className="flex flex-col rounded-lg shadow-md transition-transform duration-300 hover:scale-110 hover:opacity-110"
        >
          <img
            src={item.url}
            alt=""
            className="w-full h-40 mb-4 rounded-t-lg md:mb-0"
          />
          <div className="p-4 flex flex-col items-center md:items-center">
            <h4 className="mb-5 text-center font-semibold">{item.title}</h4>
            <p className="mb-1 whitespace-pre-wrap">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  </Container>
);

export default About;
