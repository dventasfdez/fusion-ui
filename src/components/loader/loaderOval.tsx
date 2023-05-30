import React, {useEffect, useRef} from 'react';
const OFFSET_DEFAULT = 165;

interface ILoaderProps {
  percentage: number;
  HasText: any;
  error?: boolean;
  success?: boolean;
  className?: string;
  [others: string]: any;
}

export const LoaderOval: React.FC<ILoaderProps> = ({percentage, HasText, error, success, className, ...rest}) => {
  const ref = useRef<SVGPathElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const calcPercentage = (x: number) => (x / 100) * 135;

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
    if (percentage !== 100) {
      if (error) return 'error';
      if (success) return 'success';
    }
    return '';
  };

  return (
    <div
      className={`loader-wrapper ${className || ''}`}
      data-testid={rest && rest['data-testid'] ? rest['data-testid'] : undefined}
    >
      <div
        className={`svg-container ${getLoaderState()}`}
        data-percentage={`${percentage}%`}
        ref={divRef}
        data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-svg-container` : undefined}
      >
        <svg
          className="svg-content"
          width={divRef && divRef.current && divRef.current.style.width === '24px' ? '32' : '56'}
          height="32"
          viewBox={divRef && divRef.current && divRef.current.style.width === '24px' ? '0 0 32 32' : '0 0 56 32'}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="oval-svg"
            ref={ref}
            d="M28 2H40C47.732 2 54 8.26801 54 16C54 23.732 47.732 30 40
            30H28H16C8.26801 30 2 23.732 2 16C2 8.26801 8.26801 2 16 2H28Z"
            stroke="rgb(0, 154, 204)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {HasText}
    </div>
  );
};
