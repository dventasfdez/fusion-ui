import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import { LoaderVariantProps } from "./loader";
const OFFSET_DEFAULT = 165;

export const LoaderOval: React.FC<LoaderVariantProps> = ({
  percentage,
  error,
  success,
  className,
  ...rest
}) => {
  const ref = useRef<SVGPathElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const calcPercentage = (x: number) => (x / 100) * 135;

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
      className={clsx(
        `loader_percentage`,
        {
          error: error && percentage === 100,
          success: success && percentage === 100,
        },
        className
      )}
      data-percentage={`${percentage}%`}
      ref={divRef}
    >
      <svg
        className="loader"
        width={
          divRef && divRef.current && divRef.current.style.width === "24px"
            ? "32"
            : "56"
        }
        height="32"
        viewBox={
          divRef && divRef.current && divRef.current.style.width === "24px"
            ? "0 0 32 32"
            : "0 0 56 32"
        }
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="loader_oval"
          ref={ref}
          d="M28 2H40C47.732 2 54 8.26801 54 16C54 23.732 47.732 30 40
            30H28H16C8.26801 30 2 23.732 2 16C2 8.26801 8.26801 2 16 2H28Z"
          stroke="rgb(0, 154, 204)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
