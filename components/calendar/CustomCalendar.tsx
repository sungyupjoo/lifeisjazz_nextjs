import React, { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { exampleSchedule } from "../contents/exampleSchedule";
export type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CustomCalendarProps {
  date: Value;
  onDateChange: (date: Value) => void;
}

interface ScheduleItem {
  date: string;
  category: string;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  date,
  onDateChange,
}) => {
  const [activeStartDate, setActiveStartDate] = useState<Date | null>(
    new Date()
  );
  const today = new Date();

  return (
    <div className="mt-6 flex justify-center relative h-[400px]">
      <Calendar
        className="rounded-lg border-none p-2 shadow-md bg-white"
        value={date}
        onChange={onDateChange}
        locale={"ko"}
        formatDay={(locale, date) => moment(date).format("D")}
        formatYear={(locale, date) => moment(date).format("YYYY")}
        formatMonthYear={(locale, date) => moment(date).format("YYYY년 M월")}
        next2Label={null}
        prev2Label={null}
        minDetail="year"
        calendarType="gregory"
        activeStartDate={activeStartDate === null ? undefined : activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) =>
          setActiveStartDate(activeStartDate)
        }
        tileContent={({ date, view }) => {
          let html = [];

          if (
            view === "month" &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
          ) {
            html.push(
              <div key={"today"} className="text-white text-xs">
                오늘
              </div>
            );
          }

          const formattedDate = moment(date).format("YYYY-MM-DD");
          const schedule = exampleSchedule.find(
            (s: ScheduleItem) => s.date === formattedDate
          );
          if (schedule) {
            html.push(
              <div
                key={formattedDate}
                className="absolute top-[5%] left-[51%] -translate-x-1/2"
              >
                <div
                  className={`rounded-full w-5 h-5 bg-${
                    schedule.category === "잼데이" ? "sub" : "main"
                  }`}
                ></div>
                <p
                  className={`text-white text-xs mt-0.5 p-0.5 rounded bg-${
                    schedule.category === "잼데이" ? "sub" : "main"
                  }`}
                >
                  {schedule.category}
                </p>
              </div>
            );
          }

          return <>{html}</>;
        }}
      />
    </div>
  );
};

export default CustomCalendar;
