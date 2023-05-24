import React, { createRef } from "react";
import { FormContext } from "./form";
import { validateInput } from "./utilities/validations";
import BaseInput, { IState } from "./base-input";

class CheckboxInput extends BaseInput {
  checkboxRef = createRef<HTMLInputElement>();

  tooltipRef = createRef<HTMLSpanElement>();
  type = "CheckboxInput";
  state: Readonly<IState> = {
    disabled: this.props.disabled,
    errors: this.props.errors,
    isValid: undefined,
    type: "checkbox",
    value: this.props.value ? this.props.value : "value",
    checked: this.props.checked,
    validateOnChange: this.props.validateOnChange === false ? this.props.validateOnChange : true,
  };

  componentDidMount() {
    this._isMounted = true;
    if (this.context && typeof (this.context as any).addInputToContext === "function") {
      (this.context as any).addInputToContext(this);

      this.updateParentGroup();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props) || JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
        if (typeof this.props.checked !== "undefined" && this.props.checked !== prevProps.checked) {
          this.setState({ checked: this.props.checked });
        }
        if (this.props.defaultValue !== prevProps.defaultValue) {
          this.setState({ value: this.props.defaultValue });
        }
        if (this.props.disabled !== prevProps.disabled) {
          this.setState({ disabled: this.props.disabled });
        }
      }

      if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
        this.updateParentGroup();
      }
    }
  }

  updateParentGroup = () => {
    if (this.props.changeParentGroup && typeof this.props.changeParentGroup === "function") {
      let isChecked = typeof this.state.checked !== "undefined" ? this.state.checked : false;
      this.props.changeParentGroup(this, isChecked);
    }
  };

  onChange = async (SyntheticEvent: any) => {
    const self = this;
    SyntheticEvent.persist();
    this.setState({ checked: !this.state.checked }, () => {
      validateInput(self, this.context);
      //validate siblings
      if (self.context && (self.context as any).inputs && (self.context as any).inputs.length) {
        //checkboxes inside form
        const siblings = (self.context as any).inputs.filter((el: any) => el !== self && el.type === "CheckboxInput" && el.props.name === self.props.name);
        siblings.forEach((element: any) => {
          validateInput(element, self.context);
        });
      }
      this.updateParentGroup();
    });
    if (typeof this.props.onChange === "function") {
      this.props.onChange(SyntheticEvent);
    }

    if (!this.props.disableFormPropagation && SyntheticEvent && !SyntheticEvent?.target?.fakeEvent && typeof this.state.parentFormOnChange === "function") {
      this.state.parentFormOnChange(SyntheticEvent);
    }
  };

  render() {
    this.processCSSClasses();

    const checked = typeof this.state.checked !== "undefined" && this.state.checked !== null ? this.state.checked : false;
    return (
      <div className={`checkbox-container${this.state.disabled ? "_disabled" : ""} ${this.validationClass} ${this.loadingClass} ${this.props.className || ""}`}>
        <input
          data-testid={`checkbox-${this.props.name}`}
          ref={this.checkboxRef}
          disabled={this.state.disabled}
          name={this.props.name}
          value={this.props.value}
          id={this.props.id}
          type="checkbox"
          checked={checked}
          onChange={this.onChange}
          className={this.props.intermediate ? "intermediate" : ""}
        />
        {this.renderInputLabel()}
      </div>
    );
  }
}

CheckboxInput.contextType = FormContext;
export default CheckboxInput;
