import { useDevice } from "@/hooks/useDevice/useDevice";

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
  return children ? (
    <span className={`badge${small || isMobile ? "_small" : ""}${error ? "_error" : ""}${success ? "_success" : ""} ${className ?? ""}`} {...rest}>
      {children}
    </span>
  ) : (
    <span className={`badge_empty ${className ?? ""}`} {...rest} />
  );
};

export default Badge;
