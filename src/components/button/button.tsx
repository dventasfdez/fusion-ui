import React, { ButtonHTMLAttributes } from "react";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Set the cta style
   */
  cta?: boolean;
  /**
   * Set the primary style
   */
  primary?: boolean;

  /**
   * Set the secondary style
   */
  secondary?: boolean;
  /**
   * Set the interactive style
   */
  interactive?: boolean;
  /**
   * Set the icon style
   */
  icon?: {
    value: string;
    position: "left" | "right";
  };
  /**
   * Set the fullWidth style
   */
  fullWidth?: boolean;
  /**
   * Additional or alternative styling
   */
  className?: string;
  /**
   * Set the small style
   */
  small?: boolean;
  /**
   * Set the large style
   */
  large?: boolean;
  [others: string]: any;
}

const Button: React.FC<IButtonProps> = ({ cta, primary, secondary, interactive, fullWidth, icon, className, children, small, large, type = "button", ...rest }) => {
  let btnClassName = "button";
  if (cta) {
    btnClassName = "button-cta";
  } else if (primary) {
    btnClassName = "button-primary";
  } else if (secondary) {
    btnClassName = "button-secondary";
  } else if (interactive) {
    btnClassName = "button-interactive";
  }
  return (
    <button
      type={type}
      className={`${btnClassName} ${small ? "small" : large ? "large" : ""} ${fullWidth ? "full-width" : ""}
    ${className ?? ""}`}
      {...rest}
    >
      {icon && icon.position === "left" && (
        <span className="material-icons left" data-testid={`${rest["data-testid"] ?? "button"}-icon`}>
          {icon?.value}
        </span>
      )}
      {children}
      {icon && icon.position === "right" && (
        <span className="material-icons right" data-testid={`${rest["data-testid"] ?? "button"}-icon`}>
          {icon?.value}
        </span>
      )}
    </button>
  );
};

export default Button;
