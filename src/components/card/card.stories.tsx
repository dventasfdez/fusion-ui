import type { Meta, StoryObj } from "@storybook/react-vite";
import Card, {
  CardBody,
  CardFloat,
  CardFooter,
  CardHeader,
  CardImg,
} from "./card";
import IconButton from "../button/icon";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  args: {
    children: [
      <CardImg>
        <img src="/fusion-ui-lockup.png" alt="logo" />
      </CardImg>,
      <CardHeader>Card Header</CardHeader>,
      <CardBody>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque eius
        nesciunt minima laborum eveniet vero. Iste exercitationem magni quasi,
        assumenda excepturi eveniet voluptas voluptatibus qui omnis illum quam
        quis accusamus.
      </CardBody>,
      <CardFooter>Lorem, ipsum dolor.</CardFooter>,
    ],
  },
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

export const WithFloatElements: Story = {
  render: (args) => (
    <Card {...args}>
      <CardImg>
        <img
          src={args.orientation ? "/fusion-ui.png" : "/fusion-ui-lockup.png"}
          alt="logo"
        />
      </CardImg>
      <CardFloat>
        <IconButton name="search" variant="outlined" color="neutral" />
      </CardFloat>
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

export const HorizontalWithFloatElements: Story = {
  render: (args) => (
    <Card {...args}>
      <CardImg>
        <img
          src={args.orientation ? "/fusion-ui.png" : "/fusion-ui-lockup.png"}
          alt="logo"
        />
      </CardImg>
      <CardFloat>
        <IconButton name="search" variant="outlined" color="neutral" />
      </CardFloat>
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
export const WithFloatElementsAndImgBackground: Story = {
  render: (args) => (
    <Card {...args}>
      <CardImg variant="background">
        <img
          src={args.orientation ? "/fusion-ui.png" : "/fusion-ui-lockup.png"}
          alt="logo"
        />
      </CardImg>
      <CardFloat>
        <IconButton name="search" variant="outlined" color="neutral" />
      </CardFloat>
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
