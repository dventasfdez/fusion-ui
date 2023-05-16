import React from "react";
import FileUploader, { IFile, IFileUploaderProps } from "./fileUploader";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const fileUploaderExample = (props: IFileUploaderProps) => <FileUploader {...props} />;

it("File Uploader should render", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);
  const component = renderer.create(fileUploaderExample({ formats: "application/pdf", max: 1, onChange: onChangeMock, "data-testid": "file-uploader" }));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("File Uploader with label should render", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);
  const component = renderer.create(
    fileUploaderExample({
      formats: "application/pdf",
      max: 1,
      onChange: onChangeMock,
      "data-testid": "file-uploader",
      label: "Label",
    })
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("File Uploader should render without test id", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);
  const component = renderer.create(fileUploaderExample({ formats: "application/pdf", max: 1, onChange: onChangeMock }));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("File Uploader drag and drop should render", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);
  const component = renderer.create(
    fileUploaderExample({
      formats: "application/pdf",
      max: 1,
      onChange: onChangeMock,
      dragAndDrop: true,
      "data-testid": "file-uploader",
    })
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("File Uploader drag and drop with label should render", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);
  const component = renderer.create(
    fileUploaderExample({
      formats: "application/pdf",
      max: 1,
      onChange: onChangeMock,
      dragAndDrop: true,
      "data-testid": "file-uploader",
      label: "Label",
    })
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("File Uploader drag and drop should render without test id", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);
  const component = renderer.create(fileUploaderExample({ formats: "application/pdf", max: 1, onChange: onChangeMock, dragAndDrop: true }));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("File Uploader small should render", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);
  const component = renderer.create(
    fileUploaderExample({
      formats: "application/pdf",
      max: 1,
      onChange: onChangeMock,
      small: true,
      "data-testid": "file-uploader",
    })
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("File Uploader small with label should render", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);
  const component = renderer.create(
    fileUploaderExample({
      formats: "application/pdf",
      max: 1,
      onChange: onChangeMock,
      small: true,
      "data-testid": "file-uploader",
      label: "Label",
    })
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("File Uploader small should render without test id", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);
  const component = renderer.create(fileUploaderExample({ formats: "application/pdf", max: 1, onChange: onChangeMock, small: true }));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("File Uploader full width should render", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);
  const component = renderer.create(
    fileUploaderExample({
      formats: "application/pdf",
      max: 1,
      onChange: onChangeMock,
      fullWidth: true,
      "data-testid": "file-uploader",
    })
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("File Uploader full width with label should render", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);
  const component = renderer.create(
    fileUploaderExample({
      formats: "application/pdf",
      max: 1,
      onChange: onChangeMock,
      fullWidth: true,
      "data-testid": "file-uploader",
      label: "Label",
    })
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("File Uploader full width should render without test id", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);
  const component = renderer.create(fileUploaderExample({ formats: "application/pdf", max: 1, onChange: onChangeMock, fullWidth: true }));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("File Uploader drag and drop full should render", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);
  const component = renderer.create(
    fileUploaderExample({
      formats: "application/pdf",
      max: 1,
      onChange: onChangeMock,
      dragAndDrop: true,
      fullWidth: true,
      "data-testid": "file-uploader",
    })
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("File Uploader drag and drop with label full should render", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);
  const component = renderer.create(
    fileUploaderExample({
      formats: "application/pdf",
      max: 1,
      onChange: onChangeMock,
      dragAndDrop: true,
      fullWidth: true,
      "data-testid": "file-uploader",
      label: "Label",
    })
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("File Uploader drag and drop full should render without test id", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);
  const component = renderer.create(fileUploaderExample({ formats: "application/pdf", max: 1, onChange: onChangeMock, dragAndDrop: true, fullWidth: true }));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

const testFile = [{ name: "test" }];

it("Single File uploader with value and secondary button", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);

  const str = JSON.stringify(testFile);
  const blob = new Blob([str]);
  const file = new File([blob], "values.json", {
    type: "application/JSON",
  });
  File.prototype.text = jest.fn().mockResolvedValueOnce(str);
  const fileVal: IFile = { loading: false, error: "", file: file };
  const { container } = render(fileUploaderExample({ formats: "application/pdf", max: 1, onChange: onChangeMock, value: fileVal, secondary: true }));

  expect(container.getElementsByClassName("file-uploader-file-container").length).toBe(1);
  expect(container.getElementsByClassName("button-secondary_large").length).toBe(1);
});

it("Single File uploader with value with error", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);

  const str = JSON.stringify(testFile);
  const blob = new Blob([str]);
  const file = new File([blob], "values.json", {
    type: "application/JSON",
  });
  File.prototype.text = jest.fn().mockResolvedValueOnce(str);
  const fileVal: IFile = { loading: false, error: "error", file: file };
  const { container } = render(fileUploaderExample({ formats: "application/pdf", max: 1, onChange: onChangeMock, value: fileVal }));

  expect(container.getElementsByClassName("file-uploader-file-container").length).toBe(1);
  expect(container.getElementsByClassName("file-uploader-file_error").length).toBe(1);
});

it("Single File uploader with value with error", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);

  const str = JSON.stringify(testFile);
  const blob = new Blob([str]);
  const file = new File([blob], "values.json", {
    type: "application/JSON",
  });
  File.prototype.text = jest.fn().mockResolvedValueOnce(str);
  const fileVal: IFile = { loading: false, error: "error", file: file };
  const { container } = render(fileUploaderExample({ formats: "application/pdf", max: 1, onChange: onChangeMock, value: fileVal }));

  expect(container.getElementsByClassName("file-uploader-file-container").length).toBe(1);
  expect(container.getElementsByClassName("file-uploader-file_error").length).toBe(1);
});

it("Single File uploader with value loading", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);

  const str = JSON.stringify(testFile);
  const blob = new Blob([str]);
  const file = new File([blob], "values.json", {
    type: "application/JSON",
  });
  File.prototype.text = jest.fn().mockResolvedValueOnce(str);
  const fileVal: IFile = { loading: true, error: "error", file: file };
  const { container } = render(fileUploaderExample({ formats: "application/pdf", max: 1, onChange: onChangeMock, value: fileVal }));

  expect(container.getElementsByClassName("file-uploader-file-container").length).toBe(1);
  expect(container.getElementsByClassName("spinner").length).toBe(1);
});

it("Single File uploader with value disabled", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);

  const str = JSON.stringify(testFile);
  const blob = new Blob([str]);
  const file = new File([blob], "values.json", {
    type: "application/JSON",
  });
  File.prototype.text = jest.fn().mockResolvedValueOnce(str);
  const fileVal: IFile = { loading: false, error: "error", file: file };
  const { container } = render(fileUploaderExample({ formats: "application/pdf", max: 1, onChange: onChangeMock, value: fileVal, disabled: true }));

  expect(container.getElementsByClassName("file-uploader-wrapper_disabled").length).toBe(1);
  expect(container.getElementsByClassName("file-uploader-file_error").length).toBe(1);
});

