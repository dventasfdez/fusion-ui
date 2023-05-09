import React from 'react';
import ProgressBarCircular from './progressBarCircular';
import ProgressBarSmall from './progressBarSmall';

export interface IProgressBarProps {
  /**
   * Step where the user currently is
   */
  step: number;
  /**
   * Number of steps that are on the progress
   */
  steps: number;
  /**
   * Title of the Progress Bar
   */
  title?: string;
  /**
   * Helper for hinting or give more information
   */
  helper?: string;
  /**
   * Change from bar to circle
   */
  circular?: boolean;
  /**
   * Change from bar to small circle
   */
  small?: boolean;
  /**
   * On Progress bar: to show if wanted to see the steps
   */
  showSteps?: boolean;
  showPercentage?: boolean;
  className?: string;
  [others: string]: any;
}

const ProgressBar: React.FC<IProgressBarProps> = (props) => {
  const {step, title, helper, steps, circular, small, showSteps, showPercentage, className, ...rest} = props;
  const calcPercentage = (step / steps) * 100 || 0;

  if (small) {
    return (
      <ProgressBarSmall
        className={className}
        step={step}
        steps={steps}
        title={title}
        helper={helper}
        data-testid={rest && rest['data-testid'] ? rest['data-testid'] : undefined}
      />
    );
  }

  if (circular) {
    return (
      <ProgressBarCircular
        className={className}
        step={step}
        steps={steps}
        title={title}
        helper={helper}
        data-testid={rest && rest['data-testid'] ? rest['data-testid'] : undefined}
      />
    );
  }

  return (
    <div
      className={`progress-bar ${className || ''}`}
      data-testid={rest && rest['data-testid'] ? rest['data-testid'] : null}
    >
      {title && <div className="progress-bar-title">{title}</div>}
      <div className="progress-bar-progress">
        <div className="progress-bar-progress-bar" style={{width: `${calcPercentage}%`}} />
      </div>
      <div className="progress-bar-footer">
        {showSteps && (
          <div className="progress-bar-steps">
            {step}/{steps}
          </div>
        )}
        {showPercentage && <div className="progress-bar-percentage">{calcPercentage.toFixed()}%</div>}
      </div>
    </div>
  );
};

export default ProgressBar;
