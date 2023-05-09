import { fireEvent, render } from "@testing-library/react";
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
  it("Avatar XSmall", () => {
    const { container } = render(<AvatarTest xsmall />);
    expect(container).toMatchSnapshot();
  });
  it("Avatar with Badge", () => {
    const { container } = render(<AvatarTest xsmall badge={8} />);
    expect(container).toMatchSnapshot();
  });
  it("Avatar with Title", () => {
    const { container } = render(<AvatarTest xsmall badge={8} title="Name and surname" />);
    expect(container).toMatchSnapshot();
  });
  it("Avatar with Title and Subtitle", () => {
    const { container } = render(<AvatarTest xsmall badge={8} title="Name and surname" subtitle="Job position" />);
    expect(container).toMatchSnapshot();
  });
});

describe("Avatar funcionality", () => {
  it("Avatar XSmall with badge", () => {
    const { container } = render(<AvatarTest xsmall badge={8} />);
    expect(container.getElementsByClassName("badge").length).toBe(0);
  });

  it("Avatar onClick", () => {
    const onClick = jest.fn();
    const { container, getByTestId } = render(<AvatarTest data-testid="avatar" onClick={onClick} />);
    const avatarBtn = getByTestId("avatar-button");
    if (avatarBtn) fireEvent.click(avatarBtn);
    expect(onClick).toBeCalled();
  });
});
