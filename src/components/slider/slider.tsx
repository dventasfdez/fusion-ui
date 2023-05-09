import React, {useCallback, useEffect, useRef, useState} from 'react';

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
   * Boolean for telling the component that we want it to have a tooltip
   */
  tooltip?: boolean;
  /**
   * When set, this function will tell the parent in what state the slider/sliders are
   */
  onChange?: (...values: any) => void;
  /**
   * Having a tooltip, We'll can tell the component whether it has a single or double slider
   * `single --> tooltip: 'Text'`
   * `double --> { min: 'Text', max: 'Text' }`
   */
  tooltipText?: TTProps | string | number;
  /**
   * Set to true to add the number progression of the track below
   */
  withValueTrack?: boolean;
  className?: string;
  [others: string]: any;
}

enum Bubbles {
  bb1 = 0,
  bb2 = 1,
}

const Slider: React.FC<ISlider> = (props) => {
  const {
    disabled,
    tooltip,
    defaultValue = 0,
    tooltipText,
    min = 0,
    max = 100,
    label,
    double,
    onChange,
    className,
    withValueTrack,
    ...rest
  } = props;
  const rangeRef = useRef<HTMLDivElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [maxVal, setMaxVal] = useState<number>(defaultValue as number);

  useEffect(() => {
    if (maxValRef.current) {
      setValue();
      const currentRef = maxValRef.current;
      currentRef.addEventListener('keydown', (e) => {
        if (document.activeElement === currentRef) {
          if (e.shiftKey) {
            e.preventDefault();
            if (e.key === 'ArrowUp') {
              setMaxVal((prev: number) => {
                if (prev + 5 < max) {
                  currentRef.value = (prev + 5).toString();
                  return prev + 5;
                }
                return prev;
              });
            }
            if (e.key === 'ArrowDown') {
              setMaxVal((prev: number) => {
                if (prev - 5 > min) {
                  currentRef.value = (prev - 5).toString();
                  return prev - 5;
                }
                return prev;
              });
            }
          }
        }
      });
    }
  }, []);

  const getPercent = useCallback((value: number) => Math.round(((value - min) / (max - min)) * 100), [min, max]);

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(min);
      const maxPercent = getPercent(maxVal);

      if (rangeRef.current) {
        rangeRef.current.style.width = `calc(${maxPercent - minPercent}% ${
          maxPercent - minPercent < 50 && maxPercent < 50 ? '+ var(--unit) - 1%' : '- 1%'
        })`;
      }
    }
  }, [min, maxVal, getPercent]);

  const setValue = () => {
    if (bubbleRef?.current && maxValRef?.current) {
      const val = maxValRef.current.value;
      const newVal = Number(((+val - min) * 100) / (max - min));
      bubbleRef.current.style.left = `calc(${newVal}% + (${12 - newVal * 0.26}px))`;
    }
  };

  if (double) return <DoubleSlider {...props} />;

  return (
    <div className={`slider-wrapper ${className || ''}`}>
      <div {...rest} className={`slider-input-container${disabled ? '_disabled' : ''}`}>
        <div className="slider-track" />
        <div ref={rangeRef} className={`slider-range${disabled ? '_disabled' : ''}`}></div>
        <input
          data-testid={rest['data-testid'] ? rest['data-testid'] + '-input-test' : undefined}
          className={`thumb${disabled ? '_disabled' : ''}`}
          onChange={(e) => {
            setMaxVal(+e.target.value);
            if (onChange) onChange(+e.target.value);
          }}
          ref={maxValRef}
          defaultValue={defaultValue as number}
          disabled={disabled}
          aria-label={rest['aria-label'] ? `${rest['aria-label']}-input` : 'slider-input'}
          type="range"
          onInput={tooltip ? setValue : undefined}
          min={min}
          max={max}
          list="items"
        />
        {tooltipText && typeof tooltipText === 'string' && (
          <span
            className="tooltip top slider"
            data-testid={rest['data-testid'] ? rest['data-testid'] + '-tooltip-test' : undefined}
            ref={bubbleRef}
          >
            {tooltipText}
          </span>
        )}
        {withValueTrack && max && typeof min === 'number' && (
          <div
            className="tooltip-value-track"
            data-testid={rest['data-testid'] ? rest['data-testid'] + '-value-track-test' : undefined}
          >
            {Array.from(Array(max + 1), (_, i) => i).map((_elem) => (
              <option
                className="small"
                key={_elem}
                value={_elem.toString()}
                label={_elem.toString()}
                style={{
                  left: `calc(${((_elem - min) * 100) / (max - min)}% + ${
                    12 - ((_elem - min) * 100) / (max - min)
                  } * 0.26px)`,
                  position: 'absolute',
                }}
              />
            ))}
          </div>
        )}
        <div data-testid={rest['data-testid'] ? rest['data-testid'] + '-label-test' : undefined} className="slider-label">
          <small>{label?.left}</small>
          <small>{label?.right}</small>
        </div>
      </div>
    </div>
  );
};

