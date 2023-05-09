import {getDatesBetween2Dates, getDisplayedDaysPrevMonth, getYearsBetweenDates} from './calendarHelper';

describe('getDisplayedPrevMonth', () => {
  it('should return previous month', () => {
    const result = getDisplayedDaysPrevMonth(new Date(2020, 1, 1));
    expect(typeof result).toBe('object');
  });
  it('should return void if date is not provided', () => {
    // first date possible in JS
    const date = new Date(-8640000000000000);

    const result = getDisplayedDaysPrevMonth(date);

    expect(result).toEqual([]);
  });
});

describe('getDatesBetween2Dates', () => {
  it('first date is bigger than second date', () => {
    const result = getDatesBetween2Dates(new Date(2020, 1, 1).getTime(), new Date(2019, 1, 1).getTime());
    expect(result.length).toEqual(364);
  });
  it('first date is smaller than second date', () => {
    const result = getDatesBetween2Dates(new Date(2019, 1, 1).getTime(), new Date(2020, 1, 1).getTime());
    expect(result.length).toEqual(364);
  });
});

describe('getYearsBetweenDates', () => {
  it('minDate is 0', () => {
    const result = getYearsBetweenDates(0, new Date(2020, 1, 1).getTime());
    expect(result.length).toEqual(98);
  });
  it('maxDate is 0', () => {
    const result = getYearsBetweenDates(new Date(2019, 1, 1).getTime(), 0);
    expect(result.length).toEqual(105);
  });
});
