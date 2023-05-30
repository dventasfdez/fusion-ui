import React, { useCallback, useEffect, useRef, useState } from "react";
import { SliderDouble } from "./sliderDouble";
interface DefProps {
  min: number;
  max: number;
}

interface ISlider {
  /**
   * Maximum bound for the slider
   */
  max?: number;
  /**
   * Minimum bound for the slider
   */
  min?: number;
  /**
   * Default value set before initialization, for single slider --> number, for double --> { min: number, max: number }
   */
  defaultValue?: DefProps | number;
  /**
   * Boolean set for telling our component to have 2 sliders on the range
   */
  double?: boolean;
  /**
   * Setter for disabled state of the slider
   */
  disabled?: boolean;
  /**
   * Object containing the left and right labels
   */
  label?: {
    left: string | number;
    right: string | number;
  };
  /**
   * Boolean for telling the component that we want it to have a tooltip with the value
   */
  tooltip?: boolean;
  /**
   * When set, this function will tell the parent in what state the slider/sliders are
   */
  onChange?: (...values: any) => void;
  className?: string;
  [others: string]: any;
}

const Slider: React.FC<ISlider> = (props) => {
  const { disabled, tooltip, defaultValue = 0, tooltipText, min = 0, max = 100, label, double, onChange, className, ...rest } = props;
  const rangeRef = useRef<HTMLDivElement>(null);
  const valRef = useRef<HTMLInputElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<number>(defaultValue as number);

  const getPercent = useCallback((value: number) => Math.round(((value - min) / (max - min)) * 100), [min, max]);

  useEffect(() => {
    if (valRef.current) {
      const minPercent = getPercent(min);
      const maxPercent = getPercent(value);
      if (rangeRef.current) {
        rangeRef.current.style.width = `calc(${maxPercent - minPercent}% ${maxPercent !== minPercent && maxPercent < 50 && maxPercent !== max ? "+ var(--unit)" : ""})`;
      }
      if (tooltip && bubbleRef.current) {
        getBubbleValue();
      }
    }
  }, [min, value, getPercent]);

  const getBubbleValue = () => {
    if (bubbleRef?.current && valRef?.current) {
      const val = valRef.current.value;
      const newVal = Number(((+val - min) * 100) / (max - min));
      bubbleRef.current.style.left = `calc(${newVal}% + (${12 - newVal * 0.22}px))`;
    }
  };

  if (double) return <SliderDouble {...props} />;

  return (
    <div className={`slider-wrapper ${className || ""}`}>
      <div ref={rangeRef} className={`slider-range${disabled ? "_disabled" : ""}`}></div>
      <input
        data-testid={rest["data-testid"] ? rest["data-testid"] + "-input-test" : undefined}
        onChange={(e) => {
          setValue(+e.target.value);
          if (onChange) onChange(+e.target.value);
        }}
        ref={valRef}
        defaultValue={defaultValue as number}
        disabled={disabled}
        aria-label={rest["aria-label"] ? `${rest["aria-label"]}-input` : "slider-input"}
        type="range"
        min={min}
        max={max}
        list="items"
        {...rest}
      />
      {tooltip && (
        <span className="tooltip top slider" data-testid={rest["data-testid"] ? rest["data-testid"] + "-tooltip-test" : undefined} ref={bubbleRef}>
          {value}
        </span>
      )}
      <div data-testid={rest["data-testid"] ? rest["data-testid"] + "-label-test" : undefined} className="slider-label">
        <small>{label?.left}</small>
        <small>{label?.right}</small>
      </div>
    </div>
  );
};

export default Slider;
