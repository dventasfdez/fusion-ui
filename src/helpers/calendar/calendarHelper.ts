export const findDateInArray = (date: number, array: number[]) => {
  let matchindDate: number | undefined = undefined;
  if (array && array.length) {
    array.forEach((element) => {
      if (compareDateDays(element, date)) {
        matchindDate = element;
      }
    });
  }

  return matchindDate;
};

export const getDaysInMonth = (date: Date) => {
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();
  return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
};

export const getFirstDayOfMonth = (date: Date) => {
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();

  return new Date(Date.UTC(year, month, 1));
};

export const getLastDayOfMonth = (date: Date) => {
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();

  return new Date(Date.UTC(year, month, getDaysInMonth(date)));
};

export const getPreviousMonth = (date: Date) => {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth();

  return new Date(Date.UTC(y, m, 0));
};

export const getNextMonth = (date: Date) => {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth();

  return new Date(Date.UTC(y, m + 1, 1));
};

export const getDifferenceInDays = (dateFrom: Date, dateTo: Date) => {
  const differenceInTime = dateTo.getTime() - dateFrom.getTime();
  let differenceInDays = differenceInTime / (1000 * 3600 * 24);
  const remainder = differenceInDays % 1;
  differenceInDays =
    remainder > 0
      ? Math.floor(differenceInDays) + remainder
      : Math.floor(differenceInDays);
  return parseInt(differenceInDays.toFixed(0));
};

export const getDaysFromTo = (dateFrom: Date, dateTo: Date): Date[] => {
  const differenceInDays: number = getDifferenceInDays(dateFrom, dateTo);
  const daysArray = [];
  for (let index = 0; index <= differenceInDays; index++) {
    const nextDay: any = index === 0 ? null : daysArray[index - 1];
    daysArray[index] = nextDay ? getDatePlussDays(nextDay, -1) : dateTo;
  }
  return daysArray.reverse();
};

export const getDatePlussDays = (date: Date, days: number) => {
  const newDate = new Date(date);
  newDate.setUTCDate(newDate.getUTCDate() + days);
  return newDate;
};

export const compareDateDays = (date1: number, date2: number): boolean => {
  const _date1 = new Date(date1).setUTCHours(0, 0, 0, 0);
  const _date2 = new Date(date2).setUTCHours(0, 0, 0, 0);

  return _date1 === _date2;
};

/**
 *
 * @param date1
 * @param date2
 * @returns Array with dates between date1 and date2 without this dates.
 */
export const getDatesBetween2Dates = (
  date1: number,
  date2: number
): number[] => {
  const dates = [];

  if (date1 && date2) {
    let startDate = date1;
    let endDate = date2;

    if (endDate < startDate) {
      startDate = date2;
      endDate = date1;
    }

    const currDate = new Date(new Date(startDate).setUTCHours(0, 0, 0, 0));
    let lastDate = new Date(new Date(endDate).setUTCHours(0, 0, 0, 0));

    lastDate.setUTCDate(lastDate.getUTCDate() - 1);
    while (
      new Date(currDate.setUTCDate(currDate.getUTCDate() + 1)).valueOf() -
        lastDate.valueOf() <=
      0
    ) {
      dates.push(currDate.valueOf());
    }

    return dates;
  }
  return [];
};

export const getYearsBetweenDates = (
  minDate?: number,
  maxDate?: number
): number[] => {
  const minYear = minDate
    ? new Date(minDate).getUTCFullYear()
    : new Date().getUTCFullYear() - 100;
  const maxYear = maxDate
    ? new Date(maxDate).getUTCFullYear()
    : new Date().getUTCFullYear() + 100;

  const years = [];

  for (let year = minYear; year <= maxYear; year++) {
    years.push(year);
  }

  return years;
};

// helper: get localized weekday names via Intl
export const getWeekdays = (
  locale: Intl.LocalesArgument = navigator.language,
  width: "narrow" | "short" | "long" = "short"
) => {
  const firstDay = getFirstDayFromLocale(locale);
  const fmt = new Intl.DateTimeFormat(locale, {
    weekday: width,
    timeZone: "UTC",
  });
  // Jan 4, 1970 was a Sunday in UTC — use it as anchor
  return Array.from({ length: 7 }, (_, i) =>
    fmt.format(new Date(Date.UTC(1970, 0, 4 + ((i + firstDay) % 7))))
  );
};

// optionally infer first day of week from locale (where supported)
export const getFirstDayFromLocale = (
  locale: Intl.LocalesArgument = navigator.language
): number => {
  try {
    // TS may not have types; cast to any for safety
    const first = new (Intl as any).Locale(locale).weekInfo?.firstDay;
    return typeof first === "number" ? first : 0;
  } catch {
    return 0;
  }
};

// day-of-week index relative to locale first day (0..6)
export const getDayOfWeekIndex = (date: Date, firstDay: number): number => {
  const dow = date.getUTCDay(); // 0=Sun..6=Sat
  return (dow - firstDay + 7) % 7;
};

// Locale-aware: days from previous month to display before current month
export const getDisplayedDaysPrevMonthByLocale = (
  date: Date,
  locale: Intl.LocalesArgument = navigator.language
) => {
  const firstDay = getFirstDayFromLocale(locale as any);
  const currentMonthFirstDay = getFirstDayOfMonth(date);
  const offset = getDayOfWeekIndex(currentMonthFirstDay, firstDay);

  const previousMonth = getPreviousMonth(date);
  const previousMonthNumberOfDays = getDaysInMonth(previousMonth);
  const previousMonthFirstDisplayedDay = previousMonthNumberOfDays - offset + 1;

  const month = previousMonth.getUTCMonth();
  const year = previousMonth.getUTCFullYear();

  const firstDisplayedDay = new Date(
    Date.UTC(year, month, previousMonthFirstDisplayedDay)
  );
  const lastDisplayedDay = getLastDayOfMonth(previousMonth);

  if (firstDisplayedDay <= lastDisplayedDay) {
    return getDaysFromTo(firstDisplayedDay, lastDisplayedDay);
  }
  return [];
};

// Locale-aware: days from next month to display after current month
export const getDisplayedDaysNextMonthByLocale = (
  date: Date,
  locale: Intl.LocalesArgument = navigator.language
) => {
  const firstDay = getFirstDayFromLocale(locale as any);
  const currentMonthLastDay = getLastDayOfMonth(date);
  const offsetLast = getDayOfWeekIndex(currentMonthLastDay, firstDay);

  const nextMonth = getNextMonth(date);
  const nextMonthLastDisplayedDay = 6 - offsetLast;

  const month = nextMonth.getUTCMonth();
  const year = nextMonth.getUTCFullYear();

  const firstDisplayedDay = new Date(Date.UTC(year, month, 1));
  const lastDisplayedDay = new Date(
    Date.UTC(year, month, nextMonthLastDisplayedDay)
  );

  return getDaysFromTo(firstDisplayedDay, lastDisplayedDay);
};