const DoubleSlider: React.FC<ISlider> = (props) => {
  const {
    min = 0,
    max = 100,
    onChange,
    disabled,
    label,
    tooltip,
    tooltipText,
    defaultValue,
    className,
    double: _,
    ...rest
  } = props;
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

        reference.current.style.left = `calc(${newVal}% + (${10 - newVal * 0.213}px))`;
      }
    }
  };

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (rangeRef.current) {
        rangeRef.current.style.left = `${minPercent}%`;
        rangeRef.current.style.width = `calc(${maxPercent - minPercent}% ${
          maxPercent - minPercent < 50 && maxPercent < 50 ? '+ var(--unit) - 1%' : '- 1%'
        })`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (rangeRef.current) {
        rangeRef.current.style.width = `calc(${maxPercent - minPercent}% ${
          maxPercent - minPercent < 50 && maxPercent < 50 ? '+ var(--unit) - 1%' : '- 1%'
        })`;
        rangeRef.current.style.left = `calc(${minPercent}%)`;
      }
    }
  }, [maxVal, getPercent]);

  return (
    <div className={`slider-wrapper ${className || ''}`} {...rest}>
      <div className="slider-track"></div>
      <div ref={rangeRef} className={`slider-range${disabled ? '_disabled' : ''}`}></div>
      <div className="slider-input-container">
        <input
          disabled={disabled}
          type="range"
          className={`thumb${disabled ? '_disabled' : ''}`}
          ref={minValRef}
          min={min}
          max={max}
          data-testid={rest['data-testid'] ? rest['data-testid'] + '-input-test' : undefined}
          value={minVal}
          onInput={tooltip ? () => setValue(Bubbles.bb1) : undefined}
          onChange={(e) => {
            const value = Math.min(+e.target.value, maxVal - 1);
            setMinVal(value);
            if (onChange) onChange({min: value, max: maxVal});
            e.target.value = value.toString();
          }}
        />
        {(tooltipText as TTProps)?.min && (
          <span
            className="tooltip top slider"
            data-testid={rest['data-testid'] ? rest['data-testid'] + '-tooltip-test' : undefined}
            ref={bubbleRef}
          >
            {(tooltipText as TTProps)?.min}
          </span>
        )}
      </div>

      <div className="slider-input-container">
        <input
          disabled={disabled}
          type="range"
          className={`thumb${disabled ? '_disabled' : ''}`}
          ref={maxValRef}
          value={maxVal}
          min={min}
          max={max}
          data-testid={rest['data-testid'] ? rest['data-testid'] + '-input2-test' : undefined}
          onInput={tooltip ? () => setValue(Bubbles.bb2) : undefined}
          onChange={(e) => {
            const value = Math.max(+e.target.value, minVal + 1);
            setMaxVal(value);
            if (onChange) onChange({min: minVal, max: value});
            e.target.value = value.toString();
          }}
        />
        {(tooltipText as TTProps)?.max && (
          <span
            className="tooltip top slider"
            data-testid={rest['data-testid'] ? rest['data-testid'] + '-tooltip2-test' : undefined}
            ref={bubbleRef2}
          >
            {(tooltipText as TTProps).max}
          </span>
        )}
      </div>
      <div className="slider-label" data-testid={rest['data-testid'] ? rest['data-testid'] + '-label-test' : undefined}>
        <small>{label?.left}</small>
        <small>{label?.right}</small>
      </div>
    </div>
  );
};

export default Slider;