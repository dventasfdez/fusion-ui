import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent, prettyDOM} from '@testing-library/react';
import '@testing-library/jest-dom';
import Select, {ISelectProps, Option} from './select';

const selectExample = (props: ISelectProps) => (
  <Select
    data-testid="select"
    filter={props.filter}
    filterValue={props.filterValue}
    multiple={props.multiple}
    disabled={props.disabled}
    error={props.error}
    label="Select a colour..."
    name={props.name}
    placeholder={props.placeholder}
    value={props.value}
    onChange={props.onChange}
    className=.stepone-ui"
    onChangeFilter={props.onChangeFilter}
  >
    <Option data-testid="red" id="red" value="1" label="Red" />
    <Option data-testid="yellow" id="yellow" value="2" label="Yellow" />
    <Option data-testid="orange" id="orange" value="3" label="Orange" />
    <Option data-testid="pink" id="pink" value="4" label="Pink" />
    <Option data-testid="purple" id="purple" value="5" label="Purple" />
    <Option data-testid="blue" id="blue" value="6" label="Blue" />
    <Option data-testid="grey" id="grey" value="7" label="Grey" />
    <Option data-testid="white" id="white" value="8" label="White" />
    <Option data-testid="black" value="9" label="Black" />
  </Select>
);
describe('Select', () => {
  test('Select component should render and match snapshot', () => {
    const component = renderer.create(selectExample({name: 'color', placeholder: 'Select a colour...', value: '1'}));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Select option', () => {
    const onChangeMock = jest.fn();
    const {container, getByTestId} = render(
      selectExample({name: 'color', placeholder: 'Select a colour...', onChange: onChangeMock})
    );
    const selectBtn = getByTestId('select');

    if (selectBtn) fireEvent.click(selectBtn);

    expect(container.querySelectorAll('.dropdown-item').length).toBe(9);

    const option = getByTestId('red');

    if (option) fireEvent.click(option);
    expect(onChangeMock).toBeCalledWith('1');

    const inputContainer = container.querySelector('.input');

    if (inputContainer) expect(inputContainer.textContent).toBe('Red');
  });

  test('Remove option', () => {
    const onChangeMock = jest.fn();
    const {container, getByTestId} = render(
      selectExample({name: 'color', placeholder: 'Select a colour...', onChange: onChangeMock})
    );
    const selectBtn = getByTestId('select');

    if (selectBtn) fireEvent.click(selectBtn);

    expect(container.querySelectorAll('.dropdown-item').length).toBe(9);

    const option = getByTestId('red');

    if (option) fireEvent.click(option);
    expect(onChangeMock).toBeCalledWith('1');

    const inputContainer = container.querySelector('.input');

    if (inputContainer) expect(inputContainer.textContent).toBe('Red');

    if (selectBtn) fireEvent.click(selectBtn);

    const option2 = getByTestId('red');
    if (option2) fireEvent.click(option2);

    expect(onChangeMock).toBeCalledWith('');

    if (inputContainer) expect(inputContainer.textContent).toBe('Select a colour...');
  });
});

