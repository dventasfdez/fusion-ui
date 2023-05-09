import React from 'react';
import renderer from 'react-test-renderer';
import Card, {CardBody, CardFloatButtons, CardFooter, CardHeader, CardImg, CardTop} from './card';
const cardExample = (props?: any) => (
  <Card {...props}>
    <CardImg>
      <img
        src="https://img.freepik.com/fotos-premium/edificios-modernos-torre-o-rascacielos-distrito-financiero-nubes-dia-soleado-chicago-ee-uu_43552-32.jpg?w=2000"
        alt="img-top"
      />
    </CardImg>
    <CardFloatButtons>
      <button className="button-card-icon">
        <span className="material-icons">more_vert</span>
      </button>
    </CardFloatButtons>
    <CardTop>
      <div className="status-tag_success">semantic</div>
      <span className="tag">{'06 SEP 2022'}</span>
    </CardTop>
    <CardHeader>
      <img
        className="avatar_big"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTJnPEjXsq9Pon-z_hzb56i-_qXsSPddCxmA&usqp=CAU"
        alt=""
      />
      <h4>This is a title</h4>
      <span className="subtitle">And this is a subtitle</span>
    </CardHeader>
    <CardBody>
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae doloribus illum nam est necessitatibus
        voluptatibus quam quae iusto ea consequuntur dolores saepe rem porro quasi, quis optio dolor consequatur perferendis
        voluptates temporibus corrupti veritatis error ipsa. Perspiciatis et voluptate totam magni vel magnam debitis est rem
        quisquam, ipsum, placeat culpa?
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
            </a>{' '}
            |{' '}
            <a className="small" href="" key={6}>
              Gmail
            </a>{' '}
            |{' '}
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

/**
 * CARD
 */
describe('Vertical and horizontal card type tests', () => {
  test('Card component should render', () => {
    const component = renderer.create(cardExample({className: 'tag-ds'}));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Card component without class name should render', () => {
    const component = renderer.create(cardExample({id: 'card'}));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Card selected component should render', () => {
    const component = renderer.create(cardExample({className: 'tag-ds', selected: true}));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Card horizontal component should render', () => {
    const component = renderer.create(cardExample({className: 'tag-ds', horizontal: true}));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Card horizontal without class name component should render', () => {
    const component = renderer.create(cardExample({id: 'card-horizontal', horizontal: true}));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Card horizontal selected component should render', () => {
    const component = renderer.create(cardExample({className: 'tag-ds', horizontal: true, selected: true}));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
