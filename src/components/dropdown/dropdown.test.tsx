import React from "react";
import Dropdown from "./dropdown";
import DropdownButton from "./dropdownButton";
import DropdownMenu from "./dropdownMenu";

import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Dropdown snapshots", () => {
  it("Dropdown should render", () => {
    const { container } = render(
      <Dropdown>
        <DropdownButton data-testid="dropdown-btn" className="button">
          Menu dropdown
        </DropdownButton>

        <DropdownMenu>
          <ul>
            <li className="dropdown-item">
              <a href="#dropdown">Item 1</a>
            </li>
            <li className="dropdown-item">
              <a href="#dropdown">Item 2</a>
            </li>
            <li className="dropdown-item">
              <a href="#dropdown">Item 3</a>
            </li>
            <li className="dropdown-item">
              <a href="#dropdown">Item 4</a>
            </li>
          </ul>
        </DropdownMenu>
      </Dropdown>
    );

    expect(container).toMatchSnapshot();
  });
  it("Dropdown show", () => {
    const { container } = render(
      <Dropdown defaultShow>
        <DropdownButton data-testid="dropdown-btn" className="button">
          Menu dropdown
        </DropdownButton>

        <DropdownMenu>
          <ul>
            <li className="dropdown-item">
              <a href="#dropdown">Item 1</a>
            </li>
            <li className="dropdown-item">
              <a href="#dropdown">Item 2</a>
            </li>
            <li className="dropdown-item">
              <a href="#dropdown">Item 3</a>
            </li>
            <li className="dropdown-item">
              <a href="#dropdown">Item 4</a>
            </li>
          </ul>
        </DropdownMenu>
      </Dropdown>
    );

    expect(container).toMatchSnapshot();
  });
});

