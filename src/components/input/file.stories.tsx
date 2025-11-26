import type { Meta, StoryObj } from "@storybook/react-vite";
import Input from "./input";
import { FileItem } from "./file";
import { ChangeEvent, useState } from "react";

const meta: Meta<typeof Input> = {
  title: "Inputs/File",
  component: Input,
  tags: ["autodocs"],
  render: ({ multiple = false, ...args }) => {
    const [files, setFiles] = useState<FileItem[]>([]);
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.currentTarget.files;
      if (files)
        setFiles(
          Array.from(files).map((file, idx) => ({
            file,
            isLoading: idx === 2,
            error: idx === 3 ? "Error" : undefined,
          }))
        );
    };
    return (
      <Input
        {...args}
        type="file"
        onChange={onChange}
        value={multiple ? files : files[0]}
        formats=".pdf"
        max={1}
        multiple={multiple}
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const Multiple: Story = { args: { multiple: true } };
export const DragAndDrop: Story = {
  args: {
    dragAndDrop: true,
  },
};
export const DragAndDropMultiple: Story = {
  args: {
    dragAndDrop: true,
    multiple: true,
  },
};

export const Complete: Story = {
  args: {
    label: "File Input",
    required: true,
    helper: <p>Helper Text</p>,
  },
};
export const CompleteDragAndDrop: Story = {
  args: {
    label: "File Input",
    required: true,
    helper: <p>Drag and drop</p>,
    ...DragAndDrop.args,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
export const DisabledDragAndDrop: Story = {
  args: {
    disabled: true,
    ...DragAndDrop.args,
  },
};
