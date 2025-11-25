import clsx from "clsx";
import React, {
  InputHTMLAttributes,
  useEffect,
  useMemo,
  useState,
} from "react";

type ToggleProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  /**
   * Helper text for toggle when it's on/off
   */
  helperText?: { off?: string; on?: string };
  /**
   * Label for toggle
   */
  label?: string;
  /**
   * Small toggle size
   */
  size?: "small" | "large";
  containerClassName?: string;
};

const Toggle: React.FC<ToggleProps> = ({
  id = "toggle",
  name,
  checked = false,
  required,
  className,
  helperText,
  label,
  size = "base",
  containerClassName,
  ...props
}) => {
  const pill = useMemo(
    () => (
      <label
        id={`${id}-label`}
        className={clsx(
          {
            "toggle-pill": size === "base",
            "toggle-pill_small": size === "small",
            "toggle-pill_large": size === "large",
          },
          className
        )}
        htmlFor={id}
        aria-label={
          props["aria-label"] ? `${props["aria-label"]}-label` : "toggle-label"
        }
      >
        <input
          id={id}
          name={name}
          className="toggle-input"
          checked={checked}
          required={required}
          type="checkbox"
          {...props}
        />
        <span className="toggle-handle" />
      </label>
    ),
    [checked, className, size, id, name, required, props]
  );

  return (
    <div className={clsx("toggle", containerClassName)}>
      {label && (
        <span className="input-label">
          {required && <small>*</small>}
          {label}
        </span>
      )}

      <div className="toggle-container">
        {pill}
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
