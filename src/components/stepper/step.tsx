import React from 'react';
import {IStep} from './stepper';

const Step: React.FC<IStep> = ({name, detail, status, ...rest}) => {
  let _icon = '';
  if (status === 'success') {
    _icon = 'check';
  } else if (status === 'error') {
    _icon = 'error_outline';
  }

  return (
    <div
      className={`stepper-step-container ${status}`}
      onClick={() => rest?.onClick && rest.onClick(rest['data-idx'])}
      data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-item-${rest['data-idx']}` : undefined}
    >
      <div className="stepper-item-content">
        <div className="stepper-step">
          {rest?.numbered ? (
            <span className="step-number">{rest['data-idx'] + 1}</span>
          ) : status === 'success' || status === 'error' ? (
            <span className="material-icons">{_icon}</span>
          ) : (
            <span />
          )}
        </div>
      </div>

      <div className="stepper-text-content">
        <p className="stepper-title">{name}</p>
        <p className="stepper-subtitle">{detail}</p>
      </div>
    </div>
  );
};

export default Step;
