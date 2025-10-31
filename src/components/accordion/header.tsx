import { useAccordion } from "./accordion";

export interface IAccordionHeaderProps {
  /**
   * Add class to accordion header
   */
  className?: string;
  [others: string]: any;
}

const AccordionHeader: React.FC<IAccordionHeaderProps> = ({ children, className, ...rest }) => {
  const { parentId, showContent, toggleContent } = useAccordion();

  return (
    <button className={`accordion-header ${className ?? ""}`} onClick={toggleContent} {...rest} id={`${parentId}-btn`} aria-expanded={showContent} aria-controls={`${parentId}-content`}>
      {children}
    </button>
  );
};

export default AccordionHeader;
