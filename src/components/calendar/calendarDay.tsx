import React from "react";
import { compareDateDays } from "../../helpers/calendar/calendarHelper";

export interface ICalendarProps {
  date: Date;
  selected?: boolean;
  disabled?: boolean;
  active?: boolean;
  onSelectDate: (date: number, e: React.MouseEvent<HTMLButtonElement>) => void;
  [others: string]: any;
}

const CalendarDay: React.FC<ICalendarProps> = (props) => {
  const { date, selected, disabled, active, onSelectDate, ...rest } = props;

  const todayModifier = compareDateDays(Date.now(), date.valueOf())
    ? "_today"
    : "";
  const selectedModifier = selected ? "_selected" : "";
  const activeClass = active ? "active" : "";

  return (
    <button
      type="button"
      id={date.valueOf().toString()}
      key={date.valueOf()}
      data-testid={`day-${date.getUTCMonth()}-${date.getUTCDate()}`}
      className={`calendar-day${todayModifier}${selectedModifier} ${activeClass}`}
      disabled={disabled}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
        onSelectDate(date.valueOf(), e)
      }
      {...rest}
    >
      <span>
        <abbr>{date.getDate()} </abbr>
      </span>
    </button>
  );
};

export default CalendarDay;
