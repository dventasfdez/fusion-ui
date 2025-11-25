import type { Meta, StoryObj } from "@storybook/react-vite";
import Toggle from "./toggle";
import { ChangeEvent, useState } from "react";

const meta: Meta<typeof Toggle> = {
  title: "Inputs/Toggle",
  component: Toggle,
  render: ({ checked, ...args }) => {
    const [_checked, setChecked] = useState(checked ?? false);
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;
      setChecked(value);
    };
    return (
      <Toggle
        {...args}
        id="toggle"
        name="toggle"
        checked={_checked}
        onChange={onChange}
      />
    );
  },
  tags: ["autodocs"],
};

/**
 * <Toggle className="fusion-ui" />
      <Toggle className="fusion-ui" id="small-toggle-checked" small checked />
      <Toggle className="fusion-ui" id="toggle-disabled" disabled />
      <Toggle className="fusion-ui" id="small-toggle-disabled" small disabled />
      <Toggle className="fusion-ui" id="toggle-readOnly" readOnly />
      <Toggle className="fusion-ui" id="small-toggle-readOnly" small readOnly />
      <Toggle className="fusion-ui" id="toggle-checked-disabled" checked disabled />
      <Toggle className="fusion-ui" id="small-toggle-checked-disabled" small checked disabled />
      <Toggle className="fusion-ui" id="toggle-label" label="I am label for #toggle-label" />
      <Toggle className="fusion-ui" id="small-toggle-label" small label="I am label for #toggle-label" />
      <Toggle className="fusion-ui" id="toggle-helper-text" helperTextOff="off" helperTextOn="on" />
      <Toggle className="fusion-ui" id="small-toggle-helper-text" small helperTextOff="off" helperTextOn="on" />
 */

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Base: Story = {};
export const Small: Story = {
  args: { size: "small" },
};
export const Large: Story = {
  args: { size: "large" },
};
export const Checked: Story = {
  args: { checked: true },
};
