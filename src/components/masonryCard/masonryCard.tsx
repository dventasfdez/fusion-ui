import React from "react";

import MasonryCardTop from "../card/cardTop";
import MasonryCardImg from "../card/cardImage";
import MasonryCardHeader from "../card/cardHeader";
import MasonryCardBody from "../card/cardBody";

export { default as MasonryCardTop } from "../card/cardTop";
export { default as MasonryCardImg } from "../card/cardImage";
export { default as MasonryCardHeader } from "../card/cardHeader";
export { default as MasonryCardBody } from "../card/cardBody";

export interface IMasonryCardProps {
  /**
   * Add class to card
   */
  className?: string;
  /**
   * Set the selected style in card
   */
  selected?: boolean;
  /**
   * Set horizontal variant
   */
  horizontal?: boolean;
  /**
   * Set accent variant
   */
  accent?: boolean;
  /**
   * onClick function in card
   */
  onClick?: () => void;
  /**
   * Parts of card, one of this is required
   */
  children:
    | React.ReactComponentElement<typeof MasonryCardTop | typeof MasonryCardImg | typeof MasonryCardHeader | typeof MasonryCardBody>[]
    | React.ReactComponentElement<typeof MasonryCardTop | typeof MasonryCardImg | typeof MasonryCardHeader | typeof MasonryCardBody>;
  [others: string]: any;
}

const MasonryCard: React.FC<IMasonryCardProps> = (props) => {
  const { children, className, accent, horizontal, selected, onClick, ...rest } = props;
  const renderMasonryCard = () => {
    let cardImg: any;
    const contentChildrens: any[] = [];
    if (children) {
      React.Children.forEach(children, (_childItem: any) => {
        if (_childItem)
          if (_childItem.type === MasonryCardTop || _childItem.type === MasonryCardHeader || _childItem.type === MasonryCardBody) contentChildrens.push(_childItem);
          else if (_childItem.type === MasonryCardImg) cardImg = _childItem;
      });
    }
    if (!cardImg || accent) {
      cardImg = <div className="card-img bgAccent"></div>;
    }
    return (
      <div className={`card_masonry${horizontal ? "_horizontal" : ""}${selected ? "_selected" : ""} ${className ?? ""}`} onClick={onClick} {...rest}>
        {cardImg}
        <div className="card_masonry-content">{contentChildrens}</div>
      </div>
    );
  };
  return renderMasonryCard();
};

export default MasonryCard;
