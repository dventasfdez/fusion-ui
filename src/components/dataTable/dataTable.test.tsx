import React from "react";
import { DataTable, DataTableActionBar, DataTableTopToolbar } from "./dataTable";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";
import Tabs, { TabItem } from "../tabs/tabs";
import Searchbox from "../searchbox/searchbox";
import Table, { TBody, TElement, THead, TRow } from "../table/table";
import Paginator from "../paginator/paginator";
import { fireEvent, render } from "@testing-library/react";

const leftElements = [
  <div key={1} className="checkbox-container">
    <input
      id="checkbox"
      onChange={(e) => {
        return e;
      }}
      type="checkbox"
      key={2}
    />
  </div>,
];

const rightElements = [
  <div key={3} className="checkbox-container">
    <input
      id="checkbox"
      onChange={(e) => {
        return e;
      }}
      type="checkbox"
      key={30}
    />
  </div>,
];

export const elements = [
  ["Content", "Content", "Content", "Content", "Content", "Content", "Content"],
  ["Content", "Content", "Content", "Content", "Content", "Content", "Content"],
  ["Content", "Content", "Content", "Content", "Content", "Content", "Content"],
  ["Content", "Content", "Content", "Content", "Content", "Content", "Content"],
  ["Content", "Content", "Content", "Content", "Content", "Content", "Content"],
];
export const elements2 = [
  ["Content2", "Content2", "Content2", "Content2", "Content2", "Content2", "Content2"],
  ["Content2", "Content2", "Content2", "Content2", "Content2", "Content2", "Content2"],
  ["Content2", "Content2", "Content2", "Content2", "Content2", "Content2", "Content2"],
  ["Content2", "Content2", "Content2", "Content2", "Content2", "Content2", "Content2"],
  ["Content2", "Content2", "Content2", "Content2", "Content2", "Content2", "Content2"],
];
export const elements3 = [
  ["Content3", "Content3", "Content3", "Content3", "Content3", "Content3", "Content3"],
  ["Content3", "Content3", "Content3", "Content3", "Content3", "Content3", "Content3"],
  ["Content3", "Content3", "Content3", "Content3", "Content3", "Content3", "Content3"],
  ["Content3", "Content3", "Content3", "Content3", "Content3", "Content3", "Content3"],
  ["Content3", "Content3", "Content3", "Content3", "Content3", "Content3", "Content3"],
];

export const elementPages = [elements, elements2, elements3];

export const headElements = ["Label", "Label", "Label", "Label", "Label", "Label", "Label"];

