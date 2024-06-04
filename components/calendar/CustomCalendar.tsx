import React, { useState } from "react";
import styled from "@emotion/styled";
import colors from "@/styles/theme";
import Calendar from "react-calendar";
import moment from "moment";
import { ScheduleProps, categories, categoryOptions } from "../common/types";
export type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CustomCalendarProps {
  date: Value;
  onDateChange: (date: Value) => void;
  scheduleData: ScheduleProps[];
  handleMonthChange: (direction: "prev" | "next") => void;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  date,
  onDateChange,
  scheduleData,
  handleMonthChange,
}) => {
  const [activeStartDate, setActiveStartDate] = useState<Date | null>(
    new Date()
  );
  const today = new Date();

  return (
    <CalendarWrapper>
      <StyledCalendar
        value={date}
        onChange={onDateChange}
        locale={"ko"}
        formatDay={(locale, date) => moment(date).format("D")}
        formatYear={(locale, date) => moment(date).format("YYYY")}
        formatMonthYear={(locale, date) => moment(date).format("YYYY년 M월")}
        next2Label={null}
        prev2Label={null}
        prevLabel={
          <div
            onClick={() => {
              handleMonthChange("prev");
            }}
          >
            {"<"}
          </div>
        }
        nextLabel={
          <div
            onClick={() => {
              handleMonthChange("next");
            }}
          >
            {">"}
          </div>
        }
        calendarType="gregory"
        // 오늘 날짜로 돌아오는 기능을 위해 필요한 옵션 설정
        activeStartDate={activeStartDate === null ? undefined : activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) =>
          setActiveStartDate(activeStartDate)
        }
        minDetail="month"
        maxDetail="month"
        // 일정 표시용
        tileContent={({ date, view }) => {
          let html = [];

          // 오늘 날짜 표시
          if (
            view === "month" &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
          ) {
            html.push(<StyledToday key={"today"}>오늘</StyledToday>);
          }
          // 일정 있는 날 표시
          if (
            scheduleData
              .map((schedule) => schedule.date)
              .find((x) => x === moment(date).format("YYYY-MM-DD"))
          ) {
            let category = scheduleData.find(
              (schedule) => schedule.date === moment(date).format("YYYY-MM-DD")
            )?.category;
            html.push(
              <ScheduleDay key={moment(date).format("YYYY-MM-DD")}>
                <StyledDot scheduleContent={category} />
                <ScheduleSpecific scheduleContent={category}>
                  {categories[category!]}
                </ScheduleSpecific>
              </ScheduleDay>
            );
          }
          return <>{html}</>;
        }}
      />
    </CalendarWrapper>
  );
};

export default CustomCalendar;

const CalendarWrapper = styled.div`
margin-top: 2.4rem; 
display: flex;
height: 380px;
justify-content: center;
position: relative;
.react-calendar {
  border-radius: 8px;
  border: none;
  color: black;
  padding: 1% 2%;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: white;
}
.react-calendar {
  @media(max-width: 576px){
   width: 100%; 
  }
}

/* 네비게이션 가운데 정렬 */
.react-calendar__navigation {
  justify-content: center;
}

/* 네비게이션 폰트 설정 */
.react-calendar__navigation button {
  font-weight: 800;
  font-size: 1rem;
}

/* 네비게이션 버튼 컬러 */
.react-calendar__navigation button:focus {
  background-color: white;
}

/* 네비게이션 비활성화 됐을때 스타일 */
.react-calendar__navigation button:disabled {
  background-color: white;
  color: ${colors.main};
}

/* 년/월 상단 네비게이션 칸 크기 줄이기 */
.react-calendar__navigation__label {
  flex-grow: 0.2 !important;
}

/* 요일 밑줄 제거 */
.react-calendar__month-view__weekdays abbr {
  text-decoration: none;
  font-weight: 800;
}


/* 일요일에 빨간 폰트 */
.react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
  color: ${colors.sub}};
}

/* 날짜 */
.react-calendar__tile {
text-align: center;
height: 50px;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
}

/*hover, focus, 선택됐을 시 */
.react-calendar__tile:enabled:hover,
.react-calendar__tile:enabled:focus,
.react-calendar__tile--active {
 background: ${colors.main};
 border-radius: 0.6rem;
}

/* 오늘 날짜 컬러 */
.react-calendar__tile--now {
  background: ${colors.gray};
  border-radius: 0.3rem;
  abbr {
    color: white;
  }
}
/* 네비게이션 월 스타일 적용 */
.react-calendar__year-view__months__month {
  border-radius: 0.8rem;
  background-color: ${colors.gray};
  padding: 0;
}

/* 네비게이션 현재 월 스타일 적용 */
.react-calendar__tile--hasActive {
  background-color: ${colors.sub};
  abbr {
    color: white;
  }
}

/* 일 날짜 간격 */
.react-calendar__tile {
  padding: 5px 0px 18px;
  position: relative;
}

/* 네비게이션 월 스타일 적용 */
.react-calendar__year-view__months__month {
  flex: 0 0 calc(33.3333% - 10px) !important;
  margin-inline-start: 5px !important;
  margin-inline-end: 5px !important;
  margin-block-end: 10px;
  padding: 20px 6.6667px;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${colors.gray};
}

/* 선택한 날짜 스타일 적용 */
.react-calendar__tile:enabled:hover,
.react-calendar__tile:enabled:focus,
.react-calendar__tile--active {
  background-color: ${colors.main};
  border-radius: 0.6rem;
  color: white;
}
`;

const StyledCalendar = styled(Calendar)``;

export const StyledDate = styled.div`
  position: absolute;
  right: 7%;
  top: 6%;
  background-color: ${colors.main};
  color: white;
  width: 18%;
  min-width: fit-content;
  height: 1.5rem;
  text-align: center;
  margin: 0 auto;
  line-height: 1.6rem;
  border-radius: 0.6rem;
  font-size: 0.8rem;
  font-weight: 800;
`;

/* 일정 있는 날짜에 점 표시 스타일 */
const StyledDot = styled.div<{ scheduleContent: string | undefined }>`
  border-width: 1rem;
  border: solid
    ${(props) =>
      props.scheduleContent === "잼데이" ? colors.subShade : colors.main};
  border-radius: 50%;
  width: 1.3rem;
  height: 1.3rem;
  transform: translateX(-50%);
  position: absolute;
  top: 5%;
  left: 51%;
`;

const StyledToday = styled.p`
  font-size: 0.8rem;
  color: white;
  @media (max-width: 576px) {
    font-size: 0.65rem;
  }
`;

const ScheduleDay = styled.div``;

const ScheduleSpecific = styled.p<{ scheduleContent: string | undefined }>`
  font-size: 0.8rem;
  color: white;
  background-color: ${(props) =>
    props.scheduleContent === "잼데이" ? colors.subShade : colors.main};
  margin-top: 0.1rem;
  padding: 0 0.3rem;
  border-radius: 0.3rem;
  @media (max-width: 576px) {
    font-size: 0.65rem;
  }
`;
