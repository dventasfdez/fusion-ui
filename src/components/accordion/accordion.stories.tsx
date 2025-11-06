import type { Meta, StoryObj } from "@storybook/react-vite";
import Accordion, {
  AccordionHeader,
  AccordionContent,
  AccordionGroup,
} from "./accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  subcomponents: {
    AccordionHeader,
    AccordionContent,
    AccordionGroup,
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionHeader>Accordion header</AccordionHeader>
      <AccordionContent>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione non
        ullam quia magni modi amet, tempore doloremque incidunt libero obcaecati
        ad earum? Voluptate perspiciatis ut quaerat incidunt optio sunt non?
      </AccordionContent>
    </Accordion>
  ),
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Base: Story = {};
export const filled: Story = {
  args: {
    filled: true,
  },
};

export const Group: Story = {
  render: (args) => (
    <AccordionGroup>
      {Array.from(
        {
          length: 4,
        },
        (_, index) => (
          <Accordion id={index + ""} key={index} {...args}>
            <AccordionHeader>Accordion header</AccordionHeader>
            <AccordionContent>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione
              non ullam quia magni modi amet, tempore doloremque incidunt libero
              obcaecati ad earum? Voluptate perspiciatis ut quaerat incidunt
              optio sunt non?
            </AccordionContent>
          </Accordion>
        )
      )}
    </AccordionGroup>
  ),
};
