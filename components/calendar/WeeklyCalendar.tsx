import React, { SetStateAction, useState } from "react";
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  addWeeks,
  subWeeks,
} from "date-fns";
import { ko } from "date-fns/locale";
import { WeekType } from "../common/types";
import Link from "next/link";
import { logo_black } from "@/public/assets";

interface WeeklyCalendarProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date) => void;
  jamDayDate: string[] | null;
  weekState: WeekType;
  setWeekState: (prevState: WeekType) => void;
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
  selectedDate,
  onDateChange,
  jamDayDate,
  weekState,
  setWeekState,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const renderHeader = () => (
    <div className="flex items-center pt-4">
      <div className="ml-4 w-24 h-24">
        <Link href="/">
          <img src={logo_black} alt="Logo" className="w-full h-full" />
        </Link>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2">
        <h3 className="text-center break-keep text-2xl">
          {format(currentMonth, "yy년 MM월")}
          <br />
          라이재 잼데이
        </h3>
      </div>
    </div>
  );

  const renderToggle = () => {
    const changeWeekHandle = (weekType: WeekType) => {
      if (weekType === "this") {
        setCurrentMonth(new Date());
      } else {
        setCurrentMonth(addWeeks(new Date(), 1));
      }
    };
    const handleToggle = (weekType: WeekType) => {
      setWeekState(weekType);
      changeWeekHandle(weekType);
    };

    return (
      <div className="flex justify-end mt-2 mr-4 mb-4">
        <div className="flex flex-col">
          <p className="text-sm text-center">곡 신청</p>
          <button
            className={`px-4 py-1.5 rounded-l-3xl ${
              weekState === "this"
                ? "bg-main text-white"
                : "bg-borderGray text-gray"
            }`}
            onClick={() => handleToggle("this")}
            disabled={weekState === "this"}
          >
            이번 주
          </button>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-center">날짜 투표</p>
          <button
            className={`px-4 py-1.5 rounded-r-3xl ${
              weekState === "next"
                ? "bg-main text-white"
                : "bg-borderGray text-gray"
            }`}
            onClick={() => handleToggle("next")}
            disabled={weekState === "next"}
          >
            다음 주
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });
    return (
      <div className="flex flex-row w-full">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="flex-grow text-center">
            {format(addDays(startDate, i), "EEE", { locale: ko })}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 0 });

    let day = startDate;
    const rows = [];

    while (day <= endDate) {
      const days = Array.from({ length: 7 }, (_, i) => {
        const currentDay = addDays(day, i);
        return (
          <div
            key={currentDay.toString()}
            className="flex-grow flex items-center justify-center border-t pt-1"
          >
            <button
              className={`rounded-full p-2 cursor-pointer transition duration-250 ease-out overflow-visible ${
                isSameDay(currentDay, new Date())
                  ? "bg-subTint text-white"
                  : isSameDay(currentDay, selectedDate!)
                  ? "bg-mainTint text-white"
                  : "hover:bg-mainTint hover:text-white"
              }`}
              onClick={() => onDateChange(currentDay)}
            >
              {format(currentDay, "d")}
              {isSameDay(currentDay, new Date()) && (
                <div className="absolute -translate-y-8 text-white text-[10px]">
                  오늘
                </div>
              )}
              {jamDayDate?.includes(currentDay.toDateString()) && (
                <span className="absolute bg-sub w-2.5 h-2.5 rounded-full -translate-x-3.5 translate-y-5"></span>
              )}
            </button>
          </div>
        );
      });

      rows.push(
        <div key={day.toString()} className="flex flex-row w-full">
          {days}
        </div>
      );
      day = addDays(day, 7);
    }

    return <div className="mt-2">{rows}</div>;
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderToggle()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default WeeklyCalendar;
