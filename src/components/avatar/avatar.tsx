import React from 'react';
import Badge from '../badge/badge';

export enum AvatarSize {
  small = 'small',
  xsmall = 'xsmall',
  big = 'big',
}

export interface IAvatarProps {
  title?: string;
  subtitle?: string;
  badge?: number;
  /**
   * Set the xsmall size
   */
  xsmall?: boolean;
  /**
   * Set the small size
   */
  small?: boolean;
  /**
   * Set the big size
   */
  big?: boolean;

  /**
   * Set if Avatar is disabled
   */
  disabled?: boolean;
  /**
   * Function that will ocurred when user click on avatar image
   */
  onClick?: () => void;
  /**
   * Additional or alternative styling
   */
  className?: string;

  [others: string]: any;
}

const Avatar: React.FC<IAvatarProps> = ({
  title,
  subtitle,
  badge,
  xsmall,
  small,
  big,
  disabled,
  className,
  children,
  onClick,
  ...rest
}) => {
  const getSize = () => {
    if (xsmall) {
      return AvatarSize.xsmall;
    }
    if (small) {
      return AvatarSize.small;
    }
    if (big) {
      return AvatarSize.big;
    }
    return undefined;
  };

  const renderAvatarWrapper = () => {
    const avatar = badge ? (
      <div className="avatar-container">
        {renderAvatar()}
        {!xsmall && <Badge>{badge}</Badge>}
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
      const _sizeStr = getSize() ? `_${getSize()}` : '';

      if (typeof onClick === 'function') {
        return (
          <button type="button" className={`avatar${_sizeStr}`} onClick={rest.onClick}>
            {_child}
          </button>
        );
      }
      return React.cloneElement(_child, {
        ..._child.props,
        className: `avatar${_sizeStr} ${_child.props.className || ''}`,
      });
    }
  };

  return (
    <div className={`avatar-wrapper${disabled ? '_disabled' : ''} ${className || ''}`} {...rest}>
      {renderAvatarWrapper()}
    </div>
  );
};

export default Avatar;