it("Multiple File uploader with value", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);

  const str = JSON.stringify(testFile);
  const blob = new Blob([str]);
  const file1 = new File([blob], "values1.json", {
    type: "application/JSON",
  });
  const file2 = new File([blob], "values2.json", {
    type: "application/JSON",
  });
  File.prototype.text = jest.fn().mockResolvedValueOnce(str);
  const fileVals: IFile[] = [
    { loading: false, error: "", file: file1 },
    { loading: false, error: "", file: file2 },
  ];
  const { container } = render(fileUploaderExample({ formats: "application/pdf", max: 1, onChange: onChangeMock, value: fileVals, multiple: true }));

  expect(container.getElementsByClassName("file-uploader-file-container").length).toBe(2);
});

it("Multiple File uploader with value with error", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);

  const str = JSON.stringify(testFile);
  const blob = new Blob([str]);
  const file1 = new File([blob], "values1.json", {
    type: "application/JSON",
  });
  const file2 = new File([blob], "values2.json", {
    type: "application/JSON",
  });
  File.prototype.text = jest.fn().mockResolvedValueOnce(str);
  const fileVals: IFile[] = [
    { loading: false, error: "", file: file1 },
    { loading: false, error: "Error", file: file2 },
  ];
  const { container } = render(fileUploaderExample({ formats: "application/pdf", max: 1, onChange: onChangeMock, value: fileVals, multiple: true }));

  expect(container.getElementsByClassName("file-uploader-file-container").length).toBe(2);
  expect(container.getElementsByClassName("file-uploader-file_error").length).toBe(1);
});

