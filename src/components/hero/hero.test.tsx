import React from 'react';
import Hero, {HeroBody, HeroFooter, HeroHeader} from './hero';
import HeroBackground from './heroBackground';
import Avatar from '../avatar/avatar';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

const HeroContentTest = (
  <Hero>
    <HeroBackground>
      <img src="https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg" />
    </HeroBackground>
    <HeroHeader>
      <span>This is a title</span>
      <span>This is a subtitle</span>
    </HeroHeader>
    <HeroBody>
      <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit</span>
      <button>my button text</button>
    </HeroBody>
    <HeroFooter>
      <span>This is a caption</span>
      <div>
        <button className="chip">label</button>
        <button className="chip">label</button>
        <button className="chip">label</button>
      </div>
    </HeroFooter>
  </Hero>
);

const HeroInteriorTest = (
  <Hero interior>
    <HeroBackground>
      <img src="https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg" />
    </HeroBackground>
    <HeroHeader>
      <a href="#">
        <span className="material-icons">chevron_left</span>
        <span>Go back</span>
      </a>
      <span>This is a title</span>
    </HeroHeader>
    <HeroBody>
      <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit</span>
      <Avatar xsmall title="Your name" subtitle="Your role">
        <img src="https://www.w3schools.com/howto/img_avatar.png" />
      </Avatar>
    </HeroBody>
  </Hero>
);

const HeroSearchTest = (
  <Hero search>
    <HeroBackground>
      <img src="https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg" />
    </HeroBackground>
    <HeroHeader>
      <span>This is a title</span>
      <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit</span>
    </HeroHeader>
    <HeroBody>
      <div>
        <div className="input-wrapper">
          <label className="caption">Ocupation</label>
          <div className="input-container">
            <input type="text" placeholder="Forklift Driver" required={false} />
          </div>
        </div>
        <div className="input-wrapper">
          <label className="caption">Location</label>
          <div className="input-container">
            <input type="text" placeholder="Madrid, ESP" required={false} />
          </div>
        </div>
        <button>search button</button>
      </div>
    </HeroBody>
    <HeroFooter>
      <span>This is a caption</span>
      <div>
        <button className="chip">label</button>
        <button className="chip">label</button>
        <button className="chip">label</button>
      </div>
    </HeroFooter>
  </Hero>
);

test('Hero interior should render', () => {
  const component = renderer.create(HeroInteriorTest);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Hero content should render', () => {
  const component = renderer.create(HeroContentTest);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Hero search should render', () => {
  const component = renderer.create(HeroSearchTest);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
