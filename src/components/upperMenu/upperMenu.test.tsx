import React, { useState } from "react";
import UpperMenu, { INotification } from "./upperMenu";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
const imageURI = "https://www.w3schools.com/howto/img_avatar.png";

const notifications: INotification[] = [
  {
    header: "Calendar availability",
    body: "Enter your profile to share your availability",
    type: "error",
    show: true,
    created: new Date(),
  },
  {
    header: "Header 2",
    body: "Enter your profile to share your availability",
    type: "info",
    show: true,
    created: new Date(),
  },
  {
    header: "Header 3",
    body: "Enter your profile to share your availability",
    type: "read",
    show: true,
    created: new Date(),
  },
  {
    header: "Header 5",
    body: "Enter your profile to share your availability",
    footer: <button>Footer button</button>,
    show: true,
    type: "warning",
    created: new Date(),
  },
  {
    header: "Header 4",
    body: "Enter your profile to share your availability",
    footer: <button>Footer button</button>,
    type: "warning",
    created: new Date(),
  },
  // @ts-expect-error no type
  {
    header: "Header 6",
    body: "Enter your profile to share your availability",
    footer: <button>Footer button</button>,
    created: new Date(),
    show: true,
  },
];

const UpperMenuTest = (props?: any) => {
  const [show, setShow] = useState(false);
  return (
    <UpperMenu
      notifications={{
        items: props?.emptyMessage ? [] : notifications,
        title: "Overflow Title",
        action: "OV Action",
        setShowItems: () => setShow(!show),
        showItems: show,
        emptyMessage: "No notifications",
      }}
      options={[
        {
          name: "Option",
          onClick: () => {
            return;
          },
        },
      ]}
      avatar={{ img: props?.imageElement || imageURI, title: "Patrick Doe", subtitle: "Regional Manager" }}
      {...props}
    />
  );
};

it("Upper Menu should render", () => {
  const component = renderer.create(<UpperMenuTest title="Section Name" data-testid="upper-menu" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("Upper Menu without test id should render", () => {
  const component = renderer.create(<UpperMenuTest title="Section Name" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("open overflowMenu", () => {
  const { getByTestId, getByText } = render(<UpperMenuTest title="Section Name" data-testid="upper-menu" />);
  const notifIcon = getByTestId("upper-menu-notif-icon");
  userEvent.click(notifIcon);
  expect(getByText(/Calendar availability/i)).toBeInTheDocument();
});

it("open overflowMenu without notifications", () => {
  const { getByTestId, getByText } = render(<UpperMenuTest title="Section Name" data-testid="upper-menu" emptyMessage />);
  const notifIcon = getByTestId("upper-menu-notif-icon");
  userEvent.click(notifIcon);
  expect(getByText(/No notifications/i)).toBeInTheDocument();
});

it("open dropdown menu", () => {
  const { container, getByTestId } = render(<UpperMenuTest title="Section Name" data-testid="upper-menu" />);
  const moreInfoButton = getByTestId("upper-menu-more-info");
  userEvent.click(moreInfoButton);
  expect(container.getElementsByClassName("dropdown-menu").length).toBe(1);
});

it("render upper menu without title and with other avatar img", () => {
  const { queryByTestId } = render(<UpperMenuTest data-testid="upper-menu" imageElement={<span>DV</span>} />);
  const upperMenuTitle = queryByTestId("upper-menu-title");
  expect(upperMenuTitle).not.toBeInTheDocument();
});
