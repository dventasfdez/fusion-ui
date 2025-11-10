import React, {
  useState,
  useCallback,
  HTMLAttributes,
  Children,
  ReactElement,
  ComponentProps,
  useMemo,
} from "react";
import CarouselItem from "./item";
import IconButton from "../button/icon";
import clsx from "clsx";

export { default as CarouselItem } from "./item";

type CarouselProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * If you want to add an custom defaultId instead to render the first element
   */
  defaultItemSelected?: string;
  /**
   * Set to true in order to render arrows and dots outside the box
   */
  outlined?: boolean;
  children:
    | ReactElement<ComponentProps<typeof CarouselItem>, typeof CarouselItem>
    | ReactElement<ComponentProps<typeof CarouselItem>, typeof CarouselItem>[];
};

const Carousel: React.FC<CarouselProps> = ({
  children,
  defaultItemSelected,
  outlined,
  className,
  ...props
}) => {
  const _children = useMemo(() => Children.toArray(children), [children]);

  const defaultIndex = useCallback(
    () =>
      _children.findIndex(
        (_child) =>
          React.isValidElement(_child) &&
          _child.props &&
          _child.props.id === defaultItemSelected
      ),
    [_children, defaultItemSelected]
  );

  const [showIndex, setShowIndex] = useState<number>(
    defaultIndex() !== -1 ? defaultIndex() : 0
  );
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  const elementX = (el: any) =>
    React.isValidElement(React.Children.toArray(children)[el]) &&
    React.Children.toArray(children)[el];

  const avoidDisabled = (ind: number, op: (x: number) => number): number => {
    let realInd = ind;
    if (realInd < 0) realInd = _children.length - 1;
    if (realInd > _children.length - 1) realInd = 0;
    const _elemX: ReactElement = elementX(realInd) as ReactElement;
    if (_elemX && _elemX.props && !_elemX.props.disabled) {
      return realInd;
    }
    return avoidDisabled(op(realInd), op);
  };

  const handleIncrement = () => {
    const nextIdx = avoidDisabled(showIndex + 1, (x) => x + 1);
    if (nextIdx !== showIndex) {
      setPrevIndex(showIndex);
      setDirection("right");
      setShowIndex(nextIdx);
    }
  };

  const handleDecrement = () => {
    const nextIdx = avoidDisabled(showIndex - 1, (x) => x - 1);
    if (nextIdx !== showIndex) {
      setPrevIndex(showIndex);
      setDirection("left");
      setShowIndex(nextIdx);
    }
  };

  const handleDotClick = (idx: number) => {
    const _elem = elementX(idx) as ReactElement;
    const isDisabled = _elem.props && _elem.props.disabled;
    if (idx !== showIndex && !isDisabled) {
      setPrevIndex(showIndex);
      setDirection(idx > showIndex ? "right" : "left");
      setShowIndex(idx);
    }
  };

  const handleEnterAnimationEnd = () => {
    setPrevIndex(null);
    setDirection(null);
  };

  const Dots = () => {
    return (
      <div className="carousel-dots-container">
        {_children.map(
          (_child, idx) =>
            React.isValidElement(_child) && (
              <button
                type="button"
                onClick={() => handleDotClick(idx)}
                key={idx + "carousel-dot"}
                disabled={_child.props && _child.props.disabled}
                className={`${
                  idx === showIndex ? "carousel-dot_active" : "carousel-dot"
                }`}
                aria-label={`${
                  _child.props["aria-label"] ?? "carousel"
                }-button-${idx}`}
              />
            )
        )}
      </div>
    );
  };

  return (
    <div
      className={clsx({
        carousel: !outlined,
        carousel_outlined: outlined,
      })}
      {...props}
    >
      <IconButton
        type="button"
        color="neutral"
        appearance="text"
        size="large"
        name="keyboard_arrow_left"
        onClick={handleDecrement}
        className="carousel-button left"
      />

      {prevIndex !== null && (
        <div
          key={`prev-${prevIndex}`}
          className={`carousel-slide ${
            direction === "right" ? "leave-left" : "leave-right"
          }`}
        >
          {React.Children.toArray(children)[prevIndex]}
        </div>
      )}
      <div
        key={`curr-${showIndex}`}
        className={`carousel-slide ${
          prevIndex === null
            ? ""
            : direction === "right"
            ? "enter-right"
            : "enter-left"
        }`}
        onAnimationEnd={handleEnterAnimationEnd}
      >
        {React.Children.toArray(children)[showIndex]}
      </div>

      <IconButton
        type="button"
        color="neutral"
        appearance="text"
        size="large"
        name="keyboard_arrow_right"
        onClick={handleIncrement}
        className="carousel-button right"
      />

      <Dots />
    </div>
  );
};

export default Carousel;
