import React, { useState } from "react";
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks,
  startOfDay,
} from "date-fns";
import { ko } from "date-fns/locale";

interface WeeklyCalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  jamDayDate: string[] | null;
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
  selectedDate,
  onDateChange,
  jamDayDate,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const changeWeekHandle = (btnType: "prev" | "next") => {
    setCurrentMonth((prevMonth) =>
      btnType === "prev" ? subWeeks(prevMonth, 1) : addWeeks(prevMonth, 1)
    );
  };

  const renderHeader = () => (
    <div className=" w-full pt-18 pb-8 flex flex-col">
      <div className="flex flex-row p-4 items-center justify-between">
        <button
          className="cursor-pointer transition duration-150 ease-out hover:text-sub"
          onClick={() => changeWeekHandle("prev")}
        >
          이전 주
        </button>
        <h3 className="text-center">
          {format(currentMonth, "yy년 MM월")}
          <br />
          라이재 잼데이
        </h3>
        <button
          className="cursor-pointer transition duration-150 ease-out hover:text-sub"
          onClick={() => changeWeekHandle("next")}
        >
          다음 주
        </button>
      </div>
    </div>
  );

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

    let day = startDate; // Start from the beginning of the week
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
                  : isSameDay(currentDay, selectedDate)
                  ? "bg-mainTint text-white"
                  : "hover:bg-mainTint hover:text-white"
              }`}
              onClick={() => onDateChange(currentDay)}
            >
              {format(currentDay, "d")}
              {isSameDay(currentDay, new Date()) && (
                <div className="absolute transform -translate-x-1/2 -translate-y-20 text-xs text-white">
                  오늘
                </div>
              )}
              {jamDayDate?.includes(currentDay.toDateString()) && (
                <span className="absolute bg-red-500 w-2.5 h-2.5 rounded-full left-1/2 transform -translate-x-1/2"></span>
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
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default WeeklyCalendar;
