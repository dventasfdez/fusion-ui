import React, { SyntheticEvent, Component, createRef } from "react";
import { FormContext } from "../form";
import { validateInput } from "../utilities/validations";

import WysiwygBarCommands, { ICommandsProps } from "./wsyiwyg-bar-commands";
import Tooltip from "../../tooltip/tooltip";

const htmlStrangeCharacters = /\u0300-\u036F|\u200B|\u200C|\uFEFF|\u200D|\u00A0/g; //matches stranges spaces
const htmlExtraSpacesRegExp = /(<div>\r\n<\/div>)+/g; //matches HTML extra spaces
const htmlOnlyOneExtraSpace = "<div>\r\n</div>"; // replace HTML extra spaces by one

export interface IProps extends ICommandsProps {
  id?: string;
  name?: string;
  type?: string;
  label?: string;
  tooltip?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  errors?: string[];
  disabled?: boolean;
  validations?: Function[];
  validateOnChange?: boolean;
  onChange?: Function;
  onDrop?: Function;
  loading?: boolean;
  readOnly?: boolean;
  spellCheck?: boolean;
  autoComplete?: string;
}

export interface IState {
  value?: string;
  displayedValue?: string;
  loading?: boolean;
  isValid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  errors?: string[];
  requireByRelated?: boolean;
  requireRelated?: string | string[];
  disableRelated?: string | string[];
  validateOnChange?: boolean;
  parentFormOnChange?: Function; // No initializate
}
class Wysiwyg extends Component<IProps, IState> {
  private editor = React.createRef<HTMLDivElement>();
  private inputRef: any = React.createRef<HTMLInputElement>();
  private tooltipRef = createRef<HTMLSpanElement>();
  private _isMounted: boolean = false;
  private loadingClass: string = "";
  private validationClass: string = "";
  type: string = "";
  constructor(props: IProps) {
    super(props);
    this.state = {
      value: this.props.value ? this.props.value : "",
      displayedValue: this.props.value ? this.props.value : "",
      loading: this.props.loading,
      // isValid: this.props.isValid
      disabled: this.props.disabled,
      readOnly: this.props.readOnly,
      errors: this.props.errors,
      validateOnChange: this.props.validateOnChange === false ? this.props.validateOnChange : true,
    };
    this.type = "Wysiwyg";
  }

