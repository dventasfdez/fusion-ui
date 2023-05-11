import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Calendar from "./calendar";
import { DateTime } from "luxon";
import {
  compareDateDays,
  findDateInArray,
  getDatesBetween2Dates,
  getDisplayedDaysNextMonth,
  getDisplayedDaysPrevMonth,
  getFirstDayOfMonth,
  getLastDayOfMonth,
} from "../../helpers/calendar/calendarHelper";
import CalendarYears from "./calendarYears";

test("Calendar component without data-testid", () => {
  const { container } = render(<Calendar minDate={Date.now().valueOf()} maxDate={Date.now().valueOf()} defaultDate={DateTime.now().valueOf()} />);

  expect(container.getElementsByClassName("calendar").length).toBe(1);
});

test.skip("Calendar component with selected dates", () => {
  const selectedDates = [DateTime.now().plus({ days: 1 }), DateTime.now().plus({ days: 2 }), DateTime.now().plus({ days: 8 }), DateTime.now().plus({ days: 10, years: 1 })];
  const { getByTestId } = render(<Calendar data-testid="calendar-selected" selectedDates={selectedDates.map((selDate: DateTime) => selDate.valueOf())} defaultDate={DateTime.now().valueOf()} />);

  const nextMonthBtn = getByTestId("calendar-selected-btn_next");
  const navigationBtn = getByTestId("calendar-selected-nav-label");
  let actualMonth = DateTime.now().month;
  let actualYear = DateTime.now().year;
  selectedDates.forEach((selectedDate: DateTime) => {
    if (selectedDate.month !== actualMonth) {
      if (nextMonthBtn) {
        fireEvent.click(nextMonthBtn);
        actualMonth++;
      }
    } else if (selectedDate.year !== actualYear) {
      if (navigationBtn) {
        fireEvent.click(navigationBtn);
        const yearBtn = getByTestId(`calendar-year-${actualYear + 1}-btn`);
        if (yearBtn) {
          fireEvent.click(yearBtn);
          actualYear++;
        }
      }
    }
    const element = getByTestId(`day-${selectedDate.month}-${selectedDate.day}`);
    if (element) {
      const classNameArr = element.className.split(" ");
      expect(classNameArr.filter((className: string) => className === "calendar-day_selected").length).toBe(1);
    }
  });
});

test("Calendar component with disabled dates", () => {
  const disableDates = [DateTime.now().plus({ days: 8 }), DateTime.now().plus({ days: 10 }), DateTime.now().plus({ days: 12 })];

  const { getByTestId } = render(<Calendar data-testid="calendar-disable" disabledDates={disableDates.map((disDate: DateTime) => disDate.valueOf())} />);

  const nextMonthBtn = getByTestId("calendar-disable-btn_next");
  let actualMonth = DateTime.now().month;
  disableDates.forEach((disableDate: DateTime) => {
    if (disableDate.month !== actualMonth) {
      if (nextMonthBtn) {
        fireEvent.click(nextMonthBtn);
        actualMonth++;
      }
    }
    const elemBtn = getByTestId(`day-${disableDate.month}-${disableDate.day}`);
    if (elemBtn) expect(elemBtn).toBeDisabled();
  });
});

