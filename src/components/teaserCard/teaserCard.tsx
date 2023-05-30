import React from "react";

import TeaserCardTop from "../card/cardTop";
import TeaserCardImg from "../card/cardImage";
import TeaserCardHeader from "../card/cardHeader";
import TeaserCardBody from "../card/cardBody";
import TeaserCardFooter from "../card/cardFooter";

export { default as TeaserCardTop } from "../card/cardTop";
export { default as TeaserCardImg } from "../card/cardImage";
export { default as TeaserCardHeader } from "../card/cardHeader";
export { default as TeaserCardBody } from "../card/cardBody";
export { default as TeaserCardFooter } from "../card/cardFooter";

export interface ITeaserCardProps {
  /**
   * Identifies the card
   */
  id?: string;
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
    | React.ReactComponentElement<typeof TeaserCardTop | typeof TeaserCardImg | typeof TeaserCardHeader | typeof TeaserCardBody | typeof TeaserCardFooter>[]
    | React.ReactComponentElement<typeof TeaserCardTop | typeof TeaserCardImg | typeof TeaserCardHeader | typeof TeaserCardBody | typeof TeaserCardFooter>;
  [others: string]: any;
}

const TeaserCard: React.FC<ITeaserCardProps> = (props) => {
  const { children, className, selected, onClick, ...rest } = props;
  return (
    <div className={`card_teaser${selected ? "_selected" : ""} ${className ?? ""}`} onClick={onClick} {...rest}>
      {children}
    </div>
  );
};

export default TeaserCard;
