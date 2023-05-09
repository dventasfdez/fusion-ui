import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Accordion, { AccordionContent, AccordionHeader, IAccordionProps } from "./accordion";

const AccordionExample = (props?: IAccordionProps) => (
  <Accordion {...props} data-testid="accordion">
    <AccordionHeader data-testid="accordion-header">
      Accordion example
      <span className="accordion-helper-text">Helper</span>
    </AccordionHeader>
    <AccordionContent data-testid="accordion-content">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos eaque beatae pariatur maiores excepturi, sequi natus obcaecati vel neque reiciendis, cumque quis alias exercitationem quo
      tempore corrupti odit atque quae, facilis aut molestiae incidunt rerum dolore. Blanditiis quis at est, numquam ad temporibus error iure quae? Eius unde quam accusantium.
    </AccordionContent>
  </Accordion>
);

describe("Accordion snapshots", () => {
  it("Accordion", () => {
    const { container } = render(<AccordionExample />);
    expect(container).toMatchSnapshot();
  });
  it("Accordion default show", () => {
    const { container } = render(<AccordionExample defaultShow />);
    expect(container).toMatchSnapshot();
  });
  it("Accordion filled", () => {
    const { container } = render(<AccordionExample filled />);
    expect(container).toMatchSnapshot();
  });
  it("Accordion filled default show", () => {
    const { container } = render(<AccordionExample filled />);
    expect(container).toMatchSnapshot();
  });
});

describe("Accordion functionality", () => {
  it("Click in accordion header", () => {
    const onClick = jest.fn();
    const { container, getByTestId } = render(<AccordionExample data-testid="accordion" onClick={onClick} />);
    expect(container.getElementsByClassName("accordion-content").length).toBe(0);
    const accordionHeader = getByTestId("accordion-header");
    if (accordionHeader) fireEvent.click(accordionHeader);
    expect(onClick).toBeCalled();
    expect(container.getElementsByClassName("accordion-content").length).toBe(1);
  });

  it("Rerender accordion", () => {
    const { container, rerender } = render(<AccordionExample defaultShow />);
    expect(container.getElementsByClassName("accordion-content").length).toBe(1);
    rerender(<AccordionExample defaultShow={false} />);
    expect(container.getElementsByClassName("accordion-content").length).toBe(0);
  });
});
