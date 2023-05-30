import React from "react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import Header, { HeaderItem, HeaderLogo, IHeaderProps } from "./header";
import { fireEvent, render } from "@testing-library/react";
jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (node: any) => node,
}));

const _langs = [
  { id: "1", label: "en-us", selected: true },
  { id: "2", label: "es-ES" },
  { id: "3", label: "en-uk" },
  { id: "4", label: "it-IT" },
];
const _contact = { label: "contact", href: "#" };
const HeaderTest = (props: IHeaderProps) => (
  <Header {...props}>
    <HeaderLogo>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Adecco_logo.svg/1200px-Adecco_logo.svg.png" alt="logo" />
    </HeaderLogo>
    <HeaderItem data-testid="header-test-item" selected>
      Menu item
    </HeaderItem>
    <HeaderItem
      data-testid="header-test-item-with-options"
      options={[
        { id: "1", label: "Option", href: "#" },
        { id: "2", label: "Option", href: "#" },
        { id: "3", label: "Option" },
      ]}
    >
      Menu item
    </HeaderItem>
    <HeaderItem
      key="item-3"
      data-testid="header-test-item-with-option"
      optionsDivider
      options={[
        {
          id: "1",
          label: "Option",
          onClick: () => {
            return;
          },
        },
      ]}
    >
      Menu item
    </HeaderItem>
  </Header>
);

describe("Header desktop", () => {
  it("Component renders and match snapshot", () => {
    const component = renderer.create(<HeaderTest />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Component renders with language selector and match snapshot", () => {
    const component = renderer.create(<HeaderTest languages={_langs} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Component renders with language selector and contact link and match snapshot", () => {
    const component = renderer.create(<HeaderTest languages={_langs} contact={_contact} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Select language in header and click in other item (close overflow menu)", () => {
    const onChangeLanguageMock = jest.fn();
    const onSearchMock = jest.fn();
    const { container, getByTestId } = render(<HeaderTest data-testid="header-test" languages={_langs} onClickLanguage={onChangeLanguageMock} onSearch={onSearchMock} />);
    const languagesBtn = getByTestId("header-test-languages-dropdown-btn");
    if (languagesBtn) fireEvent.click(languagesBtn);

    const languageItemBtn = getByTestId("header-test-language-2");
    if (languageItemBtn) fireEvent.click(languageItemBtn);
    expect(onChangeLanguageMock).toBeCalledWith("3");

    const option1 = getByTestId("header-test-item-with-options");
    if (option1) fireEvent.click(option1);

    expect(container.getElementsByClassName("overflow-menu").length).toBe(1);
    const option2 = getByTestId("header-test-item");
    if (option2) fireEvent.click(option2);
    const itemOpt = getByTestId("header-test-item-with-option");
    if (itemOpt) fireEvent.click(itemOpt);
    const opt = getByTestId("header-test-item-with-option-overflow-menu-item-0");
    if (opt) fireEvent.click(opt);
  });
});

describe("Header mobile version", () => {
  beforeEach(() => {
    window.innerWidth = 400;
    window.dispatchEvent(new Event("resize"));
  });

  it("Component renders mobile and match snapshot", () => {
    const component = renderer.create(<HeaderTest />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Component renders mobile with contact selector and match snapshot", () => {
    const component = renderer.create(<HeaderTest contact={_contact} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Select language in header", () => {
    const onChangeLanguageMock = jest.fn();
    const onSearchMock = jest.fn();
    const { getByTestId } = render(<HeaderTest data-testid="header-test" languages={_langs} onClickLanguage={onChangeLanguageMock} onSearch={onSearchMock} />);
    const itemsBtn = getByTestId("header-test-items-dropdown-btn");

    if (itemsBtn) fireEvent.click(itemsBtn);
    const languagesBtn = getByTestId("header-test-languages-dropdown-btn");

    if (languagesBtn) fireEvent.click(languagesBtn);

    const languageItemBtn = getByTestId("header-test-language-2");
    if (languageItemBtn) fireEvent.click(languageItemBtn);
    expect(onChangeLanguageMock).toBeCalledWith("3");
  });
  it("Click in item (close language selector) in header", () => {
    const onChangeLanguageMock = jest.fn();
    const onSearchMock = jest.fn();
    const { container, getByTestId } = render(<HeaderTest data-testid="header-test" languages={_langs} onClickLanguage={onChangeLanguageMock} onSearch={onSearchMock} />);
    const itemsBtn = getByTestId("header-test-items-dropdown-btn");

    if (itemsBtn) fireEvent.click(itemsBtn);
    const languagesBtn = getByTestId("header-test-languages-dropdown-btn");

    if (languagesBtn) fireEvent.click(languagesBtn);

    expect(getByTestId("header-test-language-2")).toBeDefined();

    const itemOptions = getByTestId("header-test-item-with-options");
    if (itemOptions) fireEvent.click(itemOptions);

    expect(container.getElementsByClassName("tree-element-item").length).toBe(3);

    const option = getByTestId("header-test-item-with-options-option-1");
    if (option) fireEvent.click(option);
  });

  it("Click in item without href", () => {
    const onChangeLanguageMock = jest.fn();
    const onSearchMock = jest.fn();
    const { getByTestId } = render(<HeaderTest data-testid="header-test" languages={_langs} onClickLanguage={onChangeLanguageMock} onSearch={onSearchMock} />);
    const itemsBtn = getByTestId("header-test-items-dropdown-btn");

    if (itemsBtn) fireEvent.click(itemsBtn);
    const itemOptions = getByTestId("header-test-item-with-options");
    if (itemOptions) fireEvent.click(itemOptions);
    const option = getByTestId("header-test-item-with-options-option-2");
    if (option) fireEvent.click(option);
    expect(itemsBtn).toBeDefined();
  });
});
