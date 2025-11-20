import React, { HTMLAttributes, useEffect, useMemo, useState } from "react";
import { LoaderCircular } from "./circular";
import { LoaderOval } from "./percentage";
import clsx from "clsx";

type LoaderProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Tells Loader that is in error state
   */
  error?: boolean;
  /**
   * Tells Loader that is in error state
   */
  success?: boolean;
  /**
   * Gives the Title text if needed
   */
  title?: string;
  /**
   * Gives the subtitle text if needed
   */
  subtitle?: string;

  percentage?: {
    show: boolean;
    value?: number;
  };
  automatic?: boolean;
  wrapperClassName?: string;
};

export type LoaderVariantProps = HTMLAttributes<HTMLDivElement> & {
  percentage: number;
  error?: boolean;
  success?: boolean;
};

const Loader: React.FC<LoaderProps> = ({
  title,
  subtitle,
  percentage,
  error,
  success,
  automatic,
  className,
  wrapperClassName,
  ...props
}) => {
  const [auxPercentage, setAuxPercentage] = useState<number | null>(
    automatic ? 0 : null
  );

  useEffect(() => {
    let interval: any;
    if (automatic) {
      interval = setInterval(() => {
        setAuxPercentage((prev) =>
          (prev as number) < 100 ? (prev as number) + 5 : prev
        );
      }, 250);
    }
    return () => clearInterval(interval);
  });

  const textContainer = useMemo(() => {
    if (title) {
      return (
        <div className="loader-text-wrapper">
          <span className="loader-title">{title}</span>
          {subtitle && <span className="loader-subtitle">{subtitle}</span>}
        </div>
      );
    }
    return null;
  }, [title, subtitle]);

  const loader = useMemo(() => {
    if (percentage) {
      const { value, show } = percentage;
      if (show) {
        return (
          <LoaderOval
            className={className}
            percentage={
              automatic ? (auxPercentage as number) : (value as number)
            }
            error={automatic ? (auxPercentage as number) >= 95 && error : error}
            success={
              automatic ? (auxPercentage as number) >= 95 && success : success
            }
            {...props}
          />
        );
      }

      return (
        <LoaderCircular
          className={className}
          percentage={automatic ? (auxPercentage as number) : (value as number)}
          error={automatic ? (auxPercentage as number) >= 95 && error : error}
          success={
            automatic ? (auxPercentage as number) >= 95 && success : success
          }
          {...props}
        />
      );
    }

    if (error || success) {
      return (
        <LoaderCircular
          className={className}
          percentage={automatic ? (auxPercentage as number) : 0}
          error={automatic ? (auxPercentage as number) >= 95 && error : error}
          success={
            automatic ? (auxPercentage as number) >= 95 && success : success
          }
          {...props}
        />
      );
    }

    return <div className="spinner" {...props} />;
  }, [percentage, automatic, auxPercentage, error, success, className]);

  const wrapper = useMemo(() => {
    if (textContainer) {
      return (
        <div className={clsx("loader-wrapper", wrapperClassName)}>
          {loader}
          {textContainer}
        </div>
      );
    }
    return loader;
  }, [textContainer, loader, props]);

  return wrapper;
};

export default Loader;