test("Calendar component with active dates", () => {
  const selectedDate1 = DateTime.now().plus({ days: 1 });
  const selectedDate2 = DateTime.now().plus({ days: 20 });
  const activeDates = getDatesBetween2Dates(selectedDate1.valueOf(), selectedDate2.valueOf());
  const { container, getByTestId } = render(<Calendar data-testid="calendar-active" selectedDates={[selectedDate1.valueOf(), selectedDate2.valueOf()]} activeDates={activeDates} />);
  const nextMonthBtn = getByTestId("calendar-active-btn_next");

  if (selectedDate1.month !== DateTime.now().month) if (nextMonthBtn) fireEvent.click(nextMonthBtn);

  if (selectedDate1.month === selectedDate2.month) {
    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
    if (activeDates) {
      expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - 2);
      expect(container.getElementsByClassName("calendar-day active_first").length).toBe(1);
      expect(container.getElementsByClassName("calendar-day active_last").length).toBe(1);
    }
  } else if (selectedDate2.month !== selectedDate1.month) {
    const month1LastDay = getLastDayOfMonth(selectedDate1.toJSDate()).getDate();
    const month1DisplayedDays = getDisplayedDaysPrevMonth(selectedDate2.toJSDate());
    const month2FirstDay = getFirstDayOfMonth(selectedDate2.toJSDate()).getDate();
    const month2DisplayedDays = getDisplayedDaysNextMonth(selectedDate1.toJSDate());

    if (month1LastDay === selectedDate1.day) {
      if (month2DisplayedDays && month2DisplayedDays.length) {
        if (
          findDateInArray(
            selectedDate2.valueOf(),
            month2DisplayedDays.map((month2Day: Date) => month2Day.valueOf())
          )
        ) {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
          if (activeDates && activeDates.length) {
            expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - 2);
            expect(container.getElementsByClassName("calendar-day active_first").length).toBe(1);
            expect(container.getElementsByClassName("calendar-day active_last").length).toBe(2);
          }
        } else {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
          if (activeDates && activeDates.length) {
            const indexLastDisplayDays = activeDates.findIndex((activeDay: number) => compareDateDays(activeDay, month2DisplayedDays[month2DisplayedDays.length - 1].valueOf()));
            expect(container.getElementsByClassName("calendar-day active_first").length).toBe(1);
            expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - (activeDates.length - 1 - indexLastDisplayDays) - 1);
          }
        }
      } else {
        expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
      }
    } else {
      if (
        findDateInArray(
          selectedDate2.valueOf(),
          month2DisplayedDays.map((month2Day: Date) => month2Day.valueOf())
        )
      ) {
        expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
        if (activeDates && activeDates.length) {
          expect(container.getElementsByClassName("calendar-day active_first").length).toBe(1);
          expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - 2);
          expect(container.getElementsByClassName("calendar-day active_last").length).toBe(1);
        }
      } else {
        expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
        if (month2DisplayedDays && month2DisplayedDays.length) {
          if (activeDates && activeDates.length) {
            const indexLastDisplayDays = activeDates.findIndex((activeDay: number) => compareDateDays(activeDay, month2DisplayedDays[month2DisplayedDays.length - 1].valueOf()));
            expect(container.getElementsByClassName("calendar-day active_first").length).toBe(1);
            expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - (activeDates.length - 1 - indexLastDisplayDays) - 1);
          }
        } else {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
          if (activeDates && activeDates.length) {
            const indexLastMonthDays = activeDates.findIndex((activeDay: number) => compareDateDays(activeDay, month1LastDay.valueOf()));
            expect(container.getElementsByClassName("calendar-day active_first").length).toBe(1);
            expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - (activeDates.length - 1 - indexLastMonthDays) - 1);
          }
        }
      }
    }

    if (nextMonthBtn) fireEvent.click(nextMonthBtn);

    if (month2FirstDay === selectedDate2.day) {
      if (month1DisplayedDays && month1DisplayedDays.length) {
        if (
          findDateInArray(
            selectedDate1.valueOf(),
            month1DisplayedDays.map((month1Day: Date) => month1Day.valueOf())
          )
        ) {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
          if (activeDates && activeDates.length) {
            expect(container.getElementsByClassName("calendar-day active_first").length).toBe(1);
            expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - 2);
            expect(container.getElementsByClassName("calendar-day active_last").length).toBe(1);
          }
        } else {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
          if (activeDates && activeDates.length) {
            const indexFirstDisplayDays = activeDates.findIndex((activeDay: number) => compareDateDays(activeDay, month1DisplayedDays[0].valueOf()));
            expect(container.getElementsByClassName("calendar-day active_last").length).toBe(1);
            expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - indexFirstDisplayDays - 1);
          }
        }
      } else {
        expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
      }
    } else {
      if (month1DisplayedDays && month1DisplayedDays.length) {
        if (
          findDateInArray(
            selectedDate1.valueOf(),
            month1DisplayedDays.map((month1Day: Date) => month1Day.valueOf())
          )
        ) {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
          if (activeDates && activeDates.length) {
            expect(container.getElementsByClassName("calendar-day active_first").length).toBe(1);
            expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - 2);
            expect(container.getElementsByClassName("calendar-day active_last").length).toBe(1);
          }
        } else {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
          if (activeDates && activeDates.length) {
            const indexFirstDisplayDays = activeDates.findIndex((activeDay: number) => compareDateDays(activeDay, month1DisplayedDays[0].valueOf()));
            expect(container.getElementsByClassName("calendar-day active_last").length).toBe(1);
            expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - indexFirstDisplayDays - 1);
          }
        }
      } else {
        expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
        if (activeDates && activeDates.length) {
          const indexFirstMonthDays = activeDates.findIndex((activeDay: number) => compareDateDays(activeDay, month2FirstDay.valueOf()));
          expect(container.getElementsByClassName("calendar-day active_last").length).toBe(1);
          expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - indexFirstMonthDays - 1);
        }
      }
    }
  }
});