  componentDidMount() {
    this._isMounted = true;
    if (this.context && typeof (this.context as any).addInputToContext === "function") {
      (this.context as any).addInputToContext(this);
    }
    this.setState((state, props) => ({ value: props.value, displayedValue: this.props.value }));
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (this._isMounted) {
      if (this.props.value !== prevProps.value) {
        this.setState({ value: this.props.value, displayedValue: this.props.value });
      }
      if (this.props.readOnly !== prevProps.readOnly) {
        this.setState({ readOnly: this.props.readOnly });
      }
      if (this.props.loading !== prevProps.loading) {
        this.setState({ loading: this.props.loading });
      }
      if (this.props.disabled !== prevProps.disabled) {
        this.setState({ disabled: this.props.disabled });
      }

      try {
        if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
          //just for you sonar =),  to avoid wrong code smell for prevState, needed for checkbox input
        }
      } catch (error) {}
    }
  }

  processChange = (value: string, e: SyntheticEvent | any = undefined) => {
    this.setState({ value: value }, async () => {
      if (this.state.validateOnChange && !e?.target?.fakeEvent) {
        validateInput(this, this.context);
      }
      if (e && this.props.onChange) {
        this.props.onChange(e);
      }

      if (e && !e?.target?.fakeEvent && typeof this.state.parentFormOnChange === "function") {
        this.state.parentFormOnChange(e);
      }
    });
  };

  // Sonar: This is called in other part of the code
  change = (value: string, forceUserEvent: boolean | undefined = false) => {
    const isFakeEvent = forceUserEvent ? false : true;
    const fakeEvent = {
      target: { ...this.inputRef, value: value, fakeEvent: isFakeEvent },
    };
    this.setState({ displayedValue: value });
    this.processChange(value, fakeEvent);
  };
  onChange = async (e: SyntheticEvent) => {
    const target: any = e.target as HTMLInputElement;
    let newValue = target.innerHTML;
    if (e.persist) e.persist();
    this.processChange(newValue, e);
  };
  onCommandChange = (e: any) => {
    const _e = { target: { innerHTML: this.editor?.current?.innerHTML } } as any;
    this.onChange(_e);
  };
  onKeyUp = (e: any) => {
    if (e.persist) e.persist();
    const _target: any = e.target;
    this.processChange(_target.innerHTML, e);
  };

  onDrop = (e: any) => {
    this.props.onDrop && this.props.onDrop(e);
  };
  onDragOver = (e: any) => {
    const _e = e as Event;
    if (this.props.onDrop) {
      _e.stopPropagation();
      _e.preventDefault();
    }
  };

  onCopy = (e: any) => {
    let text = window
      ?.getSelection()
      ?.toString()
      .replace(/[\n\r]+/g, "");
    text = this.escapeEspecialChars(text);
    e.clipboardData.setData("text/plain", text);
  };
  onPaste = (e: any) => {
    e.preventDefault();
    let text = "";
    const _window: any = window;
    const clipBoardData: any = _window?.clipboardData;
    if (e.clipboardData || e.originalEvent.clipboardData) {
      text = (e.originalEvent || e).clipboardData.getData("text/plain");
    } else if (clipBoardData) {
      text = clipBoardData.getData("Text");
    }
    text = this.escapeEspecialChars(text);
    // Before update HTML
    const targetClassList = e.target?.classList || [];
    if (!targetClassList.contains("editor-content")) {
      e.target = e.target?.closest(".editor-content");
    }
    // Exe command
    if (document.queryCommandSupported("insertText")) {
      document.execCommand("insertText", false, text);
    } else {
      document.execCommand("paste", false, text);
    }
    // Falsify event
    e.target.value = text;
    this.onChange(e);
  };

  escapeEspecialChars(text: string = ""): string {
    text = text.replaceAll(htmlStrangeCharacters, "");
    return text.replaceAll(htmlExtraSpacesRegExp, htmlOnlyOneExtraSpace);
  }

  // Renders
  renderErrorMessage = () => {
    if (this.state.errors) {
      return (
        <div className="input-helper-text">
          <span className="material-icons">info</span>
          {this.state.errors[0]}
        </div>
      );
    }
  };

  processCSSClasses = () => {
    this.validationClass = "";
    if (typeof this.state.isValid !== "undefined" && this.state.isValid !== null) {
      this.validationClass = this.state.isValid ? "valid" : "error";
    }
    if (this.props.validations) {
      this.props.validations.forEach((element) => {
        this.validationClass += " validation-" + element.name;
      });
    }
    this.loadingClass = this.state.loading ? "loading" : "";
  };

  renderHiddenInput() {
    return (
      <div className="input-container hidden">
        <input
          id="reactInput"
          type="hidden"
          ref={this.inputRef}
          disabled={this.state.disabled}
          readOnly={this.state.readOnly}
          placeholder={this.props.placeholder}
          name={this.props.name}
          value={this.state.value ? this.state.value : ""}
        />
      </div>
    );
  }

  renderTooltip(parentRef?: any) {
    if (this.props.tooltip) {
      return (
        <Tooltip parentRef={parentRef} renderAsPortal>
          {this.props.tooltip}
        </Tooltip>
      );
    }
  }

  renderTooltipIcon() {
    return this.props.tooltip ? (
      <span className="material-icons info-tooltip" ref={this.tooltipRef}>
        info
        {this.renderTooltip(this.tooltipRef)}
      </span>
    ) : null;
  }

  render() {
    this.processCSSClasses();
    return (
      <div onDrop={this.onDrop} className={`input-wrapper ${this.validationClass} ${this.loadingClass} ${this.props.className ?? ""}`}>
        {this.props.label ? (
          <label className="caption mb1" htmlFor={this.props.id}>
            {this.validationClass && (this.validationClass.includes("validation-required") || this.validationClass.includes("required")) && <small className="required">*</small>}
            {this.props.label} {this.renderTooltipIcon()}
          </label>
        ) : null}
        <div className="editor-container">
          <WysiwygBarCommands
            emptyFormat={this.props.emptyFormat}
            onCommandChange={this.onCommandChange}
            customFunction={this.props.customFunction}
            editor={this.editor?.current}
            undo={this.props.undo}
            redo={this.props.redo}
            headers={this.props.headers}
            bold={this.props.bold}
            italic={this.props.italic}
            underline={this.props.underline}
            strikeThrough={this.props.strikeThrough}
            justifyCenter={this.props.justifyCenter}
            justifyLeft={this.props.justifyLeft}
            justifyRight={this.props.justifyRight}
            justifyFull={this.props.justifyFull}
            unorderedList={this.props.unorderedList}
            orderedList={this.props.orderedList}
            indent={this.props.indent}
            outdent={this.props.outdent}
            table={this.props.table}
            link={this.props.link}
            unlink={this.props.unlink}
            image={this.props.image}
          />
          {this.renderHiddenInput()}
          <div
            spellCheck={this.props.spellCheck ?? false}
            ref={this.editor}
            dangerouslySetInnerHTML={{ __html: this.state.displayedValue ? this.state.displayedValue : "" }}
            onDrop={this.onDrop}
            onDragOver={this.onDragOver}
            onCopy={(e) => this.onCopy(e)}
            onPaste={this.onPaste}
            onKeyUp={this.onKeyUp}
            contentEditable={!this.state.disabled}
            className={"editor-content editor-container-child " + (this.props.emptyFormat ? " empty-border" : "")}
          ></div>
        </div>
        {this.renderErrorMessage()}
      </div>
    );
  }
}

Wysiwyg.contextType = FormContext;
export default Wysiwyg;
