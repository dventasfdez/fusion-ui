import React from "react";
import {
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getDisplayedDaysPrevMonthByLocale,
  getDisplayedDaysNextMonthByLocale,
  getDaysFromTo,
  findDateInArray,
  getWeekdays,
  getDatesBetween2Dates,
} from "../../helpers/calendar/calendarHelper";

import CalendarDay from "./calendarDay";

export interface ICalendarProps {
  locale?: Intl.LocalesArgument;
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
  range?: boolean;
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

const CalendarMonth: React.FC<ICalendarProps> = ({
  locale,
  date,
  month,
  disabledDates,
  selectedDates,
  range,
  minDate,
  maxDate,
  onSelectDate,
  ...rest
}) => {
  const renderMonth = () => {
    const dateTmstmp = date;

    const _date = new Date(dateTmstmp);

    let renderedDays: any[] = [];

    //array of previous month days
    const previousMonthDisplayedDays = getDisplayedDaysPrevMonthByLocale(
      _date,
      locale
    );

    if (previousMonthDisplayedDays) {
      renderedDays = renderedDays.concat(previousMonthDisplayedDays);
    }

    const thisMonthFirstDay = getFirstDayOfMonth(_date);
    const thisMonthLastDay = getLastDayOfMonth(_date);

    const thisMonthDisplayedDays = getDaysFromTo(
      thisMonthFirstDay,
      thisMonthLastDay
    );
    renderedDays = renderedDays.concat(thisMonthDisplayedDays);

    const nextMonthDisplayedDays = getDisplayedDaysNextMonthByLocale(
      _date,
      locale
    );
    renderedDays = renderedDays.concat(nextMonthDisplayedDays);

    const uniqueDays = renderedDays.filter(
      (v: any, i: any, a: any) => a.indexOf(v) === i
    );

    return uniqueDays.map((_uniqueDay: Date) => {
      return renderDayOfMonth(_uniqueDay);
    });
  };

  const renderDayOfMonth = (dateDay: Date) => {
    const _date = dateDay;
    const _dateTime = new Date(_date);

    const selected = Boolean(
      selectedDates && findDateInArray(_dateTime.valueOf(), selectedDates)
    );
    const active = Boolean(
      range &&
        selectedDates &&
        selectedDates.length === 2 &&
        findDateInArray(
          _dateTime.valueOf(),
          getDatesBetween2Dates(selectedDates[0], selectedDates[1])
        )
    );
    let disabled: boolean =
      (disabledDates && findDateInArray(_dateTime.valueOf(), disabledDates)) ||
      dateDay.getUTCMonth() !== month;

    if (minDate && _date) {
      disabled =
        _date.setHours(0, 0, 0, 0) < new Date(minDate).setHours(0, 0, 0, 0) ||
        disabled;
      //NOTE: This disables past dates, not present or future, for that, use the disabledDates property.
    }

    if (maxDate && _date) {
      disabled =
        _date.setHours(0, 0, 0, 0) > new Date(maxDate).setHours(0, 0, 0, 0) ||
        disabled;
      //NOTE: This disables future dates, not present or past, for that, use the disabledDates property.
    }

    return (
      <CalendarDay
        key={_dateTime.valueOf()}
        date={_dateTime}
        onSelectDate={selectDate}
        active={active}
        selected={selected}
        disabled={disabled}
      />
    );
  };

  const selectDate = (
    timestamp: number,
    e?: React.MouseEvent<HTMLButtonElement>
  ) => {
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

  const weekdays = React.useMemo(() => getWeekdays(locale, "short"), [locale]);

  return (
    <div className="calendar-month" {...rest}>
      <div className="calendar-month-weekdays">
        {weekdays.map((day, index) => (
          <div id={day} key={index}>
            <small>
              <abbr title={String(day)} aria-label={String(day)}>
                {day}
              </abbr>
            </small>
          </div>
        ))}
      </div>
      <div key="calendar-month" className="calendar-month-days">
        {renderMonth()}
      </div>
    </div>
  );
};

export default CalendarMonth;