test("Calendar component with only one active date", () => {
  const selectedDate1 = DateTime.now().plus({ days: 8 });
  const selectedDate2 = DateTime.now().plus({ days: 10 });
  const activeDate = getDatesBetween2Dates(selectedDate1.valueOf(), selectedDate2.valueOf())[0];
  const { container, getByTestId } = render(
    <Calendar data-testid="calendar-active1" selectedDates={[selectedDate1.valueOf(), selectedDate2.valueOf()]} activeDates={getDatesBetween2Dates(selectedDate1.valueOf(), selectedDate2.valueOf())} />
  );
  const nextMonthBtn = getByTestId("calendar-active1-btn_next");

  if (selectedDate1.month !== DateTime.now().month) if (nextMonthBtn) fireEvent.click(nextMonthBtn);

  if (selectedDate1.month === selectedDate2.month) {
    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
    expect(container.getElementsByClassName("calendar-day active_all").length).toBe(1);
  } else if (selectedDate2.month !== selectedDate1.month) {
    const month1LastDay = getLastDayOfMonth(selectedDate1.toJSDate()).getDate();
    const month1DisplayedDays = getDisplayedDaysPrevMonth(selectedDate2.toJSDate());
    const month2FirstDay = getFirstDayOfMonth(selectedDate2.toJSDate()).getDate();
    const month2DisplayedDays = getDisplayedDaysNextMonth(selectedDate1.toJSDate());

    if (month1LastDay === selectedDate1.day) {
      if (month2DisplayedDays && month2DisplayedDays.length) {
        if (
          findDateInArray(
            selectedDate2.valueOf(),
            month2DisplayedDays.map((month2Day: Date) => month2Day.valueOf())
          )
        ) {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
          expect(container.getElementsByClassName("calendar-day active_all").length).toBe(1);
        } else {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
          if (
            activeDate &&
            findDateInArray(
              activeDate.valueOf(),
              month2DisplayedDays.map((month2Day: Date) => month2Day.valueOf())
            )
          ) {
            expect(container.getElementsByClassName("calendar-day active_all").length).toBe(1);
          }
        }
      } else {
        expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
      }
    } else {
      if (month2DisplayedDays && month2DisplayedDays.length) {
        if (
          findDateInArray(
            selectedDate2.valueOf(),
            month2DisplayedDays.map((month2Day: Date) => month2Day.valueOf())
          )
        ) {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
          expect(container.getElementsByClassName("calendar-day active_all").length).toBe(1);
        } else {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
          if (
            activeDate &&
            (activeDate <= month1LastDay ||
              findDateInArray(
                activeDate.valueOf(),
                month2DisplayedDays.map((month2Day: Date) => month2Day.valueOf())
              ))
          ) {
            expect(container.getElementsByClassName("calendar-day active_all").length).toBe(1);
          }
        }
      } else {
        expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
        if (activeDate && activeDate <= month1LastDay) {
          expect(container.getElementsByClassName("calendar-day active_all").length).toBe(1);
        }
      }
    }

    if (nextMonthBtn) fireEvent.click(nextMonthBtn);

    if (month2FirstDay === selectedDate2.day) {
      if (month1DisplayedDays && month1DisplayedDays.length) {
        if (
          findDateInArray(
            selectedDate1.valueOf(),
            month1DisplayedDays.map((month1Day: Date) => month1Day.valueOf())
          )
        ) {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
          expect(container.getElementsByClassName("calendar-day active_all").length).toBe(1);
        } else {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
          if (
            activeDate &&
            findDateInArray(
              activeDate.valueOf(),
              month1DisplayedDays.map((month1Day: Date) => month1Day.valueOf())
            )
          ) {
            expect(container.getElementsByClassName("calendar-day active_all").length).toBe(1);
          }
        }
      } else {
        expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
      }
    } else {
      if (month1DisplayedDays && month1DisplayedDays.length) {
        if (
          findDateInArray(
            selectedDate1.valueOf(),
            month1DisplayedDays.map((month1Day: Date) => month1Day.valueOf())
          )
        ) {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
          expect(container.getElementsByClassName("calendar-day active_all").length).toBe(1);
        } else {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
          if (
            activeDate &&
            (activeDate >= month2FirstDay ||
              findDateInArray(
                activeDate.valueOf(),
                month1DisplayedDays.map((month1Day: Date) => month1Day.valueOf())
              ))
          ) {
            expect(container.getElementsByClassName("calendar-day active_all").length).toBe(1);
          }
        }
      } else {
        expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
        if (activeDate && activeDate >= month2FirstDay) {
          expect(container.getElementsByClassName("calendar-day active_all").length).toBe(1);
        }
      }
    }
  }
});

