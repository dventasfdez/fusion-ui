import React from "react";

import TeaserCardImg from "../card/image";
import TeaserCardHeader from "../card/header";
import TeaserCardBody from "../card/body";
import TeaserCardFooter from "../card/footer";

export { default as TeaserCardImg } from "../card/image";
export { default as TeaserCardHeader } from "../card/header";
export { default as TeaserCardBody } from "../card/body";
export { default as TeaserCardFooter } from "../card/footer";

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
    | React.ReactComponentElement<
        | typeof TeaserCardImg
        | typeof TeaserCardHeader
        | typeof TeaserCardBody
        | typeof TeaserCardFooter
      >[]
    | React.ReactComponentElement<
        | typeof TeaserCardImg
        | typeof TeaserCardHeader
        | typeof TeaserCardBody
        | typeof TeaserCardFooter
      >;
  [others: string]: any;
}

const TeaserCard: React.FC<ITeaserCardProps> = (props) => {
  const { children, className, selected, onClick, ...rest } = props;
  return (
    <div
      className={`card_teaser${selected ? "_selected" : ""} ${className ?? ""}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  );
};

export default TeaserCard;
