import React from "react";
import { FormContext } from "./form";
import { validateInput } from "./utilities/validations";
import BaseInput, { IState } from "./base-input";

class SwitchInput extends BaseInput {
  type = "SwitchInput";
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
        let isChecked = typeof this.props.checked !== "undefined" ? this.props.checked : false;
        if (this.props.checked !== prevProps.checked && this.state.checked !== isChecked) {
          this.setState({ checked: isChecked });
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

    if (SyntheticEvent && !SyntheticEvent?.target?.fakeEvent && typeof this.state.parentFormOnChange === "function") {
      this.state.parentFormOnChange(SyntheticEvent);
    }
  };

  render() {
    this.processCSSClasses();

    const checked = typeof this.state.checked !== "undefined" && this.state.checked !== null ? this.state.checked : false;

    const labelClassName = "toggle-pill".concat(this.props.small ? "_small" : "", checked ? "_checked" : "", this.state.disabled ? "_disabled" : "");
    return (
      <div className={`input-wrapper ${this.validationClass} ${this.loadingClass} ${this.props.className || ""}`}>
        <div className={`toggle`}>
          <div className="toggle-container">
            <span id={`${this.props.id}-label`} className={labelClassName} onClick={(e) => e.stopPropagation()}>
              <input
                id={this.props.id}
                name={this.props.name}
                className="toggle-input"
                onChange={this.onChange}
                checked={checked}
                disabled={this.state.disabled}
                value={this.props.value}
                type="checkbox"
              />
              <span className="toggle-handle" />
            </span>
            <span className="ml1">{this.renderInputLabel()}</span>
          </div>
        </div>
        {this.renderErrorMessage()}
      </div>
    );
  }
}

SwitchInput.contextType = FormContext;
export default SwitchInput;
