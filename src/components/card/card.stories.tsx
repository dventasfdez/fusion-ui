import type { Meta, StoryObj } from "@storybook/react-vite";
import Card, {
  CardBody,
  CardFloatButtons,
  CardFooter,
  CardHeader,
  CardImg,
} from "./card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  render: (args) => (
    <Card {...args}>
      <CardImg>
        <img
          src={args.orientation ? "/fusion-ui.png" : "/fusion-ui-lockup.png"}
          alt="logo"
        />
      </CardImg>
      <CardHeader>Card Header</CardHeader>
      <CardBody>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque eius
        nesciunt minima laborum eveniet vero. Iste exercitationem magni quasi,
        assumenda excepturi eveniet voluptas voluptatibus qui omnis illum quam
        quis accusamus.
      </CardBody>
      <CardFooter>Lorem, ipsum dolor.</CardFooter>
    </Card>
  ),
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Base: Story = {};

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
  },
};

export const WithImgBackground: Story = {
  render: (args) => (
    <Card {...args}>
      <CardImg variant="background">
        <img
          src={args.orientation ? "/fusion-ui.png" : "/fusion-ui-lockup.png"}
          alt="logo"
        />
      </CardImg>
      <CardHeader>Card Header</CardHeader>
      <CardBody>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque eius
        nesciunt minima laborum eveniet vero. Iste exercitationem magni quasi,
        assumenda excepturi eveniet voluptas voluptatibus qui omnis illum quam
        quis accusamus.
      </CardBody>
      <CardFooter>Lorem, ipsum dolor.</CardFooter>
    </Card>
  ),
};

export const HorizontalWithImgBackground: Story = {
  render: (args) => (
    <Card {...args}>
      <CardImg variant="background">
        <img
          src={args.orientation ? "/fusion-ui.png" : "/fusion-ui-lockup.png"}
          alt="logo"
        />
      </CardImg>
      <CardHeader>Card Header</CardHeader>
      <CardBody>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque eius
        nesciunt minima laborum eveniet vero. Iste exercitationem magni quasi,
        assumenda excepturi eveniet voluptas voluptatibus qui omnis illum quam
        quis accusamus.
      </CardBody>
      <CardFooter>Lorem, ipsum dolor.</CardFooter>
    </Card>
  ),
  args: {
    orientation: "horizontal",
  },
};
