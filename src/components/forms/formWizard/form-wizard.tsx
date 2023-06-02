import React, { createRef } from "react";
import Form from "../form";
import BaseInput from "../base-input";

import { serializeForm, mergeValuesIncludingEmpty } from "../utilities/serialize";
import { validateInput } from "../utilities/validations";
import Autosave from "./autosave";
export { default as FormStep } from "./form-step";

export interface IProps {
  [others: string]: any;
}
export interface IState {
  [others: string]: any;
}
class FormWizard extends React.Component<IProps, IState> {
  totalSteps: number;
  children: any[];
  state = {
    step: this.props.initialStep ? this.props.initialStep : this.props.fromJobPosting ? 3 : 1,
    values: this.props.values,
    formSteps: [],
    stepValues: [],
  };

  formRef: any = createRef();

  constructor(props: IProps) {
    super(props);
    this.nextStep = this.nextStep.bind(this);
    this.children = this.props.children as any[];
    this.totalSteps = 1;
  }

  componentDidMount() {
    this.retrieveChildrenSteps();
    const stepsData = [];
    for (let i = 1; i <= this.children.length; i++) {
      const thisStepData = {
        isActive: i === this.state.step ? true : false,
      };
      stepsData.push(thisStepData);
    }
    if (typeof this.props.onStepChange === "function") {
      this.props.onStepChange(stepsData, this.state.step);
    }
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps !== this.props) {
      this.retrieveChildrenSteps();
    }

    if (!this.props.open && prevProps.open) {
      this.formRef.current.resetFields();
      this.setState({ step: 1 });
      this.totalSteps = this.children.length;
    }

    if (prevProps.values !== this.props.values) {
      this.setState({ values: this.props.values });
    }

