import React, {
  cloneElement,
  FC,
  isValidElement,
  useMemo,
  useRef,
} from "react";
import clsx from "clsx";
import { BaseInputProps } from "./input";

export type CheckboxProps = Omit<
  BaseInputProps,
  "icon" | "size" | "wrapperClassName"
> & {
  label: string;
  type: "checkbox" | "radio";
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

  const input = useMemo(
    () => (
      <input
        type={type}
        className={clsx(className, {
          error,
        })}
        required={required}
        {...props}
        ref={inputRef}
      />
    ),
    [error, type, required, className, props]
  );

  const labelContainer = useMemo(() => {
    if (isValidElement(helper)) {
      const _helper =
        typeof helper === "string" ? (
          <p className="input-helper-text">{helper}</p>
        ) : (
          cloneElement(helper, {
            ...(helper.props as any),
            className: clsx(
              (helper.props as any)?.className ?? "",
              "input-helper-text"
            ),
          })
        );
      return (
        <div className="checkbox-label-container">
          <label>
            {required && <small>*</small>}
            {label}
          </label>
          {_helper}
        </div>
      );
    }
    return (
      <label>
        {required && <small>*</small>}
        {label}
      </label>
    );
  }, [label, required, helper]);

  const wrapper = useMemo(() => {
    if (label || helper) {
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
          {label && labelContainer}
        </div>
      );
    }
    return input;
  }, [labelContainer, input]);

  return wrapper;
};

export default Checkbox;
