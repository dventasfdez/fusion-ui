import React from "react";
import { FormContext } from "./form";
import BaseInput from "./base-input";

class SearchInput extends BaseInput {
  type = "TextInput";
  //Rest of the functions and properties exist in baseInput, who's shared accross all form inputs.
  //They can be overrided using the same name and params type.
  searchIcon = this.props.icon ? <span className="material-icons input-icon search-icon">search</span> : null;

  constructor(props: any) {
    super(props);
    this.onPressKey = this.onPressKey.bind(this);
  }

  onPressKey(e: any) {
    if (this.props.preventSubmit && e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }

  render() {
    this.processCSSClasses();
    return (
      <div className={`input-container ${this.validationClass} ${this.loadingClass} ${this.props.className ?? ""}`}>
        <span className="material-icons search">search</span>
        <input
          className={this.props.small ? "small" : undefined}
          ref={this.inputRef}
          id={this.props.id}
          onChange={this.onChange}
          onBlur={this.props.onBlur}
          disabled={this.state.disabled}
          readOnly={this.state.readOnly}
          type="search"
          placeholder={this.props.placeholder}
          name={this.props.name}
          value={this.state.value !== null && this.state.value !== undefined ? this.state.value : this.props.defaultValue ? this.props.defaultValue : ""}
          autoComplete={this.props.autoComplete}
          onKeyPress={this.onPressKey}
          onKeyDown={this.onPressKey}
          onKeyUp={this.onPressKey}
        />
        {this.state.value && (
          <button type="button" className="button-interactive">
            <span className="material-icons">close</span>
          </button>
        )}
      </div>
    );
  }
}

SearchInput.contextType = FormContext;
export default SearchInput;