    if (prevProps.initialStep !== this.props.initialStep) {
      this.setState({ step: this.props.initialStep });
    }
  }

  retrieveChildrenSteps = () => {
    let steps: React.ReactNode[] = [];
    if (Array.isArray(this.props.children)) {
      this.props.children.forEach((element) => {
        if (Array.isArray(element)) {
          //if the children type is an array
          element.forEach((_subElement: any) => {
            steps.push(_subElement);
          });
        } else {
          //if the children is a react component
          steps.push(element);
        }
      });
    } else {
      steps.push(this.props.children);
    }

    if (this.state.formSteps !== steps) {
      this.totalSteps = steps.length;
      this.setState({ formSteps: steps });
    }
  };

  renderStep = () => {
    return this.state.formSteps[this.state.step - 1];
  };

  nextStep = async (e: any) => {
    //cant use type SyntheticEvent because it's extended to add the "isValid" property to the submit event
    if (e.target.isValid) {
      let inputsValidArray = [];
      let formValues = serializeForm(e.target);
      let newValues = {}; //new value of form
      let newStepValue: any = {}; //new value of step
      if (this.state.stepValues[this.state.step]) {
        newStepValue = mergeValuesIncludingEmpty(this.state.stepValues[this.state.step], formValues); //merge initial value of this step with changes made
      } else {
        newStepValue = formValues;
      }
      this.cleanCheckboxValues(this.state.step, this.state.values);
      newValues = { ...this.state.values, ...newStepValue }; //merge complete form with this step
      if (this.state.step < this.totalSteps) {
        inputsValidArray = await this.validateStepInputs(this.formRef.current);
        if (!inputsValidArray.includes(false)) {
          let stepValuesCopy: any = { ...this.state.stepValues };
          stepValuesCopy[this.state.step] = newStepValue;

          const stepsData = [];
          for (let i = 1; i <= this.children.length; i++) {
            const thisStepData = {
              isValid: stepValuesCopy[i] ? true : false,
              isActive: i === this.state.step + 1 ? true : false,
            };
            stepsData.push(thisStepData);
          }

          const currentStepNum = this.state.step;
          const nextStepNum = currentStepNum + 1;
          this.setState({ step: nextStepNum, values: newValues, stepValues: stepValuesCopy });
          if (typeof this.props.onStepChange === "function") {
            this.props.onStepChange(stepsData, nextStepNum, currentStepNum);
          }
        }
      } else {
        inputsValidArray = await this.validateStepInputs(this.formRef.current);
        this.props.onSubmit(inputsValidArray);
      }
    }

    return e;
  };

  serialize = (force: boolean = false) => {
    let formValues = this.formRef && this.formRef.current ? this.formRef.current.serialize() : {};
    let stepValues: any = this.state.stepValues;
    let allvalues = {}; //new value of form
    let newStepValue = {}; //new value of step
    const stateValues = { ...this.state.values };
    // Avoid lose information when return to step 2
    if (!force) {
      if (stepValues[this.state.step] && stepValues[this.state.step].length) {
        newStepValue = mergeValuesIncludingEmpty(this.state.stepValues[this.state.step], formValues); //merge initial value of this step with changes made
      } else {
        newStepValue = formValues;
      }
    }
    this.cleanCheckboxValues(this.state.step, stateValues);
    // merge values
    allvalues = { ...stateValues, ...newStepValue }; //merge complete form with this step
    return allvalues;
  };
  cleanCheckboxValues = (step: number, stateValues: any) => {
    // Check box problem when merge values form not selected and state
    // Logic to do, get all values of state (stepValues not get all values) and do the same in mergeValues
    if (step && stateValues) {
      const inputs = this.formRef.current.inputs;
      if (step === 3) {
        stateValues.postType = [];
        stateValues.postMultiposting = "false";
      }
      if (step === 1) {
        stateValues.dataSalaryPubExternally = "false";
        stateValues.dataExclusive = "false";
        stateValues.dataNationwide = "false";
        if (inputs.findIndex((input: any) => input.name === "dataConfidential") !== -1) stateValues.dataConfidential = "false";
      }
    }
  };

  pevStep = () => {
    const values = this.serialize();
    const currentStepNum = this.state.step;

    if (currentStepNum > 1) {
      const prevStepNum = currentStepNum - 1;
      const stepsData: any[] = [];
      for (let i = 1; i <= this.children.length; i++) {
        const thisStepData = {
          isValid: i < 3 ? true : false,
          isActive: i === currentStepNum - 1 ? true : false,
        };
        stepsData.push(thisStepData);
      }
      this.setState({ step: prevStepNum, values: values }, () => {
        if (typeof this.props.onStepChange === "function") {
          this.props.onStepChange(stepsData, prevStepNum, currentStepNum);
        }
      });
    }
  };

  validateStepInputs = async (form: React.Component) => {
    let inputsValidArray: boolean[] = [];
    //this.formRef.current.state.inputs.forEach(async (element: any) => {
    if (this.formRef.current && this.formRef.current.inputs) {
      await this.formRef.current.inputs.forEach(async (element: BaseInput) => {
        if (element._isMounted) {
          const inputIsvalid = await validateInput(element, form);
          if (inputIsvalid !== false) {
            inputsValidArray.push(true);
          } else {
            inputsValidArray.push(false);
          }
        }
      });
    }

    return inputsValidArray;
  };

  renderButtons = (top: boolean) => {
    return (
      <div className={`form-wizard-buttons-group ${top ? "top" : "bottom"}`}>
        {this.state.step > 1 ? (
          <button type="button" className="button-secondary small" onClick={this.pevStep}>
            <span className="material-icons">arrow_back</span>
          </button>
        ) : null}
        {/* Next step */}
        {this.state.step < this.totalSteps ? (
          <button type="submit" className="button-secondary small" disabled={this.props.invalid}>
            <span className="material-icons">arrow_forward</span>
          </button>
        ) : null}

        {/* Submit button */}
        {this.state.step === this.totalSteps ? (
          <button type="submit" className="small" disabled={this.props.invalid}>
            Submit
          </button>
        ) : null}
      </div>
    );
  };

  render() {
    const values = this.state && this.state.values ? this.state.values : {};
    return (
      <Form onSubmit={this.nextStep} step={this.state.step} values={values} ref={this.formRef} noValidate>
        <Autosave onSaveAsDraft={this.props.onSaveAsDraft} status={this.props?.status} />
        {this.renderButtons(true)}
        <div className="form-wizard-content">{this.renderStep()}</div>
        {/* {this.renderButtons(false)} */}
      </Form>
    );
  }
}

export default FormWizard;
