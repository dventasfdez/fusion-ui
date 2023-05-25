import React from "react";
import { FormContext } from "./form";
import BaseInput from "./base-input";

class TextArea extends BaseInput {
  type = "TextArea";

  //Rest of the functions and properties exist in baseInput, who's shared accross all form inputs.
  //They can be overrided using the same name and params type.
  render() {
    this.processCSSClasses();

    return (
      <div className={`input-wrapper ${this.validationClass} ${this.loadingClass} ${this.props.className || ""}`}>
        {this.renderInputLabel()}

        <textarea
          ref={this.inputRef}
          disabled={this.state.disabled}
          readOnly={this.state.readOnly}
          onChange={this.onChange}
          placeholder={this.props.placeholder}
          name={this.props.name}
          value={this.state.value ? this.state.value : ""}
          rows={this.props.rows}
          cols={this.props.cols}
          id={this.props.id}
          maxLength={this.props.maxLength}
        />

        {this.props.maxLength && <span className="textarea-count">{`${this.state.value?.length || "0"}/${this.props.maxLength}`}</span>}

        {this.renderErrorMessage()}
      </div>
    );
  }
}

TextArea.contextType = FormContext;
export default TextArea;
