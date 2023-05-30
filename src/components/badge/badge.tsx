import { useDevice } from "../../hooks/useDevice/useDevice";

export interface IBadgeProps {
  /**
   * Set error variant in badge
   */
  error?: boolean;
  /**
   * Set success variant in badge
   */
  success?: boolean;
  /**
   * Set small variant in badge
   */
  small?: boolean;
  /**
   * Additional or alternative styling
   */
  className?: string;

  [others: string]: any;
}

const Badge: React.FC<IBadgeProps> = ({ children, error, success, small, className, ...rest }) => {
  const { isMobile } = useDevice();
  return (
    <span className={`badge ${small || isMobile ? "small" : ""} ${error ? "error" : ""} ${success ? "success" : ""} ${className ?? ""}`} {...rest}>
      {children}
    </span>
  );
};

export default Badge;