describe('Select Multiple', () => {
  test('Select multiple component should render and match snapshot', () => {
    const component = renderer.create(
      selectExample({name: 'color', placeholder: 'Select a colour...', multiple: true, value: ['1']})
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Select options', () => {
    const onChangeMock = jest.fn();
    const {container, getByTestId} = render(
      selectExample({name: 'color', placeholder: 'Select a colour...', multiple: true, onChange: onChangeMock})
    );
    const selectBtn = getByTestId('select');

    if (selectBtn) fireEvent.click(selectBtn);

    expect(container.querySelectorAll('.dropdown-item').length).toBe(9);

    const option1 = getByTestId('red');

    if (option1) fireEvent.click(option1);
    expect(onChangeMock).toBeCalledWith(['1']);

    const inputContainer = container.querySelector('.input');

    if (inputContainer) expect(inputContainer.textContent).toBe('1 Options selected');

    const option2 = getByTestId('blue');

    if (option2) fireEvent.click(option2);
    expect(onChangeMock).toBeCalledWith(['1', '6']);

    if (inputContainer) expect(inputContainer.textContent).toBe('2 Options selected');
  });

  test('Remove options', () => {
    const onChangeMock = jest.fn();
    const {container, getByTestId} = render(
      selectExample({name: 'color', placeholder: 'Select a colour...', multiple: true, onChange: onChangeMock})
    );
    const selectBtn = getByTestId('select');

    if (selectBtn) fireEvent.click(selectBtn);

    expect(container.querySelectorAll('.dropdown-item').length).toBe(9);

    const option1 = getByTestId('red');

    if (option1) fireEvent.click(option1);
    expect(onChangeMock).toBeCalledWith(['1']);

    const inputContainer = container.querySelector('.input');

    if (inputContainer) expect(inputContainer.textContent).toBe('1 Options selected');

    const option2 = getByTestId('blue');

    if (option2) fireEvent.click(option2);
    expect(onChangeMock).toBeCalledWith(['1', '6']);

    if (inputContainer) expect(inputContainer.textContent).toBe('2 Options selected');

    if (option2) fireEvent.click(option2);
    expect(onChangeMock).toBeCalledWith(['1']);

    if (inputContainer) expect(inputContainer.textContent).toBe('1 Options selected');

    if (option1) fireEvent.click(option1);
    expect(onChangeMock).toBeCalledWith([]);

    if (inputContainer) expect(inputContainer.textContent).toBe('Select a colour...');
  });
});

describe('Select Filter', () => {
  test('Select filter component should render and match snapshot', () => {
    const component = renderer.create(
      selectExample({name: 'color', placeholder: 'Select a colour...', filter: true, value: '1'})
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Select option', () => {
    const {container, getByTestId} = render(selectExample({name: 'color', placeholder: 'Select a colour...', filter: true}));
    const selectBtn = getByTestId('select');

    if (selectBtn) fireEvent.click(selectBtn);

    expect(container.querySelectorAll('.dropdown-item').length).toBe(9);

    const option = getByTestId('red');

    if (option) fireEvent.click(option);
    if (selectBtn) fireEvent.click(selectBtn);

    expect(container.getElementsByClassName('dropdown-item selected').length).toBe(1);
  });

  test('Remove option', () => {
    const {container, getByTestId} = render(selectExample({name: 'color', placeholder: 'Select a colour...', filter: true}));
    const selectBtn = getByTestId('select');

    if (selectBtn) fireEvent.click(selectBtn);

    expect(container.querySelectorAll('.dropdown-item').length).toBe(9);

    const option = getByTestId('red');

    if (option) fireEvent.click(option);
    if (selectBtn) fireEvent.click(selectBtn);

    expect(container.getElementsByClassName('dropdown-item selected').length).toBe(1);

    if (option) fireEvent.click(option);
    if (selectBtn) fireEvent.click(selectBtn);

    expect(container.getElementsByClassName('dropdown-item selected').length).toBe(0);
  });
  test('Fetch options and click remove filter value', () => {
    const {container, getByTestId} = render(selectExample({name: 'color', placeholder: 'Select a colour...', filter: true}));
    const selectBtn = getByTestId('select');

    if (selectBtn) fireEvent.click(selectBtn);

    expect(container.querySelectorAll('.dropdown-item').length).toBe(9);

    const input = getByTestId('select-input');
    if (input) {
      fireEvent.click(input);
      fireEvent.change(input, {target: {value: 'Red'}});
      expect(input.getAttribute('value')).toBe('Red');
    }

    if (selectBtn) fireEvent.click(selectBtn);

    const removeFilterBtn = getByTestId('select-remove-filter-btn');
    expect(container.querySelectorAll('.dropdown-item').length).toBe(1);
    if (removeFilterBtn) fireEvent.click(removeFilterBtn);
    expect(container.querySelectorAll('.dropdown-item').length).toBe(9);
  });
});

describe('Select Filter Multiple', () => {
  test('Select filter multiple component should render and match snapshot', () => {
    const component = renderer.create(
      selectExample({name: 'color', placeholder: 'Select a colour...', multiple: true, filter: true, value: ['1']})
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Select options', () => {
    const {container, getByTestId} = render(
      selectExample({name: 'color', placeholder: 'Select a colour...', multiple: true, filter: true})
    );
    const selectBtn = getByTestId('select');

    if (selectBtn) fireEvent.click(selectBtn);

    expect(container.getElementsByClassName('dropdown-item').length).toBe(9);

    const option1 = getByTestId('red');

    if (option1) fireEvent.click(option1);

    expect(option1).toBeChecked();

    const option2 = getByTestId('blue');

    if (option2) fireEvent.click(option2);

    expect(option1).toBeChecked();
    expect(option2).toBeChecked();
  });

  test('Remove options', () => {
    const {container, getByTestId} = render(
      selectExample({name: 'color', placeholder: 'Select a colour...', multiple: true, filter: true})
    );
    const selectBtn = getByTestId('select');

    if (selectBtn) fireEvent.click(selectBtn);

    expect(container.getElementsByClassName('dropdown-item').length).toBe(9);

    const option1 = getByTestId('red');

    if (option1) fireEvent.click(option1);

    expect(option1).toBeChecked();

    const option2 = getByTestId('blue');

    if (option2) fireEvent.click(option2);

    expect(option1).toBeChecked();
    expect(option2).toBeChecked();

    if (option2) fireEvent.click(option2);

    expect(option1).toBeChecked();
    expect(option2).not.toBeChecked();

    if (option1) fireEvent.click(option1);

    expect(option1).not.toBeChecked();
    expect(option2).not.toBeChecked();
  });
  test('Remove option default', () => {
    const {container, getByTestId} = render(
      selectExample({name: 'color', placeholder: 'Select a colour...', multiple: true, filter: true, value: '1'})
    );
    const selectBtn = getByTestId('select');

    if (selectBtn) fireEvent.click(selectBtn);

    expect(container.getElementsByClassName('dropdown-item').length).toBe(9);

    const option1 = getByTestId('red');

    expect(option1).toBeChecked();

    if (option1) fireEvent.click(option1);

    if (selectBtn) fireEvent.click(selectBtn);

    expect(option1).not.toBeChecked();
  });

  test('Remove option default with remove all button', () => {
    const onChangeMock = jest.fn();
    const {container, getByTestId} = render(
      selectExample({
        name: 'color',
        placeholder: 'Select a colour...',
        multiple: true,
        filter: true,
        value: '1',
        onChange: onChangeMock,
      })
    );

    const removeBtn = getByTestId('select-remove-btn');
    if (removeBtn) fireEvent.click(removeBtn);
    expect(onChangeMock).toBeCalledWith([]);
    const selectBtn = getByTestId('select');

    if (selectBtn) fireEvent.click(selectBtn);

    expect(container.getElementsByClassName('dropdown-item').length).toBe(9);

    const option1 = getByTestId('red');

    expect(option1).not.toBeChecked();

    const label = container.getElementsByClassName('dropdown-item')[0].children[1];
    if (label) fireEvent.click(label);
    expect(onChangeMock).toBeCalledWith(['1']);
  });

  test('Multiple Select and remove item', () => {
    const onChangeMock = jest.fn();
    const {container, getByTestId} = render(
      selectExample({
        name: 'color',
        placeholder: 'Select a colour...',
        multiple: true,
        filter: true,
        value: ['1', '2'],
        onChange: onChangeMock,
      })
    );

    const selectBtn = getByTestId('select');

    if (selectBtn) fireEvent.click(selectBtn);

    expect(container.getElementsByClassName('dropdown-item').length).toBe(9);

    const option1 = getByTestId('red');

    expect(option1).toBeChecked();

    const option2 = getByTestId('blue');

    if (option2) fireEvent.click(option2);
    expect(option2).toBeChecked();

    if (option2) fireEvent.click(option2);

    expect(onChangeMock).toBeCalledWith(['1', '2', '6']);
  });
  test('Select with custom Filter', () => {
    const onChangeMock = jest.fn();
    const {container, getByTestId, rerender} = render(
      selectExample({
        name: 'color',
        placeholder: 'Select a colour...',
        multiple: true,
        filter: true,
        onChangeFilter: onChangeMock,
      })
    );

    const input = getByTestId('select-input') as HTMLInputElement;
    const selectBtn = getByTestId('select');
    fireEvent.click(selectBtn);
    if (input) {
      fireEvent.input(input, {target: {value: 'Red'}});
      const option = getByTestId('red');
      if (option) fireEvent.click(option);
      expect(onChangeMock).toBeCalledWith('Red');
    }

    rerender(
      selectExample({
        name: 'color',
        placeholder: 'Select a colour...',
        multiple: true,
        filter: true,
        filterValue: 'Blue',
        onChangeFilter: onChangeMock,
      })
    );

    expect(input.value).toBe('Red');
  });

  test('Select with filter no multiple and remove element from filter', () => {
    const onChangeMock = jest.fn();
    const {getByTestId} = render(
      selectExample({
        name: 'color',
        placeholder: 'Select a colour...',
        multiple: false,
        filter: true,
        onChange: onChangeMock,
      })
    );
    const selectBtn = getByTestId('select');

    if (selectBtn) fireEvent.click(selectBtn);

    const option1 = getByTestId('red');

    if (option1) fireEvent.click(option1);

    fireEvent.click(selectBtn);
    const updatedOption1 = getByTestId('red');
    expect(updatedOption1.classList).toContain('selected');

    const remove = getByTestId('select-remove-btn');

    fireEvent.click(remove);
    expect(onChangeMock).toBeCalledWith([]);
  });

  test('OnRemoveFilterValues', () => {
    const onChangeMock = jest.fn();
    const {getByTestId} = render(
      selectExample({
        name: 'color',
        placeholder: 'Select a colour...',
        multiple: true,
        filter: true,
        filterValue: 'Red',
        value: ['1', '2'],
        onChange: onChangeMock,
      })
    );
    const input = getByTestId('select-input') as HTMLInputElement;
    const remove = getByTestId('select-remove-filter-btn');
    if (remove) fireEvent.click(remove);
    expect(input.value).toBe('');
  });

  test('OnRemoveFilterValues with custom filter', () => {
    const onChangeMock = jest.fn();
    const {getByTestId} = render(
      selectExample({
        name: 'color',
        placeholder: 'Select a colour...',
        multiple: true,
        filter: true,
        filterValue: 'Red',
        onChangeFilter: onChangeMock,
        value: ['1', '2'],
      })
    );
    const remove = getByTestId('select-remove-filter-btn');
    if (remove) fireEvent.click(remove);
    expect(onChangeMock).toBeCalledWith('');
  });

  test('Select input with showMenu active', () => {
    // onClick filter is never called
    const {getByTestId} = render(
      selectExample({
        name: 'color',
        placeholder: 'Select a colour...',
        filter: true,
      })
    );
    const selectBtn = getByTestId('select');
    if (selectBtn) fireEvent.click(selectBtn);
    const input = getByTestId('select-input') as HTMLInputElement;
    fireEvent.click(input);
    expect(input).not.toBeDisabled();
  });
});
