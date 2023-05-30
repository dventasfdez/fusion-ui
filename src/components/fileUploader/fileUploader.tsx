import React, {MutableRefObject, useRef, useState, useEffect} from 'react';
import DragAndDrop from '../dragAndDrop/dragAndDrop';
import Loader from '../loader/loader';

export interface IFileUploaderProps {
  /**
   * Define full width in the parent for component
   */
  fullWidth?: boolean;
  /**
   * Define the size for button
   */
  small?: boolean;
  /**
   * Define if button is secondary
   */
  secondary?: boolean;
  /**
   * Define if is possible to upload one or more files
   */
  multiple?: boolean;
  /**
   * Define if is drag and drop variable
   */
  dragAndDrop?: boolean;
  /**
   * Define if is disabled
   */
  disabled?: boolean;
  /**
   * Set id for input
   */
  id?: string;
  /**
   * Set label for component
   */
  label?: string;
  /**
   * Set different classes for file uploader component
   */
  className?: string;
  /**
   * Set accept formats for file or files
   */
  formats: string;
  /**
   * Set max size of file in MB, only for show in the info message
   */
  max: number;
  /**
   * Define the value of file or files in component
   */
  value?: IFile | IFile[];
  /**
   * Function to call when files is changed
   */
  onChange: (files?: File[]) => void;
  [others: string]: any;
}

export interface IFile {
  file: File;
  loading?: boolean;
  error?: string;
}

const FileUploader: React.FC<IFileUploaderProps> = (props: IFileUploaderProps) => {
  const {
    small,
    secondary,
    multiple,
    dragAndDrop,
    fullWidth,
    id,
    label,
    className,
    formats,
    max,
    disabled,
    value,
    onChange,
    ...rest
  } = props;

  const [valueState, setValueState] = useState<IFile | IFile[] | undefined>(value ? value : undefined);
  const fileInputRef: MutableRefObject<any> = useRef(null);

  useEffect(() => {
    if (multiple && (value as IFile[])?.length > 0) {
      setValueState(value as IFile[]);
    } else if (value) {
      setValueState(value as IFile);
    }
  }, [value, multiple]);

  const onChangeInput = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const _newFiles: File[] = Array.from(e.target.files);
      if (multiple && (valueState as IFile[])?.length > 0) {
        let _newFilesMultiple = (valueState as IFile[]).map((_valSt: IFile) => _valSt.file);
        _newFilesMultiple = _newFilesMultiple.concat(_newFiles);
        onChange(_newFilesMultiple);
      } else {
        onChange(_newFiles);
      }
    }
  };

  const onDeleteFile = (indexFile: number) => {
    if (multiple && (valueState as IFile[]).length > 0) {
      const _valuesToDelete = (valueState as IFile[]).map((val: IFile) => val.file);
      _valuesToDelete.splice(indexFile, 1);
      onChange(_valuesToDelete);
    }
  };

  const handleDrop = (files: any) => {
    if (files && files.length > 0) {
      const _newFiles: File[] = Array.from(files);
      if (multiple && (valueState as IFile[])?.length > 0) {
        let _newFilesMultiple = (valueState as IFile[]).map((_valSt: IFile) => _valSt.file);
        _newFilesMultiple = _newFilesMultiple.concat(_newFiles);
        onChange(_newFilesMultiple);
      } else {
        onChange(_newFiles);
      }
    }
  };

  const onClickShowLoadFromPc = () => {
    if (fileInputRef && fileInputRef.current) fileInputRef.current.click();
  };

  const renderDragAndDrop = () => {
    return (
      <DragAndDrop
        data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-drag-and-drop` : ''}
        className="file-uploader-drag-and-drop"
        disabled={disabled}
        handleDrop={handleDrop}
        onClick={onClickShowLoadFromPc}
      >
        <span>Click or drag-and-drop files here to upload</span>
      </DragAndDrop>
    );
  };

  const renderFiles = () => {
    if (multiple && (valueState as IFile[]) && (valueState as IFile[]).length > 0) {
      const _valuesRender = valueState as IFile[];
      return _valuesRender.map(
        (_valueRender: IFile, index: number) =>
          _valueRender && (
            <div className="file-uploader-file-container" key={`file-${index}`}>
              <div className={`file-uploader-file${_valueRender.error ? '_error' : ''}`}>
                <span className="file-uploader-file-name">{_valueRender.file.name}</span>
                {_valueRender.loading ? (
                  <Loader spinner />
                ) : (
                  <>
                    {_valueRender.error && <span className="material-icons error">error</span>}
                    <button
                      type="button"
                      data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-file-${index}-delete-btn` : ''}
                      onClick={() => onDeleteFile(index)}
                      disabled={disabled}
                    >
                      <span className="material-icons cancel">cancel</span>
                    </button>
                  </>
                )}
              </div>
              {_valueRender.error && <small className="mt1">{_valueRender.error}</small>}
            </div>
          )
      );
    }
    return (
      valueState && (
        <div className="file-uploader-file-container">
          <div className={`file-uploader-file${(valueState as IFile).error ? '_error' : ''}`}>
            <span className="file-uploader-file-name">{(valueState as IFile).file.name}</span>{' '}
            {(valueState as IFile).loading ? (
              <Loader spinner />
            ) : (valueState as IFile).error ? (
              <span className="material-icons error">error</span>
            ) : (
              <span className="material-icons check">check_circle</span>
            )}
          </div>
          {(valueState as IFile).error && <small>{(valueState as IFile).error}</small>}
        </div>
      )
    );
  };

  const _dragAndDropModifier = dragAndDrop ? '_drag-drop' : '';
  const _smallModifier = small ? '_small' : '';
  const _fullWidthModifier = fullWidth ? '_full' : '';
  const _disabledModifier = disabled ? '_disabled' : '';

  return (
    <div
      className={`file-uploader-wrapper${_dragAndDropModifier || _smallModifier}${_fullWidthModifier}${_disabledModifier} ${
        className || ''
      }`}
    >
      {label && (
        <label className={`caption mb1 ${disabled ? 'disabled' : ''}`} htmlFor={id}>
          {label}
        </label>
      )}

      {dragAndDrop ? (
        renderDragAndDrop()
      ) : (
        <button
          type="button"
          data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-upload-btn` : undefined}
          className={`${secondary ? 'button-secondary' : 'button-primary'}${small ? '_small' : '_large'}`}
          onClick={onClickShowLoadFromPc}
          disabled={disabled}
        >
          Add files
          <span className="material-icons right">file_upload</span>
        </button>
      )}

      <small className={`file-uploader-helper-text ${disabled ? 'disabled' : ''}`}>
        Max file size is {max}MB. Only {formats}
      </small>
      <input
        id={id}
        data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-input` : undefined}
        ref={fileInputRef}
        type="file"
        onChange={onChangeInput}
        accept={formats}
        disabled={disabled}
        multiple={multiple}
      />
      {((!multiple && value) || (multiple && value && (value as IFile[]).length > 0)) && (
        <div className="file-uploader-files-container mt2">{renderFiles()}</div>
      )}
    </div>
  );
};

export default FileUploader;
