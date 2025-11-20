import React, {
  cloneElement,
  FC,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import { BaseInputProps } from "./input";
import IconButton from "../button/icon";

export type NumberInputProps = Omit<
  BaseInputProps,
  "icon" | "value" | "defaultValue" | "step"
> & {
  type: "number";
  value?: number;
  defaultValue?: number;
  step?: number;
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
  min,
  max,
  value,
  defaultValue,
  step = 1,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [val, setValue] = useState<number>(defaultValue ?? value ?? 0);

  useEffect(() => {
    if (defaultValue !== undefined && val !== defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (value !== undefined && val !== value) {
      setValue(value);
    }
  }, [value]);

  const native = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value"
  )?.set;

  const hasError = useMemo(() => {
    if (min !== undefined && Number(min) > Number(val)) return true;
    if (max !== undefined && Number(max) < Number(val)) return true;
    return false;
  }, [min, max, val]);

  const handleIncrease = () => {
    const newVal = val + step;
    if (max !== undefined && newVal > Number(max)) return;
    setValue(newVal);
    if (inputRef.current) {
      native?.call(inputRef.current, newVal);
      inputRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };
  const handleDecrease = () => {
    const newVal = val - step;
    if (min !== undefined && newVal < Number(min)) return;
    setValue(newVal);
    if (inputRef.current) {
      native?.call(inputRef.current, newVal);
      inputRef.current.dispatchEvent(new Event("input", { bubbles: true }));
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
          className={clsx(className, {
            input_large: size === "large",
            error: error || hasError,
          })}
          required={required}
          min={min}
          max={max}
          value={val}
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
    [
      size,
      error,
      type,
      required,
      className,
      props,
      val,
      hasError,
      min,
      max,
      containerClassName,
    ]
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
  }, [label, helper, container, required, wrapperClassName]);

  return wrapper;
};

export default NumberInput;
