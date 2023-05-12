import React from "react";

import FigureCardFigure from "./cardFigure";
import FigureCardHeader from "../card/cardHeader";
import FigureCardBody from "../card/cardBody";
import FigureCardFloatIcon from "../card/cardFloatIcon";

export { default as FigureCardFigure } from "./cardFigure";
export { default as FigureCardHeader } from "../card/cardHeader";
export { default as FigureCardBody } from "../card/cardBody";
export { default as FigureCardFloatIcon } from "../card/cardFloatIcon";

export interface IFigureCardProps {
  /**
   * Add class to card
   */
  className?: string;
  /**
   * Set card selected
   */
  selected?: boolean;
  /**
   * Set accent background
   */
  accent?: boolean;
  /**
   * onClick function
   */
  onClick?: () => void;
  /**
   *
   * Parts of card, one of this is required
   */
  children:
    | React.ReactComponentElement<typeof FigureCardHeader | typeof FigureCardBody | typeof FigureCardFigure | typeof FigureCardFloatIcon>[]
    | React.ReactComponentElement<typeof FigureCardHeader | typeof FigureCardBody | typeof FigureCardFigure | typeof FigureCardFloatIcon>;
  [others: string]: any;
}

const FigureCard: React.FC<IFigureCardProps> = (props) => {
  const { children, className, selected, accent, onClick, ...rest } = props;

  const renderFigureCard = () => {
    let cardFigure: any;
    let cardFloatIcon: any;
    const contentChildrens: any[] = [];
    let widthStyle = undefined;
    if (children) {
      React.Children.forEach(children, (_childItem: any) => {
        if (_childItem)
          if (_childItem.type === FigureCardHeader || _childItem.type === FigureCardBody) contentChildrens.push(_childItem);
          else if (_childItem.type === FigureCardFigure) cardFigure = _childItem;
          else if (_childItem.type === FigureCardFloatIcon) cardFloatIcon = _childItem;
      });

      if (cardFigure && cardFloatIcon) {
        let _cardFigureChildrens: any = [];
        if (cardFigure.props && cardFigure.props.children) _cardFigureChildrens = cardFigure.props.children;
        cardFigure = React.cloneElement(cardFigure, {
          ...cardFigure.props,
          children: [].concat(cardFloatIcon, _cardFigureChildrens),
        });
      }

      if (contentChildrens.length < 1) widthStyle = "fit-content";
    }

    return (
      <div className={`card_figure${accent ? "_accent" : ""}${selected ? "_selected" : ""} ${className ?? ""}`} style={{ width: widthStyle }} onClick={onClick} {...rest}>
        {cardFigure}
        {contentChildrens}
      </div>
    );
  };

  return renderFigureCard();
};

export default FigureCard;
