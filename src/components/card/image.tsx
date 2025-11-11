import clsx from "clsx";
import React, { HTMLAttributes, ReactElement } from "react";

type CardImgProps = HTMLAttributes<HTMLDivElement> & {
  hoverElement?: ReactElement;
  variant?: "background" | "inline";
};

const CardImg: React.FC<CardImgProps> = ({
  children,
  className,
  variant = "inline",
  hoverElement,
  ...props
}) => {
  return (
    <div
      className={clsx(
        {
          "card-img": variant === "inline",
          "card-img_absolute": variant === "background",
        },
        className
      )}
      {...props}
    >
      {children}
      {hoverElement}
    </div>
  );
};

export default CardImg;
