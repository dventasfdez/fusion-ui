import React, { SyntheticEvent, createRef } from "react";

import { FormContext } from "./form";
import { validateInput } from "./utilities/validations";
import Tooltip from "../tooltip/tooltip";

export interface IProps {
  id: string;
  name: string;
  type?: string;
  className?: string;
  value?: string | string[];
  disabled?: boolean;
  disableRelated?: string[];
  label?: string | Function;
  errors?: string[];
  validations?: Function[];
  validateOnChange?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  placeholder?: string;
  onChange?: Function;
  autoComplete?: string;
  tooltip?: string;
  icon?: string;
  large?: boolean;
  [others: string]: any;
  //previous line avoids having to write specific component properties
  //rows?: number; //textarea only
  //cols?: number; //textarea only
}

export interface IState {
  errors?: string[];
  isValid?: boolean;
  value?: string | string[];
  validateOnChange?: boolean;
  parentFormOnChange?: Function;
  readOnly?: boolean;
  loading?: boolean;
  disabled?: boolean;
  disableRelated?: string | string[];
  requireByRelated?: boolean;
  requireRelated?: string | string[];
  [others: string]: any;
}

class BaseInput extends React.Component<IProps, IState> {
  type: string = "";
  _isMounted: boolean = false;
  value: string | string[] | undefined = "";
  validationClass: string | undefined = "";
  validationNames: string[] | undefined = [];
  loadingClass: string | undefined = "";
  inputRef: any = createRef();
  tooltipRef = createRef<HTMLSpanElement>();

  constructor(props: any) {
    super(props);

    this.state = {
      errors: this.props.errors,
      isValid: undefined,
      value: this.props.value !== null && this.props.value !== undefined ? this.props.value : "",
      validateOnChange: this.props.validateOnChange === false ? this.props.validateOnChange : true,
      readOnly: this.props.readOnly,
      loading: this.props.loading,
      disabled: this.props.disabled,
      disableRelated: this.props.disableRelated,
      requireByRelated: false,
      requireRelated: this.props.requireRelated,
      children: this.props.children,
      options: this.props.options,
    };
    this._isMounted = false;

    this.type = "";
    this.change = this.change.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    if (this.context && typeof (this.context as any).addInputToContext === "function") {
      (this.context as any).addInputToContext(this);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (this._isMounted) {
      if (this.props.value !== prevProps.value) {
        this.setState({ value: this.props.value });
      }
      if (this.props.readOnly !== prevProps.readOnly) {
        this.setState({ readOnly: this.props.readOnly });
      }
      if (this.props.loading !== prevProps.loading) {
        this.setState({ loading: this.props.loading });
      }
      if (this.props.tooltip !== prevProps.tooltip) {
        this.setState({ tooltip: this.props.tooltip });
      }
      if (this.props.disabled !== prevProps.disabled) {
        this.setState({ disabled: this.props.disabled });
      }
      if (this.props.disableRelated !== prevProps.disableRelated) {
        this.setState({ disableRelated: this.props.disableRelated });
      }
      if (this.props.requireRelated !== prevProps.requireRelated) {
        this.setState({ requireRelated: this.props.requireRelated });
      }

      if (this.props.children !== prevProps.children) {
        this.setState({ children: this.props.children });
      }
      if (this.props.options !== prevProps.options) {
        this.setState({ options: this.props.options });
      }
      try {
        if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
          //just for you sonar =),  to avoid wrong code smell for prevState, needed for checkbox input
        }
      } catch (error) {}
    }
  }

  onChange = async (e: SyntheticEvent) => {
    const target: any = e.target as HTMLInputElement;
    let newValue = target.value;
    if (this.type === "SelectInput" && this.props.multiple) {
      const options = target.options;
      newValue = [];
      for (let i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          newValue.push(options[i].value);
        }
      }
    }
    e.persist();
    this.processChange(newValue, e);
  };

  change = (value: string | string[], forceUserEvent: boolean | undefined = false) => {
    const isFakeEvent = forceUserEvent ? false : true;
    const fakeEvent = {
      target: { ...this.inputRef, value: value, fakeEvent: isFakeEvent },
    };

    this.processChange(value, fakeEvent);
  };

  //this is to be overrided by inheritance inputs and set rules to decide whether the value can be set or not: ie In select dropdowns only if the value exist as option
  valueCanBeSet = (value: string | string[], e: SyntheticEvent | any = undefined) => {
    return true;
  };
  // To override it
  changeHiddenInput = (value: string | string[]) => {};

  processChange = (value: string | string[], e: SyntheticEvent | any = undefined) => {
    if (this.valueCanBeSet(value, e)) {
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
        if (this.type === "SelectInput") this.changeHiddenInput(value);
      });
    }
  };

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
    this.value = this.state.value ? this.state.value : "";
    this.validationClass = "";
    if (typeof this.state.isValid !== "undefined" && this.state.isValid !== null) {
      if (!this.state.isValid || this.value !== "") {
        // Show only when error or is valid but not empty
        this.validationClass = this.state.isValid ? "valid" : "error";
      }
    }
    // if (this.props.visible !== false && ((this.props.validations && this.props.validations.indexOf(required) !== -1) || this.state.requireByRelated)) {
    //   this.validationClass += " validation-required";
    // }
    this.loadingClass = this.state && this.state.loading ? "loading" : "";
    if (this.state.loading) {
      this.loadingClass = "loading";
    }
  };

  getValidations = () => {
    if (this.props.validations && this.props.validations.length) this.validationNames = this.props.validations?.map((validation) => validation.name);
  };

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
      <span className="material-icons info-tooltip ml1" ref={this.tooltipRef}>
        info
        {this.renderTooltip(this.tooltipRef)}
      </span>
    ) : null;
  }

  renderInputLabel() {
    const isLabelNextToInput = this.type === "CheckboxInput" || this.type === "RadioInput" || this.type === "SwitchInput";
    let labelClassName = isLabelNextToInput ? "" : "caption";
    labelClassName = this.state?.isValid === false && isLabelNextToInput ? labelClassName + " error" : labelClassName;
    this.getValidations();
    if (this.props.label) {
      return (
        <label className={labelClassName} htmlFor={this.props.id}>
          {this.validationNames?.includes("required") && <small className="required">*</small>}
          {typeof this.props.label === "function" ? this.props.label() : this.props.label}
          {this.renderTooltipIcon()}
        </label>
      );
    }
  }

  render() {
    return (
      <></> //this get overrided by inheritances
    );
  }
}

BaseInput.contextType = FormContext;
export default BaseInput;
