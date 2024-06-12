"use client";

import { Container, Title } from "../common";
import { about } from "../contents/about";

const About = () => (
  <Container innerPadding>
    <Title
      titleText="모임 소개"
      subTitle="음악을 좋아하는 누구나 참여할 수 있는 라이재의 활동들"
    />
    <div className="pt-12 grid grid-rows-4 sm:grid-cols-4 sm:grid-rows-1 gap-4 md:gap-8">
      {about.map((item) => (
        <div
          key={item.id}
          className="flex flex-col w-3/4 sm:w-full justify-self-center md:w-full rounded-2xl shadow-md transition-transform duration-300 hover:scale-110 hover:opacity-110 lg:flex-col"
        >
          <img
            src={item.url}
            alt=""
            className="w-full h-40 mb-2 rounded-t-2xl object-cover"
          />
          <div className="px-4 py-1 flex flex-col items-center ">
            <h4 className="mb-5 lg:mb-2 text-center font-semibold">
              {item.title}
            </h4>
            <p className="whitespace-pre-wrap">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  </Container>
);

export default About;
