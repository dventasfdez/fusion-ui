import React from "react";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
import SelectFilter, { Option } from "./select-filter";
import { required } from "../forms/utilities/validations";

const SelectFilterExample = () => {
  return (
  <div>
     <SelectFilter className="mb2" tooltip="tooltip example" label="Select Colour (multiple)" validations={[required]} value={["1", "5"]} multiple={true} name="color">
       <Option value="1" label="Red" />
       <Option value="2" label="Yellow" />
        <Option value="3" label="Orange" />
       <Option value="4" label="Pink" />
       <Option value="5" label="Purple" />
       <Option value="6" label="Blue" />
       <Option value="7" label="Grey" />
       <Option value="8" label="White" />
       <Option value="9" label="Black" />
     </SelectFilter>

    </div>
  );
};

test("SelectFilter should render and match snapshot", () => {
  ReactDOM.createPortal = jest.fn((dummy) => dummy); //overrides the create portan function
  const component = renderer.create(<SelectFilterExample />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