const DataTableTest = (args: any) => {
  return (
    <DataTable {...args}>
      <DataTableTopToolbar key={Math.random() * 100}>
        {args?.withTabs ? (
          <Tabs>
            <TabItem id="item1" title="Tab label 01">
              <DataTableActionBar>
                <span className="data-table-items-selected">8 items selected</span>
                <div className="data-table-action-items">
                  <a href="#">Action</a>
                  <a href="#">Action</a>
                  <a href="#">Action</a>
                  <a href="#">Action</a>
                  <a href="#">Action</a>
                </div>
              </DataTableActionBar>
              <Table>
                <THead>
                  <TRow>
                    {leftElements.map((elem, idk) => (
                      <TElement key={"test" + idk}>{elem}</TElement>
                    ))}
                    {headElements.map((elem, idk) => (
                      <TElement key={"test" + idk}>{elem}</TElement>
                    ))}
                    {rightElements.map((elem, idk) => (
                      <TElement key={"test" + idk}>{elem}</TElement>
                    ))}
                  </TRow>
                </THead>
                <TBody>
                  {elements.map((_, idx) => (
                    <TRow key={idx}>
                      {leftElements.map((elem, idk) => (
                        <TElement key={"test" + idk}>{elem}</TElement>
                      ))}
                      {_.map((elem, idk) => (
                        <TElement key={idx + "string" + idk}>{elem}</TElement>
                      ))}
                      {rightElements.map((elem, idk) => (
                        <TElement key={"test" + idk}>{elem}</TElement>
                      ))}
                    </TRow>
                  ))}
                </TBody>
              </Table>
              <Paginator pages={10} collapsed collapsedOptions={{ jump: "all" }} />
            </TabItem>
            <TabItem id="item2" title="Tab label 02">
              <DataTableActionBar>
                <span className="data-table-items-selected">8 items selected</span>
                <div className="data-table-action-items">
                  <a href="#">Action</a>
                  <a href="#">Action</a>
                  <a href="#">Action</a>
                  <a href="#">Action</a>
                  <a href="#">Action</a>
                </div>
              </DataTableActionBar>
              <Table>
                <THead>
                  <TRow>
                    {leftElements.map((elem, idk) => (
                      <TElement key={"test" + idk}>{elem}</TElement>
                    ))}
                    {headElements.map((elem, idk) => (
                      <TElement key={"test" + idk}>{elem}</TElement>
                    ))}
                    {rightElements.map((elem, idk) => (
                      <TElement key={"test" + idk}>{elem}</TElement>
                    ))}
                  </TRow>
                </THead>
                <TBody>
                  {elementPages[0].map((_, idx) => (
                    <TRow key={idx}>
                      {leftElements.map((elem, idk) => (
                        <TElement key={"test" + idk}>{elem}</TElement>
                      ))}
                      {_.map((elem, idk) => (
                        <TElement key={idx + "string" + idk}>{elem}</TElement>
                      ))}
                      {rightElements.map((elem, idk) => (
                        <TElement key={"test" + idk}>{elem}</TElement>
                      ))}
                    </TRow>
                  ))}
                </TBody>
              </Table>
              <Paginator pages={3} defaultPage={1} />
            </TabItem>
          </Tabs>
        ) : (
          <></>
        )}
        {!args?.withoutSearchbox ? (
          <Searchbox
            small
            onChange={(e) => {
              return e.currentTarget.value;
            }}
            value=""
            placeholder="Search"
          />
        ) : (
          <></>
        )}
        <button className="button-secondary">Button 02</button>
        <button className="button-primary">Button 01</button>
      </DataTableTopToolbar>

      <DataTableActionBar>
        <span className="data-table-items-selected">8 items selected</span>
        <div className="data-table-action-items">
          <a href="#">Action</a>
          <a href="#">Action</a>
          <a href="#">Action</a>
          <a href="#">Action</a>
          <a href="#">Action</a>
        </div>
      </DataTableActionBar>

      <Table>
        <THead>
          <TRow>
            {leftElements.map((elem, idk) => (
              <TElement key={"test" + idk}>{elem}</TElement>
            ))}
            {headElements.map((elem, idk) => (
              <TElement key={"test" + idk}>{elem}</TElement>
            ))}
            {rightElements.map((elem, idk) => (
              <TElement key={"test" + idk}>{elem}</TElement>
            ))}
          </TRow>
        </THead>
        <TBody>
          {elementPages[0].map((_, idx) => (
            <TRow key={idx}>
              {leftElements.map((elem, idk) => (
                <TElement key={"test" + idk}>{elem}</TElement>
              ))}
              {_.map((elem, idk) => (
                <TElement key={idx + "string" + idk}>{elem}</TElement>
              ))}
              {rightElements.map((elem, idk) => (
                <TElement key={"test" + idk}>{elem}</TElement>
              ))}
            </TRow>
          ))}
        </TBody>
      </Table>

      <Paginator
        pages={3}
        defaultPage={1}
        onChangePage={(page) => {
          return page;
        }}
      />
    </DataTable>
  );
};

it("renders and matches snapshot default Data Table", () => {
  const component = renderer.create(<DataTableTest />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
it("renders and matches snapshot default Data Table wit class name", () => {
  const component = renderer.create(<DataTableTest className="fusion-ui" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders and matches snapshot Data Table with tabs", () => {
  const component = renderer.create(<DataTableTest withTabs />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("Resize Dataatable", () => {
  const { container } = render(<DataTableTest />);
  const dataTable = container.querySelector(".data-table-wrapper");
  expect(dataTable).toHaveClass("data-table-wrapper");
  fireEvent(window, new Event("resize"));
  expect(dataTable).toHaveClass("data-table-wrapper");
});

it("Render Datatable < 672 width", () => {
  const { container } = render(<DataTableTest />);
  const dataTable = container.querySelector(".data-table-wrapper");
  expect(dataTable).toHaveClass("data-table-wrapper");
  Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 671 });
  fireEvent(window, new Event("resize"));
  expect(dataTable).toHaveClass("data-table-wrapper");
});

it("Render Datatable without children", () => {
  const { container } = render(<DataTable />);
  const dataTable = container.querySelector(".data-table-wrapper");
  expect(dataTable).toHaveClass("data-table-wrapper");
});