it("Multiple File uploader with value with loading", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);

  const str = JSON.stringify(testFile);
  const blob = new Blob([str]);
  const file1 = new File([blob], "values1.json", {
    type: "application/JSON",
  });
  const file2 = new File([blob], "values2.json", {
    type: "application/JSON",
  });
  File.prototype.text = jest.fn().mockResolvedValueOnce(str);
  const fileVals: IFile[] = [
    { loading: true, error: "", file: file1 },
    { loading: false, error: "Error", file: file2 },
  ];
  const { container } = render(fileUploaderExample({ formats: "application/pdf", max: 1, onChange: onChangeMock, value: fileVals, multiple: true }));

  expect(container.getElementsByClassName("file-uploader-file-container").length).toBe(2);
  expect(container.getElementsByClassName("file-uploader-file_error").length).toBe(1);
  expect(container.getElementsByClassName("spinner").length).toBe(1);
});

it("Multiple File uploader with value disabled", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);

  const str = JSON.stringify(testFile);
  const blob = new Blob([str]);
  const file1 = new File([blob], "values1.json", {
    type: "application/JSON",
  });
  const file2 = new File([blob], "values2.json", {
    type: "application/JSON",
  });
  File.prototype.text = jest.fn().mockResolvedValueOnce(str);
  const fileVals: IFile[] = [
    { loading: false, error: "", file: file1 },
    { loading: false, error: "Error", file: file2 },
  ];
  const { container } = render(
    fileUploaderExample({
      formats: "application/pdf",
      max: 1,
      onChange: onChangeMock,
      value: fileVals,
      multiple: true,
      disabled: true,
    })
  );

  expect(container.getElementsByClassName("file-uploader-wrapper_disabled").length).toBe(1);
  expect(container.getElementsByClassName("file-uploader-file-container").length).toBe(2);
  expect(container.getElementsByClassName("file-uploader-file_error").length).toBe(1);
});

it("Upload file in single file uploader", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);
  const { getByTestId } = render(fileUploaderExample({ formats: "application/pdf", max: 1, onChange: onChangeMock, "data-testid": "file-uploader" }));
  const str = JSON.stringify(testFile);
  const blob = new Blob([str]);
  const file = new File([blob], "values.json", {
    type: "application/JSON",
  });
  File.prototype.text = jest.fn().mockResolvedValueOnce(str);
  const input = getByTestId("file-uploader-input");
  userEvent.upload(input, file);

  expect(onChangeMock).toBeCalledWith([file]);
});

it("Upload files in multiple file uploader", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);
  const { getByTestId } = render(
    fileUploaderExample({
      formats: "application/pdf",
      max: 1,
      onChange: onChangeMock,
      multiple: true,
      "data-testid": "file-uploader",
    })
  );
  const str = JSON.stringify(testFile);
  const blob = new Blob([str]);
  const file1 = new File([blob], "values1.json", {
    type: "application/JSON",
  });
  const file2 = new File([blob], "values2.json", {
    type: "application/JSON",
  });
  File.prototype.text = jest.fn().mockResolvedValueOnce(str);
  const input = getByTestId("file-uploader-input");
  userEvent.upload(input, [file1, file2]);

  expect(onChangeMock).toBeCalledWith([file1, file2]);
});

