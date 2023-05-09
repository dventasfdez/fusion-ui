import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Accordion, { AccordionContent, AccordionHeader, IAccordionProps } from "./accordion";

const accordionExample = (props?: IAccordionProps) => (
  <Accordion {...props} className="tag-ds" data-testid="accordion">
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
const accordionExampleWithoutClassName = (props?: IAccordionProps) => (
  <Accordion {...props}>
    <AccordionHeader>
      Accordion example
      <span className="accordion-helper-text">Helper</span>
    </AccordionHeader>
    <AccordionContent>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos eaque beatae pariatur maiores excepturi, sequi natus obcaecati vel neque reiciendis, cumque quis alias exercitationem quo
      tempore corrupti odit atque quae, facilis aut molestiae incidunt rerum dolore. Blanditiis quis at est, numquam ad temporibus error iure quae? Eius unde quam accusantium.
    </AccordionContent>
  </Accordion>
);
const accordionExampleWithoutHeader = (props?: IAccordionProps) => (
  <Accordion {...props} className="tag-ds">
    <AccordionContent>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos eaque beatae pariatur maiores excepturi, sequi natus obcaecati vel neque reiciendis, cumque quis alias exercitationem quo
      tempore corrupti odit atque quae, facilis aut molestiae incidunt rerum dolore. Blanditiis quis at est, numquam ad temporibus error iure quae? Eius unde quam accusantium.
    </AccordionContent>
  </Accordion>
);

describe("Accordion snapshots", () => {
  it("Accordion should render", () => {
    const { container } = render(accordionExample());

    expect(container).toMatchSnapshot();
  });
});
// test();

// test('Accordion default show content should render', () => {
//   const component = renderer.create(accordionExample({defaultShow: true}));
//   const tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });

// test('Accordion filled should render', () => {
//   const component = renderer.create(accordionExample({filled: true}));
//   const tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });

// test('Accordion filled show content should render', () => {
//   const component = renderer.create(accordionExample({defaultShow: true, filled: true}));
//   const tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });

// test('Accordion without header should render', () => {
//   const component = renderer.create(accordionExampleWithoutHeader());
//   const tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });

// test('Accordion without class name should render', () => {
//   const component = renderer.create(accordionExampleWithoutClassName());
//   const tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });

// test('Click accordion header', () => {
//   const {container, getByTestId} = render(accordionExample({'data-testid': 'accordion'}));
//   expect(container.getElementsByClassName('accordion-content').length).toBe(0);
//   const accordionHeader = getByTestId('accordion-header');
//   if (accordionHeader) fireEvent.click(accordionHeader);
//   expect(container.getElementsByClassName('accordion-content').length).toBe(1);
// });

// test('Rerender accordion', () => {
//   const {container, rerender} = render(accordionExample({'data-testid': 'accordion', defaultShow: true}));
//   expect(container.getElementsByClassName('accordion-content').length).toBe(1);
//   rerender(accordionExample({'data-testid': 'accordion', defaultShow: false}));
//   expect(container.getElementsByClassName('accordion-content').length).toBe(0);
// });
