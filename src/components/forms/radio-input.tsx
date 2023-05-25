import React, { createRef } from "react";
import { FormContext } from "./form";
import { validateInput } from "./utilities/validations";
import BaseInput, { IState } from "./base-input";

class RadioInput extends BaseInput {
  type = "RadioInput";
  radioRef = createRef<HTMLInputElement>();

  state: Readonly<IState> = {
    errors: this.props.errors,
    isValid: undefined,
    value: this.props.value,
    type: "radio",
    validateOnChange: this.props.validateOnChange === false ? this.props.validateOnChange : true,
    disabled: this.props.disabled,
    readOnly: this.props.readOnly,
    loading: this.props.loading,
    checked: this.props.checked,
    checkboxStyle: this.props.checkboxStyle,
  };

  uncheck = () => {
    if (this.state.checked) {
      this.setState({ checked: false });
    }
    this.validate();
  };

  validate = () => {
    if (this.state.validateOnChange) {
      validateInput(this, this.context);
    }
  };

  onChange = async (SyntheticEvent: any) => {
    let siblings: any = []; //had to use any because type changes depending on if there is context (react) or not (vanilla html)
    //event triggered by user
    if (this.context && (this.context as any).inputs && (this.context as any).inputs.length) {
      //radios inside form
      siblings = (this.context as any).inputs.filter((el: any) => el !== this && el.type === "RadioInput" && el.props.name === this.props.name);
      siblings.forEach((element: any) => {
        element.uncheck();
      });
    }
    // else {
    //   //radios outside of form
    //   siblings = document.querySelectorAll(
    //     "input[type='radio'][name='" + this.props.name + "']"
    //   );
    //   siblings.forEach((element: any) => {
    //     if (element.value !== this.props.value) {
    //       element.checked = false; //if radio was checked, set to false so onchange will be triggered
    //       element.click();
    //     }
    //   });
    // }
    this.setState({ checked: true }, () => {
      this.validate();
      siblings.forEach((element: any) => {
        validateInput(this, this.context);
        // else {
        //   element.click();
        // }
      });
    });
    if (this.props.onChange) {
      this.props.onChange(SyntheticEvent);
    }

    if (SyntheticEvent && !SyntheticEvent?.target?.fakeEvent && typeof this.state.parentFormOnChange === "function") {
      this.state.parentFormOnChange(SyntheticEvent);
    }
  };

  inputRef: any = createRef();

  render() {
    this.processCSSClasses();
    const checked = typeof this.state.checked !== "undefined" && this.state.checked !== null ? this.state.checked : false;
    return (
      <div className={`radio-container ${this.validationClass} ${this.loadingClass} ${this.props.className ?? ""}`}>
        <input disabled={this.state.disabled} ref={this.radioRef} name={this.props.name} value={this.props.value} id={this.props.id} type="radio" onChange={this.onChange} checked={checked} />
        {this.renderInputLabel()}
      </div>
    );
  }
}

RadioInput.contextType = FormContext;
export default RadioInput;
