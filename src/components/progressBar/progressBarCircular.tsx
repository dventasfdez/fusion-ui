import React, {useRef, useEffect} from 'react';

interface IProgressBarCircularProps {
  step: number;
  steps: number;
  title?: string;
  helper?: string;
  className?: string;
  [others: string]: any;
}

const ProgressBarCircular: React.FC<IProgressBarCircularProps> = (props) => {
  const {step, steps, title, helper, className, ...rest} = props;
  const ref = useRef<SVGPathElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const calcPercentage = (step / steps) * 100 || 0;

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.style.animationDelay = '0';
      ref.current.style.transition = 'stroke-dashoffset 0.2s linear';
      ref.current.style.strokeDashoffset = `${(222 / steps) * (steps - step) + 78}`;
    }
  }, [step, steps]);

  return (
    <div
      className={`progress-bar_round ${className || ''}`}
      data-testid={rest && rest['data-testid'] ? rest['data-testid'] : undefined}
    >
      <div
        ref={divRef}
        className="svg-container_circular_big"
        data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-svg-container` : undefined}
        data-percentage={`${calcPercentage.toFixed()}%`}
      >
        <svg
          className="svg-content"
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="circle-svg"
            ref={ref}
            d="M40 76C20.1178 76 4 59.8822 4 40C4 20.1178 20.1178 4 40
            4C59.8823 4 76 20.1178 76 40C76 59.8823 59.8823 76 40 76Z"
            strokeWidth="8"
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

export default ProgressBarCircular;
