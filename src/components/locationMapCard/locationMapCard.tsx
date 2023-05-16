import React from "react";

import LocationMapCardTop from "../card/cardTop";
import LocationMapCardMap from "../card/cardImage";
import LocationMapCardHeader from "../card/cardHeader";
import LocationMapCardBody from "../card/cardBody";

export { default as LocationMapCardTop } from "../card/cardTop";
export { default as LocationMapCardMap } from "../card/cardImage";
export { default as LocationMapCardHeader } from "../card/cardHeader";
export { default as LocationMapCardBody } from "../card/cardBody";

export interface ILocationMapCardProps {
  /**
   * Add class to card
   */
  className?: string;
  /**
   * Set selected style in card
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
    | React.ReactComponentElement<typeof LocationMapCardTop | typeof LocationMapCardMap | typeof LocationMapCardHeader | typeof LocationMapCardBody>[]
    | React.ReactComponentElement<typeof LocationMapCardTop | typeof LocationMapCardMap | typeof LocationMapCardHeader | typeof LocationMapCardBody>;
  [others: string]: any;
}

const LocationMapCard: React.FC<ILocationMapCardProps> = (props) => {
  const { id, children, className, selected, onClick, ...rest } = props;

  const renderLocationMapCard = () => {
    let cardMap: any;
    let cardTop: any;
    const contentChildrens: any[] = [];
    if (children) {
      React.Children.forEach(children, (_childItem: any) => {
        if (_childItem)
          if (_childItem.type === LocationMapCardHeader || _childItem.type === LocationMapCardBody) contentChildrens.push(_childItem);
          else if (_childItem.type === LocationMapCardMap) cardMap = _childItem;
          else if (_childItem.type === LocationMapCardTop) cardTop = _childItem;
      });
      if (cardMap && cardTop) {
        let _cardMapChild = [];
        if (cardMap.props && cardMap.props.children) _cardMapChild = cardMap.props.children;
        cardMap = React.cloneElement(cardMap, {
          ...cardMap.props,
          children: [].concat(cardTop, _cardMapChild),
        });
      }
    }

    return (
      <div className={`card_map${selected ? "_selected" : ""} ${className ?? ""}`} onClick={onClick} {...rest}>
        {cardMap}
        {contentChildrens}
      </div>
    );
  };
  return renderLocationMapCard();
};

export default LocationMapCard;
