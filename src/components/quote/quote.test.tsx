import React from "react";
import Quote, { IQuote, QuoteText } from "./quote";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import Avatar from "../avatar/avatar";

const QuoteTest = (args: IQuote) => {
  return <Quote {...args} data-testid="quote" />;
};

const avatar = (
  <Avatar title="Name and Surname" subtitle="Charge">
    <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
  </Avatar>
);

const avatarSpan = (
  <Avatar title="Name and Surname" subtitle="Charge">
    <span>avatar</span>
  </Avatar>
);

it("render quote component and match snapshot", () => {
  const component = renderer.create(
    <QuoteTest>
      <QuoteText>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa commodi officiis optio magni! Perferendis doloremque similique quas magnam repellendus facere voluptatem tenetur possimus
        cupiditate rerum suscipit, accusamus ullam magni odio.
      </QuoteText>
    </QuoteTest>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("render default quote component", () => {
  const { getByTestId } = render(
    <QuoteTest>
      <QuoteText>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa commodi officiis optio magni! Perferendis doloremque similique quas magnam repellendus facere voluptatem tenetur possimus
        cupiditate rerum suscipit, accusamus ullam magni odio.
      </QuoteText>
    </QuoteTest>
  );
  const quote = getByTestId("quote");
  expect(quote).toBeInTheDocument();
});

it("render quote component with avatar", () => {
  const { container } = render(
    <QuoteTest>
      <QuoteText>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa commodi officiis optio magni! Perferendis doloremque similique quas magnam repellendus facere voluptatem tenetur possimus
        cupiditate rerum suscipit, accusamus ullam magni odio.
      </QuoteText>
      {avatar}
    </QuoteTest>
  );
  const quote = container.getElementsByClassName("avatar-wrapper")[0];
  expect(quote).toBeInTheDocument();
});
it("render quote component with avatar with span", () => {
  const { container } = render(
    <QuoteTest>
      <QuoteText>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa commodi officiis optio magni! Perferendis doloremque similique quas magnam repellendus facere voluptatem tenetur possimus
        cupiditate rerum suscipit, accusamus ullam magni odio.
      </QuoteText>
      {avatarSpan}
    </QuoteTest>
  );
  const quote = container.getElementsByClassName("avatar-wrapper")[0];
  expect(quote).toBeInTheDocument();
});
