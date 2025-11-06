import React, { ButtonHTMLAttributes, HTMLAttributes } from "react";
import Badge from "../badge/badge";
import clsx from "clsx";

type AvatarSize = "xsmall" | "small" | "large";

export type AvatarProps = HTMLAttributes<HTMLDivElement> &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    /** Primary label shown next to the avatar. */
    title?: string;
    /** Secondary label below the title. Only rendered when `title` is set. */
    subtitle?: string;
    /** Number displayed in a badge near the avatar. Falsy values hide it. */
    badge?: number;
    /** Visual size of the avatar. Defaults to base size when omitted. */
    size?: AvatarSize;
  };

/**
 * Avatar wraps any child (image, initials, icon) and optionally renders
 * accompanying text, a numeric badge, and button behavior when `onClick` is
 * provided.
 *
 * Notes:
 * - `children`: content to render as the avatar face (e.g., <img/>, initials).
 * - `onClick`: when provided, renders a `<button>` with `disabled` support.
 */
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
