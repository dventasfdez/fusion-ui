import React from "react";
import { FormContext } from "./form";
import BaseInput from "./base-input";

class HiddenInput extends BaseInput {
  type = "HiddenInput";
  render() {
    return (
      <div className={`hidden hidden-input-wrapper ${this.validationClass}`}>
        <input
          ref={this.inputRef}
          id={this.props.id}
          disabled={this.state.disabled}
          onChange={this.onChange}
          className={this.props.className ?? ""}
          type={"hidden"}
          name={this.props.name}
          value={this.state.value ?? ""} // FIX error uncontrolled
        />
      </div>
    );
  }
}

HiddenInput.contextType = FormContext;
export default HiddenInput;
