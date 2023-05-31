import React from "react";
import renderer from "react-test-renderer";
import ReactTestUtils, { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import { FormWizard, FormStep } from ".";
import { TextInput, CheckboxInput, RadioInput, TextArea } from "../forms";
import { required, email } from "../forms/utilities/validations";
import { cleanup } from "@testing-library/react";

let formWizardRef = undefined;
const submitWizard = (data) => {
  return data;
};

afterEach(cleanup);

class FormWizardExample extends React.Component {
  render() {
    formWizardRef = React.createRef();
    return (
      <FormWizard ref={formWizardRef} onSubmit={(data) => submitWizard(data)} hideSubmitButton={false}>
        <FormStep>
          <div className="p10">
            <p className="h4">step 1</p>
            <TextInput label={"Name"} name="name" type="text" key={1} validations={[required]} />
            <TextInput label={"Surname"} name="surname" type="text" key={2} validations={[]} />
          </div>
        </FormStep>
        <FormStep>
          <div className="p10">
            <p className="h4">step 2</p>
            <TextArea validations={[required]} placeholder="Default text" key={3} name="myTextArea" label="Default Textarea" validateBeforeSubmit={false} />
            <TextInput label={"Email"} name="email" type="email" key={4} validations={[required, email]} />
          </div>
        </FormStep>
        <FormStep>
          <div className="p10">
            <p className="h4">step 3</p>
            <TextInput label={"Address line 1"} name="addr1" type="text" validations={[required]} />
            <TextInput label={"Address line 1"} name="addr2" type="text" validations={[required]} />
            <TextInput label={"Address line 1"} name="addr3" type="text" validations={[required]} />
          </div>
        </FormStep>
        <FormStep>
          <div className="p10">
            <p className="h4">step 4</p>
            <div className="pl10">
              <CheckboxInput name="timeSensitive" type="checkbox" label="Once a week" value={"1"} />
            </div>
            <div className="pl10">
              <CheckboxInput name="temperatureSensitive" type="checkbox" label="Potatoes" value={"1"} />
            </div>
            <div className="pl10">
              <CheckboxInput name="critical" type="checkbox" label="Critical" value={"1"} />
            </div>
            <div className="pl10">
              <RadioInput validations={[required]} name="myRadio" validateBeforeSubmit={false} label="radio 1" value="radio1" />
              <RadioInput validations={[required]} name="myRadio" validateBeforeSubmit={false} label="radio 2" value="radio2" />
              <RadioInput className="mb20" validations={[required]} name="myRadio" validateBeforeSubmit={false} label="radio 3" value="radio3" />
            </div>
          </div>
        </FormStep>
        <FormStep>
          <div className="p10 mb-4">
            <h3>Thanks for your interest</h3>
            <button type="submit" className="btn btn-primary ">
              Submit my data
            </button>
          </div>
        </FormStep>
      </FormWizard>
    );
  }
}

test("Should render", () => {
  const component = renderer.create(<FormWizardExample />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Should NOT move to next step if form is not valid", async () => {
  let container = document.createElement("div");
  document.body.appendChild(container);
  ReactDOM.render(<FormWizardExample />, container);
  const _formWizardRef = formWizardRef;
  try {
    await _formWizardRef.current.formRef.current.submit();
    await new Promise((r) => setTimeout(r, 1)); //wait for the updatestates related to submit
    expect(container.querySelectorAll("textarea[name='myTextArea']").length).toBe(0);
    expect(container.querySelectorAll("input[name='email']").length).toBe(0);
  } catch (ex) {}
});

test("Should move to next step", async () => {
  let container = document.createElement("div");
  document.body.appendChild(container);
  ReactDOM.render(<FormWizardExample />, container);
  ReactTestUtils.Simulate.change(container.querySelector("*[name='name']"), {
    target: { value: "NameValue" },
  });
  ReactTestUtils.Simulate.change(container.querySelector("*[name='surname']"), {
    target: { value: "SurnameValue" },
  });
  const _formWizardRef = formWizardRef;
  act(async () => {
    _formWizardRef.current.formRef.current.submit();
  }).then(() => {
    expect(container.querySelectorAll("textarea[name='myTextArea']").length).toBe(1);
    expect(container.querySelectorAll("input[name='email']").length).toBe(1);
  });
});

// test("Should move to 3rd step", async () => {
//   let container = document.createElement("div");
//   document.body.appendChild(container);
//   ReactDOM.render(<FormWizardExample />, container);
//   ReactTestUtils.Simulate.change(container.querySelector("*[name='name']"), {
//     target: { value: "NameValue" },
//   });
//   ReactTestUtils.Simulate.change(container.querySelector("*[name='surname']"), {
//     target: { value: "SurnameValue" },
//   });
//   const _formWizardRef = formWizardRef;

//   act(async () => {
//     _formWizardRef.current.formRef.current.submit();
//   }).then(() => {
//     expect(container.querySelectorAll("textarea[name='myTextArea']").length).toBe(1);
//     ReactTestUtils.Simulate.change(container.querySelector("textarea[name='myTextArea']"), {
//       target: { value: "myTextAreaValue" },
//     });
//     ReactTestUtils.Simulate.change(container.querySelector("input[name='email']"), {
//       target: { value: "email@value.com" },
//     });
//     act(async () => {
//       _formWizardRef.current.formRef.current.submit();
//     }).then(() => {
//       setImmediate(() => {
//         expect(container.querySelectorAll("input[name='addr1']").length).toBe(1);
//         expect(container.querySelectorAll("input[name='addr2']").length).toBe(1);
//         expect(container.querySelectorAll("input[name='addr3']").length).toBe(1);
//       });
//     });
//   });
// });

test("State should match snapshot after navigating ", async () => {
  let container = document.createElement("div");
  document.body.appendChild(container);
  ReactDOM.render(<FormWizardExample />, container);
  ReactTestUtils.Simulate.change(container.querySelector("*[name='name']"), {
    target: { value: "NameValue" },
  });
  ReactTestUtils.Simulate.change(container.querySelector("*[name='surname']"), {
    target: { value: "SurnameValue" },
  });
  const _formWizardRef = formWizardRef;
  act(async () => {
    _formWizardRef.current.formRef.current.submit();
  }).then(async () => {
    await new Promise((r) => setTimeout(r, 1)); //wait for the updatestates related to submit
    let state = JSON.stringify(_formWizardRef.current.state.values);
    expect(state).toEqual('{"name":"NameValue","surname":"SurnameValue"}');
  });
});