test("Calendar component with today first active date", () => {
  const selectedDate1 = DateTime.now().plus({ days: -1 });
  const selectedDate2 = DateTime.now().plus({ days: 20 });
  const activeDates = getDatesBetween2Dates(selectedDate1.valueOf(), selectedDate2.valueOf());
  const { container, getByTestId } = render(<Calendar data-testid="calendar-today-active-first" selectedDates={[selectedDate1.valueOf(), selectedDate2.valueOf()]} activeDates={activeDates} />);
  const nextMonthBtn = getByTestId("calendar-today-active-first-btn_next");
  const prevMonthBtn = getByTestId("calendar-today-active-first-btn_prev");

  if (selectedDate1.month !== DateTime.now().month) {
    if (selectedDate1.month > DateTime.now().month) if (nextMonthBtn) fireEvent.click(nextMonthBtn);
    if (selectedDate1.month < DateTime.now().month) if (prevMonthBtn) fireEvent.click(prevMonthBtn);
  }

  if (selectedDate1.month === selectedDate2.month) {
    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
    if (activeDates) {
      expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - 2);
      expect(container.getElementsByClassName("calendar-day_today active_first").length).toBe(1);
      expect(container.getElementsByClassName("calendar-day active_last").length).toBe(1);
    }
  } else if (selectedDate2.month !== selectedDate1.month) {
    const month1LastDay = getLastDayOfMonth(selectedDate1.toJSDate()).getDate();
    const month1DisplayedDays = getDisplayedDaysPrevMonth(selectedDate2.toJSDate());
    const month2FirstDay = getFirstDayOfMonth(selectedDate2.toJSDate()).getDate();
    const month2DisplayedDays = getDisplayedDaysNextMonth(selectedDate1.toJSDate());

    if (month1LastDay === selectedDate1.day) {
      if (month2DisplayedDays && month2DisplayedDays.length) {
        if (
          findDateInArray(
            selectedDate2.valueOf(),
            month2DisplayedDays.map((month2Day: Date) => month2Day.valueOf())
          )
        ) {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
          if (activeDates && activeDates.length) {
            expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - 2);
            expect(container.getElementsByClassName("calendar-day_today active_first").length).toBe(1);
            expect(container.getElementsByClassName("calendar-day active_last").length).toBe(2);
          }
        } else {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
          if (activeDates && activeDates.length) {
            const indexLastDisplayDays = activeDates.findIndex((activeDay: number) => compareDateDays(activeDay, month2DisplayedDays[month2DisplayedDays.length - 1].valueOf()));
            expect(container.getElementsByClassName("calendar-day_today active_first").length).toBe(1);
            expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - (activeDates.length - 1 - indexLastDisplayDays) - 1);
          }
        }
      } else {
        expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
      }
    } else {
      if (
        findDateInArray(
          selectedDate2.valueOf(),
          month2DisplayedDays.map((month2Day: Date) => month2Day.valueOf())
        )
      ) {
        expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
        if (activeDates && activeDates.length) {
          expect(container.getElementsByClassName("calendar-day_today active_first").length).toBe(1);
          expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - 2);
          expect(container.getElementsByClassName("calendar-day active_last").length).toBe(1);
        }
      } else {
        expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
        if (month2DisplayedDays && month2DisplayedDays.length) {
          if (activeDates && activeDates.length) {
            const indexLastDisplayDays = activeDates.findIndex((activeDay: number) => compareDateDays(activeDay, month2DisplayedDays[month2DisplayedDays.length - 1].valueOf()));
            expect(container.getElementsByClassName("calendar-day_today active_first").length).toBe(1);
            expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - (activeDates.length - 1 - indexLastDisplayDays) - 1);
          }
        } else {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
          if (activeDates && activeDates.length) {
            const indexLastMonthDays = activeDates.findIndex((activeDay: number) => compareDateDays(activeDay, month1LastDay.valueOf()));
            expect(container.getElementsByClassName("calendar-day_today active_first").length).toBe(1);
            expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - (activeDates.length - 1 - indexLastMonthDays) - 1);
          }
        }
      }
    }

    if (nextMonthBtn) fireEvent.click(nextMonthBtn);

    if (month2FirstDay === selectedDate2.day) {
      if (month1DisplayedDays && month1DisplayedDays.length) {
        if (
          findDateInArray(
            selectedDate1.valueOf(),
            month1DisplayedDays.map((month1Day: Date) => month1Day.valueOf())
          )
        ) {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
          if (activeDates && activeDates.length) {
            expect(container.getElementsByClassName("calendar-day_today active_first").length).toBe(1);
            expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - 2);
            expect(container.getElementsByClassName("calendar-day active_last").length).toBe(1);
          }
        } else {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
          if (activeDates && activeDates.length) {
            const indexFirstDisplayDays = activeDates.findIndex((activeDay: number) => compareDateDays(activeDay, month1DisplayedDays[0].valueOf()));
            expect(container.getElementsByClassName("calendar-day active_last").length).toBe(1);
            expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - indexFirstDisplayDays - 1);
          }
        }
      } else {
        expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
      }
    } else {
      if (month1DisplayedDays && month1DisplayedDays.length) {
        if (
          findDateInArray(
            selectedDate1.valueOf(),
            month1DisplayedDays.map((month1Day: Date) => month1Day.valueOf())
          )
        ) {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
          if (activeDates && activeDates.length) {
            expect(container.getElementsByClassName("calendar-day_today active_first").length).toBe(1);
            expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - 2);
            expect(container.getElementsByClassName("calendar-day active_last").length).toBe(1);
          }
        } else {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
          if (activeDates && activeDates.length) {
            const indexFirstDisplayDays = activeDates.findIndex((activeDay: number) => compareDateDays(activeDay, month1DisplayedDays[0].valueOf()));
            if (indexFirstDisplayDays === 0) {
              expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - indexFirstDisplayDays - 2);
            } else {
              expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - indexFirstDisplayDays - 1);
            }
            expect(container.getElementsByClassName("calendar-day active_last").length).toBe(1);
          }
        }
      } else {
        expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
        if (activeDates && activeDates.length) {
          const indexFirstMonthDays = activeDates.findIndex((activeDay: number) => compareDateDays(activeDay, month2FirstDay.valueOf()));
          expect(container.getElementsByClassName("calendar-day active_last").length).toBe(1);
          expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - indexFirstMonthDays - 1);
        }
      }
    }
  }
});