describe("Dropdown funcionality", () => {
  it("Click dropdown button", () => {
    const onToggleMenu = jest.fn();
    const { getByTestId } = render(
      <Dropdown data-testid="dropdown" onChangeToggleMenu={onToggleMenu}>
        <DropdownButton data-testid="dropdown-btn" className="button">
          Menu dropdown
        </DropdownButton>

        <DropdownMenu data-testid="dropdown-menu">
          <ul>
            <li className="dropdown-item">
              <a href="#dropdown">Item 1</a>
            </li>
            <li className="dropdown-item">
              <a href="#dropdown">Item 2</a>
            </li>
            <li className="dropdown-item">
              <a href="#dropdown">Item 3</a>
            </li>
            <li className="dropdown-item">
              <a href="#dropdown">Item 4</a>
            </li>
          </ul>
        </DropdownMenu>
      </Dropdown>
    );
    const dropdown = getByTestId("dropdown");
    const dropdownBtn = getByTestId("dropdown-btn");
    const dropdownMenu = getByTestId("dropdown-menu");
    expect(dropdownMenu).toHaveClass("hidden");
    if (dropdownBtn) fireEvent.click(dropdownBtn);
    expect(dropdownMenu).not.toHaveClass("hidden");
    expect(dropdown).toHaveAttribute("data-show", "true");
    expect(onToggleMenu).toBeCalledWith(true);
  });
  it("Click outside", () => {
    const onToggleMenu = jest.fn();
    const { getByTestId } = render(
      <div>
        <div data-testid="another-div">DIV</div>
        <Dropdown data-testid="dropdown" onChangeToggleMenu={onToggleMenu}>
          <DropdownButton data-testid="dropdown-btn" className="button">
            Menu dropdown
          </DropdownButton>

          <DropdownMenu data-testid="dropdown-menu">
            <ul>
              <li className="dropdown-item">
                <a href="#dropdown">Item 1</a>
              </li>
              <li className="dropdown-item">
                <a href="#dropdown">Item 2</a>
              </li>
              <li className="dropdown-item">
                <a href="#dropdown">Item 3</a>
              </li>
              <li className="dropdown-item">
                <a href="#dropdown">Item 4</a>
              </li>
            </ul>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
    const dropdown = getByTestId("dropdown");
    const dropdownBtn = getByTestId("dropdown-btn");
    const dropdownMenu = getByTestId("dropdown-menu");
    expect(dropdownMenu).toHaveClass("hidden");
    if (dropdownBtn) fireEvent.click(dropdownBtn);
    expect(dropdownMenu).not.toHaveClass("hidden");
    expect(dropdown).toHaveAttribute("data-show", "true");
    expect(onToggleMenu).toBeCalledWith(true);
    const anotherDiv = getByTestId("another-div");
    fireEvent.click(anotherDiv);
    expect(dropdownMenu).toHaveClass("hidden");
    expect(dropdown).toHaveAttribute("data-show", "false");
    expect(onToggleMenu).toBeCalledWith(false);
  });

  it("Click in menu", () => {
    const onToggleMenu = jest.fn();
    const { getByTestId } = render(
      <Dropdown data-testid="dropdown" onChangeToggleMenu={onToggleMenu}>
        <DropdownButton data-testid="dropdown-btn" className="button">
          Menu dropdown
        </DropdownButton>

        <DropdownMenu data-testid="dropdown-menu">
          <ul>
            <li className="dropdown-item">
              <a data-testid="link-1" href="#dropdown">
                Item 1
              </a>
            </li>
            <li className="dropdown-item">
              <a href="#dropdown">Item 2</a>
            </li>
            <li className="dropdown-item">
              <a href="#dropdown">Item 3</a>
            </li>
            <li className="dropdown-item">
              <a href="#dropdown">Item 4</a>
            </li>
          </ul>
        </DropdownMenu>
      </Dropdown>
    );
    const dropdown = getByTestId("dropdown");
    const dropdownBtn = getByTestId("dropdown-btn");
    const dropdownMenu = getByTestId("dropdown-menu");
    expect(dropdownMenu).toHaveClass("hidden");
    if (dropdownBtn) fireEvent.click(dropdownBtn);
    expect(dropdownMenu).not.toHaveClass("hidden");
    expect(dropdown).toHaveAttribute("data-show", "true");
    expect(onToggleMenu).toBeCalledWith(true);
    const link = getByTestId("link-1");
    fireEvent.click(link);
    expect(dropdownMenu).toHaveClass("hidden");
    expect(dropdown).toHaveAttribute("data-show", "false");
    expect(onToggleMenu).toBeCalledWith(false);
  });

  it("Click in dropdown disabled", () => {
    const onToggleMenu = jest.fn();
    const { getByTestId } = render(
      <Dropdown disabled data-testid="dropdown" onChangeToggleMenu={onToggleMenu}>
        <DropdownButton data-testid="dropdown-btn" className="button">
          Menu dropdown
        </DropdownButton>

        <DropdownMenu data-testid="dropdown-menu">
          <ul>
            <li className="dropdown-item">
              <a data-testid="link-1" href="#dropdown">
                Item 1
              </a>
            </li>
            <li className="dropdown-item">
              <a href="#dropdown">Item 2</a>
            </li>
            <li className="dropdown-item">
              <a href="#dropdown">Item 3</a>
            </li>
            <li className="dropdown-item">
              <a href="#dropdown">Item 4</a>
            </li>
          </ul>
        </DropdownMenu>
      </Dropdown>
    );
    const dropdown = getByTestId("dropdown");
    const dropdownBtn = getByTestId("dropdown-btn");
    const dropdownMenu = getByTestId("dropdown-menu");
    expect(dropdownMenu).toHaveClass("hidden");
    if (dropdownBtn) fireEvent.click(dropdownBtn);
    expect(dropdownMenu).toHaveClass("hidden");
    expect(dropdown).toHaveAttribute("data-show", "false");
    expect(onToggleMenu).not.toBeCalled();
  });
});
