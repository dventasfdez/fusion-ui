import React, {
  Children,
  cloneElement,
  ComponentProps,
  HTMLAttributes,
  isValidElement,
  ReactElement,
  useCallback,
} from "react";

import CardImg from "./image";
import CardHeader from "./header";
import CardBody from "./body";
import CardFooter from "./footer";
import CardFloat from "./float";
import clsx from "clsx";

export { default as CardImg } from "./image";
export { default as CardHeader } from "./header";
export { default as CardBody } from "./body";
export { default as CardFooter } from "./footer";
export { default as CardFloat } from "./float";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Change card type for horizontal card
   */
  orientation?: "vertical" | "horizontal";
  /**
   * Set card selected
   */
  selected?: boolean;
  /**
   * onClick function
   */
  onClick?: () => void;
  /**
   * Parts of cards, one of this is required
   */
  children:
    | ReactElement<
        ComponentProps<
          | typeof CardImg
          | typeof CardHeader
          | typeof CardBody
          | typeof CardFooter
          | typeof CardFloat
        >,
        | typeof CardImg
        | typeof CardHeader
        | typeof CardBody
        | typeof CardFooter
        | typeof CardFloat
      >[]
    | ReactElement<
        ComponentProps<
          | typeof CardImg
          | typeof CardHeader
          | typeof CardBody
          | typeof CardFooter
          | typeof CardFloat
        >,
        | typeof CardImg
        | typeof CardHeader
        | typeof CardBody
        | typeof CardFooter
        | typeof CardFloat
      >;
};

const Card: React.FC<CardProps> = ({
  orientation = "vertical",
  children,
  className,
  selected,
  onClick,
  ...props
}) => {
  const render = useCallback(() => {
    const _children = Children.toArray(children);
    if (_children.length) {
      let img: ReactElement<
        ComponentProps<typeof CardImg>,
        typeof CardImg
      > | null = null;
      let float: ReactElement<
        ComponentProps<typeof CardFloat>,
        typeof CardFloat
      > | null = null;
      const content: ReactElement<
        ComponentProps<typeof CardHeader | typeof CardBody | typeof CardFooter>,
        typeof CardHeader | typeof CardBody | typeof CardFooter
      >[] = [];

      _children.forEach((_child) => {
        if (isValidElement(_child)) {
          switch (_child.type) {
            case CardImg:
              img = _child as ReactElement<
                ComponentProps<typeof CardImg>,
                typeof CardImg
              >;
              break;
            case CardFloat:
              float = _child as ReactElement<
                ComponentProps<typeof CardFloat>,
                typeof CardFloat
              >;
              break;
            default:
              content.push(
                _child as ReactElement<
                  ComponentProps<
                    typeof CardHeader | typeof CardBody | typeof CardFooter
                  >,
                  typeof CardHeader | typeof CardBody | typeof CardFooter
                >
              );
              break;
          }
        }
      });

      if (img !== null && float !== null) {
        const _img = img as ReactElement<
          ComponentProps<typeof CardImg>,
          typeof CardImg
        >;
        if (orientation === "vertical" && _img.props.variant !== "background") {
          img = cloneElement(_img, {
            ..._img.props,
            children: [].concat((_img.props as any).children, float),
          });
          float = null;
        }
      }

      return (
        <div
          className={clsx(
            {
              card: orientation === "vertical",
              card_horizontal: orientation === "horizontal",
              selected,
            },
            className
          )}
          onClick={onClick}
          {...props}
        >
          {img}
          {float}
          {orientation === "horizontal" ||
          img?.props.variant === "background" ? (
            <div className="card-content">{content}</div>
          ) : (
            content
          )}
        </div>
      );
    }
    return null;
  }, [children]);

  return render();
};

export default Card;