test("Calendar component with only today active date", () => {
  const selectedDate1 = DateTime.now().plus({ days: -1 });
  const selectedDate2 = DateTime.now().plus({ days: 1 });
  const activeDate = getDatesBetween2Dates(selectedDate1.valueOf(), selectedDate2.valueOf())[0];
  const { container, getByTestId } = render(
    <Calendar
      data-testid="calendar-today-all-active"
      selectedDates={[selectedDate1.valueOf(), selectedDate2.valueOf()]}
      activeDates={getDatesBetween2Dates(selectedDate1.valueOf(), selectedDate2.valueOf())}
    />
  );

  const nextMonthBtn = getByTestId("calendar-today-all-active-btn_next");
  const prevMonthBtn = getByTestId("calendar-today-all-active-btn_prev");

  if (selectedDate1.month !== DateTime.now().month) {
    if (selectedDate1.month > DateTime.now().month) if (nextMonthBtn) fireEvent.click(nextMonthBtn);
    if (selectedDate1.month < DateTime.now().month) if (prevMonthBtn) fireEvent.click(prevMonthBtn);
  }

  if (selectedDate1.month === selectedDate2.month) {
    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
    expect(container.getElementsByClassName("calendar-day_today active_all").length).toBe(1);
  } else if (selectedDate2.month !== selectedDate1.month) {
    const month1LastDay = getLastDayOfMonth(selectedDate1.toJSDate()).getDate();
    const month1DisplayedDays = getDisplayedDaysPrevMonth(selectedDate2.toJSDate());
    const month2FirstDay = getFirstDayOfMonth(selectedDate2.toJSDate()).getDate();
    const month2DisplayedDays = getDisplayedDaysNextMonth(selectedDate1.toJSDate());

    if (month1LastDay === selectedDate1.day) {
      if (month2DisplayedDays && month2DisplayedDays.length) {
        if (
          findDateInArray(
            selectedDate2.valueOf(),
            month2DisplayedDays.map((month2Day: Date) => month2Day.valueOf())
          )
        ) {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
          expect(container.getElementsByClassName("calendar-day_today active_all").length).toBe(1);
        } else {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
          if (
            activeDate &&
            findDateInArray(
              activeDate.valueOf(),
              month2DisplayedDays.map((month2Day: Date) => month2Day.valueOf())
            )
          ) {
            expect(container.getElementsByClassName("calendar-day_today active_all").length).toBe(1);
          }
        }
      } else {
        expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
      }
    } else {
      if (month2DisplayedDays && month2DisplayedDays.length) {
        if (
          findDateInArray(
            selectedDate2.valueOf(),
            month2DisplayedDays.map((month2Day: Date) => month2Day.valueOf())
          )
        ) {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
          expect(container.getElementsByClassName("calendar-day_today active_all").length).toBe(1);
        } else {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
          if (
            activeDate &&
            (activeDate <= month1LastDay ||
              findDateInArray(
                activeDate.valueOf(),
                month2DisplayedDays.map((month2Day: Date) => month2Day.valueOf())
              ))
          ) {
            expect(container.getElementsByClassName("calendar-day_today active_all").length).toBe(1);
          }
        }
      } else {
        expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
        if (activeDate && activeDate <= month1LastDay) {
          expect(container.getElementsByClassName("calendar-day_today active_all").length).toBe(1);
        }
      }
    }

    if (nextMonthBtn) fireEvent.click(nextMonthBtn);

    if (month2FirstDay === selectedDate2.day) {
      if (month1DisplayedDays && month1DisplayedDays.length) {
        if (
          findDateInArray(
            selectedDate1.valueOf(),
            month1DisplayedDays.map((month1Day: Date) => month1Day.valueOf())
          )
        ) {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
          expect(container.getElementsByClassName("calendar-day_today active_all").length).toBe(1);
        } else {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
          if (
            activeDate &&
            findDateInArray(
              activeDate.valueOf(),
              month1DisplayedDays.map((month1Day: Date) => month1Day.valueOf())
            )
          ) {
            expect(container.getElementsByClassName("calendar-day_today active_all").length).toBe(1);
          }
        }
      } else {
        expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
      }
    } else {
      if (month1DisplayedDays && month1DisplayedDays.length) {
        if (
          findDateInArray(
            selectedDate1.valueOf(),
            month1DisplayedDays.map((month1Day: Date) => month1Day.valueOf())
          )
        ) {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
          expect(container.getElementsByClassName("calendar-day_today active_all").length).toBe(1);
        } else {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
          if (
            activeDate &&
            (activeDate >= month2FirstDay ||
              findDateInArray(
                activeDate.valueOf(),
                month1DisplayedDays.map((month1Day: Date) => month1Day.valueOf())
              ))
          ) {
            expect(container.getElementsByClassName("calendar-day_today active_all").length).toBe(1);
          }
        }
      } else {
        expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
        if (activeDate && activeDate >= month2FirstDay) {
          expect(container.getElementsByClassName("calendar-day_today active_all").length).toBe(1);
        }
      }
    }
  }
});

