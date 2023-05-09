import React from 'react';
import {compareDateDays} from '../../helpers/calendar/calendarHelper';

import {DateTime} from 'luxon';

export interface ICalendarProps {
  date: DateTime;
  selected?: boolean;
  disabled?: boolean;
  active?: boolean;
  onSelectDate: (date: number, e: React.MouseEvent<HTMLButtonElement>) => void;
  [others: string]: any;
}

const CalendarDay: React.FC<ICalendarProps> = (props) => {
  const {date, selected, disabled, active, onSelectDate, ...rest} = props;

  const todayModifier = compareDateDays(DateTime.now().valueOf(), date.valueOf()) ? '_today' : '';
  const selectedModifier = selected ? '_selected' : '';
  const activeClass = active ? 'active' : '';

  return (
    <button
      type="button"
      id={date.valueOf().toString()}
      key={date.valueOf()}
      data-testid={`day-${date.month}-${date.day}`}
      className={`calendar-day${todayModifier}${selectedModifier} ${activeClass}`}
      disabled={disabled}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => onSelectDate(date.valueOf(), e)}
      {...rest}
    >
      <span>
        <abbr>{date.day} </abbr>
      </span>
    </button>
  );
};

export default CalendarDay;
