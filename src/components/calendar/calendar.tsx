import React, { HTMLAttributes, useEffect, useRef, useState } from "react";
// import { DateTime } from "luxon";
import CalendarMonth from "./calendarMonth";
import CalendarYears from "./calendarYears";

export type CalendarProps = HTMLAttributes<HTMLDivElement> & {
  locale?: Intl.LocalesArgument;
  /**
   * Show the month of the default date
   */
  defaultDate?: number;
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
};

const Calendar: React.FC<CalendarProps> = ({
  id,
  locale = new Intl.Locale(
    typeof window !== "undefined" ? navigator.language : "en-US"
  ),
  defaultDate,
  disabledDates,
  selectedDates,
  activeDates,
  minDate,
  maxDate,
  onSelectDate,
  className,
  ...props
}) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [defaultDateState, setDefaultDateState] = useState<number>(
    defaultDate ? defaultDate : Date.now()
  );

  const [showYears, setShowYears] = useState(false);

  const toggleShowYears = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setShowYears(!showYears);
  };

  const updateDisplayedDate = (newDisplayedDate: number) => {
    setDefaultDateState(newDisplayedDate);
  };

  const onSelectYear = (
    year: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const _newDate = new Date(defaultDateState).setUTCFullYear(year);
    setDefaultDateState(_newDate);
    setShowYears(false);
  };

  const selectNextMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const _nextDate = new Date(defaultDateState).setUTCMonth(
      new Date().getUTCMonth() + 1
    );
    updateDisplayedDate(_nextDate.valueOf());
  };

  const selectPrevMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const _prevDate = new Date(defaultDateState).setUTCMonth(
      new Date(defaultDateState).getUTCMonth()
    );
    updateDisplayedDate(_prevDate.valueOf());
  };

  const renderNavigationBar = () => {
    const _actualDate = new Intl.DateTimeFormat(locale, {
      month: "long",
      year: "numeric",
    }).format(defaultDateState);
    let _navigationContent = (
      <span
        data-testid={
          props && props["data-testid"]
            ? `${props["data-testid"]}-nav-label`
            : undefined
        }
        className="calendar-navigation-label"
      >
        {_actualDate}
      </span>
    );
    if (
      ((minDate &&
        new Date(minDate).getUTCFullYear() < new Date().getUTCFullYear()) ||
        !minDate) &&
      ((maxDate &&
        new Date(maxDate).getUTCFullYear() > new Date().getUTCFullYear()) ||
        !maxDate)
    ) {
      _navigationContent = (
        <button
          type="button"
          data-testid={
            props && props["data-testid"]
              ? `${props["data-testid"]}-nav-label`
              : undefined
          }
          className="calendar-navigation-label"
          onClick={toggleShowYears}
        >
          {`${_actualDate}`}
          <span className="material-icons right">
            {showYears ? "arrow_drop_up" : "arrow_drop_down"}
          </span>
        </button>
      );
    }
    return (
      <div className="calendar-navigation">
        <button
          type="button"
          data-testid={
            props && props["data-testid"]
              ? `${props["data-testid"]}-btn_prev`
              : undefined
          }
          className="calendar-navigation-btn_prev"
          onClick={selectPrevMonth}
        >
          <span className="material-icons">chevron_left</span>
        </button>
        {_navigationContent}
        <button
          type="button"
          data-testid={
            props && props["data-testid"]
              ? `${props["data-testid"]}-btn_next`
              : undefined
          }
          className="calendar-navigation-btn_next"
          onClick={selectNextMonth}
        >
          <span className="material-icons">chevron_right</span>
        </button>
      </div>
    );
  };

  const getIfContainsSelectedClassName = (_className: string): boolean => {
    const _class: string = _className;
    const _classes = _class.split(" ");
    if (
      _classes.filter(
        (_classFilter: string) =>
          _classFilter === "calendar-day_selected" ||
          _classFilter === "calendar-day_today_selected"
      ).length
    )
      return true;

    return false;
  };

  const setActiveClasses = () => {
    if (calendarRef && calendarRef.current) {
      const activeButtons = calendarRef.current.getElementsByClassName(
        "calendar-day active"
      );
      const activeTodayButtons = calendarRef.current.getElementsByClassName(
        "calendar-day_today active"
      );
      if (activeTodayButtons && activeTodayButtons.length)
        setActiveTodayClass(activeTodayButtons, activeButtons);

      if (activeButtons && activeButtons.length)
        setActiveClassModifiers(activeButtons);
    }
  };

  const setActiveTodayClass = (activeTodayButtons: any, activeButtons: any) => {
    if (activeTodayButtons && activeTodayButtons.length) {
      if (
        (!activeButtons || (activeButtons && !activeButtons.length)) &&
        activeDates &&
        activeDates.length === 1
      ) {
        activeTodayButtons[0].className += "_all";
      } else if (activeButtons && activeButtons.length) {
        if (
          activeTodayButtons[0] &&
          activeTodayButtons[0].previousElementSibling &&
          getIfContainsSelectedClassName(
            activeTodayButtons[0].previousElementSibling.className
          )
        )
          activeTodayButtons[0].className += "_first";
        if (
          activeTodayButtons[0] &&
          activeTodayButtons[0].nextElementSibling &&
          getIfContainsSelectedClassName(
            activeTodayButtons[0].nextElementSibling.className
          )
        )
          activeTodayButtons[0].className += "_last";
      }
    }
  };

  const setActiveClassModifiers = (activeButtons: any) => {
    if (activeButtons && activeButtons.length) {
      if (
        activeButtons.length === 1 &&
        activeDates &&
        activeDates.length === 1
      ) {
        activeButtons[0].className += "_all";
      } else {
        if (
          activeButtons[0].previousElementSibling &&
          getIfContainsSelectedClassName(
            activeButtons[0].previousElementSibling.className
          )
        )
          activeButtons[0].className += "_first";
        if (
          activeButtons[activeButtons.length - 1] &&
          activeButtons[activeButtons.length - 1].nextElementSibling &&
          getIfContainsSelectedClassName(
            activeButtons[activeButtons.length - 1].nextElementSibling.className
          )
        )
          activeButtons[activeButtons.length - 1].className += "_last";
      }
    }
  };

  useEffect(() => {
    if (activeDates) {
      setActiveClasses();
    }
  }, [activeDates, defaultDateState]);

  useEffect(() => {
    if (defaultDate && defaultDate !== defaultDateState) {
      setDefaultDateState(defaultDate);
    }
  }, [defaultDate]);

  return (
    <div
      id={id}
      key={id}
      ref={calendarRef}
      className={`calendar ${className || ""}`}
      {...props}
    >
      {renderNavigationBar()}
      {showYears ? (
        <CalendarYears
          year={new Date(defaultDateState).getFullYear()}
          onSelectYear={onSelectYear}
          minDate={minDate}
          maxDate={maxDate}
        />
      ) : (
        <CalendarMonth
          locale={locale}
          date={defaultDateState}
          month={new Date(defaultDateState).getMonth()}
          selectedDates={selectedDates}
          activeDates={activeDates}
          disabledDates={disabledDates}
          minDate={minDate}
          maxDate={maxDate}
          onSelectDate={onSelectDate}
        />
      )}
    </div>
  );
};

export default Calendar;
