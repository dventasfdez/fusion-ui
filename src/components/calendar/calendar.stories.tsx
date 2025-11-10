import type { Meta, StoryObj } from "@storybook/react-vite";
import Calendar from "./calendar";

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,

  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Base: Story = {};

export const Locale: Story = {
  args: {
    locale: "en-US",
  },
};

export const DisableDates: Story = {
  args: {
    disabledDates: Array.from({ length: 3 }, (_, i) =>
      new Date().setUTCDate(new Date().getUTCDate() + i * 3).valueOf()
    ),
  },
};
export const SelectedDates: Story = {
  args: {
    selectedDates: Array.from({ length: 3 }, (_, i) =>
      new Date().setUTCDate(new Date().getUTCDate() + i * 3).valueOf()
    ),
  },
};

export const Range: Story = {
  args: {
    selectedDates: Array.from({ length: 2 }, (_, i) =>
      new Date().setUTCDate(new Date().getUTCDate() + i * 3 + 3).valueOf()
    ),
    range: true,
  },
};

export const MinimumDate: Story = {
  args: {
    minDate: Date.now(),
  },
};

export const MaximumDate: Story = {
  args: {
    maxDate: Date.now(),
  },
};
