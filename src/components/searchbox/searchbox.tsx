import React, {useRef, useState} from 'react';
export interface ISearchboxProps {
  id?: string;
  placeholder?: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  defaultValue?: string;
  small?: boolean;
  /**
   * Additional styling if needed
   */
  className?: string;
  [others: string]: any;
}

const Searchbox: React.FC<ISearchboxProps> = (props) => {
  const {id, placeholder, name, onChange, defaultValue, small, className, value, ...rest} = props;
  const [show, setShow] = useState(defaultValue || value ? true : false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) setShow(true);
    else setShow(false);
    onChange(e);
  };

  return (
    <div
      className={`input-container ${className || ''}`}
      data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-wrapper` : undefined}
    >
      <span className="material-icons search">search</span>

      <input
        id={id}
        name={name}
        className={`searchbox${small ? '_small' : ''}`}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        type="search"
        onChange={handleChange}
        ref={inputRef}
        {...rest}
      />

      {show && (
        <button
          type="button"
          className="button-interactive"
          style={{pointerEvents: 'none'}}
          data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-remove-btn` : undefined}
        >
          <span className="material-icons">close</span>
        </button>
      )}
    </div>
  );
};

export default Searchbox;
