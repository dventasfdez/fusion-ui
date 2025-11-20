import clsx from "clsx";
import React, { useRef, useEffect } from "react";
import { LoaderVariantProps } from "./loader";
const OFFSET_DEFAULT = 213;

export const LoaderCircular: React.FC<LoaderVariantProps> = ({
  percentage,
  error,
  success,
  className,
  ...props
}) => {
  const calcPercentage = (x: number) => (x / 100) * 87;
  const ref = useRef<SVGPathElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.animationDelay = "0";
      ref.current.style.transition = "stroke-dashoffset 0.2s linear";
      ref.current.style.strokeDashoffset = `${
        calcPercentage(100 - percentage) + OFFSET_DEFAULT
      }`;
    }
  }, [percentage]);

  return (
    <div
      ref={divRef}
      className={clsx(
        "loader_circular",
        {
          error: error && percentage === 100,
          success: success && percentage === 100,
        },
        className
      )}
    >
      <svg
        className="loader"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="loader_circle"
          ref={ref}
          d="M16 30C8.26801 30 2 23.732 2 16C2 8.26801 8.26801 2 16 2C23.732 2 30 8.26801 30 16C30 23.732 23.732 30 16 30Z"
          strokeWidth="4"
        />
      </svg>
    </div>
  );
};
