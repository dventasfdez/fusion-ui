import React, { FC, useRef, useCallback } from "react";
import clsx from "clsx";
import { BaseInputProps } from "./input";
import IconButton from "../button/icon";

export type NumberInputProps = Omit<
  BaseInputProps,
  "icon" | "value" | "defaultValue" | "step"
> & {
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
  min,
  max,
  step = 1,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIncrease = useCallback(() => {
    const el = inputRef.current;
    if (!el) return;
    el.stepUp();
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }, []);

  const handleDecrease = useCallback(() => {
    const el = inputRef.current;
    if (!el) return;
    el.stepDown();
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }, []);

  const input = (
    <input
      type="number"
      className={clsx(className, {
        input_large: size === "large",
        error: error,
      })}
      required={required}
      min={min}
      max={max}
      step={step}
      ref={inputRef}
      {...props}
    />
  );

  const container = (
    <div className={clsx("input-container", containerClassName)}>
      <IconButton
        name="remove"
        size={size === "large" ? undefined : "small"}
        color="neutral"
        appearance="text"
        className="number-input-button minus"
        onClick={handleDecrease}
      />
      {input}
      <IconButton
        name="add"
        size={size === "large" ? undefined : "small"}
        color="neutral"
        appearance="text"
        className="number-input-button plus"
        onClick={handleIncrease}
      />
    </div>
  );

  if (!label && !helper) return container;

  const helperNode = helper ? (
    typeof helper === "string" ? (
      <p className="input-helper-text">{helper}</p>
    ) : (
      React.cloneElement(helper as any, {
        ...(helper as any).props,
        className: clsx(
          (helper as any).props?.className ?? "",
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
      {helperNode}
    </div>
  );
};

export default NumberInput;
