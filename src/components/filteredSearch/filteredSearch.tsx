import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDevice } from "../../hooks/useDevice/useDevice";
import MoreFilters from "./filteredSearchMoreFilters";
import FilteredSearchTopSection, { IFilteredSearchTopSection } from "./filteredSearchTopSection";
export { default as MoreFilters } from "./filteredSearchMoreFilters";
export { default as FilteredSearchTopSection } from "./filteredSearchTopSection";

export interface IFilteredSearchProps {
  /**
   * Children for completing the content of the filtered search
   * */
  children: React.ReactNode | React.ReactNode[];
  /**
   * Boolean value for control whether the filtes shall be opened or not
   * */
  openFilters?: boolean;
  [others: string]: any;
}

const FilteredSearch: React.FC<IFilteredSearchProps> = ({ children, openFilters }) => {
  const { isMobile } = useDevice();
  const [isOverflowing, setIsOverflowing] = useState(false);
  const _children = useMemo(() => React.Children.toArray(children), [children]);
  const filteredRef = useRef<HTMLDivElement>(null);
  const filteredContainerRef = useRef<HTMLDivElement>(null);
  let countLeft = 0;
  let interval: any = null;

  const handleScroll = (direction: "left" | "right") => {
    if (filteredRef.current) {
      const position = filteredRef.current.getBoundingClientRect();
      if (direction === "left") {
        if (countLeft - 120 < 0) countLeft = 0;
        else countLeft -= 120;
      } else {
        if (countLeft + 120 > position.width) countLeft = position.width;
        else countLeft += 120;
      }
      filteredRef.current.scrollTo({ left: countLeft, behavior: "smooth" });
    }
  };

  const maintainedButton = (direction: any = "right") => {
    interval = setTimeout(() => {
      if (filteredRef.current) {
        filteredRef.current.scrollLeft = filteredRef.current.scrollLeft - countLeft;
        requestAnimationFrame(() => maintainedButton(direction));
      }
    }, 300);
  };

  useEffect(() => {
    if (filteredContainerRef.current && filteredRef.current) {
      const container = filteredContainerRef.current;
      const inner = filteredRef.current;
      const padding = getComputedStyle(container).padding.split(" ");
      let paddingHorizontal = 0;
      if (padding.length > 1) {
        paddingHorizontal = Number(padding[padding.length - 1].replace(/px|rem|em/, ""));
      }
      if (inner.scrollWidth > container.clientWidth - 2 * paddingHorizontal) setIsOverflowing(true);
      else container.style.padding = "16px 32px";
    }
  }, [openFilters]);

  return (
    <div className="filtered-search">
      {_children.find((child) => React.isValidElement(child) && child.type === FilteredSearchTopSection) || null}
      {openFilters && (
        <div ref={filteredContainerRef} className="filtered-search-filter-container">
          {isOverflowing && !isMobile && (
            <button
              type="button"
              onClick={() => handleScroll("left")}
              className="filtered-search-filter-navigation_left"
              onMouseDown={() => maintainedButton("left")}
              onMouseUp={() => clearInterval(interval)}
            >
              <span className="material-icons">chevron_left</span>
            </button>
          )}
          <div ref={filteredRef} className="filtered-searc-filter-container-inner">
            {_children.find((child) => {
              if (React.isValidElement(child)) {
                if (child.type === MoreFilters) return child;
              }
              return false;
            })}
          </div>
          {isOverflowing && !isMobile && (
            <button
              type="button"
              className="filtered-search-filter-navigation_right"
              onMouseDown={() => maintainedButton("right")}
              onMouseUp={() => clearTimeout(interval)}
              onClick={() => handleScroll("right")}
            >
              <span className="material-icons">chevron_right</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FilteredSearch;
