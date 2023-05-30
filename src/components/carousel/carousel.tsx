import React, { useState, useCallback } from "react";

export { default as CarouselItem } from "./carouselItem";

interface ICarousel {
  /**
   * If you want to add an custom defaultId instead to render the first element
   */
  defaultItemSelected?: string;
  /**
   * Set to true in order to render arrows and dots outside the box
   */
  outlined?: boolean;
  /**
   * Additional or alternative styling
   */
  className?: string;
  [others: string]: any;
}

const Carousel: React.FC<ICarousel> = (props) => {
  const { children, defaultItemSelected, outlined, className, ...rest } = props;
  const length = React.Children.toArray(children).length - 1;
  const defaultIndex = useCallback(
    () => React.Children.toArray(children).findIndex((_child) => React.isValidElement(_child) && _child.props && _child.props.id === defaultItemSelected),
    [children, defaultItemSelected]
  );
  const [showIndex, setShowIndex] = useState<number>(defaultIndex() !== -1 ? defaultIndex() : 0);
  const elementX = (el: any) => React.isValidElement(React.Children.toArray(children)[el]) && React.Children.toArray(children)[el];

  const avoidDisabled = (ind: number, op: (x: number) => number): number => {
    let realInd = ind;
    if (realInd < 0) realInd = length;
    if (realInd > length) realInd = 0;
    const _elemX: React.ReactElement = elementX(realInd) as React.ReactElement;
    if (_elemX && _elemX.props && !_elemX.props.disabled) {
      return realInd;
    }
    return avoidDisabled(op(realInd), op);
  };

  const handleIncrement = () => {
    setShowIndex(avoidDisabled(showIndex + 1, (x) => x + 1));
  };

  const handleDecrement = () => {
    setShowIndex(avoidDisabled(showIndex - 1, (x) => x - 1));
  };

  const handleDotClick = (idx: number) => {
    const _elem = elementX(idx) as React.ReactElement;
    const isDisabled = _elem.props && _elem.props.disabled;
    if (idx !== showIndex && !isDisabled) {
      setShowIndex(idx);
    }
  };

  const Dots = () => {
    return (
      <div className="carousel-dots-container">
        {React.Children.toArray(children).map(
          (_child, idx) =>
            React.isValidElement(_child) && (
              <button
                type="button"
                onClick={() => handleDotClick(idx)}
                key={idx + "carousel-dot"}
                disabled={_child.props && _child.props.disabled}
                className={`${idx === showIndex ? "carousel-dot_active" : "carousel-dot"}`}
                data-testid={`${rest["data-testid"] ?? "carousel"}-dot-test-${idx}`}
                aria-label={`${_child.props["aria-label"] ?? "carousel"}-button-${idx}`}
              />
            )
        )}
      </div>
    );
  };

  return (
    <div className={`${outlined ? "carousel-container_outlined" : "carousel-container"} ${className ?? ""}`} {...rest}>
      {React.Children.toArray(children)[showIndex]}
      <button type="button" onClick={handleDecrement} className="carousel-left">
        <span data-testid={`${rest["data-testid"] ?? "carousel"}-left-arrow-test`} className="material-icons">
          keyboard_arrow_left
        </span>
      </button>
      <button type="button" onClick={handleIncrement} className="carousel-right">
        <span data-testid={`${rest["data-testid"] ?? "carousel"}-right-arrow-test`} className="material-icons">
          keyboard_arrow_right
        </span>
      </button>
      <Dots />
    </div>
  );
};

export default Carousel;