test("Calendar component with today last active date", () => {
  const selectedDate1 = DateTime.now().plus({ days: -10 });
  const selectedDate2 = DateTime.now().plus({ days: 1 });
  const activeDates = getDatesBetween2Dates(selectedDate1.valueOf(), selectedDate2.valueOf());
  const { container, getByTestId } = render(<Calendar data-testid="calendar-today-last-active" selectedDates={[selectedDate1.valueOf(), selectedDate2.valueOf()]} activeDates={activeDates} />);

  const nextMonthBtn = getByTestId("calendar-today-last-active-btn_next");
  const prevMonthBtn = getByTestId("calendar-today-last-active-btn_prev");

  if (selectedDate1.month !== DateTime.now().month && selectedDate1.year === DateTime.now().year) {
    if (selectedDate1.month > DateTime.now().month) {
      if (nextMonthBtn) fireEvent.click(nextMonthBtn);
    }
    if (selectedDate1.month < DateTime.now().month) {
      if (prevMonthBtn) fireEvent.click(prevMonthBtn);
    }
  } else if (selectedDate1.year !== DateTime.now().year) {
    if (selectedDate1.year > DateTime.now().year) {
      if (nextMonthBtn) fireEvent.click(nextMonthBtn);
    }
    if (selectedDate1.year < DateTime.now().year) {
      if (prevMonthBtn) fireEvent.click(prevMonthBtn);
    }
  }

  if (selectedDate1.month === selectedDate2.month) {
    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
    if (activeDates) {
      expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - 2);
      expect(container.getElementsByClassName("calendar-day active_first").length).toBe(1);
      expect(container.getElementsByClassName("calendar-day_today active_last").length).toBe(1);
    }
  } else if (selectedDate2.month !== selectedDate1.month) {
    const month1LastDay = getLastDayOfMonth(selectedDate1.toJSDate()).getDate();
    const month1DisplayedDays = getDisplayedDaysPrevMonth(selectedDate2.toJSDate());
    const month2FirstDay = getFirstDayOfMonth(selectedDate2.toJSDate()).getDate();
    const month2DisplayedDays = getDisplayedDaysNextMonth(selectedDate1.toJSDate());

    if (month1LastDay === selectedDate1.day) {
      if (month2DisplayedDays && month2DisplayedDays.length) {
        if (
          findDateInArray(
            selectedDate2.valueOf(),
            month2DisplayedDays.map((month2Day: Date) => month2Day.valueOf())
          )
        ) {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
          if (activeDates && activeDates.length) {
            expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - 2);
            expect(container.getElementsByClassName("calendar-day active_first").length).toBe(1);
            expect(container.getElementsByClassName("calendar-day_today active_last").length).toBe(2);
          }
        } else {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
          if (activeDates && activeDates.length) {
            const indexLastDisplayDays = activeDates.findIndex((activeDay: number) => compareDateDays(activeDay, month2DisplayedDays[month2DisplayedDays.length - 1].valueOf()));
            expect(container.getElementsByClassName("calendar-day active_first").length).toBe(1);
            expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - (activeDates.length - 1 - indexLastDisplayDays) - 1);
          }
        }
      } else {
        expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
      }
    } else {
      if (
        findDateInArray(
          selectedDate2.valueOf(),
          month2DisplayedDays.map((month2Day: Date) => month2Day.valueOf())
        )
      ) {
        expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
        if (activeDates && activeDates.length) {
          expect(container.getElementsByClassName("calendar-day active_first").length).toBe(1);
          expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - 2);
          expect(container.getElementsByClassName("calendar-day_today active_last").length).toBe(1);
        }
      } else {
        expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
        if (month2DisplayedDays && month2DisplayedDays.length) {
          if (activeDates && activeDates.length) {
            const indexLastDisplayDays = activeDates.findIndex((activeDay: number) => compareDateDays(activeDay, month2DisplayedDays[month2DisplayedDays.length - 1].valueOf()));
            expect(container.getElementsByClassName("calendar-day active_first").length).toBe(1);
            expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - (activeDates.length - 1 - indexLastDisplayDays) - 1);
          }
        } else {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
          if (activeDates && activeDates.length) {
            const indexLastMonthDays = activeDates.findIndex((activeDay: number) => compareDateDays(activeDay, month1LastDay.valueOf()));
            expect(container.getElementsByClassName("calendar-day active_first").length).toBe(1);
            expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - (activeDates.length - 1 - indexLastMonthDays) - 1);
          }
        }
      }
    }

    if (nextMonthBtn) fireEvent.click(nextMonthBtn);

    if (month2FirstDay === selectedDate2.day) {
      if (month1DisplayedDays && month1DisplayedDays.length) {
        if (
          findDateInArray(
            selectedDate1.valueOf(),
            month1DisplayedDays.map((month1Day: Date) => month1Day.valueOf())
          )
        ) {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
          if (activeDates && activeDates.length) {
            expect(container.getElementsByClassName("calendar-day active_first").length).toBe(1);
            expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - 2);
            expect(container.getElementsByClassName("calendar-day_today active_last").length).toBe(1);
          }
        } else {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
          if (activeDates && activeDates.length) {
            const indexFirstDisplayDays = activeDates.findIndex((activeDay: number) => compareDateDays(activeDay, month1DisplayedDays[0].valueOf()));
            expect(container.getElementsByClassName("calendar-day_today active_last").length).toBe(1);
            expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - indexFirstDisplayDays - 1);
          }
        }
      } else {
        expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
      }
    } else {
      if (month1DisplayedDays && month1DisplayedDays.length) {
        if (
          findDateInArray(
            selectedDate1.valueOf(),
            month1DisplayedDays.map((month1Day: Date) => month1Day.valueOf())
          )
        ) {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
          if (activeDates && activeDates.length) {
            expect(container.getElementsByClassName("calendar-day active_first").length).toBe(1);
            expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - 2);
            expect(container.getElementsByClassName("calendar-day_today active_last").length).toBe(1);
          }
        } else {
          expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
          if (activeDates && activeDates.length) {
            const indexFirstDisplayDays = activeDates.findIndex((activeDay: number) => compareDateDays(activeDay, month1DisplayedDays[0].valueOf()));
            expect(container.getElementsByClassName("calendar-day_today active_last").length).toBe(1);
            if (indexFirstDisplayDays === 0) {
              expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - indexFirstDisplayDays - 2);
            } else {
              expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - indexFirstDisplayDays - 1);
            }
          }
        }
      } else {
        expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
        if (activeDates && activeDates.length) {
          const indexFirstMonthDays = activeDates.findIndex((activeDay: number) => compareDateDays(activeDay, month2FirstDay.valueOf()));
          expect(container.getElementsByClassName("calendar-day_today active_last").length).toBe(1);
          expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - indexFirstMonthDays - 1);
        }
      }
    }
  }
});

