import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LocationMapCard, { LocationMapCardBody, LocationMapCardHeader, LocationMapCardMap, LocationMapCardTop } from "./locationMapCard";
import Image from "next/image";

/**
 * LOCATION MAP CARD
 */
describe("Location map card snapshots", () => {
  it("Location map card", () => {
    const { container } = render(
      <LocationMapCard>
        <LocationMapCardMap data-testid="location-map">
          <img src="https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2016/05/543113-asi-funciona-google-maps-conexion-internet.jpg" alt="img-top" />
        </LocationMapCardMap>
        <LocationMapCardTop>
          <div className="status-tag_success">semantic</div>
        </LocationMapCardTop>
        <LocationMapCardHeader>
          <h4>Location, location city</h4>
          <button className="button-card-icon">
            <span className="material-icons">edit</span>
          </button>
        </LocationMapCardHeader>
        <LocationMapCardBody>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, voluptate!</LocationMapCardBody>
      </LocationMapCard>
    );

    expect(container).toMatchSnapshot();
  });
});

describe("Location map card funcionality", () => {
  it("Display button on hover card image", () => {
    const { getByTestId } = render(
      <LocationMapCard>
        <LocationMapCardMap
          data-testid="location-map"
          hoverButton={
            <button data-testid="location-map-hover-btn">
              <span className="material-icons">search</span>View more
            </button>
          }
        >
          <img src="https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2016/05/543113-asi-funciona-google-maps-conexion-internet.jpg" alt="img-top" />
        </LocationMapCardMap>
        <LocationMapCardTop>
          <div className="status-tag_success">semantic</div>
        </LocationMapCardTop>
        <LocationMapCardHeader>
          <h4>Location, location city</h4>
          <button className="button-card-icon">
            <span className="material-icons">edit</span>
          </button>
        </LocationMapCardHeader>
        <LocationMapCardBody>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, voluptate!</LocationMapCardBody>
      </LocationMapCard>
    );
    const mapImage = getByTestId("location-map");
    if (mapImage) fireEvent.mouseOver(mapImage);
    const viewMoreButton = getByTestId("location-map-hover-btn");
    expect(viewMoreButton).toBeDefined();
  });
  it("Location map card selected", () => {
    const { getByTestId } = render(
      <LocationMapCard selected data-testid="location-card">
        <LocationMapCardMap data-testid="location-map">
          <img src="https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2016/05/543113-asi-funciona-google-maps-conexion-internet.jpg" alt="img-top" />
        </LocationMapCardMap>
        <LocationMapCardTop>
          <div className="status-tag_success">semantic</div>
        </LocationMapCardTop>
        <LocationMapCardHeader>
          <h4>Location, location city</h4>
          <button className="button-card-icon">
            <span className="material-icons">edit</span>
          </button>
        </LocationMapCardHeader>
        <LocationMapCardBody>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, voluptate!</LocationMapCardBody>
      </LocationMapCard>
    );
    const card = getByTestId("location-card");
    expect(card).toHaveClass("card_map_selected");
  });
  it("Location map card with onClick", () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <LocationMapCard className="stepone-ui" onClick={onClick} data-testid="location-card">
        <LocationMapCardMap data-testid="location-map">
          <img src="https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2016/05/543113-asi-funciona-google-maps-conexion-internet.jpg" alt="img-top" />
        </LocationMapCardMap>
        <LocationMapCardTop>
          <div className="status-tag_success">semantic</div>
        </LocationMapCardTop>
        <LocationMapCardHeader>
          <h4>Location, location city</h4>
          <button className="button-card-icon">
            <span className="material-icons">edit</span>
          </button>
        </LocationMapCardHeader>
        <LocationMapCardBody>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, voluptate!</LocationMapCardBody>
      </LocationMapCard>
    );
    const card = getByTestId("location-card");
    if (card) fireEvent.click(card);
    expect(onClick).toHaveBeenCalled();
  });
});
