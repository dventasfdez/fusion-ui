import React, { ReactElement } from "react";
import { useDevice } from "../../hooks/useDevice/useDevice";
import Step from "./step";
export { default as Step } from "./step";

export type TStatus = "success" | "pending" | "disabled" | "error" | "default" | "active";

export interface IStep {
  /**
   * Name of the step that will be displayed on the component
   */
  name: string;
  /**
   * Helper of the step
   */
  detail?: string;
  /**
   * Status of the component that will be reflected on itself
   */
  status?: TStatus;
  [others: string]: any;
}
export interface IStepperProps {
  /**
   * direction of the stepper
   */
  vertical?: boolean;
  numbered?: boolean;
  /**
   * Handler for click events
   */
  onClickStep?: (stepIndex: number) => void;
  /**
   * additional className
   */
  className?: string;
  children: React.ReactComponentElement<typeof Step> | React.ReactComponentElement<typeof Step>[];
  [others: string]: any;
}

const Stepper: React.FC<IStepperProps> = ({ vertical, numbered, onClickStep, className, children, ...rest }) => {
  const { isMobile } = useDevice();

  const onClickStepItem = (index: number) => {
    if (typeof onClickStep === "function") onClickStep(index);
  };

  const structuredChildren = React.Children.map(children, (child, idx) => {
    const props = {
      "data-idx": idx,
      numbered,
      onClick: onClickStepItem,
      vertical,
    };
    if (React.isValidElement(child) && child.type === Step) return React.cloneElement(child, props);
    return children;
  });

  if (isMobile) {
    const steps = React.Children.toArray(children) as ReactElement<IStep>[];
    const length = steps.length;
    const activeStep = steps.findIndex((step: any) => step.props.status === "active");
    return (
      <div className="stepper-mobile">
        <div className="stepper-mobile-text-container">
          <p className="stepper-title">{steps[activeStep].props.name}</p>
          <div className="stepper-mobile-steps">
            {activeStep + 1}/{length}
          </div>
        </div>
        <div className="stepper-mobile-progress">
          <div className="stepper-mobile-progress_fill" style={{ transform: `translateX(-${100 - (activeStep + 1 / length) * 100}%)` }} />
        </div>
      </div>
    );
  }

  return (
    <div className={`stepper${vertical ? "_vertical" : ""} ${className || ""}`} data-testid={rest && rest["data-testid"] ? rest["data-testid"] : undefined}>
      {structuredChildren}
    </div>
  );
};

export default Stepper;
