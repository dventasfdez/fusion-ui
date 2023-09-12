import React, {useEffect, useRef, useState} from 'react';
import Accordion from './accordion';

export interface IAccordionProps {
  /**
   * Add class to accordion
   */
  className?: string;
  children: React.ReactComponentElement<typeof Accordion>[];
  [others: string]: any;
}

const AccordionGroup: React.FC<IAccordionProps> = ({children, className, ...rest}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [prevEl, setPrevEl] = useState<HTMLElement>();
  const handleClick = (e: MouseEvent) => {
    if (ref && ref.current && ref.current.contains(e.target as Node)) {
      const el = (e.currentTarget as any).activeElement as HTMLElement;

      if (prevEl && el && prevEl.id !== el.id && prevEl.ariaExpanded === 'true') {
        prevEl.click();
      }
      setPrevEl(el);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  return (
    <div ref={ref} className={`accordion-group ${className || ''} `} {...rest}>
      {children}
    </div>
  );
};

export default AccordionGroup;
