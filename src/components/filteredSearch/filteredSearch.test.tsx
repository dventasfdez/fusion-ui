import React, { useRef, useState } from "react";
import Select from "../select/select";
import SelectOption from "../select/selectOption";
import FilteredSearch, { FilteredSearchTopSection, MoreFilters } from "./filteredSearch";
import renderer from "react-test-renderer";
import { fireEvent, prettyDOM, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

export const FilteredSearchTemplate = (args: any) => {
  const [openFilters, setOpenFilters] = useState(args?.open || false);
  return (
    <div className={"fusion-ui"}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target as any;
          const formData = new FormData(form);
          const data = Object.fromEntries(formData.entries());
          return data;
        }}
        onChange={(e) => {
          e.preventDefault();
          return e;
        }}
      >
        <FilteredSearch openFilters={openFilters}>
          <FilteredSearchTopSection>
            <input className="filtered-search-input" name="test" type="text" placeholder="Job Title or keyboard" />
            <Select placeholder="Location" name="Location">
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Igualada" label="Igualada" />
              <SelectOption value="Girona" label="Girona" />
            </Select>
            <button>Search</button>
            <div>
              <button type="button" className="filtered-search-toggle" role="openFilters" onClick={() => setOpenFilters(!openFilters)}>
                {openFilters ? "Clear All Filters" : "Add Filters"}
                <span className="material-icons">{openFilters ? "delete" : "filter_list"}</span>
              </button>
            </div>
          </FilteredSearchTopSection>
          <MoreFilters>
            <Select placeholder="Location" name="Location" className="filtered-search-filter-select">
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
            </Select>
            <Select placeholder="Location" name="Location" className="filtered-search-filter-select">
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
            </Select>
            <Select placeholder="Location" name="Location" className="filtered-search-filter-select">
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
            </Select>
            <Select placeholder="Location" name="Location" className="filtered-search-filter-select">
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
            </Select>
            <Select placeholder="Location" name="Location" className="filtered-search-filter-select">
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
            </Select>
            <Select placeholder="Location" name="Location" className="filtered-search-filter-select">
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
            </Select>
            <Select placeholder="Location" name="Location" className="filtered-search-filter-select">
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
            </Select>
            <Select placeholder="Location" name="Location" className="filtered-search-filter-select">
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
            </Select>
            <Select placeholder="Location" name="Location" className="filtered-search-filter-select">
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
            </Select>
            <Select placeholder="Location" name="Location" className="filtered-search-filter-select">
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
            </Select>
            <Select placeholder="Location" name="Location" className="filtered-search-filter-select">
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
            </Select>
            <Select placeholder="Location" name="Location" className="filtered-search-filter-select">
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
            </Select>
          </MoreFilters>
        </FilteredSearch>
      </form>
    </div>
  );
};

export const FilteredSearchTemplateWithoutOverflow = (args: any) => {
  const [openFilters, setOpenFilters] = useState(false);
  return (
    <div className={"fusion-ui"} style={{ width: "800px" }}>
      <form>
        <FilteredSearch openFilters={openFilters}>
          <FilteredSearchTopSection>
            <input className="filtered-search-input" name="test" type="text" placeholder="Job Title or keyboard" />
            <Select placeholder="Location" name="Location">
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Igualada" label="Igualada" />
              <SelectOption value="Girona" label="Girona" />
            </Select>
            <button>Search</button>
            <div>
              <button type="button" className="filtered-search-toggle" onClick={() => setOpenFilters(!openFilters)}>
                {openFilters ? "Clear All Filters" : "Add Filters"}
                <span className="material-icons">{openFilters ? "delete" : "filter_list"}</span>
              </button>
            </div>
          </FilteredSearchTopSection>
          <MoreFilters>
            <Select placeholder="Location" name="Location" className="filtered-search-filter-select">
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
            </Select>
            <Select placeholder="Location" name="Location" className="filtered-search-filter-select">
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
            </Select>
            <Select placeholder="Location" name="Location" className="filtered-search-filter-select">
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Barcelona" label="Barcelona" />
            </Select>
          </MoreFilters>
        </FilteredSearch>
      </form>
    </div>
  );
};

export const FilteredSearchTemplateNoMore = (args: any) => {
  const [openFilters, setOpenFilters] = useState(false);
  return (
    <div className={"fusion-ui"} style={{ width: "800px" }}>
      <form>
        <FilteredSearch openFilters={openFilters}>
          <FilteredSearchTopSection>
            <input className="filtered-search-input" name="test" type="text" placeholder="Job Title or keyboard" />
            <Select placeholder="Location" name="Location">
              <SelectOption value="Barcelona" label="Barcelona" />
              <SelectOption value="Igualada" label="Igualada" />
              <SelectOption value="Girona" label="Girona" />
            </Select>
            <button>Search</button>
            <div>
              <button type="button" className="filtered-search-toggle" role="openFilters" onClick={() => setOpenFilters(!openFilters)}>
                {openFilters ? "Clear All Filters" : "Add Filters"}
                <span className="material-icons">{openFilters ? "delete" : "filter_list"}</span>
              </button>
            </div>
          </FilteredSearchTopSection>
          <MoreFilters>
            <div>Bad data</div>
          </MoreFilters>
        </FilteredSearch>
      </form>
    </div>
  );
};

export const FilteredSearchTemplateNoTop = (args: any) => {
  const [openFilters, setOpenFilters] = useState(false);
  return (
    <div className={"fusion-ui"} style={{ width: "800px" }}>
      <form>
        <FilteredSearch openFilters={openFilters}>
          <MoreFilters>
            <div>Bad data</div>
          </MoreFilters>
        </FilteredSearch>
      </form>
    </div>
  );
};

it("render and match snapshot", () => {
  const component = renderer.create(<FilteredSearchTemplate />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("render with overflow buttons", async () => {
  // jest.useFakeTimers();
  const { container, getByRole } = render(
    <div style={{ width: "500px" }}>
      <FilteredSearchTemplate open />
    </div>
  );
  const openFilters = getByRole("openFilters");
  fireEvent.click(openFilters);

  waitFor(() => {
    const buttonRight = container.querySelector(".filtered-search-filter-navigation_right");
    const buttonLeft = container.querySelector(".filtered-search-filter-navigation_left");
    expect(buttonRight).toBeTruthy();
    expect(buttonLeft).toBeTruthy();
  });
});

it("render without more options", () => {
  const { container, getByRole } = render(<FilteredSearchTemplateNoMore />);
  fireEvent.click(getByRole("openFilters"));
  expect(container.querySelector("filtered-searc-filter-container-inner")?.childNodes).toBeUndefined();
});

it("render without top section", () => {
  const { container } = render(<FilteredSearchTemplateNoTop />);
  expect(container.querySelector("filtered-search-top")).toBeFalsy();
});

it("scroll", async () => {
  const { container, getByRole } = render(<FilteredSearchTemplate />);
  fireEvent.click(getByRole("openFilters"));

  waitFor(() => {
    const buttonRight = container.querySelector(".filtered-search-filter-navigation_right");
    if (buttonRight) fireEvent.click(buttonRight);
    expect(buttonRight).toBeTruthy();
  });
});

it("scroll interval", async () => {
  const { container, getByRole } = render(<FilteredSearchTemplate open={true} />);
  fireEvent.click(getByRole("openFilters"));
  let buttonRight: any = null;

  waitFor(() => {
    buttonRight = container.querySelector(".filtered-search-filter-navigation_right");
    if (buttonRight) {
      fireEvent.mouseDown(buttonRight);
    }
  });
});
