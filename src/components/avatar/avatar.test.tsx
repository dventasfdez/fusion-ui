import { render } from "@testing-library/react";
import Avatar, { IAvatarProps } from "./avatar";

const AvatarTest = (props: IAvatarProps) => (
  <Avatar {...props}>
    <img className="avatar-test" src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar-img" />
  </Avatar>
);
describe("Avatar snapshots", () => {
  it("Avatar", () => {
    const { container } = render(<AvatarTest />);
    expect(container).toMatchSnapshot();
  });
  it("Avatar Big", () => {
    const { container } = render(<AvatarTest big />);
    expect(container).toMatchSnapshot();
  });
  it("Avatar Small", () => {
    const { container } = render(<AvatarTest small />);
    expect(container).toMatchSnapshot();
  });
  it("Avatar XSmall", () => {
    const { container } = render(<AvatarTest xsmall />);
    expect(container).toMatchSnapshot();
  });
});
// test("Avatar should render and match snapshot", () => {
//   const component = renderer.create(avatarTest({ badge: 8 }));
//   const tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });

// test("Avatar with no children", () => {
//   const component = renderer.create(<Avatar badge={8} />);
//   const tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });

// test("Avatar big should render and match snapshot", () => {
//   const component = renderer.create(avatarTest({ big: true, badge: 8 }));
//   const tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });

// test("Avatar small should render and match snapshot", () => {
//   const component = renderer.create(avatarTest({ small: true, badge: 8 }));
//   const tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });

// test("Avatar xsmall should render and match snapshot", () => {
//   const component = renderer.create(avatarTest({ xsmall: true, badge: 8 }));
//   const tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });

// test("Avatar with title should render and match snapshot", () => {
//   const component = renderer.create(avatarTest({ badge: 8, title: "Avatar" }));
//   const tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });

// test("Avatar with title and subtitle should render and match snapshot", () => {
//   const component = renderer.create(avatarTest({ badge: 8, title: "Avatar", subtitle: "Avatar subtitle" }));
//   const tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });

// test("Avatar with title and subtitle disabled should render and match snapshot", () => {
//   const onClick = jest.fn();
//   const component = renderer.create(avatarTest({ badge: 8, title: "Avatar", subtitle: "Avatar subtitle", disabled: true, onClick: onClick }));
//   const tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });
