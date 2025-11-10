import React, { HTMLAttributes } from "react";

type CarouselItemProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Set for Disable the Item Display on the Carousel
   */
  disabled?: boolean;
  /**
   * Required To Identify the element
   */
  id: string;
};

const CarouselItem: React.FC<CarouselItemProps> = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

export default CarouselItem;
