import React from 'react';

import IconCardTop from '../card/cardTop';
import IconCardIcon from './cardIcon';
import IconCardHeader from '../card/cardHeader';
import IconCardBody from '../card/cardBody';
import IconCardFooter from '../card/cardFooter';

export {default as IconCardTop} from '../card/cardTop';
export {default as IconCardIcon} from './cardIcon';
export {default as IconCardHeader} from '../card/cardHeader';
export {default as IconCardBody} from '../card/cardBody';
export {default as IconCardFooter} from '../card/cardFooter';

export interface IIconCardProps {
  /**
   * Identifies the card
   */
  id?: string;
  /**
   * Add class to card
   */
  className?: string;
  /**
   * Set selected style to card
   */
  selected?: boolean;
  /**
   * onClick function
   */
  onClick?: () => void;
  /**
   * Parts of card, one of this is required
   */
  children:
    | React.ReactComponentElement<
        typeof IconCardTop | typeof IconCardIcon | typeof IconCardHeader | typeof IconCardBody | typeof IconCardFooter
      >[]
    | React.ReactComponentElement<
        typeof IconCardTop | typeof IconCardIcon | typeof IconCardHeader | typeof IconCardBody | typeof IconCardFooter
      >;
  [others: string]: any;
}

const IconCard: React.FC<IIconCardProps> = (props) => {
  const {id, children, className, selected, onClick, ...rest} = props;

  const renderIconCard = () => {
    let cardIcon: any;
    const contentChildrens: any[] = [];
    React.Children.forEach(children, (_childItem: any) => {
      if (_childItem)
        if (
          _childItem.type === IconCardTop ||
          _childItem.type === IconCardHeader ||
          _childItem.type === IconCardBody ||
          _childItem.type === IconCardFooter
        )
          contentChildrens.push(_childItem);
        else if (_childItem.type === IconCardIcon) cardIcon = _childItem;
    });

    return (
      <div
        id={id || ''}
        className={`card_icon${selected ? '_selected' : ''} ${className || ''}`}
        onClick={onClick}
        {...rest}
      >
        {cardIcon}
        {contentChildrens && contentChildrens.length > 0 && <div className="card_icon-content">{contentChildrens}</div>}
      </div>
    );
  };

  return renderIconCard();
};

export default IconCard;
