import React from 'react';
import SocialSharingIcon from './socialSharingIcon';

export {default as SocialSharingIcon} from './socialSharingIcon';
export interface ISocialSharingProps {
  className?: string;
  children: React.ReactComponentElement<typeof SocialSharingIcon> | React.ReactComponentElement<typeof SocialSharingIcon>[];
  [others: string]: any;
}

const SocialSharing: React.FC<ISocialSharingProps> = (props) => {
  const {className, children, ...rest} = props;

  return (
    <div className={`social-sharing ${className ?? ''}`} {...rest}>
      {children}
    </div>
  );
};

export default SocialSharing;
