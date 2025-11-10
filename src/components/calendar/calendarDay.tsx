import React, { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { compareDateDays } from "../../helpers/calendar/calendarHelper";
import clsx from "clsx";

type CalendarDayProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  date: Date;
  selected?: boolean;
  active?: boolean;
  onSelectDate: (date: number, e: React.MouseEvent<HTMLButtonElement>) => void;
};

const CalendarDay: React.FC<CalendarDayProps> = (props) => {
  const { date, selected, disabled, active, onSelectDate, ...rest } = props;
  const classes = clsx("calendar-day", {
    selected,
    active,
    today: compareDateDays(Date.now(), date.valueOf()),
  });
  return (
    <button
      type="button"
      id={date.valueOf().toString()}
      key={date.valueOf()}
      data-testid={`day-${date.getUTCMonth()}-${date.getUTCDate()}`}
      className={classes}
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
