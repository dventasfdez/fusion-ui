import React, { cloneElement, FC, isValidElement, useRef } from "react";
import clsx from "clsx";
import { BaseInputProps } from "./input";

export type CheckboxProps = Omit<
  BaseInputProps,
  "icon" | "size" | "wrapperClassName"
> & {
  label: string;
};

const Checkbox: FC<CheckboxProps> = ({
  label,
  error,
  helper,
  className,
  containerClassName,
  required,
  type,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const input = (
    <input
      type={type}
      className={clsx(className, {
        error,
      })}
      required={required}
      {...props}
      ref={inputRef}
    />
  );

  const _helper = helper ? (
    typeof helper === "string" ? (
      <p className="input-helper-text">{helper}</p>
    ) : isValidElement(helper) ? (
      cloneElement(helper, {
        ...(helper.props as any),
        className: clsx(
          (helper.props as any)?.className ?? "",
          "input-helper-text"
        ),
      })
    ) : null
  ) : null;

  if (!label && !_helper) return input;

  return (
    <div
      className={clsx(
        {
          "checkbox-container": type === "checkbox",
          "radio-container": type === "radio",
        },
        containerClassName
      )}
    >
      {input}
      {label && (
        <div className="checkbox-label-container">
          <label>
            {required && <small>*</small>}
            {label}
          </label>
          {_helper}
        </div>
      )}
    </div>
  );
};

export default Checkbox;
