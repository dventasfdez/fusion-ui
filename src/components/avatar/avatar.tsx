import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
} from "react";
import Badge from "../badge/badge";
import clsx from "clsx";

type AvatarSize = "xsmall" | "small" | "large";
type AvatarProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    title?: string;
    subtitle?: string;
    badge?: number;
    size?: AvatarSize;
  };

const Avatar: React.FC<AvatarProps> = ({
  title,
  subtitle,
  badge,
  size,
  disabled,
  className,
  children,
  onClick,
  ...props
}) => {
  const renderAvatarWrapper = () => {
    const avatar = badge ? (
      <div className="avatar-container">
        {renderAvatar()}
        {size !== "xsmall" && <Badge>{badge}</Badge>}
      </div>
    ) : (
      <>{renderAvatar()}</>
    );

    if (title) {
      if (subtitle) {
        return (
          <>
            {avatar}
            <div className="avatar-text-wrapper">
              <span className="avatar-title">{title}</span>
              <span className="avatar-subtitle">{subtitle}</span>
            </div>
          </>
        );
      }
      return (
        <>
          {avatar}
          <span className="avatar-title">{title}</span>
        </>
      );
    }

    return avatar;
  };

  const renderAvatar = () => {
    if (children) {
      const _child = children as any;
      const _className = clsx({
        avatar: !size,
        [`avatar_${size}`]: size,
        disabled: !onClick && disabled,
      });

      if (typeof onClick === "function") {
        return (
          <button
            type="button"
            role="button"
            disabled={disabled}
            className={_className}
            onClick={onClick}
            {...props}
          >
            {_child}
          </button>
        );
      }
      return React.cloneElement(_child, {
        ..._child.props,
        className: _className,
      });
    }
  };

  return <div className={clsx("avatar-wrapper")}>{renderAvatarWrapper()}</div>;
};

export default Avatar;
