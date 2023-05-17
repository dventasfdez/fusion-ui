import React from "react";

export interface ICarouselItem {
  /**
   * Set for Disable the Item Display on the Carousel
   */
  disabled?: boolean;
  /**
   * For alternative or Additional styling
   */
  className?: string;
  /**
   * Required To Identify the element
   */
  id: string;
  [others: string]: any;
}

const CarouselItem: React.FC<ICarouselItem> = ({ children, className, id, ...rest }) => (
  <div className={className || ""} id={id} {...rest}>
    {children}
  </div>
);

export default CarouselItem;
