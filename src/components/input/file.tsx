import React, { ChangeEvent, useMemo, useRef } from "react";
import DragAndDrop from "../dragAndDrop/dragAndDrop";
import Loader from "../loader/loader";
import Icon from "../icon/icon";
import { BaseInputProps } from "./input";
import clsx from "clsx";
import Button, { IconButton } from "../button/button";

type FileProps = Omit<
  BaseInputProps,
  "value" | "icon" | "containerClassName"
> & {
  dragAndDrop?: boolean;
  formats: string;
  type: "file";
  multiple?: boolean;
  value: FileItem | FileItem[];
};

export type FileInputProps = FileProps;

export type FileItem = {
  file: File;
  isLoading?: boolean;
  error?: string;
};

const FileInput: React.FC<FileInputProps> = ({
  type,
  wrapperClassName,
  size,
  multiple = false,
  dragAndDrop,
  id,
  label,
  className,
  formats,
  max,
  disabled,
  value,
  required,
  onChange,
  helper,
  ...props
}) => {
  const _value = useMemo(
    () => (Array.isArray(value) ? value : value ? [value] : []),
    [value]
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const toFileList = (files: File[]) => {
    const dt = new DataTransfer();
    files.forEach((file) => dt.items.add(file));
    return dt.files;
  };

  const onChangeInput = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const _newFiles: File[] = Array.from(e.target.files);
      if (multiple && _value.length > 0) {
        const list = toFileList(
          _value.map((_valSt: FileItem) => _valSt.file).concat(_newFiles)
        );

        if (fileInputRef.current) fileInputRef.current.files = list;

        onChange?.({
          ...e,
          target: { ...e.target, files: list },
          currentTarget: { ...e.currentTarget, files: list },
        });
      } else {
        onChange?.(e);
      }
    }
  };

  const onDeleteFile = (fileIdx: number) => {
    if (multiple && _value.length > 0) {
      const _files = _value.map((val: FileItem) => val.file);
      _files.splice(fileIdx, 1);
      const list = toFileList(_files);
      if (fileInputRef.current) fileInputRef.current.files = list;
      onChange?.({
        target: { files: list },
        currentTarget: { files: list },
      } as ChangeEvent<HTMLInputElement>);
    }
  };

  const handleDrop = (e: DragEvent) => {
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      const _newFiles: File[] = Array.from(files);
      if (fileInputRef.current) {
        fileInputRef.current.files = toFileList(_newFiles);
        fileInputRef.current.dispatchEvent(
          new Event("change", { bubbles: true })
        );
      }
    }
  };

  const onClickShowLoadFromPc = () => {
    if (fileInputRef && fileInputRef.current) fileInputRef.current.click();
  };

  const drag = useMemo(
    () => (
      <DragAndDrop
        className="file-input-drag-drop"
        disabled={disabled}
        handleDrop={handleDrop}
        onClick={onClickShowLoadFromPc}
      >
        <Icon name="upload_file" size="large" />
      </DragAndDrop>
    ),
    [disabled, handleDrop, onClickShowLoadFromPc]
  );
  console.log(fileInputRef.current?.files);
  const files = useMemo(() => {
    if (_value.length > 0)
      return (
        <div className="file-input-files">
          {_value.map((item: FileItem, index: number) => (
            <div className="file-input-file-item" key={`file-${index}`}>
              <div className={clsx("file-input-file", { error: item.error })}>
                <span className="file-input-file-name">{item.file.name}</span>
                <div className="file-input-actions">
                  {item.isLoading ? (
                    <Loader />
                  ) : item.error ? (
                    <Icon name="error" size="small" color="error" />
                  ) : (
                    <Icon name="check_circle" size="small" color="success" />
                  )}

                  <IconButton
                    size="small"
                    appearance="text"
                    name="cancel"
                    type="button"
                    aria-label={`${item.file.name}-delete-btn`}
                    onClick={() => onDeleteFile(index)}
                    disabled={disabled}
                  />
                </div>
              </div>
              {item.error && <small>{item.error}</small>}
            </div>
          ))}
        </div>
      );
    return null;
  }, [value, _value, multiple, disabled]);

  return (
    <div className={clsx("file-input-wrapper", wrapperClassName)}>
      {label && (
        <label htmlFor={id}>
          {required && <small>*</small>}

          {label}
        </label>
      )}

      {dragAndDrop ? (
        drag
      ) : (
        <Button
          type="button"
          onClick={onClickShowLoadFromPc}
          disabled={disabled}
        >
          Add files
          <Icon name="upload_file" />
        </Button>
      )}

      {helper && <small className="input-helper-text">{helper}</small>}
      <input
        id={id}
        ref={fileInputRef}
        type="file"
        onChange={onChangeInput}
        accept={formats}
        disabled={disabled}
        multiple={multiple}
        {...props}
      />
      {files}
    </div>
  );
};

export default FileInput;