test("Calendar component with min date and max date", () => {
  const minDate = DateTime.now();
  const maxDate = DateTime.now().plus({ days: 1 });
  const { container } = render(<Calendar minDate={minDate.valueOf()} maxDate={maxDate.valueOf()} />);

  const elements = container.getElementsByClassName("calendar-day");

  if (elements) {
    for (let index = 0; index < elements.length; index++) {
      const item = elements.item(index);
      if (item !== null) {
        const element = item as HTMLButtonElement;
        const testId = element.getAttribute("data-testid");
        if (testId !== `day-${minDate.month}-${minDate.day}` && testId !== `day-${maxDate.month}-${maxDate.day}`) expect(element).toBeDisabled();
      }
    }
  }
});

test("Calendar component in next and previous month", () => {
  const { getByTestId } = render(<Calendar locale="en-US" data-testid="calendar-test" minDate={DateTime.now().plus({ month: -1 }).valueOf()} maxDate={DateTime.now().plus({ month: 1 }).valueOf()} />);

  const today = DateTime.now();
  const actualMonth = today.setLocale("en-US");
  const nextMonth = today.plus({ months: 1 }).setLocale("en-US");
  const prevMonth = today.plus({ months: -1 }).setLocale("en-US");

  const prevBtn = getByTestId("calendar-test-btn_prev");
  const nextBtn = getByTestId("calendar-test-btn_next");

  const navLabel = getByTestId("calendar-test-nav-label");

  const actualMonthLong = actualMonth.monthLong;
  const nextMonthLong = nextMonth.monthLong;
  const prevMonthLong = prevMonth.monthLong;
  expect(navLabel.textContent).toBe(`${actualMonthLong.charAt(0).toUpperCase() + actualMonthLong.slice(1)} ${actualMonth.year}`);

  if (nextBtn) fireEvent.click(nextBtn);

  expect(navLabel.textContent).toBe(`${nextMonthLong.charAt(0).toUpperCase() + nextMonthLong.slice(1)} ${nextMonth.year}`);

  if (prevBtn) fireEvent.click(prevBtn);

  expect(navLabel.textContent).toBe(`${actualMonthLong.charAt(0).toUpperCase() + actualMonthLong.slice(1)} ${actualMonth.year}`);

  if (prevBtn) fireEvent.click(prevBtn);

  expect(navLabel.textContent).toBe(`${prevMonthLong.charAt(0).toUpperCase() + prevMonthLong.slice(1)} ${prevMonth.year}`);
});

test("Calendar component boundaries", () => {
  const { container } = render(<Calendar minDate={new Date("2010-01-01").valueOf()} maxDate={Date.now().valueOf()} defaultDate={DateTime.now().set({ year: 2000 }).valueOf()} />);

  expect(container.getElementsByClassName("calendar").length).toBe(1);
});

describe("when window is undefined", () => {
  beforeEach(() => {
    // @ts-expect-error string on window
    global.window = undefined;
  });
  test("Calendar component should not throw error", () => {
    const { container } = render(<Calendar defaultDate={DateTime.now().set({ year: 2000 }).valueOf()} />);
    expect(container.getElementsByClassName("calendar").length).toBe(1);
  });
});

describe("CalendarYears", () => {
  test("should render", () => {
    const onSelectYear = jest.fn();
    const { container, getByTestId } = render(<CalendarYears year={2021} onSelectYear={onSelectYear} />);
    expect(container.getElementsByClassName("calendar-years").length).toBe(1);
    const button = getByTestId("calendar-year-2021-btn");
    fireEvent.click(button);
    expect(onSelectYear).toBeCalled();
  });
});
