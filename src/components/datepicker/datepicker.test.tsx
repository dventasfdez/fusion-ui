import React from "react";
import { render, fireEvent, prettyDOM } from "@testing-library/react";
import "@testing-library/jest-dom";
import DatePicker, { DatePickerMode, IDatePickerProps } from "./datepicker";
import { DateTime } from "luxon";
import { getDatesBetween2Dates } from "../../helpers/calendar/calendarHelper";

const datePickerExample = (props: IDatePickerProps) => <DatePicker {...props} />;
const DatePickerError = (props: IDatePickerProps) => {
  const [error, setError] = React.useState(false);
  return <DatePicker {...props} error={error} onChange={() => setError(true)} />;
};

/**
 * SIMPLE
 */
describe("Tests of simple datepicker", () => {
  it("render simple datepicker without data-testid", () => {
    const { container } = render(
      datePickerExample({
        label: "Label",
        required: true,
        name: "datepicker-simple",
        mode: DatePickerMode.SINGLE,
        defaultValue: DateTime.now().valueOf(),
        className: "test",
      })
    );

    expect(container.getElementsByClassName("input-wrapper").length).toBe(1);
  });

  it("render simple datepicker with error", () => {
    const { container } = render(
      datePickerExample({
        name: "datepicker-simple",
        "data-testid": "datepicker",
        mode: DatePickerMode.SINGLE,
        error: true,
        defaultValue: DateTime.now().plus({ days: -1 }).valueOf(),
      })
    );

    expect(container.getElementsByClassName("input-wrapper error").length).toBe(1);
  });

  it("render simple datepicker disabled", () => {
    const { container } = render(
      datePickerExample({
        name: "datepicker-simple",
        "data-testid": "datepicker",
        mode: DatePickerMode.SINGLE,
        disabled: true,
        defaultValue: DateTime.now().plus({ days: -1 }).valueOf(),
      })
    );

    expect(container.getElementsByClassName("input-wrapper_disabled").length).toBe(1);
  });

  it("Select option today with simple datepicker", () => {
    const { container, getByTestId } = render(datePickerExample({ name: "datepicker-simple", "data-testid": "datepicker", mode: DatePickerMode.SINGLE }));

    const dropdownBtn = getByTestId("datepicker");
    const input = getByTestId("datepicker-input-simple");

    if (dropdownBtn) fireEvent.click(dropdownBtn);

    const day1Selected = DateTime.now();
    const day1Btn = getByTestId(`day-${day1Selected.month}-${day1Selected.day}`);
    if (day1Btn) fireEvent.click(day1Btn);
    if (input) expect(input.getAttribute("value")).toBe(day1Selected.toFormat("yyyy/MM/dd"));
    if (dropdownBtn) fireEvent.click(dropdownBtn);
    expect(container.getElementsByClassName("calendar-day_today_selected").length).toBe(1);
  });

  it("Select option and change with simple datepicker", () => {
    const { container, getByTestId } = render(datePickerExample({ name: "datepicker-simple", "data-testid": "datepicker", mode: DatePickerMode.SINGLE }));

    const dropdownBtn = getByTestId("datepicker");
    const input = getByTestId("datepicker-input-simple");

    if (dropdownBtn) fireEvent.click(dropdownBtn);

    const nextMonthBtn = getByTestId("datepicker-calendar-btn_next");
    if (nextMonthBtn) fireEvent.click(nextMonthBtn);

    const nextMonth = DateTime.now().plus({ months: 1 });
    const day1Selected = DateTime.fromFormat(`${nextMonth.year}/${nextMonth.month}/01`, "yyyy/M/dd");
    const day1Btn = getByTestId(`day-${day1Selected.month}-${day1Selected.day}`);
    if (day1Btn) fireEvent.click(day1Btn);
    if (input) expect(input.getAttribute("value")).toBe(day1Selected.toFormat("yyyy/MM/dd"));

    const dropdownBtn2 = getByTestId("datepicker");

    if (dropdownBtn2) fireEvent.click(dropdownBtn2);

    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);

    const day2Selected = day1Selected.plus({ days: 10 });
    const day2Btn = getByTestId(`day-${day2Selected.month}-${day2Selected.day}`);
    if (day2Btn) fireEvent.click(day2Btn);

    const dropdownBtn3 = getByTestId("datepicker");

    if (dropdownBtn3) fireEvent.click(dropdownBtn3);

    if (input) expect(input.getAttribute("value")).toBe(day2Selected.toFormat("yyyy/MM/dd"));
    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
  });

  it("Write date today in input simple datepicker", () => {
    const { container, getByTestId } = render(datePickerExample({ name: "datepicker-simple", "data-testid": "datepicker", mode: DatePickerMode.SINGLE }));

    const input = getByTestId("datepicker-input-simple");
    if (input) fireEvent.change(input, { target: { value: DateTime.now().toFormat("yyyy/MM/dd") } });
    const dropdownBtn = getByTestId("datepicker");

    if (dropdownBtn) fireEvent.click(dropdownBtn);
    expect(container.getElementsByClassName("calendar-day_today_selected").length).toBe(1);
  });

  it("Write date today in input simple datepicker and call onChange", () => {
    const onChange = jest.fn();
    const { getByTestId } = render(datePickerExample({ name: "datepicker-simple", "data-testid": "datepicker", mode: DatePickerMode.SINGLE, onChange }));

    const input = getByTestId("datepicker-input-simple");
    if (input) fireEvent.change(input, { target: { value: DateTime.now().toFormat("yyyy/MM/dd") } });
    expect(onChange).toBeCalled();
  });

  it("Write date in input simple datepicker", () => {
    const { container, getByTestId } = render(datePickerExample({ name: "datepicker-simple", "data-testid": "datepicker", mode: DatePickerMode.SINGLE }));

    const input = getByTestId("datepicker-input-simple");
    if (input) fireEvent.change(input, { target: { value: DateTime.now().plus({ months: 1 }).toFormat("yyyy/MM/dd") } });
    const dropdownBtn = getByTestId("datepicker");

    if (dropdownBtn) fireEvent.click(dropdownBtn);

    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
  });

  it("Write date with error in input simple datepicker", () => {
    const { container, getByTestId } = render(
      datePickerExample({
        name: "datepicker-simple",
        "data-testid": "datepicker",
        mode: DatePickerMode.SINGLE,
      })
    );

    const input = getByTestId("datepicker-input-simple");
    if (input) fireEvent.change(input, { target: { value: DateTime.now().plus({ months: 1 }).toFormat("dd/MM/yyyy") } });
    const dropdownBtn = getByTestId("datepicker");

    if (dropdownBtn) fireEvent.click(dropdownBtn);
    prettyDOM(container);

    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(0);
    expect(container.querySelectorAll(".input-wrapper.error").length).toBe(1);
  });
});

