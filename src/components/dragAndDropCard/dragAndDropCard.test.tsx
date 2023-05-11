import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DragAndDropCard, { DragAndDropCardHeader } from "./dragAndDropCard";

describe("Drag and drop card snapshots", () => {
  it("Drag and drop card", () => {
    const { container } = render(
      <DragAndDropCard>
        <DragAndDropCardHeader>Drag and drop card</DragAndDropCardHeader>
      </DragAndDropCard>
    );
    expect(container).toMatchSnapshot();
  });
  it("Drag and drop card draggable", () => {
    const { container } = render(
      <DragAndDropCard draggable>
        <DragAndDropCardHeader>Drag and drop card</DragAndDropCardHeader>
      </DragAndDropCard>
    );
    expect(container).toMatchSnapshot();
  });
  it("Drag and drop card placeholder", () => {
    const { container } = render(
      <DragAndDropCard placeholder>
        <DragAndDropCardHeader>Drag and drop card</DragAndDropCardHeader>
      </DragAndDropCard>
    );
    expect(container).toMatchSnapshot();
  });
  it("Drag and drop card with options", () => {
    const { container } = render(
      <DragAndDropCard options={[{ id: "item", label: "item" }]}>
        <DragAndDropCardHeader>Drag and drop card</DragAndDropCardHeader>
      </DragAndDropCard>
    );
    expect(container).toMatchSnapshot();
  });
  it("Drag and drop card with options draggable", () => {
    const { container } = render(
      <DragAndDropCard options={[{ id: "item", label: "item" }]} draggable>
        <DragAndDropCardHeader>Drag and drop card</DragAndDropCardHeader>
      </DragAndDropCard>
    );
    expect(container).toMatchSnapshot();
  });
});
describe("Drag and drop card functionality", () => {
  it("Drag and drop card active", () => {
    const { getByTestId } = render(
      <DragAndDropCard data-testid="drag-drop-active" active>
        <DragAndDropCardHeader>Drag and drop card</DragAndDropCardHeader>
      </DragAndDropCard>
    );
    const card = getByTestId("drag-drop-active");
    expect(card).toHaveClass("card_drag-drop active");
  });
  it("Drag and drop card completed", () => {
    const { getByTestId } = render(
      <DragAndDropCard data-testid="drag-drop-completed" completed>
        <DragAndDropCardHeader>Drag and drop card</DragAndDropCardHeader>
      </DragAndDropCard>
    );
    const card = getByTestId("drag-drop-completed");
    expect(card).toHaveClass("card_drag-drop_completed");
  });
  it("Drag and drop card active with options draggable", () => {
    const { getByTestId } = render(
      <DragAndDropCard options={[{ id: "item", label: "item" }]} draggable active data-testid="drag-drop-active">
        <DragAndDropCardHeader>Drag and drop card</DragAndDropCardHeader>
      </DragAndDropCard>
    );
    const card = getByTestId("drag-drop-active");
    expect(card).toHaveClass("card_drag-drop active");
  });
  it("Drag and drop card completed with options draggable", () => {
    const { getByTestId } = render(
      <DragAndDropCard options={[{ id: "item", label: "item" }]} draggable completed data-testid="drag-drop-completed">
        <DragAndDropCardHeader>Drag and drop card</DragAndDropCardHeader>
      </DragAndDropCard>
    );
    const card = getByTestId("drag-drop-completed");
    expect(card).toHaveClass("card_drag-drop_completed");
  });
  it("Click in option in draggable card with options", () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <DragAndDropCard options={[{ id: "item", label: "item", onClick: onClick, "data-testid": "item-1" }]} draggable>
        <DragAndDropCardHeader>Drag and drop card</DragAndDropCardHeader>
      </DragAndDropCard>
    );
    const dropdownBtn = getByTestId("draggable-card-dropdown-btn");
    if (dropdownBtn) fireEvent.click(dropdownBtn);
    const option = getByTestId("item-1");
    if (option) fireEvent.click(option);
    expect(onClick).toBeCalled();
  });
  it("Click in option in drag drop card with options", () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <DragAndDropCard options={[{ id: "item", label: "item", onClick: onClick, "data-testid": "item-1" }]}>
        <DragAndDropCardHeader>Drag and drop card</DragAndDropCardHeader>
      </DragAndDropCard>
    );
    const dropdownBtn = getByTestId("draggable-card-dropdown-btn");
    if (dropdownBtn) fireEvent.click(dropdownBtn);
    const option = getByTestId("item-1");
    if (option) fireEvent.click(option);
    expect(onClick).toBeCalled();
  });
});