it("Upload files in multiple file uploader with values", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);

  const str = JSON.stringify(testFile);
  const blob = new Blob([str]);
  const file1 = new File([blob], "values1.json", {
    type: "application/JSON",
  });
  const file2 = new File([blob], "values2.json", {
    type: "application/JSON",
  });
  File.prototype.text = jest.fn().mockResolvedValueOnce(str);
  const fileVals: IFile[] = [
    { loading: false, error: "", file: file1 },
    { loading: false, error: "", file: file2 },
  ];
  const { container, getByTestId } = render(
    fileUploaderExample({
      formats: "application/pdf",
      max: 1,
      onChange: onChangeMock,
      value: fileVals,
      multiple: true,
      "data-testid": "file-uploader",
    })
  );

  expect(container.getElementsByClassName("file-uploader-file-container").length).toBe(2);

  File.prototype.text = jest.fn().mockResolvedValueOnce(str);
  const input = getByTestId("file-uploader-input");
  userEvent.upload(input, [file1, file2]);

  expect(onChangeMock).toBeCalledWith([file1, file2, file1, file2]);
});

it("Delete files in multiple file uploader with values", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);

  const str = JSON.stringify(testFile);
  const blob = new Blob([str]);
  const file1 = new File([blob], "values1.json", {
    type: "application/JSON",
  });
  const file2 = new File([blob], "values2.json", {
    type: "application/JSON",
  });
  File.prototype.text = jest.fn().mockResolvedValueOnce(str);
  const fileVals: IFile[] = [
    { loading: false, error: "", file: file1 },
    { loading: false, error: "", file: file2 },
  ];
  const { getByTestId } = render(
    fileUploaderExample({
      formats: "application/pdf",
      max: 1,
      onChange: onChangeMock,
      value: fileVals,
      multiple: true,
      "data-testid": "file-uploader",
    })
  );

  const deleteBtn = getByTestId("file-uploader-file-0-delete-btn");
  if (deleteBtn) fireEvent.click(deleteBtn);

  expect(onChangeMock).toBeCalledWith([file2]);
});

it("Click in drag and drop container and drop files in file uploader", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);

  const { getByTestId } = render(
    fileUploaderExample({
      formats: "application/pdf",
      max: 1,
      onChange: onChangeMock,
      multiple: true,
      dragAndDrop: true,
      "data-testid": "file-uploader",
    })
  );

  const str = JSON.stringify(testFile);
  const blob = new Blob([str]);
  const file1 = new File([blob], "values1.json", {
    type: "application/JSON",
  });
  const file2 = new File([blob], "values2.json", {
    type: "application/JSON",
  });
  File.prototype.text = jest.fn().mockResolvedValueOnce(str);
  const fileVals: IFile[] = [
    { loading: false, error: "", file: file1 },
    { loading: false, error: "", file: file2 },
  ];

  const dragAndDrop = getByTestId("file-uploader-drag-and-drop");
  if (dragAndDrop) {
    fireEvent.click(dragAndDrop);
    fireEvent.drop(dragAndDrop, {
      dataTransfer: {
        files: fileVals,
        items: null,
        clearData: () => {
          return;
        },
      },
    });
  }

  expect(onChangeMock).toBeCalledWith(fileVals);
});

it("Click in drag and drop container and drop files in file uploader with values", () => {
  const onChangeMock = jest.fn((files?: File[]) => files);

  const str = JSON.stringify(testFile);
  const blob = new Blob([str]);
  const file1 = new File([blob], "values1.json", {
    type: "application/JSON",
  });
  const file2 = new File([blob], "values2.json", {
    type: "application/JSON",
  });
  File.prototype.text = jest.fn().mockResolvedValueOnce(str);
  const fileVals: IFile[] = [
    { loading: false, error: "", file: file1 },
    { loading: false, error: "", file: file2 },
  ];

  const { getByTestId } = render(
    fileUploaderExample({
      formats: "application/pdf",
      max: 1,
      onChange: onChangeMock,
      multiple: true,
      dragAndDrop: true,
      value: fileVals,
      "data-testid": "file-uploader",
    })
  );

  const dragAndDrop = getByTestId("file-uploader-drag-and-drop");
  if (dragAndDrop) {
    fireEvent.click(dragAndDrop);
    fireEvent.drop(dragAndDrop, {
      dataTransfer: {
        files: [file1, file2],
        items: null,
        clearData: () => {
          return;
        },
      },
    });
  }

  expect(onChangeMock).toBeCalledWith([file1, file2, file1, file2]);
});
