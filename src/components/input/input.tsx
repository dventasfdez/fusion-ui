import React, {
  cloneElement,
  ComponentProps,
  FC,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  isValidElement,
  ReactElement,
  ReactNode,
  useMemo,
} from "react";
import IconButton from "../button/icon";
import Icon from "../icon/icon";
import clsx from "clsx";
import NumberInput, { NumberInputProps } from "./number";
import Checkbox, { CheckboxProps } from "./checkbox";
import FileInput, { FileInputProps } from "./file";

type InputSize = "medium" | "large";

export type BaseInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  size?: InputSize;
  label?: string;
  error?: boolean;
  helper?: ReactNode;
  icon?:
    | ReactElement<ComponentProps<typeof Icon>, typeof Icon>
    | ReactElement<ComponentProps<typeof IconButton>, typeof IconButton>;
  wrapperClassName?: string;
  containerClassName?: string;
};

type InputProps =
  | (NumberInputProps & { type: "number" })
  | (CheckboxProps & { type: "checkbox" })
  | (CheckboxProps & { type: "radio" })
  | (FileInputProps & { type: "file" })
  | (BaseInputProps & {
      type:
        | "search"
        | "button"
        | "text"
        | "tel"
        | "url"
        | "email"
        | "hidden"
        | "submit"
        | "reset"
        | "color"
        | "date"
        | "datetime-local"
        | "image"
        | "month"
        | "password"
        | "range"
        | "time"
        | "week";
    });

const Input: FC<InputProps> = (props) => {
  if (props.type === "number") {
    return <NumberInput {...props} />;
  }

  if (props.type === "checkbox" || props.type === "radio") {
    return <Checkbox {...props} />;
  }

  if (props.type === "file") {
    return <FileInput {...props} />;
  }

  const {
    size = "medium",
    label,
    error,
    helper,
    icon,
    className,
    wrapperClassName,
    containerClassName,
    required,
    type = "text",
    ...rest
  } = props;

  const input = useMemo(
    () => (
      <input
        type={type}
        className={clsx(className, { input_large: size === "large", error })}
        required={required}
        {...rest}
      />
    ),
    [size, error, type, required, className, rest]
  );

  const container = useMemo(() => {
    if (icon) {
      const _icon = isValidElement(icon)
        ? cloneElement(icon, {
            ...icon.props,
            size: size === "large" ? undefined : "small",
            className: clsx(icon.props.className, "input-icon"),
          })
        : null;
      return (
        <div className={clsx("input-container", containerClassName)}>
          {input}
          {_icon}
        </div>
      );
    }
    return input;
  }, [icon, input]);

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

export default Input;
