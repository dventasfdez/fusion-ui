import React, {useRef, useEffect} from 'react';

interface IProgressBarSmallProps {
  step: number;
  steps: number;
  title?: string;
  helper?: string;
  className?: string;
  [others: string]: any;
}
const ProgressBarSmall: React.FC<IProgressBarSmallProps> = (props) => {
  const {step, steps, helper, title, className, ...rest} = props;
  const ref = useRef<SVGPathElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const calcPercentage = (step / steps) * 100 || 0;

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.style.animationDelay = '0';
      ref.current.style.transition = 'stroke-dashoffset 0.2s linear';
      ref.current.style.strokeDashoffset = `${(137 / steps) * (steps - step) + 163}`;
    }
  }, [step, steps]);

  return (
    <div
      className={`progress-bar_round ${className || ''}`}
      data-testid={rest && rest['data-testid'] ? rest['data-testid'] : undefined}
    >
      <div
        ref={divRef}
        className="svg-container_circular_medium"
        data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-svg-container` : undefined}
        data-percentage={`${calcPercentage.toFixed()}%`}
      >
        <svg
          width="48"
          className="svg-content"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={ref}
            className="circle-svg"
            d="M24 46C11.8497 46 2 36.1503 2 24C2 11.8497 11.8497 2 24
        2C36.1503 2 46 11.8497 46 24C46 36.1503 36.1503 46 24 46Z"
            strokeWidth="4"
          />
        </svg>
      </div>
      <div className="progress-bar-text-wrapper">
        {title && <p className="progress-bar-title">{title}</p>}
        {helper && <p className="progress-bar-helper">{helper}</p>}
      </div>
    </div>
  );
};

export default ProgressBarSmall;
