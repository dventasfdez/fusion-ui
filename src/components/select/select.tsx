import React, {useState, useEffect, useRef, useContext} from 'react';
import Dropdown, {DropdownButton, DropdownMenu} from '../dropdown/dropdown';
export {default as Option} from './selectOption';
const SelectContext = React.createContext({});
export interface ISelectProps {
  /**
   * Define if select is large
   */
  large?: boolean;
  /**
   * Define if is select filter
   */
  filter?: boolean;
  /**
   * Define if is select multiple
   */
  multiple?: boolean;

  /**
   * Define if select is disabled
   */
  disabled?: boolean;
  /**
   * Define if select is required
   */
  required?: boolean;
  /**
   * Define if select have an error
   */
  error?: boolean;

  /**
   * Set label for select
   */
  label?: string;
  /**
   * Set helper text for select
   */
  helperText?: string;
  /**
   * Set the icon in helper text. It's a name of material icon, example: "info"
   */
  helperIcon?: string;
  /**
   * Set placeholder for select
   */
  placeholder: string;
  /**
   * Set different classes for select component
   */
  className?: string;

  /**
   * Set the name of value in a form
   */
  name: string;
  /**
   * Set the value of select
   */
  value: any;
  /**
   * Return the value of select
   */
  onChange: (value: any) => void;
  /**
   * Sets the value of the filter,
   * in case you manage the options representation outside the component,
   * you will need to manage this state outside this component as well,
   * in case you are using the filter option
   */
  filterValue?: string;
  /**
   * Return the value of filter value (remember the previous explanation)
   */
  onChangeFilter?: (filterValue: string) => void;

  [others: string]: any;
}

interface ISelectContext {
  multiple: boolean;
  selectedValue: any;
  filterValue: string;
  onSelectItem: (selectValue: string | number) => void;
  onRemoveItem: (removeValue: string | number) => void;
}

const Select: React.FC<ISelectProps> = ({
  large,
  required,
  filter,
  multiple,
  disabled,
  error,

  label,
  placeholder,
  helperText,
  helperIcon,

  name,
  className,
  value,

  onChange,

  filterValue,
  onChangeFilter,
  children,
  ...rest
}) => {
  const inputRef: any = useRef<HTMLInputElement>();

  const [filterVal, setFilterVal] = useState<string | undefined>(filterValue ? filterValue : undefined);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (filter && typeof onChangeFilter === 'function') {
      if (filterValue !== filterVal) {
        setFilterVal(filterValue);
      }
    }
  }, [filterValue]);

  const onSelectItem = (selectValue: string) => {
    if (!multiple) {
      onChange(selectValue);
    } else {
      let values = value;
      if (values) {
        if (!values.some((existingValue: string) => existingValue === selectValue)) {
          values = [...values, selectValue];
        }
      } else {
        values = [selectValue];
      }

      onChange(values);
    }
  };

  const onRemoveItem = (deleteValue: string) => {
    let newValues: any;
    if (!multiple) {
      newValues = '';
      if (onChange) onChange('');
    } else {
      const currentStateValue = value;
      if (typeof currentStateValue === 'object') {
        newValues =
          currentStateValue &&
          currentStateValue.length &&
          currentStateValue.filter((existingValue: string) => existingValue !== deleteValue);
      }
    }
    onChange(newValues);
  };

  const onRemoveOptions = () => {
    if (multiple) {
      if (onChange) onChange([]);
    } else {
      if (onChange) onChange('');
    }
  };

  const filterItems = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof onChangeFilter === 'function') {
      onChangeFilter(event.target.value);
    } else {
      setFilterVal(event.target.value);
    }
  };

  const onRemoveFilterValue = () => {
    if (typeof onChangeFilter === 'function') {
      onChangeFilter('');
    } else {
      if (inputRef && inputRef.current) inputRef.current.value = '';
      setFilterVal('');
    }
  };

  const renderSelectContainer = () => {
    if (filter) {
      return (
        <div className="input-container">
          <input
            data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-input` : undefined}
            className={`input ${large ? 'large' : ''}`}
            placeholder={value && value.length && multiple ? `${value.length} Options selected` : placeholder}
            ref={inputRef}
            type="text"
            defaultValue={filterVal}
            onChange={filterItems}
            disabled={disabled}
          />
          {filterVal ? (
            <span
              data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-remove-filter-btn` : undefined}
              className="material-icons input-icon-box"
              onClick={onRemoveFilterValue}
            >
              close
            </span>
          ) : (
            <span className="material-icons input-icon-box">search</span>
          )}
        </div>
      );
    }

    return (
      <div className="input-container">
        <div className={large ? 'input_large' : 'input'}>{getTextContent()}</div>
        {showMenu ? (
          <span className="material-icons input-icon-box">expand_less</span>
        ) : (
          <span className="material-icons input-icon-box">expand_more</span>
        )}
      </div>
    );
  };

  const getTextContent = () => {
    if (multiple && typeof value === 'object' && value.length) {
      return <span className="placeholder">{`${value.length} Options selected`}</span>;
    } else if (value && children) {
      const itemSelected = React.Children.toArray(children).find((item: any) => item.props?.value === value);
      if (itemSelected) return (itemSelected as any).props?.label;
    }
    return <span className="placeholder">{placeholder}</span>;
  };

  const renderBottomContainer = () => {
    let content: any = null;
    if ((filter || multiple) && value && value.length) {
      if (filter && !multiple)
        content = (
          <button
            type="button"
            data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-remove-btn` : undefined}
            className={`chip_active${disabled ? '_disabled' : ''}`}
            onClick={onRemoveOptions}
          >
            {getTextContent()}
            <span className="material-icons right">close</span>
          </button>
        );
      if (multiple)
        content = (
          <button
            type="button"
            data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-remove-btn` : undefined}
            className={`chip_active${disabled ? '_disabled' : ''}`}
            onClick={onRemoveOptions}
          >
            {`${value.length} Options selected`}
            <span className="material-icons right">close</span>
          </button>
        );
      return (
        <div className="select-bottom-container">
          {content}
          {helperText && (
            <p className="input-helper-text">
              {helperIcon && <span className="material-icons">{helperIcon}</span>}
              {helperText}
            </p>
          )}
        </div>
      );
    }
    return (
      helperText && (
        <p className="input-helper-text">
          {helperIcon && <span className="material-icons">{helperIcon}</span>}
          {helperText}
        </p>
      )
    );
  };

  return (
    <SelectContext.Provider value={{multiple, selectedValue: value, filterValue: filterVal, onSelectItem, onRemoveItem}}>
      <div className={`input-wrapper${disabled ? '_disabled' : ''} ${error ? 'error' : ''}  ${className || ''}`}>
        {label && (
          <label className="caption">
            {required && <small>*</small>}
            {label}
          </label>
        )}

        <Dropdown onChangeToggleMenu={(state: boolean) => setShowMenu(state)} keepShown={multiple}>
          <DropdownButton data-testid={rest && rest['data-testid'] ? rest['data-testid'] : undefined} disabled={disabled}>
            {renderSelectContainer()}
          </DropdownButton>
          <DropdownMenu>
            <ul>{children}</ul>
          </DropdownMenu>
        </Dropdown>
        <input type="hidden" readOnly name={name} disabled={disabled} value={value} />
        {renderBottomContainer()}
      </div>
    </SelectContext.Provider>
  );
};

export default Select;
/**
 *
 * @internal
 */
export const useSelect = () => useContext(SelectContext) as ISelectContext;
