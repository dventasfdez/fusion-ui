import React from 'react';
import Avatar, {IAvatarProps} from '../avatar/avatar';

interface IAvatarQuote extends IAvatarProps {
  img: React.ReactNode;
}
export interface IQuote {
  quote: string;
  /**
   * Additional styling if needed
   */
  className?: string;
  avatar?: IAvatarQuote;
  [others: string]: any;
}

const Quote: React.FC<IQuote> = ({className, quote, avatar, ...rest}) => {
  const AvatarC = () => {
    if (avatar) {
      const {img, ...avatarRest} = avatar;
      return <Avatar {...avatarRest}>{typeof img === 'string' ? <img src={img} alt="quote-avatar" /> : img}</Avatar>;
    }
    return null;
  };
  return (
    <div className={`quote-wrapper ${className || ''}`} {...rest}>
      <blockquote className={`quote ${className || ''}`} {...rest}>
        {quote}
      </blockquote>
      <AvatarC />
    </div>
  );
};

export default Quote;
