import React, { useCallback, useEffect, useRef, useState } from "react";

interface TTProps {
  min: string | number;
  max: string | number;
}
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

enum Bubbles {
  bb1 = 0,
  bb2 = 1,
}

export const SliderDouble: React.FC<ISlider> = (props) => {
  const { min = 0, max = 100, onChange, disabled, label, tooltip, defaultValue, className, double: _, ...rest } = props;
  const rangeRef = useRef<HTMLDivElement>(null);
  const [minVal, setMinVal] = useState((defaultValue as DefProps)?.min || min);
  const [maxVal, setMaxVal] = useState((defaultValue as DefProps)?.max || max);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const bubbleRef2 = useRef<HTMLDivElement>(null);
  const bubbles = [bubbleRef, bubbleRef2];

  const getPercent = useCallback((value: number) => Math.round(((value - min) / (max - min)) * 100), [min, max]);

  useEffect(() => {
    if (minValRef.current && maxValRef.current) {
      setValue(Bubbles.bb1);
      setValue(Bubbles.bb2);
    }
  }, []);

  const setValue = (bubble?: number) => {
    const reference = bubbles[bubble as number];
    const valReference = bubble === 0 ? minValRef : maxValRef;
    if (reference?.current && minValRef?.current && maxValRef?.current && valReference?.current) {
      const thumbValue1 = +minValRef.current.value;
      const thumbValue2 = +maxValRef.current.value;
      if (thumbValue1 < thumbValue2) {
        const val = +valReference.current.value;
        const newVal = Number(((val - min) * 100) / (max - min));

        reference.current.style.left = `calc(${newVal}% + (${12 - newVal * 0.22}px))`;
      }
    }
  };

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (rangeRef.current) {
        rangeRef.current.style.left = `${minPercent}%`;
        rangeRef.current.style.width = `calc(${maxPercent - minPercent}% ${maxPercent !== minPercent && maxPercent < 50 && maxPercent !== max ? "+ calc(var(--unit) / 2)" : ""})`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (rangeRef.current) {
        rangeRef.current.style.width = `calc(${maxPercent - minPercent}% ${maxPercent !== minPercent && maxPercent < 50 && maxPercent !== max ? "+ calc(var(--unit) / 2)" : ""})`;
        rangeRef.current.style.left = `calc(${minPercent}%)`;
      }
    }
  }, [maxVal, getPercent]);

  return (
    <div className={`slider-wrapper ${className || ""}`} {...rest}>
      <div ref={rangeRef} className={`slider-range${disabled ? "_disabled" : ""}`}></div>
      <div className="slider-input-container">
        <input
          data-order="min"
          disabled={disabled}
          type="range"
          ref={minValRef}
          min={min}
          max={max}
          data-testid={rest["data-testid"] ? rest["data-testid"] + "-input-test" : undefined}
          value={minVal}
          onInput={tooltip ? () => setValue(Bubbles.bb1) : undefined}
          onChange={(e) => {
            const value = Math.min(+e.target.value, maxVal - 1);
            setMinVal(value);
            if (onChange) onChange({ min: value, max: maxVal });
            e.target.value = value.toString();
          }}
        />
        {tooltip && (
          <span className="tooltip top slider" data-testid={rest["data-testid"] ? rest["data-testid"] + "-tooltip-test" : undefined} ref={bubbleRef}>
            {minVal}
          </span>
        )}
      </div>

      <div className="slider-input-container">
        <input
          data-order="max"
          disabled={disabled}
          type="range"
          ref={maxValRef}
          value={maxVal}
          min={min}
          max={max}
          data-testid={rest["data-testid"] ? rest["data-testid"] + "-input2-test" : undefined}
          onInput={tooltip ? () => setValue(Bubbles.bb2) : undefined}
          onChange={(e) => {
            const value = Math.max(+e.target.value, minVal + 1);
            setMaxVal(value);
            if (onChange) onChange({ min: minVal, max: value });
            e.target.value = value.toString();
          }}
        />
        {tooltip && (
          <span className="tooltip top slider" data-testid={rest["data-testid"] ? rest["data-testid"] + "-tooltip2-test" : undefined} ref={bubbleRef2}>
            {maxVal}
          </span>
        )}
      </div>
      <div className="slider-label" data-testid={rest["data-testid"] ? rest["data-testid"] + "-label-test" : undefined}>
        <small>{label?.left}</small>
        <small>{label?.right}</small>
      </div>
    </div>
  );
};
