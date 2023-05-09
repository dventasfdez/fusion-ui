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
  const month = date.getMonth();
  const year = date.getFullYear();
  return new Date(year, month + 1, 0).getDate();
};

export const getDayOfTheWeek = (date: Date) => {
  let dayOfWeek = date.getDay();

  dayOfWeek = dayOfWeek - 1;
  if (dayOfWeek === -1) {
    dayOfWeek = 6;
  }
  return dayOfWeek;
};

export const getFirstDayOfMonth = (date: Date) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  return new Date(year, month, 1);
};

export const getLastDayOfMonth = (date: Date) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  return new Date(year, month, getDaysInMonth(date));
};

export const getPreviousMonth = (date: Date) => {
  const prevMonthDate = new Date(date);
  return new Date(prevMonthDate.setDate(0));
};

export const getNextMonth = (date: Date) => {
  const prevMonthDate = new Date(date);
  const firstDayOfNextMonth = getLastDayOfMonth(date).getDate() + 1;
  return new Date(prevMonthDate.setDate(firstDayOfNextMonth));
};

export const getDisplayedDaysPrevMonth = (date: Date) => {
  const currentMonthFirstDay = getFirstDayOfMonth(date);
  const currentMonthFirstDayOfWeek = getDayOfTheWeek(currentMonthFirstDay);

  const previousMonth = getPreviousMonth(date);
  const previousMonthNumberOfDays = getDaysInMonth(previousMonth);
  const previousMonthFirstDisplayedDay = previousMonthNumberOfDays - currentMonthFirstDayOfWeek + 1;

  const month = previousMonth.getMonth();
  const year = previousMonth.getFullYear();

  const firstDisplayedDay = new Date(year, month, previousMonthFirstDisplayedDay);
  const lastDisplayedDay = getLastDayOfMonth(previousMonth);

  if (firstDisplayedDay <= lastDisplayedDay) {
    return getDaysFromTo(firstDisplayedDay, lastDisplayedDay);
  }
  return [];
};

export const getDisplayedDaysNextMonth = (date: Date) => {
  const currentMonthLastDay = getLastDayOfMonth(date);
  const currentMonthLastDayOfWeek = getDayOfTheWeek(currentMonthLastDay);

  const nextMonth = getNextMonth(date);

  const nextMonthLastDisplayedDay = 6 - currentMonthLastDayOfWeek;

  const month = nextMonth.getMonth();
  const year = nextMonth.getFullYear();

  const firstDisplayedDay = new Date(year, month, 1);
  const lastDisplayedDay = new Date(year, month, nextMonthLastDisplayedDay);

  return getDaysFromTo(firstDisplayedDay, lastDisplayedDay);
};

export const getDifferenceInDays = (dateFrom: Date, dateTo: Date) => {
  const differenceInTime = dateTo.getTime() - dateFrom.getTime();
  let differenceInDays = differenceInTime / (1000 * 3600 * 24);
  const remainder = differenceInDays % 1;
  differenceInDays = remainder > 0 ? Math.floor(differenceInDays) + remainder : Math.floor(differenceInDays);
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
  return new Date(newDate.setDate(newDate.getDate() + days));
};

export const compareDateDays = (date1: number, date2: number): boolean => {
  const _date1 = new Date(date1).setHours(0, 0, 0, 0);
  const _date2 = new Date(date2).setHours(0, 0, 0, 0);

  return _date1 === _date2;
};

/**
 *
 * @param date1
 * @param date2
 * @returns Array with dates between date1 and date2 without this dates.
 */
export const getDatesBetween2Dates = (date1: number, date2: number): number[] => {
  const dates = [];

  if (date1 && date2) {
    let startDate = date1;
    let endDate = date2;

    if (endDate < startDate) {
      startDate = date2;
      endDate = date1;
    }

    const currDate = new Date(new Date(startDate).setHours(0, 0, 0, 0));
    let lastDate = new Date(new Date(endDate).setHours(0, 0, 0, 0));

    lastDate = new Date(lastDate.setDate(lastDate.getDate() - 1));
    while (new Date(currDate.setDate(currDate.getDate() + 1)).valueOf() - lastDate.valueOf() <= 0) {
      dates.push(currDate.valueOf());
    }

    return dates;
  }
  return [];
};

export const getYearsBetweenDates = (minDate?: number, maxDate?: number): number[] => {
  const minYear = minDate ? new Date(minDate).getFullYear() : new Date().getFullYear() - 100;
  const maxYear = maxDate ? new Date(maxDate).getFullYear() : new Date().getFullYear() + 100;

  const years = [];

  for (let year = minYear; year <= maxYear; year++) {
    years.push(year);
  }

  return years;
};
