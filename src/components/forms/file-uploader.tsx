import React, { createRef } from "react";
import { FormContext } from "./form";
import { getExtensionFromMimeTypeList } from "../../utilities/files";
import BaseInput from "./base-input";
import DragAndDrop from "../dragAndDrop/dragAndDrop";

export interface IFileState {
  value?: string | string[];
  filesValue: File[];
  errors?: string[];
  isValid?: boolean;
  type: string;
  validateOnChange: boolean;
  disabled?: boolean;
}

class FileUploader extends BaseInput {
  type = "FileUploader";

  state: Readonly<IFileState> = {
    value: this.props.value,
    filesValue: this.props.files,
    errors: this.props.errors,
    isValid: undefined,
    type: "FileUploader",
    validateOnChange: this.props.validateOnChange === false ? this.props.validateOnChange : true,
    disabled: this.props.disabled,
  };

  //Rest of the functions and properties exist in baseInput, who's shared accross all form inputs.
  //They can be overrided using the same name and params type.
  // searchIcon = this.props.icon ? <span className="material-icons input-icon-box search-icon">search</span> : null;
  fileInputRef = createRef<HTMLInputElement>();
  dragAndDropModifier: string = "";
  smallModifier: string = "";
  fullWidthModifier: string = "";
  disabledModifier: string = "";

  constructor(props: any) {
    super(props);

    this.dragAndDropModifier = this.props.dragAndDrop ? "_drag-drop" : "";
    this.smallModifier = this.props.small ? "_small" : "";
    this.fullWidthModifier = this.props.fullWidth ? "_full" : "";
    this.disabledModifier = this.props.disabled ? "_disabled" : "";

    this.onPressKey = this.onPressKey.bind(this);
    this.renderDragAndDrop = this.renderDragAndDrop.bind(this);
    this.renderFiles = this.renderFiles.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.onClickShowLoadFromPc = this.onClickShowLoadFromPc.bind(this);
    this.onDeleteFile = this.onDeleteFile.bind(this);
  }

  onPressKey(e: any) {
    if (this.props.preventSubmit && e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }
  onClickShowLoadFromPc = () => {
    if (this.fileInputRef && this.fileInputRef.current) this.fileInputRef.current.click();
  };

  onChange = async (e: any) => {
    const { files } = e?.target || e?.e?.target;
    let _newFiles: File[] = [];
    if (files && files.length > 0) {
      _newFiles = Array.from(files);
      if (this.props.multiple && this.state.filesValue?.length > 0) {
        _newFiles = this.state.filesValue.concat(_newFiles);
      }
    }
    // Fake event a names
    const names = _newFiles ? _newFiles.map((file) => file?.name).join(", ") : "";
    if (this.fileValueCanBeSet(_newFiles)) {
      // Process change
      if (e?.persist) e.persist();
      this.setState({ value: names, filesValue: _newFiles }, async () => {
        this.processChange(names, e);
      });
    }
    if (this.props.onChange) this.props.onChange(_newFiles);
  };
  handleDrop = (files: File[]) => {
    const names = files?.length > 1 ? files.map((file) => file?.name).join(", ") : files?.[0]?.name || "";
    this.onChange({ e: { target: { value: names, files: files } } });
  };
  onDeleteFile = (indexFile: number) => {
    if (this.state.filesValue?.length > 0) {
      const _newFiles = this.state.filesValue.filter((_file, index) => index !== indexFile);
      // Fake event a names
      const names = _newFiles ? _newFiles.map((file) => file?.name).join(", ") : "";
      // Process change
      this.setState({ value: names, filesValue: _newFiles }, async () => {
        if (this.fileInputRef.current) this.fileInputRef.current.value = ""; // Clear input
        this.processChange(names, { e: { target: { value: names, files: _newFiles } } });
      });
    }
  };

  fileValueCanBeSet = (value: File[]) => {
    let _valueCanBeSet = true;
    let i = 0;
    while (_valueCanBeSet && i < value.length) {
      // Verify size
      const checkFile = value[i];
      if (this.props.maxSize) {
        if (checkFile.size > this.props.maxSize * (1024 * 1024)) {
          _valueCanBeSet = false;
        }
      }
      // Verify extension
      if (this.props.acceptFormat) {
        const acceptFormats = this.props.acceptFormat.split(",").map((_acceptFormat: string) => _acceptFormat.trim());
        if (acceptFormats.indexOf(checkFile.type) === -1) {
          _valueCanBeSet = false;
        }
      }
      i++;
    }
    return _valueCanBeSet;
  };

  renderDragAndDrop = () => {
    return (
      <DragAndDrop
        data-testid={this.props.name ? `${this.props.name}-drag-and-drop` : ""}
        className="file-uploader-drag-and-drop"
        disabled={this.props.disabled}
        handleDrop={this.handleDrop}
        onClick={this.onClickShowLoadFromPc}
      >
        <span>Click or drag-and-drop files here to upload</span>
      </DragAndDrop>
    );
  };

  renderInformation = () => {
    if (this.props.maxSize || this.props.acceptFormat) {
      return (
        <small>
          {this.props.maxSize && `Max file size is ${this.props.maxSize}MB.`}
          {this.props.acceptFormat && `Only this format: ${this.props.acceptExtensions ? this.props.acceptExtensions : getExtensionFromMimeTypeList(this.props.acceptFormat)}.`}
        </small>
      );
    }
  };
  renderFiles = () => {
    if (this.state.filesValue?.length > 0) {
      return this.state.filesValue.map(
        (_valueRender, index) =>
          _valueRender && (
            <div className="file-uploader-file-container" key={`file-${index}`}>
              <div className="file-uploader-file mt2">
                <span className="file-uploader-file-name" title={_valueRender?.name}>
                  {_valueRender?.name}
                </span>
                <button
                  type="button"
                  title="DELETE"
                  data-testid={this.props.rest && this.props.rest["data-testid"] ? `${this.props.rest["data-testid"]}-file-${index}-delete-btn` : ""}
                  onClick={() => this.onDeleteFile(index)}
                  disabled={this.props.disabled}
                >
                  <span className="material-icons cancel">cancel</span>
                </button>
              </div>
            </div>
          )
      );
    }
  };

  render() {
    this.processCSSClasses();
    return (
      <div className={`input-wrapper file-uploader-wrapper${this.dragAndDropModifier || this.smallModifier}${this.fullWidthModifier}${this.disabledModifier} ${this.props.className || ""}`}>
        {this.renderInputLabel()}

        {this.props.dragAndDrop ? (
          this.renderDragAndDrop()
        ) : (
          <button
            type="button"
            data-testid="upload-button"
            className={`${this.props.secondary ? "button-secondary" : "button-primary"}`}
            onClick={this.onClickShowLoadFromPc}
            disabled={this.props.disabled}
          >
            Add files
            <span className="material-icons right">file_upload</span>
          </button>
        )}

        {this.renderInformation()}
        <input
          name={this.props.name}
          id={this.props.id}
          data-testid="upload-input"
          ref={this.fileInputRef}
          type="file"
          onChange={this.onChange}
          accept={this.props.acceptFormat}
          disabled={this.props.disabled}
          multiple={this.props.multiple}
        />
        {this.renderErrorMessage()}
        {((!this.props.multiple && this.state.value) || (this.props.multiple && this.state.value && this.state.value.length > 0)) && (
          <div className="file-uploader-files-container">{this.renderFiles()}</div>
        )}
      </div>
    );
  }
}

FileUploader.contextType = FormContext;
export default FileUploader;
