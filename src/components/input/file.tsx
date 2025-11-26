import React, { useMemo, useRef } from "react";
import DragAndDrop from "../dragAndDrop/dragAndDrop";
import Loader from "../loader/loader";
import Icon from "../icon/icon";
import { BaseInputProps } from "./input";
import clsx from "clsx";
import Button, { IconButton } from "../button/button";

type FileProps = Omit<BaseInputProps, "value" | "onChange" | "icon"> & {
  secondary?: boolean;
  dragAndDrop?: boolean;
  formats: string;
  max: number;
  onChange: (files?: File[]) => void;
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

const FileInput: React.FC<FileInputProps> = (props: FileInputProps) => {
  const {
    wrapperClassName,
    containerClassName,
    size,
    secondary,
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
    ...rest
  } = props;

  const _value = useMemo(
    () => (Array.isArray(value) ? value : value ? [value] : []),
    [value]
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onChangeInput = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const _newFiles: File[] = Array.from(e.target.files);
      if (multiple && _value.length > 0) {
        const _newFilesMultiple = _value
          .map((_valSt: FileItem) => _valSt.file)
          .concat(_newFiles);
        onChange(_newFilesMultiple);
      } else {
        onChange(_newFiles);
      }
    }
  };

  const onDeleteFile = (indexFile: number) => {
    if (multiple && _value.length > 0) {
      const _valuesToDelete = _value.map((val: FileItem) => val.file);
      _valuesToDelete.splice(indexFile, 1);
      onChange(_valuesToDelete);
    }
  };

  const handleDrop = (files: any) => {
    if (files && files.length > 0) {
      const _newFiles: File[] = Array.from(files);
      if (multiple && _value.length > 0) {
        const _newFilesMultiple = _value
          .map((_valSt: FileItem) => _valSt.file)
          .concat(_newFiles);
        onChange(_newFilesMultiple);
      } else {
        onChange(_newFiles);
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

  const files = useMemo(() => {
    return _value.map((item: FileItem, index: number) => (
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
    ));
  }, [value, _value, multiple, disabled]);

  const hasFiles =
    multiple && _value.length > 0
      ? true
      : !multiple && !!value && !Array.isArray(value);

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

      <small className="input-helper-text">
        Max file size is {max}MB. Only {formats}
      </small>
      <input
        id={id}
        ref={fileInputRef}
        type="file"
        onChange={onChangeInput}
        accept={formats}
        disabled={disabled}
        multiple={multiple}
      />
      {hasFiles && <div className="file-input-files">{files}</div>}
    </div>
  );
};

export default FileInput;
