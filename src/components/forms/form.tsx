import React, { createRef } from "react";
import { IValidationSummary, IValidationSummaryItem, validateInputVerbose } from "./utilities/validations";
import { serializeForm, getNestedObjectValueByString } from "./utilities/serialize";

import _ from "lodash";
export interface IProps {
  debounceTimer?: number;
  [others: string]: any;
}
export interface IState {
  [others: string]: any;
}

export const FormContext = React.createContext({});

export default class Form extends React.Component<IProps, IState> {
  inputs: React.Component[];
  prevInputs: React.Component[];
  isSubmitted: boolean;
  valuesHaveBeenSet = false;
  constructor(props: any) {
    super(props);
    this.state = {
      error: {},
    };
    this.inputs = [];
    this.prevInputs = this.inputs;
    this.isSubmitted = false;
  }

  componentDidMount() {
    this.setvalues();
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.props.values !== prevProps.values || this.props.step !== prevProps.step || (this.inputs !== this.prevInputs && !this.valuesHaveBeenSet)) {
      this.setvalues();
    }
  }

  addInputToContext = (input: React.Component) => {
    this.prevInputs = this.inputs;
    const element: any = input;
    this.setInputValue(element);
    this.inputs = [...this.prevInputs, input];
  };

  removeInputFromContext = (input: React.Component) => {
    this.prevInputs = this.inputs;
    if (this.prevInputs && this.inputs.length) {
      this.inputs = this.inputs.filter((_item: any) => {
        return _item !== input;
      });
    }
  };

  resetFields = () => {
    this.inputs.forEach((element: any) => {
      if ((element.state.type && element.state.type === "checkbox") || element.state.type === "radio") {
        element.setState({
          // value: element.props.value,
          isValid: null,
          errors: null,
          checked: element.props.checked,
        });
      } else {
        element.setState({
          value: element.props.value,
          isValid: null,
          errors: null,
        });
      }
    });
  };

  bindChangeInInputs = (e: any) => {
    this.debounceInputChange(e);
  };

  debounceInputChange = _.debounce(
    (e: React.ChangeEvent) => {
      const self = this;
      if (e && this.props.onChange && typeof this.props.onChange === "function") {
        self.props.onChange(e);
      }
    },
    this.props.debounceTimer !== undefined ? this.props.debounceTimer : 200
  );

  setvalues = () => {
    const self = this;

    if (this.inputs && this.inputs.length) {
      this.inputs.forEach((element: React.Component) => {
        if (self.props.values) {
          this.setInputValue(element);
        }
      });
      this.valuesHaveBeenSet = true;
    }
  };

  addParentFormOnChangeToInput = (element: any) => {
    const parentFormOnChange = typeof this.props?.onChange === "function" ? this.bindChangeInInputs : undefined;
    if (parentFormOnChange) {
      if (element.state?.parentFormOnChange !== parentFormOnChange) {
        element.setState({
          parentFormOnChange: parentFormOnChange,
        });
      }
    }
  };

  setInputValue = (element: any) => {
    const self = this;
    if (element._isMounted) {
      const key = element.props.name;
      const value = getNestedObjectValueByString(self.props?.values, key);
      this.addParentFormOnChangeToInput(element);
      //checkboxes and radios
      switch (element.type) {
        case "SwitchInput":
        case "CheckboxInput":
        case "TagInput":
        case "RadioInput":
          let isChecked =
            (value === true && element.props.value === "true") || (value && value === element.props.value) || (value && typeof value === "object" && value.indexOf(element.props.value) !== -1);
          if (element.state.checked !== isChecked && element.props.name) {
            element.setState({
              isValid: null,
              checked: isChecked,
              errors: null,
              value: value,
            });
          }
          break;
        case "FileDrop":
        case "FileSelector":
          if (value) {
            element.setState({
              isValid: null,
              value: value,
              errors: null,
            });
          }
          break;
        case "Wysiwyg":
          element.state.value !== value && element.change(value);
          break;
        default:
          if (!element.props.value && value !== null && value !== undefined) {
            if (element.state.value !== value) element.change(value);
          } else {
            if (element.props?.defaultValue && value === null) {
              element.change(element.props.defaultValue);
            } else if (element.state.value !== element.props.value) {
              element.change(element.props.value);
            }
          }
          break;
      }
    }
  };

  handleSubmit = async (SyntheticEvent: any) => {
    SyntheticEvent.preventDefault();
    SyntheticEvent.persist();
    const self = this;
    this.isSubmitted = true;
    SyntheticEvent.nativeEvent.target.isValid = await this.isValid();
    self.inputs.forEach((element: any) => {
      if (element._isMounted) {
        //once the form is submitted, always validate on change for every input
        element.setState({ validateOnChange: true });
      }
    });
    if (typeof this.props.onSubmit === "function") {
      await this.props.onSubmit(SyntheticEvent.nativeEvent);
    }
  };

  /**
   * This function triggers the validation (this.getValidation) and returns just true or false depending if all form inputs are valid
   * @returns boolean true/false
   */
  isValid = async () => {
    const validatonResponse: IValidationSummary = await this.getValidation();
    return validatonResponse.valid;
  };

  /**
   * This function goes through all inputs contained inside the form, checking their validation functions and comparing them with its value, also marks the inputs as invalid if they don't match the conditions
   * @returns an object that will contain the following
   *  IValidationSummary  { valid: boolean; items:  IValidationSummaryItem[]; }
   */
  getValidation = async () => {
    const self = this;
    let formIsValid = true;
    let validationSummary: IValidationSummary = {
      valid: true,
      items: [],
    };
    if (self.inputs) {
      for await (const element of self.inputs) {
        const _element: any = element; //avoid compilation issue declaring typescript type in for await
        if (_element._isMounted) {
          let validationResponse: IValidationSummaryItem | undefined = await validateInputVerbose(_element, self);
          validationSummary.items.push(validationResponse);
          if (validationResponse && !validationResponse.valid) formIsValid = validationResponse.valid; // Only change to false when error founded
        }
      }
    }
    validationSummary.valid = formIsValid;
    return validationSummary;
  };

  formRef: any = createRef();

  serialize = (excludeEmptyValues: boolean | undefined = false) => {
    let formHTMLElement = this.formRef && this.formRef.current ? this.formRef.current : undefined;
    return serializeForm(formHTMLElement, excludeEmptyValues);
  };

  submit = () => {
    let formHTMLElement: any = this.formRef && this.formRef.current ? this.formRef.current : undefined;
    if (formHTMLElement) {
      formHTMLElement.dispatchEvent(new Event("submit"));
    }
  };

  render() {
    return (
      <FormContext.Provider value={this}>
        <form id={this.props.id} ref={this.formRef} className={`${this.props.className ?? ""}${this.props.loading ? " loading" : ""}`} noValidate onSubmit={this.handleSubmit}>
          {this.props.children}
        </form>
      </FormContext.Provider>
    );
  }
}
