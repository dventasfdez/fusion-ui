import type { Meta, StoryObj } from "@storybook/react-vite";
import Carousel, { CarouselItem } from "./carousel";

const meta: Meta<typeof Carousel> = {
  title: "Components/Carousel",
  component: Carousel,
  args: {
    children: Array.from({ length: 5 }, (_, i) => (
      <CarouselItem id={`item-${i}`}>
        <img src="/fusion-ui-lockup.png" alt="" />
      </CarouselItem>
    )),
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Base: Story = {};
export const Outlined: Story = { args: { outlined: true } };
export const DefaultItem: Story = { args: { defaultItemSelected: "item-3" } };
export const DisabledItem: Story = {
  args: {
    children: Array.from({ length: 5 }, (_, i) => (
      <CarouselItem id={`item-${i}`} disabled={i === 3}>
        <img src="/fusion-ui-lockup.png" alt="" />
      </CarouselItem>
    )),
  },
};
