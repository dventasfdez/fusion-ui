import React from 'react';
import Table, {TBody, TElement, THead, TRow, ITableProps} from './table';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import {prettyDOM, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const leftElements = [
  <div key={1} className="checkbox-container">
    <input
      id="checkbox"
      onChange={(e) => {
        return e;
      }}
      type="checkbox"
    />
  </div>,
];

const rightElements = [
  <div key={1} className="checkbox-container">
    <input
      id="checkbox"
      onChange={(e) => {
        return e;
      }}
      type="checkbox"
    />
  </div>,
];

const elements = [
  ['Content', 'Content', 'Content', 'Content', 'Content', 'Content', 'Content'],
  ['Content', 'Content', 'Content', 'Content', 'Content', 'Content', 'Content'],
  ['Content', 'Content', 'Content', 'Content', 'Content', 'Content', 'Content'],
];

const newElements = [
  ['Content2', 'Content 2 3 4', 'Content 2 3 4', 'Content 2 3 4', 'Content 2 3 4', 'Content 2 3 4', 'Content 2 3 4'],
  ['Content 2 3 4', 'Content 2 3 4', 'Content 2 3 4', 'Content 2 3 4', 'Content 2 3 4', 'Content 2 3 4', 'Content 2 3 4'],
  ['Content 2 3 4', 'Content 2 3 4', 'Content 2 3 4', 'Content 2 3 4', 'Content 2 3 4', 'Content 2 3 4', 'Content 2 3 4'],
];

const headElements = ['Label', 'Label', 'Label', 'Label', 'Label', 'Label', 'Label'];

const TableTest = (args: ITableProps) => {
  return (
    <div className=.stepone-ui App" style={{height: '30vh', width: '50vw'}}>
      <Table {...args}>
        <THead>
          <TRow>
            {leftElements.map((elem, idk) => (
              <TElement key={'test' + idk}>{elem}</TElement>
            ))}
            {headElements.map((elem, idk) => (
              <TElement key={'test' + idk}>{elem}</TElement>
            ))}
            {rightElements.map((elem, idk) => (
              <TElement key={'test' + idk}>{elem}</TElement>
            ))}
          </TRow>
        </THead>
        <TBody data-testid="table">
          {args.content.map((_, idx) => {
            if (args.tr)
              return (
                <tr key={idx} onClick={args.onClick}>
                  {leftElements.map((elem, idk) => (
                    <TElement key={'test' + idk}>{elem}</TElement>
                  ))}
                  {_.map((elem, idk) => (
                    <TElement key={idx + 'string' + idk}>{elem}</TElement>
                  ))}
                  {rightElements.map((elem, idk) => (
                    <TElement key={'test' + idk}>{elem}</TElement>
                  ))}
                </tr>
              );
            if (args.unvalid) {
              return (
                <div key={idx} onClick={args.onClick}>
                  {leftElements.map((elem, idk) => (
                    <TElement key={'test' + idk}>{elem}</TElement>
                  ))}
                  {_.map((elem, idk) => (
                    <TElement key={idx + 'string' + idk}>{elem}</TElement>
                  ))}
                  {rightElements.map((elem, idk) => (
                    <TElement key={'test' + idk}>{elem}</TElement>
                  ))}
                </div>
              );
            }
            return (
              <TRow key={idx} onClick={args.onClick}>
                {leftElements.map((elem, idk) => (
                  <TElement key={'test' + idk}>{elem}</TElement>
                ))}
                {_.map((elem, idk) => (
                  <TElement key={idx + 'string' + idk}>{elem}</TElement>
                ))}
                {rightElements.map((elem, idk) => (
                  <TElement key={'test' + idk}>{elem}</TElement>
                ))}
              </TRow>
            );
          })}
        </TBody>
      </Table>
    </div>
  );
};

const InvalidTableTest = (args: ITableProps) => {
  return (
    <div className=.stepone-ui App" style={{height: '30vh', width: '50vw'}}>
      <Table {...args}>
        <THead>
          <TRow>
            {leftElements.map((elem, idk) => (
              <TElement key={'test' + idk}>{elem}</TElement>
            ))}
            {headElements.map((elem, idk) => (
              <TElement key={'test' + idk}>{elem}</TElement>
            ))}
            {rightElements.map((elem, idk) => (
              <TElement key={'test' + idk}>{elem}</TElement>
            ))}
          </TRow>
        </THead>
        <TBody data-testid="table">
          {elements.map((_, idx) => (
            <div key={idx}>
              {leftElements.map((elem, idk) => (
                <TElement key={'test' + idk}>{elem}</TElement>
              ))}
              {_.map((elem, idk) => (
                <TElement key={idx + 'string' + idk}>{elem}</TElement>
              ))}
              {rightElements.map((elem, idk) => (
                <TElement key={'test' + idk}>{elem}</TElement>
              ))}
            </div>
          ))}
        </TBody>
      </Table>
    </div>
  );
};

const TheadTableTest = (args: ITableProps) => {
  return (
    <div className=.stepone-ui App" style={{height: '30vh', width: '50vw'}}>
      <Table {...args}>
        <THead>
          <TRow>
            {leftElements.map((elem, idk) => (
              <TElement key={'test' + idk}>{elem}</TElement>
            ))}
            {headElements.map((elem, idk) => (
              <TElement key={'test' + idk}>{elem}</TElement>
            ))}
            {rightElements.map((elem, idk) => (
              <TElement key={'test' + idk}>{elem}</TElement>
            ))}
          </TRow>
        </THead>
        <TBody data-testid="table">
          {elements.map((_, idx) => (
            <TRow key={idx} onClick={args.onClick}>
              {leftElements.map((elem, idk) => (
                <TElement key={'test' + idk}>{elem}</TElement>
              ))}
              {_.map((elem, idk) => (
                <TElement key={idx + 'string' + idk}>{elem}</TElement>
              ))}
              {rightElements.map((elem, idk) => (
                <TElement key={'test' + idk}>{elem}</TElement>
              ))}
            </TRow>
          ))}
        </TBody>
      </Table>
    </div>
  );
};

test('renders and matches snapshot', () => {
  const component = renderer.create(<TableTest content={elements} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders and click on row', () => {
  const {getByTestId} = render(<TableTest content={elements} data-testid="table" />);
  const row = getByTestId('table-body-row-1');
  userEvent.click(row);
  expect(row).toHaveClass('active');
});

test('render disabled table', () => {
  const {getByTestId} = render(<TableTest content={elements} disabled={true} data-testid="table" />);
  const disabledTable = getByTestId('table-wrapper');
  expect(disabledTable).toHaveAttribute('data-disabled', 'true');
});

test('render with invalid body', () => {
  const {getByTestId} = render(<InvalidTableTest disabled={true} data-testid="table" />);
  const disabledTable = getByTestId('table-wrapper');
  expect(disabledTable).toHaveAttribute('data-disabled', 'true');
});

test('render with invalid thead', () => {
  const {getByTestId} = render(<TheadTableTest disabled={true} data-testid="table" />);
  const disabledTable = getByTestId('table-wrapper');
  expect(disabledTable).toHaveAttribute('data-disabled', 'true');
});

test('render and change active row', () => {
  const {getByTestId} = render(<TableTest content={elements} data-testid="table" />);
  const row = getByTestId('table-body-row-1');
  userEvent.click(row);
  expect(row).toHaveClass('active');
  userEvent.click(row);
  expect(row).not.toHaveClass('active');
});

test('rerender table with new data and fake click and real onClick', () => {
  const rOnClick = jest.fn();
  const {rerender, container, getByTestId} = render(<TableTest content={elements} data-testid="table" onClick={rOnClick} />);
  expect(container).toBeDefined();
  const row = getByTestId('table-body-row-1');
  userEvent.click(row);
  expect(rOnClick).toBeCalled();
  rerender(<TableTest unValid data-testid="table" content={newElements} />);
  rerender(<TableTest unValid data-testid="table" content={newElements} />);
  rerender(<TableTest unValid={false} data-testid="tables" content={newElements} onClick={rOnClick} />);
  rerender(<TableTest data-testid="tables" content={newElements} onClick={rOnClick} tr />);
  expect(container).toBeDefined();
});

test('render with tr', () => {
  const {getByTestId} = render(<TableTest content={elements} data-testid="table" tr />);
  const row = getByTestId('table-body-row-1').children;
  expect(row).toHaveLength(9);
});
