import React, {
  cloneElement,
  FC,
  isValidElement,
  useMemo,
  useRef,
} from "react";
import clsx from "clsx";
import { BaseInputProps } from "./input";
import IconButton from "../button/icon";

export type NumberInputProps = Omit<BaseInputProps, "icon"> & {
  type: "number";
};

const NumberInput: FC<NumberInputProps> = ({
  size = "medium",
  label,
  error,
  helper,
  className,
  wrapperClassName,
  containerClassName,
  required,
  type,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleIncrease = () => {
    if (inputRef.current) {
      const currentValue = Number(inputRef.current.value) || 0;
      inputRef.current.value = String(currentValue + 1);
      const event = new Event("input", { bubbles: true });
      inputRef.current.dispatchEvent(event);
    }
  };
  const handleDecrease = () => {
    if (inputRef.current) {
      const currentValue = Number(inputRef.current.value) || 0;
      inputRef.current.value = String(currentValue - 1);
      const event = new Event("input", { bubbles: true });
      inputRef.current.dispatchEvent(event);
    }
  };
  const container = useMemo(
    () => (
      <div className={clsx("input-container", containerClassName)}>
        <IconButton
          name="remove"
          size={size === "large" ? undefined : "small"}
          color="neutral"
          appearance="text"
          className="number-input-button minus"
          onClick={handleDecrease}
        />
        <input
          type="number"
          className={clsx(className, { input_large: size === "large", error })}
          required={required}
          {...props}
          ref={inputRef}
        />
        <IconButton
          name="add"
          size={size === "large" ? undefined : "small"}
          color="neutral"
          appearance="text"
          className="number-input-button plus"
          onClick={handleIncrease}
        />
      </div>
    ),
    [size, error, type, required, className, props]
  );

  const wrapper = useMemo(() => {
    if (label || helper) {
      const _helper = isValidElement(helper) ? (
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
        )
      ) : null;

      return (
        <div className={clsx("input-wrapper", wrapperClassName)}>
          {label && (
            <label>
              {required && <small>*</small>}
              {label}
            </label>
          )}
          {container}
          {_helper}
        </div>
      );
    }
    return container;
  }, [label, helper, container]);

  return wrapper;
};

export default NumberInput;