/**
 * MULTIPLE
 */
describe("Tests of multiple datepicker", () => {
  it("render multiple datepicker without data-testid", () => {
    const { container } = render(
      datePickerExample({
        label: "label",
        required: true,
        name: "datepicker-multiple",
        mode: DatePickerMode.MULTIPLE,
        defaultValue: [DateTime.now().valueOf()],
        className: "test",
      })
    );

    expect(container.getElementsByClassName("input-wrapper").length).toBe(1);
  });

  it("render multiple datepicker with error", () => {
    const { container } = render(
      datePickerExample({
        name: "datepicker-multiple",
        "data-testid": "datepicker",
        mode: DatePickerMode.MULTIPLE,
        error: true,
        defaultValue: [DateTime.now().plus({ days: -1 }).valueOf()],
      })
    );

    expect(container.getElementsByClassName("input-wrapper error").length).toBe(1);
  });

  it("render multiple datepicker disabled", () => {
    const { container } = render(
      datePickerExample({
        name: "datepicker-multiple",
        "data-testid": "datepicker",
        mode: DatePickerMode.MULTIPLE,
        disabled: true,
        defaultValue: [DateTime.now().plus({ days: -1 }).valueOf()],
      })
    );

    expect(container.getElementsByClassName("input-wrapper_disabled").length).toBe(1);
  });

  it("Select 2 options multiple datepicker", () => {
    const { container, getByTestId } = render(datePickerExample({ name: "datepicker-simple", "data-testid": "datepicker", mode: DatePickerMode.MULTIPLE }));

    const dropdownBtn = getByTestId("datepicker");
    const input = getByTestId("datepicker-input-multiple");

    if (dropdownBtn) fireEvent.click(dropdownBtn);

    const nextMonthBtn = getByTestId("datepicker-calendar-btn_next");
    if (nextMonthBtn) fireEvent.click(nextMonthBtn);

    const nextMonth = DateTime.now().plus({ months: 1 });
    const day1Selected = DateTime.fromFormat(`${nextMonth.year}/${nextMonth.month}/01`, "yyyy/M/dd");

    const day1Btn = getByTestId(`day-${day1Selected.month}-${day1Selected.day}`);
    if (day1Btn) fireEvent.click(day1Btn);
    if (input) expect(input.getAttribute("value")).toBe(day1Selected.toFormat("yyyy/MM/dd"));
    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);

    const day2Selected = day1Selected.plus({ days: 10 });
    const day2Btn = getByTestId(`day-${day2Selected.month}-${day2Selected.day}`);
    if (day2Btn) fireEvent.click(day2Btn);
    if (input) expect(input.getAttribute("value")).toBe(`${day1Selected.toFormat("yyyy/MM/dd")}, ${day2Selected.toFormat("yyyy/MM/dd")}`);
    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
  });

  it("Select 2 options and diselect multiple datepicker", () => {
    const { container, getByTestId } = render(datePickerExample({ name: "datepicker-simple", "data-testid": "datepicker", mode: DatePickerMode.MULTIPLE }));

    const dropdownBtn = getByTestId("datepicker");
    const input = getByTestId("datepicker-input-multiple");

    if (dropdownBtn) fireEvent.click(dropdownBtn);

    const nextMonthBtn = getByTestId("datepicker-calendar-btn_next");
    if (nextMonthBtn) fireEvent.click(nextMonthBtn);

    const nextMonth = DateTime.now().plus({ months: 1 });
    const day1Selected = DateTime.fromFormat(`${nextMonth.year}/${nextMonth.month}/01`, "yyyy/M/dd");

    const day1Btn = getByTestId(`day-${day1Selected.month}-${day1Selected.day}`);
    if (day1Btn) fireEvent.click(day1Btn);
    if (input) expect(input.getAttribute("value")).toBe(day1Selected.toFormat("yyyy/MM/dd"));
    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);

    const day2Selected = day1Selected.plus({ days: 10 });
    const day2Btn = getByTestId(`day-${day2Selected.month}-${day2Selected.day}`);
    if (day2Btn) fireEvent.click(day2Btn);
    if (input) expect(input.getAttribute("value")).toBe(`${day1Selected.toFormat("yyyy/MM/dd")}, ${day2Selected.toFormat("yyyy/MM/dd")}`);
    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);

    if (day1Btn) fireEvent.click(day1Btn);
    if (input) expect(input.getAttribute("value")).toBe(day2Selected.toFormat("yyyy/MM/dd"));
    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
  });

  it("Write date today in input multiple datepicker", () => {
    const { container, getByTestId } = render(datePickerExample({ name: "datepicker-multiple", "data-testid": "datepicker", mode: DatePickerMode.MULTIPLE }));

    const input = getByTestId("datepicker-input-multiple");
    if (input) fireEvent.change(input, { target: { value: DateTime.now().toFormat("yyyy/MM/dd") } });
    const dropdownBtn = getByTestId("datepicker");

    if (dropdownBtn) fireEvent.click(dropdownBtn);
    expect(container.getElementsByClassName("calendar-day_today_selected").length).toBe(1);
  });

  it("Write two dates in input multiple datepicker", () => {
    const { container, getByTestId } = render(datePickerExample({ name: "datepicker-multiple", "data-testid": "datepicker", mode: DatePickerMode.MULTIPLE }));

    const input = getByTestId("datepicker-input-multiple");
    if (input) {
      fireEvent.change(input, {
        target: {
          value: `${DateTime.now().plus({ months: 1 }).toFormat("yyyy/MM/dd")}`,
        },
      });

      fireEvent.change(input, {
        target: {
          value: `${DateTime.now().plus({ months: 1 }).toFormat("yyyy/MM/dd")}, ${DateTime.now().plus({ days: 1, months: 1 }).toFormat("yyyy/MM/dd")}`,
        },
      });
    }
    const dropdownBtn = getByTestId("datepicker");

    if (dropdownBtn) fireEvent.click(dropdownBtn);

    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
  });

  it("Write two dates with error in input multiple datepicker", () => {
    const { container, getByTestId } = render(datePickerExample({ name: "datepicker-multiple", "data-testid": "datepicker", mode: DatePickerMode.MULTIPLE }));

    const input = getByTestId("datepicker-input-multiple");
    if (input)
      fireEvent.change(input, {
        target: {
          value: `${DateTime.now().plus({ months: 1 }).toFormat("yyyy/MM/dd")}, ${DateTime.now().plus({ days: 1, months: 1 }).toFormat("dd/MM/yyyy")}`,
        },
      });
    const dropdownBtn = getByTestId("datepicker");

    if (dropdownBtn) fireEvent.click(dropdownBtn);

    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
    expect(container.getElementsByClassName("input-wrapper error").length).toBe(1);
  });

  it("Write two dates with error in input multiple datepicker and clean dates in input", () => {
    const { container, getByTestId } = render(datePickerExample({ name: "datepicker-multiple", "data-testid": "datepicker", mode: DatePickerMode.MULTIPLE }));

    const input = getByTestId("datepicker-input-multiple");
    if (input)
      fireEvent.change(input, {
        target: {
          value: `${DateTime.now().plus({ months: 1 }).toFormat("yyyy/MM/dd")}, ${DateTime.now().plus({ days: 1, months: 1 }).toFormat("dd/MM/yyyy")}`,
        },
      });
    const dropdownBtn = getByTestId("datepicker");

    if (dropdownBtn) fireEvent.click(dropdownBtn);

    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
    expect(container.getElementsByClassName("input-wrapper error").length).toBe(1);

    if (input)
      fireEvent.change(input, {
        target: {
          value: "",
        },
      });
    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(0);
    expect(container.getElementsByClassName("input-wrapper error").length).toBe(0);
  });
});

