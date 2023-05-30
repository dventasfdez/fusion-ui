import React from 'react';
import {getYearsBetweenDates} from '../../helpers/calendar/calendarHelper';

export interface ICalendarProps {
  year: number;
  minDate?: number;
  maxDate?: number;
  onSelectYear: (year: number, e: React.MouseEvent<HTMLButtonElement>) => void;
  [others: string]: any;
}

const CalendarYears: React.FC<ICalendarProps> = (props) => {
  const {year, minDate, maxDate, onSelectYear, ...rest} = props;

  const _years = getYearsBetweenDates(minDate, maxDate);

  return (
    <div className="calendar-years" {...rest}>
      {_years.map((_year) => (
        <button
          type="button"
          id={_year.toString()}
          key={_year.toString()}
          data-testid={`calendar-year-${_year}-btn`}
          className={`calendar-year${year === _year ? '_selected' : ''}`}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => onSelectYear(_year, e)}
        >
          {_year}
        </button>
      ))}
    </div>
  );
};

export default CalendarYears;
