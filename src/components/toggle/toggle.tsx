import clsx from "clsx";
import React, { InputHTMLAttributes, useEffect, useState } from "react";

type ToggleProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange"
> & {
  /**
   * Helper text for toggle when it's on/off
   */
  helperText?: { off?: string; on?: string };
  /**
   * Label for toggle
   */
  label?: string;
  /**
   * Whe toggle value change call this function
   */
  onChange?: (checked: boolean) => void;
  /**
   * Small toggle size
   */
  size?: "small" | "large";
  containerClassName?: string;
};

const Toggle: React.FC<ToggleProps> = (props) => {
  const {
    id = "toggle",
    name,
    checked = false,
    className,
    disabled,
    readOnly,
    helperText,
    label,
    onChange,
    size = "base",
    containerClassName,
    ...rest
  } = props;

  const [_checked, setChecked] = useState(checked);

  useEffect(() => {
    if (_checked !== checked) setChecked(checked);
  }, [checked]);

  const onChangeToggle = () => {
    setChecked(!_checked);
    if (typeof onChange === "function") onChange(!_checked);
  };

  return (
    <div className={clsx("toggle", containerClassName)}>
      {label && size !== "small" && (
        <span className="toggle-label">{label}</span>
      )}
      <div className="toggle-container">
        <label
          id={`${id}-label`}
          className={clsx(
            "toggle-pill",
            {
              small: size === "small",
              large: size === "large",
              checked: _checked,
            },
            className
          )}
          htmlFor={id}
          aria-label={
            rest["aria-label"] ? `${rest["aria-label"]}-label` : "toggle-label"
          }
          onClick={(e) => e.stopPropagation()}
        >
          <input
            id={id}
            name={name}
            className="toggle-input"
            onChange={onChangeToggle}
            checked={_checked}
            disabled={disabled}
            readOnly={readOnly}
            type="checkbox"
            {...rest}
          />
          <span className="toggle-handle" />
        </label>
        {helperText && (
          <span className={`toggle-text-helper`}>
            {checked ? helperText.on : helperText.off}
          </span>
        )}
      </div>
    </div>
  );
};

export default Toggle;