/**
 * RANGE
 */
describe("Tests of range datepicker", () => {
  it("render range datepicker without data-testid", () => {
    const { container } = render(
      datePickerExample({
        name: "datepicker-multiple",
        mode: DatePickerMode.RANGE,
        defaultValue: [DateTime.now().valueOf(), DateTime.now().plus({ days: 2 }).valueOf()],
        className: "test",
      })
    );

    expect(container.getElementsByClassName("input-wrapper").length).toBe(2);
  });
  it("render range datepicker with values", () => {
    const { getByTestId } = render(
      datePickerExample({
        labelStart: "label start",
        labelEnd: "label end",
        requiredStart: true,
        requiredEnd: true,
        name: "datepicker-range",
        "data-testid": "datepicker",
        mode: DatePickerMode.RANGE,
        defaultValue: [DateTime.now().valueOf(), DateTime.now().plus({ days: 2 }).valueOf()],
      })
    );
    const inputStart = getByTestId("datepicker-input-range-start");
    const inputEnd = getByTestId("datepicker-input-range-end");
    expect(inputStart).toHaveAttribute("value", DateTime.now().toFormat("yyyy/MM/dd"));
    expect(inputEnd).toHaveAttribute("value", DateTime.now().plus({ days: 2 }).toFormat("yyyy/MM/dd"));

    fireEvent.click(inputStart);
    fireEvent.click(inputEnd);
  });

  it("render range datepicker with error", () => {
    const { container } = render(
      datePickerExample({
        name: "datepicker-simple",
        "data-testid": "datepicker",
        mode: DatePickerMode.RANGE,
        errorStart: true,
        errorEnd: true,
        defaultValue: [DateTime.now().plus({ days: -1 }).valueOf(), DateTime.now().plus({ days: -1 }).valueOf()],
      })
    );

    expect(container.getElementsByClassName("input-wrapper error").length).toBe(2);
  });

  it("render multiple datepicker disabled", () => {
    const { container } = render(
      datePickerExample({
        name: "datepicker-simple",
        "data-testid": "datepicker",
        mode: DatePickerMode.RANGE,
        disabledStart: true,
        disabledEnd: true,
        defaultValue: [DateTime.now().plus({ days: -1 }).valueOf(), DateTime.now().plus({ days: 1 }).valueOf()],
      })
    );

    expect(container.getElementsByClassName("input-wrapper_disabled").length).toBe(2);
  });

  it("Select options in range datepicker", () => {
    const { container, getByTestId } = render(datePickerExample({ name: "datepicker-simple", "data-testid": "datepicker", mode: DatePickerMode.RANGE }));

    const dropdownBtn = getByTestId("datepicker");

    if (dropdownBtn) fireEvent.click(dropdownBtn);

    const nextMonthBtn = getByTestId("datepicker-calendar-btn_next");
    if (nextMonthBtn) fireEvent.click(nextMonthBtn);

    const nextMonth = DateTime.now().plus({ months: 1 });
    const day1Selected = DateTime.fromFormat(`${nextMonth.year}/${nextMonth.month}/01`, "yyyy/M/dd");

    const day1Btn = getByTestId(`day-${day1Selected.month}-${day1Selected.day}`);
    if (day1Btn) fireEvent.click(day1Btn);
    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);

    const day2Selected = day1Selected.plus({ days: 10 });
    const day2Btn = getByTestId(`day-${day2Selected.month}-${day2Selected.day}`);
    if (day2Btn) fireEvent.click(day2Btn);
    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
    const activeDates = getDatesBetween2Dates(day1Selected.valueOf(), day2Selected.valueOf());
    if (activeDates) expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - 2);
    expect(container.getElementsByClassName("calendar-day active_first").length).toBe(1);
    expect(container.getElementsByClassName("calendar-day active_last").length).toBe(1);
  });

  it("Select options and unselect start date in range datepicker", () => {
    const { container, getByTestId } = render(datePickerExample({ name: "datepicker-simple", "data-testid": "datepicker", mode: DatePickerMode.RANGE }));

    const dropdownBtn = getByTestId("datepicker");

    if (dropdownBtn) fireEvent.click(dropdownBtn);

    const nextMonthBtn = getByTestId("datepicker-calendar-btn_next");
    if (nextMonthBtn) fireEvent.click(nextMonthBtn);

    const nextMonth = DateTime.now().plus({ months: 1 });
    const day1Selected = DateTime.fromFormat(`${nextMonth.year}/${nextMonth.month}/01`, "yyyy/M/dd");

    const day1Btn = getByTestId(`day-${day1Selected.month}-${day1Selected.day}`);
    if (day1Btn) fireEvent.click(day1Btn);
    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);

    const day2Selected = day1Selected.plus({ days: 10 });
    const day2Btn = getByTestId(`day-${day2Selected.month}-${day2Selected.day}`);
    if (day2Btn) fireEvent.click(day2Btn);
    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
    const activeDates = getDatesBetween2Dates(day1Selected.valueOf(), day2Selected.valueOf());
    if (activeDates) expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - 2);
    expect(container.getElementsByClassName("calendar-day active_first").length).toBe(1);
    expect(container.getElementsByClassName("calendar-day active_last").length).toBe(1);

    if (day1Btn) fireEvent.click(day1Btn);
    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
    expect(container.getElementsByClassName("calendar-day active_first").length).toBe(0);
    expect(container.getElementsByClassName("calendar-day active_last").length).toBe(0);
  });

  it("Select options and unselect end date in range datepicker", () => {
    const { container, getByTestId } = render(datePickerExample({ name: "datepicker-simple", "data-testid": "datepicker", mode: DatePickerMode.RANGE }));

    const dropdownBtn = getByTestId("datepicker");

    if (dropdownBtn) fireEvent.click(dropdownBtn);

    const nextMonthBtn = getByTestId("datepicker-calendar-btn_next");
    if (nextMonthBtn) fireEvent.click(nextMonthBtn);

    const nextMonth = DateTime.now().plus({ months: 1 });
    const day1Selected = DateTime.fromFormat(`${nextMonth.year}/${nextMonth.month}/01`, "yyyy/M/dd");

    const day1Btn = getByTestId(`day-${day1Selected.month}-${day1Selected.day}`);
    if (day1Btn) fireEvent.click(day1Btn);
    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);

    const day2Selected = day1Selected.plus({ days: 10 });
    const day2Btn = getByTestId(`day-${day2Selected.month}-${day2Selected.day}`);
    if (day2Btn) fireEvent.click(day2Btn);
    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
    const activeDates = getDatesBetween2Dates(day1Selected.valueOf(), day2Selected.valueOf());
    if (activeDates) expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - 2);
    expect(container.getElementsByClassName("calendar-day active_first").length).toBe(1);
    expect(container.getElementsByClassName("calendar-day active_last").length).toBe(1);

    if (day2Btn) fireEvent.click(day2Btn);
    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
    expect(container.getElementsByClassName("calendar-day active_first").length).toBe(0);
    expect(container.getElementsByClassName("calendar-day active_last").length).toBe(0);
  });

  it("Select options and select another date in range datepicker", () => {
    const { container, getByTestId } = render(datePickerExample({ name: "datepicker-simple", "data-testid": "datepicker", mode: DatePickerMode.RANGE }));

    const dropdownBtn = getByTestId("datepicker");

    if (dropdownBtn) fireEvent.click(dropdownBtn);

    const nextMonthBtn = getByTestId("datepicker-calendar-btn_next");
    if (nextMonthBtn) fireEvent.click(nextMonthBtn);

    const nextMonth = DateTime.now().plus({ months: 1 });
    const day1Selected = DateTime.fromFormat(`${nextMonth.year}/${nextMonth.month}/01`, "yyyy/M/dd");

    const day1Btn = getByTestId(`day-${day1Selected.month}-${day1Selected.day}`);
    if (day1Btn) fireEvent.click(day1Btn);
    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);

    const day2Selected = day1Selected.plus({ days: 10 });
    const day2Btn = getByTestId(`day-${day2Selected.month}-${day2Selected.day}`);
    if (day2Btn) fireEvent.click(day2Btn);
    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
    const activeDates = getDatesBetween2Dates(day1Selected.valueOf(), day2Selected.valueOf());
    if (activeDates) expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - 2);
    expect(container.getElementsByClassName("calendar-day active_first").length).toBe(1);
    expect(container.getElementsByClassName("calendar-day active_last").length).toBe(1);

    const day3Selected = day1Selected.plus({ days: 5 });
    const day3Btn = getByTestId(`day-${day3Selected.month}-${day3Selected.day}`);
    if (day3Btn) fireEvent.click(day3Btn);
    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
    expect(container.getElementsByClassName("calendar-day active_first").length).toBe(0);
    expect(container.getElementsByClassName("calendar-day active_last").length).toBe(0);
  });

  it("Select start date and unselect date in range datepicker", () => {
    const { container, getByTestId } = render(datePickerExample({ name: "datepicker-simple", "data-testid": "datepicker", mode: DatePickerMode.RANGE }));

    const dropdownBtn = getByTestId("datepicker");

    if (dropdownBtn) fireEvent.click(dropdownBtn);

    const nextMonthBtn = getByTestId("datepicker-calendar-btn_next");
    if (nextMonthBtn) fireEvent.click(nextMonthBtn);

    const nextMonth = DateTime.now().plus({ months: 1 });
    const day1Selected = DateTime.fromFormat(`${nextMonth.year}/${nextMonth.month}/01`, "yyyy/M/dd");

    const day1Btn = getByTestId(`day-${day1Selected.month}-${day1Selected.day}`);
    if (day1Btn) fireEvent.click(day1Btn);
    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);

    if (day1Btn) fireEvent.click(day1Btn);
    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(0);
  });

  it("Select options first end dates in range datepicker", () => {
    const { container, getByTestId } = render(datePickerExample({ name: "datepicker-simple", "data-testid": "datepicker", mode: DatePickerMode.RANGE }));

    const dropdownBtn = getByTestId("datepicker");

    if (dropdownBtn) fireEvent.click(dropdownBtn);

    const nextMonthBtn = getByTestId("datepicker-calendar-btn_next");
    if (nextMonthBtn) fireEvent.click(nextMonthBtn);

    const nextMonth = DateTime.now().plus({ months: 1 });
    const day1Selected = DateTime.fromFormat(`${nextMonth.year}/${nextMonth.month}/15`, "yyyy/M/dd");

    const day1Btn = getByTestId(`day-${day1Selected.month}-${day1Selected.day}`);
    if (day1Btn) fireEvent.click(day1Btn);
    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);

    const day2Selected = day1Selected.plus({ days: -10 });
    const day2Btn = getByTestId(`day-${day2Selected.month}-${day2Selected.day}`);
    if (day2Btn) fireEvent.click(day2Btn);
    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
    const activeDates = getDatesBetween2Dates(day2Selected.valueOf(), day1Selected.valueOf());
    if (activeDates) expect(container.getElementsByClassName("calendar-day active").length).toBe(activeDates.length - 2);
    expect(container.getElementsByClassName("calendar-day active_first").length).toBe(1);
    expect(container.getElementsByClassName("calendar-day active_last").length).toBe(1);

    const inputStart = getByTestId("datepicker-input-range-start");
    if (inputStart) expect(inputStart.getAttribute("value")).toBe(day2Selected.toFormat("yyyy/MM/dd"));
    const inputEnd = getByTestId("datepicker-input-range-end");
    if (inputEnd) expect(inputEnd.getAttribute("value")).toBe(day1Selected.toFormat("yyyy/MM/dd"));
  });

  it("Write date start and date end in datepicker range", () => {
    const { container, getByTestId } = render(datePickerExample({ name: "datepicker-multiple", "data-testid": "datepicker", mode: DatePickerMode.RANGE }));

    const nextMonth = DateTime.now().plus({ months: 1 });
    const day1Selected = DateTime.fromFormat(`${nextMonth.year}/${nextMonth.month}/01`, "yyyy/M/dd");
    const day2Selected = day1Selected.plus({ days: 10 });

    const inputStart = getByTestId("datepicker-input-range-start");
    if (inputStart) fireEvent.change(inputStart, { target: { value: day1Selected.toFormat("yyyy/MM/dd") } });
    const inputEnd = getByTestId("datepicker-input-range-end");
    if (inputEnd) fireEvent.change(inputEnd, { target: { value: day2Selected.toFormat("yyyy/MM/dd") } });

    if (inputStart) fireEvent.click(inputStart);

    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
    expect(container.getElementsByClassName("calendar-day active").length).toBe(getDatesBetween2Dates(day1Selected.valueOf(), day2Selected.valueOf()).length - 2);
    expect(container.getElementsByClassName("calendar-day active_first").length).toBe(1);
    expect(container.getElementsByClassName("calendar-day active_last").length).toBe(1);
  });

  it("Write date start and date end with error in datepicker range", () => {
    const { container, getByTestId } = render(datePickerExample({ name: "datepicker-multiple", "data-testid": "datepicker", mode: DatePickerMode.RANGE }));

    const nextMonth = DateTime.now().plus({ months: 1 });
    const day1Selected = DateTime.fromFormat(`${nextMonth.year}/${nextMonth.month}/01`, "yyyy/M/dd");
    const day2Selected = day1Selected.plus({ days: -10 });

    const inputStart = getByTestId("datepicker-input-range-start");
    if (inputStart) fireEvent.change(inputStart, { target: { value: day1Selected.toFormat("yyyy/MM/dd") } });
    const inputEnd = getByTestId("datepicker-input-range-end");
    if (inputEnd) fireEvent.change(inputEnd, { target: { value: day2Selected.toFormat("yyyy/MM/dd") } });

    expect(container.getElementsByClassName("input-wrapper error").length).toBe(1);
  });

  it("Write date start with error and date end in datepicker range", () => {
    const { container, getByTestId } = render(datePickerExample({ name: "datepicker-multiple", "data-testid": "datepicker", mode: DatePickerMode.RANGE }));

    const nextMonth = DateTime.now().plus({ months: 1 });
    const day1Selected = DateTime.fromFormat(`${nextMonth.year}/${nextMonth.month}/01`, "yyyy/M/dd");
    const day2Selected = day1Selected.plus({ days: 10 });

    const inputStart = getByTestId("datepicker-input-range-start");
    if (inputStart) fireEvent.change(inputStart, { target: { value: day1Selected.toFormat("dd/MM/yyyy") } });
    const inputEnd = getByTestId("datepicker-input-range-end");
    if (inputEnd) fireEvent.change(inputEnd, { target: { value: day2Selected.toFormat("yyyy/MM/dd") } });

    expect(container.getElementsByClassName("input-wrapper error").length).toBe(1);
  });

  it("Write date start and date end and change start date in datepicker range", () => {
    const { container, getByTestId } = render(datePickerExample({ name: "datepicker-multiple", "data-testid": "datepicker", mode: DatePickerMode.RANGE }));

    const nextMonth = DateTime.now().plus({ months: 1 });
    const day1Selected = DateTime.fromFormat(`${nextMonth.year}/${nextMonth.month}/01`, "yyyy/M/dd");
    const day2Selected = day1Selected.plus({ days: 10 });

    const inputStart = getByTestId("datepicker-input-range-start");
    if (inputStart) fireEvent.change(inputStart, { target: { value: day1Selected.toFormat("yyyy/MM/dd") } });

    const inputEnd = getByTestId("datepicker-input-range-end");
    if (inputEnd) fireEvent.change(inputEnd, { target: { value: day2Selected.toFormat("yyyy/MM/dd") } });

    if (inputStart) fireEvent.change(inputStart, { target: { value: day1Selected.plus({ days: 1 }).toFormat("yyyy/MM/dd") } });

    if (inputEnd) fireEvent.click(inputEnd);

    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(2);
    expect(container.getElementsByClassName("calendar-day active").length).toBe(getDatesBetween2Dates(day1Selected.plus({ days: 1 }).valueOf(), day2Selected.valueOf()).length - 2);
    expect(container.getElementsByClassName("calendar-day active_first").length).toBe(1);
    expect(container.getElementsByClassName("calendar-day active_last").length).toBe(1);
  });

  it("Write date start and date end and change start date greater than end date in datepicker range", () => {
    const { container, getByTestId } = render(datePickerExample({ name: "datepicker-multiple", "data-testid": "datepicker", mode: DatePickerMode.RANGE }));

    const nextMonth = DateTime.now().plus({ months: 1 });
    const day1Selected = DateTime.fromFormat(`${nextMonth.year}/${nextMonth.month}/01`, "yyyy/M/dd");
    const day2Selected = day1Selected.plus({ days: 10 });

    const inputStart = getByTestId("datepicker-input-range-start");
    if (inputStart) fireEvent.change(inputStart, { target: { value: day1Selected.toFormat("yyyy/MM/dd") } });

    const inputEnd = getByTestId("datepicker-input-range-end");
    if (inputEnd) fireEvent.change(inputEnd, { target: { value: day2Selected.toFormat("yyyy/MM/dd") } });

    if (inputStart) fireEvent.change(inputStart, { target: { value: day1Selected.plus({ days: 20 }).toFormat("yyyy/MM/dd") } });

    if (inputEnd) fireEvent.click(inputEnd);

    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
    expect(container.getElementsByClassName("calendar-day active").length).toBe(0);
    expect(container.getElementsByClassName("calendar-day active_first").length).toBe(0);
    expect(container.getElementsByClassName("calendar-day active_last").length).toBe(0);
  });

  it("Write date start and date end and change end date lower than end date in datepicker range", () => {
    const { getByTestId } = render(datePickerExample({ name: "datepicker-multiple", "data-testid": "datepicker", mode: DatePickerMode.RANGE }));

    const nextMonth = DateTime.now().plus({ months: 1, days: 2 });
    const day1Selected = DateTime.fromFormat(`${nextMonth.year}/${nextMonth.month}/01`, "yyyy/M/dd");
    const day2Selected = day1Selected.plus({ days: 10 });

    const inputStart = getByTestId("datepicker-input-range-start");
    if (inputStart) fireEvent.change(inputStart, { target: { value: day1Selected.toFormat("yyyy/MM/dd") } });

    const inputEnd = getByTestId("datepicker-input-range-end");
    if (inputEnd) fireEvent.change(inputEnd, { target: { value: day2Selected.toFormat("yyyy/MM/dd") } });

    if (inputEnd) fireEvent.change(inputEnd, { target: { value: day2Selected.plus({ days: -10 }).toFormat("yyyy/MM/dd") } });

    if (inputEnd) fireEvent.click(inputEnd);

    const nextMonthBtn = getByTestId("datepicker-calendar-btn_next");
    if (nextMonthBtn) fireEvent.click(nextMonthBtn);

    expect(inputStart.getAttribute("value")).toBe(DateTime.now().toFormat("yyyy/MM/dd"));
  });

  it("Write date start without end date in datepicker range", () => {
    const { container, getByTestId } = render(datePickerExample({ name: "datepicker-multiple", "data-testid": "datepicker", mode: DatePickerMode.RANGE }));

    const nextMonth = DateTime.now().plus({ months: 1 });
    const day1Selected = DateTime.fromFormat(`${nextMonth.year}/${nextMonth.month}/01`, "yyyy/M/dd");

    const inputStart = getByTestId("datepicker-input-range-start");
    if (inputStart) fireEvent.change(inputStart, { target: { value: day1Selected.toFormat("yyyy/MM/dd") } });

    if (inputStart) fireEvent.click(inputStart);

    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
    expect(container.getElementsByClassName("calendar-day active").length).toBe(0);
    expect(container.getElementsByClassName("calendar-day active_first").length).toBe(0);
    expect(container.getElementsByClassName("calendar-day active_last").length).toBe(0);
  });

  it("Write date start without end date and change in datepicker range", () => {
    const { container, getByTestId } = render(datePickerExample({ name: "datepicker-multiple", "data-testid": "datepicker", mode: DatePickerMode.RANGE }));

    const nextMonth = DateTime.now().plus({ months: 1 });
    const day1Selected = DateTime.fromFormat(`${nextMonth.year}/${nextMonth.month}/01`, "yyyy/M/dd");

    const inputStart = getByTestId("datepicker-input-range-start");
    if (inputStart) fireEvent.change(inputStart, { target: { value: day1Selected.toFormat("yyyy/MM/dd") } });

    if (inputStart) fireEvent.change(inputStart, { target: { value: day1Selected.plus({ days: 1 }).toFormat("yyyy/MM/dd") } });

    if (inputStart) fireEvent.click(inputStart);

    expect(container.getElementsByClassName("calendar-day_selected").length).toBe(1);
    expect(container.getElementsByClassName("calendar-day active").length).toBe(0);
    expect(container.getElementsByClassName("calendar-day active_first").length).toBe(0);
    expect(container.getElementsByClassName("calendar-day active_last").length).toBe(0);
  });

  it("Write date end without start date in datepicker range", () => {
    const { getByTestId } = render(datePickerExample({ name: "datepicker-multiple", "data-testid": "datepicker", mode: DatePickerMode.RANGE }));

    const nextMonth = DateTime.now().plus({ months: 1 });
    const day1Selected = DateTime.fromFormat(`${nextMonth.year}/${nextMonth.month}/01`, "yyyy/M/dd");
    const day2Selected = day1Selected.plus({ days: 10 });

    const inputStart = getByTestId("datepicker-input-range-start");

    const inputEnd = getByTestId("datepicker-input-range-end");
    if (inputEnd) fireEvent.change(inputEnd, { target: { value: day2Selected.toFormat("yyyy/MM/dd") } });

    if (inputEnd) fireEvent.click(inputEnd);

    expect(inputStart.getAttribute("value")).toBe(DateTime.now().toFormat("yyyy/MM/dd"));
  });

  it("Write date end and start with error and clean inputs in datepicker range", () => {
    const { container, getByTestId } = render(datePickerExample({ name: "datepicker-multiple", "data-testid": "datepicker", mode: DatePickerMode.RANGE }));

    const nextMonth = DateTime.now().plus({ months: 1 });
    const day1Selected = DateTime.fromFormat(`${nextMonth.year}/${nextMonth.month}/01`, "yyyy/M/dd");

    const inputEnd = getByTestId("datepicker-input-range-end");
    const inputStart = getByTestId("datepicker-input-range-start");
    if (inputStart) fireEvent.change(inputStart, { target: { value: day1Selected.plus({ days: 10 }).toFormat("MM/dd/yyyy") } });
    if (inputEnd) fireEvent.change(inputEnd, { target: { value: day1Selected.plus({ days: 12 }).toFormat("MM/dd/yyyy") } });

    expect(container.getElementsByClassName("input-wrapper error").length).toBe(2);

    if (inputEnd) fireEvent.change(inputEnd, { target: { value: "" } });
    expect(container.getElementsByClassName("input-wrapper error").length).toBe(1);

    if (inputStart) fireEvent.change(inputStart, { target: { value: "" } });
    expect(container.getElementsByClassName("input-wrapper error").length).toBe(0);
  });
});
