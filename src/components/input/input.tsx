import React, {
  cloneElement,
  ComponentProps,
  FC,
  InputHTMLAttributes,
  isValidElement,
  ReactElement,
  ReactNode,
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

  const input = (
    <input
      type={type}
      className={clsx(className, { input_large: size === "large", error })}
      required={required}
      {...rest}
    />
  );

  const _icon =
    icon && isValidElement(icon)
      ? cloneElement(icon, {
          ...icon.props,
          size: size === "large" ? undefined : "small",
          className: clsx(icon.props.className, "input-icon"),
        })
      : null;

  const container = _icon ? (
    <div className={clsx("input-container", containerClassName)}>
      {input}
      {_icon}
    </div>
  ) : (
    input
  );

  const _helper = helper ? (
    typeof helper === "string" ? (
      <p className="input-helper-text">{helper}</p>
    ) : isValidElement(helper) ? (
      cloneElement(helper, {
        ...(helper.props as any),
        className: clsx((helper.props as any)?.className, "input-helper-text"),
      })
    ) : null
  ) : null;

  if (!label && !_helper) return container;

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
};

export default Input;
