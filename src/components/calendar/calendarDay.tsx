import React, { ButtonHTMLAttributes } from "react";
import {
  compareDateDays,
  getLocalDateFromUTCDate,
  getUTCTimestampFromLocalDate,
} from "../../helpers/calendar/calendarHelper";
import clsx from "clsx";

type CalendarDayProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  date: Date;
  selected?: boolean;
  active?: boolean;
  onSelectDate: (date: number, e: React.MouseEvent<HTMLButtonElement>) => void;
};

const CalendarDay: React.FC<CalendarDayProps> = (props) => {
  const { date, selected, disabled, active, onSelectDate, ...rest } = props;
  const normalizedTimestamp = date.valueOf();
  const displayDate = getLocalDateFromUTCDate(date);
  const todayTimestamp = getUTCTimestampFromLocalDate(new Date());
  const classes = clsx("calendar-day", {
    selected,
    active,
    today: compareDateDays(todayTimestamp, normalizedTimestamp),
  });
  return (
    <button
      type="button"
      id={normalizedTimestamp.toString()}
      key={date.valueOf()}
      data-testid={`day-${date.getUTCMonth()}-${date.getUTCDate()}`}
      className={classes}
      disabled={disabled}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
        onSelectDate(normalizedTimestamp, e)
      }
      {...rest}
    >
      <span>
        <abbr>{displayDate.getDate()} </abbr>
      </span>
    </button>
  );
};

export default CalendarDay;
