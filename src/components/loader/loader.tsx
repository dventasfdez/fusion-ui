import React, {useEffect, useState} from 'react';
import {LoaderCircular} from './loaderCircular';
import {LoaderOval} from './loaderOval';

export interface ILoaderProps {
  /**
   * Apply different styles for Loader
   */
  className?: string;
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
  /**
   * Set in case to need a  small loader
   */
  spinner?: boolean;
  percentage?: {
    show: boolean;
    value?: number;
  };
  automatic?: boolean;
  [others: string]: any;
}

const Loader: React.FC<ILoaderProps> = ({
  title,
  subtitle,
  spinner,
  percentage = {value: 0, show: false},
  error,
  success,
  automatic,
  className,
  ...rest
}) => {
  const [auxPercentage, setAuxPercentage] = useState<number | null>(automatic ? 0 : null);

  useEffect(() => {
    let interval: any;
    if (automatic) {
      interval = setInterval(() => {
        setAuxPercentage((prev) => ((prev as number) < 100 ? (prev as number) + 5 : prev));
      }, 250);
    }
    return () => clearInterval(interval);
  });

  const HasText = () => {
    if (title) {
      return (
        <div className="loader-text-wrapper">
          <span
            className="loader-title"
            data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-title` : undefined}
          >
            {title}
          </span>
          {subtitle && (
            <span
              className="loader-subtitle"
              data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-subtitle` : undefined}
            >
              {subtitle}
            </span>
          )}
        </div>
      );
    }
    return null;
  };

  const renderLoader = () => {
    if (spinner) {
      if (title) {
        return (
          <div
            className={`loader-wrapper ${className || ''}`}
            data-testid={rest && rest['data-testid'] ? rest['data-testid'] : undefined}
          >
            <div
              className="spinner"
              data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-spinner` : undefined}
            />
            <HasText />
          </div>
        );
      }
      return (
        <div
          className={`spinner ${className || ''}`}
          data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-spinner` : undefined}
        />
      );
    } else if (!percentage.show) {
      return (
        <LoaderCircular
          className={className}
          percentage={automatic ? (auxPercentage as number) : (percentage.value as number)}
          HasText={<HasText />}
          error={automatic ? (auxPercentage as number) >= 95 && error : error}
          success={automatic ? (auxPercentage as number) >= 95 && success : success}
          data-testid={rest && rest['data-testid'] ? rest['data-testid'] : null}
        />
      );
    }
    return (
      <LoaderOval
        className={className}
        percentage={automatic ? (auxPercentage as number) : (percentage.value as number)}
        HasText={<HasText />}
        error={automatic ? (auxPercentage as number) >= 95 && error : error}
        success={automatic ? (auxPercentage as number) >= 95 && success : success}
        data-testid={rest && rest['data-testid'] ? rest['data-testid'] : null}
      />
    );
  };
  return renderLoader();
};

export default Loader;
