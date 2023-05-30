import { render } from "@testing-library/react";
import Card, { CardBody, CardFloatButtons, CardFooter, CardHeader, CardImg, CardTop } from "./card";
const CardTest = (props?: any) => (
  <Card {...props}>
    <CardImg>
      <img src="https://img.freepik.com/fotos-premium/edificios-modernos-torre-o-rascacielos-distrito-financiero-nubes-dia-soleado-chicago-ee-uu_43552-32.jpg?w=2000" alt="img-top" />
    </CardImg>
    <CardFloatButtons>
      <button className="button-card-icon">
        <span className="material-icons">more_vert</span>
      </button>
    </CardFloatButtons>
    <CardTop>
      <div className="status-tag_success">semantic</div>
      <span className="tag">{"06 SEP 2022"}</span>
    </CardTop>
    <CardHeader>
      <img className="avatar_big" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTJnPEjXsq9Pon-z_hzb56i-_qXsSPddCxmA&usqp=CAU" alt="" />
      <h4>This is a title</h4>
      <span className="subtitle">And this is a subtitle</span>
    </CardHeader>
    <CardBody>
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae doloribus illum nam est necessitatibus voluptatibus quam quae iusto ea consequuntur dolores saepe rem porro quasi, quis
        optio dolor consequatur perferendis voluptates temporibus corrupti veritatis error ipsa. Perspiciatis et voluptate totam magni vel magnam debitis est rem quisquam, ipsum, placeat culpa?
      </span>
      <ul className="list-icon_small">
        <li className="item-double" key={1}>
          <span className="material-icons icon-order">alternate_email</span>
          Email <span>adecco@adecco.com</span>
        </li>
        <li className="item-double" key={2}>
          <span className="material-icons icon-order">phone</span>
          Phone <span>000 000 000</span>
        </li>
        <li className="item-double" key={3}>
          <span className="material-icons icon-order">link</span>
          Links
          <span>
            <a className="small" href="" key={5}>
              Linkedin
            </a>{" "}
            |{" "}
            <a className="small" href="" key={6}>
              Gmail
            </a>{" "}
            |{" "}
            <a className="small" href="" key={7}>
              CV
            </a>
          </span>
        </li>
        <li className="item-double" key={4}>
          <span className="material-icons icon-order">schedule</span>
          Period <span>08:30 / 18:30</span>
        </li>
      </ul>
    </CardBody>
    <CardFooter>
      <a href="">link</a>
      <button>My button text</button>
    </CardFooter>
  </Card>
);
describe("Vertical card snapshots", () => {
  it("Vertical card", () => {
    const { container } = render(<CardTest />);
    expect(container).toMatchSnapshot();
  });

  it("Vertical card selected", () => {
    const { container } = render(<CardTest selected />);
    expect(container).toMatchSnapshot();
  });
});

describe("Horizontal card snapshots", () => {
  it("Horizontal card", () => {
    const { container } = render(<CardTest horizontal />);
    expect(container).toMatchSnapshot();
  });

  it("Horizontal card selected", () => {
    const { container } = render(<CardTest horizontal selected />);
    expect(container).toMatchSnapshot();
  });
});
