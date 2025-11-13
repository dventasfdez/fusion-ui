import React, {
  cloneElement,
  ComponentProps,
  FC,
  InputHTMLAttributes,
  isValidElement,
  ReactElement,
  ReactNode,
  useMemo,
} from "react";
import IconButton from "../button/icon";
import Icon from "../icon/icon";
import clsx from "clsx";

type InputSize = "medium" | "large";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  size?: InputSize;
  label?: string;
  error?: boolean;
  helper?: ReactNode;
  icon?: ReactElement<
    ComponentProps<typeof Icon | typeof IconButton>,
    typeof Icon | typeof IconButton
  >;
  wrapperClassName?: string;
  containerClassName?: string;
};

const Input: FC<InputProps> = ({
  size,
  label,
  error,
  helper,
  icon,
  className,
  wrapperClassName,
  containerClassName,
  required,
  type = "text",
  ...props
}) => {
  const input = useMemo(
    () => (
      <input
        type={type}
        className={clsx(className, { input_large: size === "large", error })}
        required={required}
        {...props}
      />
    ),
    [size, error, type, required, className, props]
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
