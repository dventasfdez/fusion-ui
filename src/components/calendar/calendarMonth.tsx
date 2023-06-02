import React from "react";
import { getFirstDayOfMonth, getLastDayOfMonth, getDisplayedDaysPrevMonth, getDisplayedDaysNextMonth, getDaysFromTo, findDateInArray } from "../../helpers/calendar/calendarHelper";

import { DateTime, Info } from "luxon";

import CalendarDay from "./calendarDay";

export interface ICalendarProps {
  locale?: string;
  /**
   * Show the month of the default date
   */
  date: number;

  month: number;
  /**
   * Disable days in calendar
   */
  disabledDates?: number[];
  /**
   * Selected days in calendar
   */
  selectedDates?: number[];
  /**
   * In case the selected dates build up a range, intermediate days of those two dates
   */
  activeDates?: number[];
  /**
   * Minimum date to be able to select
   */
  minDate?: number;
  /**
   * Maximum date to be able to select
   */
  maxDate?: number;
  /**
   * On change function when click another day
   */
  onSelectDate?: (date: number, e?: React.MouseEvent) => void;
  [others: string]: any;
}

const CalendarMonth: React.FC<ICalendarProps> = (props) => {
  const { locale, date, month, disabledDates, selectedDates, activeDates, minDate, maxDate, onSelectDate, ...rest } = props;

  const renderMonth = () => {
    const dateTmstmp = date;

    const _date = DateTime.fromMillis(dateTmstmp).toJSDate();

    let renderedDays: any[] = [];

    //array of previous month days
    const previousMonthDisplayedDays = getDisplayedDaysPrevMonth(_date);
    if (previousMonthDisplayedDays) {
      renderedDays = renderedDays.concat(previousMonthDisplayedDays);
    }

    const thisMonthFirstDay = getFirstDayOfMonth(_date);
    const thisMonthLastDay = getLastDayOfMonth(_date);

    const thisMonthDisplayedDays = getDaysFromTo(thisMonthFirstDay, thisMonthLastDay);
    renderedDays = renderedDays.concat(thisMonthDisplayedDays);

    const nextMonthDisplayedDays = getDisplayedDaysNextMonth(_date);
    renderedDays = renderedDays.concat(nextMonthDisplayedDays);

    const uniqueDays = renderedDays.filter((v: any, i: any, a: any) => a.indexOf(v) === i);

    return uniqueDays.map((_uniqueDay: Date) => {
      return renderDayOfMonth(_uniqueDay);
    });
  };

  const renderDayOfMonth = (dateDay: Date) => {
    const _date = dateDay;
    const _dateTime = DateTime.fromJSDate(_date);

    const selected = Boolean(selectedDates && findDateInArray(_dateTime.valueOf(), selectedDates));
    const active = Boolean(activeDates && findDateInArray(_dateTime.valueOf(), activeDates));
    let disabled: boolean = (disabledDates && findDateInArray(_dateTime.valueOf(), disabledDates)) || dateDay.getMonth() + 1 !== month;

    if (minDate && _date) {
      disabled = _date.setHours(0, 0, 0, 0) < new Date(minDate).setHours(0, 0, 0, 0) || disabled;
      //NOTE: This disables past dates, not present or future, for that, use the disabledDates property.
    }

    if (maxDate && _date) {
      disabled = _date.setHours(0, 0, 0, 0) > new Date(maxDate).setHours(0, 0, 0, 0) || disabled;
      //NOTE: This disables future dates, not present or past, for that, use the disabledDates property.
    }

    return <CalendarDay key={_dateTime.valueOf()} date={_dateTime} onSelectDate={selectDate} active={active} selected={selected} disabled={disabled} />;
  };

  const selectDate = (timestamp: number, e?: React.MouseEvent<HTMLButtonElement>) => {
    if (typeof document !== "undefined") {
      const _element: HTMLElement = document.activeElement as HTMLElement;

      if (_element) {
        _element.blur();
      }
    }

    if (typeof onSelectDate === "function") {
      onSelectDate(timestamp, e);
    }
  };

  return (
    <div className="calendar-month" {...rest}>
      <div className="calendar-month-weekdays">
        {Info.weekdays("short", { locale }).map((day: string, index: number) => {
          return (
            <div id={day} key={index}>
              <small>
                <abbr title={"" + day} aria-label={"" + day}>
                  {day}
                </abbr>
              </small>
            </div>
          );
        })}
      </div>
      <div key="calendar-month" className="calendar-month-days">
        {renderMonth()}
      </div>
    </div>
  );
};

export default CalendarMonth;
