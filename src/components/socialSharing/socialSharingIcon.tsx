import React from 'react';
export interface ISocialSharingProps {
  href: string;
  className?: string;
  [others: string]: any;
}

const SocialSharingIcon: React.FC<ISocialSharingProps> = (props) => {
  const {className, href, children, ...rest} = props;

  return (
    <a className={`social-sharing-icon ${className ?? ''}`} href={href} target="self" {...rest}>
      {children}
    </a>
  );
};

export default SocialSharingIcon;
