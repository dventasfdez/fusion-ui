import React, {useRef, useEffect} from 'react';
const OFFSET_DEFAULT = 213;

interface ILoaderCircularProps {
  percentage: number;
  HasText: any;
  error?: boolean;
  success?: boolean;
  className?: string;
  [others: string]: any;
}

export const LoaderCircular: React.FC<ILoaderCircularProps> = ({
  percentage,
  HasText,
  error,
  success,
  className,
  ...rest
}) => {
  const calcPercentage = (x: number) => (x / 100) * 87;
  const ref = useRef<SVGPathElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.animationDelay = '0';
      ref.current.style.transition = 'stroke-dashoffset 0.2s linear';
      ref.current.style.strokeDashoffset = `${calcPercentage(100 - percentage) + OFFSET_DEFAULT}`;

      if (percentage === 100) {
        if (divRef.current && ref.current) {
          if (error) divRef.current.classList.add('error');
          else if (success) divRef.current.classList.add('success');
        }
      }
    }
  }, [percentage, error, success]);

  const getLoaderState = () => {
    if (error) return 'error';
    if (success) return 'success';
    return '';
  };

  return (
    <div
      className={`loader-wrapper ${className || ''}`}
      data-testid={rest && rest['data-testid'] ? rest['data-testid'] : undefined}
    >
      <div
        ref={divRef}
        className={`svg-container_circular ${getLoaderState()}`}
        data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-svg-container` : undefined}
      >
        <svg
          className="svg-content"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="circle-svg"
            ref={ref}
            d="M16 30C8.26801 30 2 23.732 2 16C2 8.26801 8.26801 2 16 2C23.732 2 30 8.26801 30 16C30 23.732 23.732 30 16 30Z"
            stroke="rgb(0, 154, 204)"
            strokeWidth="4"
          />
        </svg>
      </div>
      {HasText}
    </div>
  );
};
