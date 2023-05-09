import React, {useState, useRef, useEffect} from 'react';
import ReactDOM from 'react-dom';
type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
interface TooltipProps {
  id?: string;
  /**
   *  Is a reference for parent element
   */
  parentRef: React.RefObject<HTMLElement>;
  /**
   * Apply diferent styles for tooltip
   */
  className?: string;
  renderAsPortal?: boolean;
  placement?: TooltipPosition;
  [others: string]: any;
}

const Tooltip: React.FC<TooltipProps> = (props) => {
  const {parentRef, className, children, id, renderAsPortal, placement = 'bottom', ...rest} = props;
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState<DOMRect | undefined>(undefined);
  const [placementSt, setPlacementSt] = useState(placement);
  const calcPos = () => {
    if (show) {
      const _position = calculateTooltipPosition();
      setPosition(_position?.position);
      setPlacementSt(_position?.placement || placement);
    }
  };
  useEffect(() => {
    if (parentRef && parentRef.current) {
      const parent = parentRef.current;
      if (parent) {
        parent.onmouseenter = () => setShow(true);
        parent.onmouseleave = () => (show ? setShow(false) : undefined);
      }
    }
  });

  useEffect(() => {
    if (show) {
      calcPos();
      document.addEventListener('scroll', calcPos, true);
    }
    return () => document.removeEventListener('scroll', calcPos);
  }, [show]);

  const topPosition = (parentRect: DOMRect, tooltipRect: DOMRect) => {
    if (renderAsPortal) {
      return {
        top: `calc(${parentRect.top}px - ${tooltipRect.height}px - var(--unit))`,
        left: `calc(${parentRect.left}px + ${parentRect.width / 2}px - ${tooltipRect.width / 2}px)`,
      };
    }
    return {
      top: `calc(-1 * var(--unit) - ${tooltipRect.height}px)`,
      left: `calc(50% - ${tooltipRect.width / 2}px)`,
    };
  };
  const bottomPosition = (parentRect: DOMRect, tooltipRect: DOMRect) => {
    if (renderAsPortal) {
      return {
        top: `calc(${parentRect.top}px + ${parentRect.height}px + var(--unit))`,
        left: `calc(${parentRect.left}px + ${parentRect.width / 2}px - ${tooltipRect.width / 2}px)`,
      };
    }
    return {
      top: 'calc(100% + var(--unit))',
      left: `calc(50% - ${tooltipRect.width / 2}px)`,
    };
  };
  const rightPosition = (parentRect: DOMRect, tooltipRect: DOMRect) => {
    if (renderAsPortal) {
      return {
        top: `calc(${parentRect.top}px + ${parentRect.height / 2}px - ${tooltipRect.height / 2}px)`,
        left: `calc(${parentRect.left}px + ${parentRect.width}px + var(--unit))`,
      };
    }
    return {
      top: `calc(50% - ${tooltipRect.height / 2}px)`,
      left: 'calc(100% + var(--unit))',
    };
  };
  const leftPosition = (parentRect: DOMRect, tooltipRect: DOMRect) => {
    if (renderAsPortal) {
      return {
        top: `calc(${parentRect.top}px + ${parentRect.height / 2}px - ${tooltipRect.height / 2}px)`,
        left: `calc(${parentRect.left}px - ${tooltipRect.width}px - var(--unit))`,
      };
    }
    return {
      top: `calc(50% - ${tooltipRect.height / 2}px)`,
      left: `calc(-1 * var(--unit) - ${tooltipRect.width}px)`,
      width: `${tooltipRect.width}px`,
    };
  };
  const calculateTooltipPosition = () => {
    if (parentRef && parentRef.current && tooltipRef && tooltipRef.current) {
      const {clientWidth, clientHeight} = document.body;
      const _parentRect = parentRef.current.getBoundingClientRect();
      const _tooltipRect = tooltipRef.current.getBoundingClientRect();
      let position: any = undefined,
        placementPos = placement;
      if (_parentRect.height && _parentRect.width && _tooltipRect.height && _tooltipRect.width) {
        switch (placement) {
          case 'top':
            if (_parentRect.top - _parentRect.height - _tooltipRect.height - 8 <= 0) {
              position = bottomPosition(_parentRect, _tooltipRect);
              placementPos = 'bottom';
            } else {
              position = topPosition(_parentRect, _tooltipRect);
              placementPos = 'top';
            }
            break;
          case 'right':
            if (_parentRect.left + _parentRect.width + _tooltipRect.width + 8 >= clientWidth) {
              position = leftPosition(_parentRect, _tooltipRect);
              placementPos = 'left';
            } else {
              position = rightPosition(_parentRect, _tooltipRect);
              placementPos = 'right';
            }
            break;
          case 'left':
            if (_parentRect.left - _tooltipRect.width - 8 <= 0) {
              position = rightPosition(_parentRect, _tooltipRect);
              placementPos = 'right';
            } else {
              position = leftPosition(_parentRect, _tooltipRect);
              placementPos = 'left';
            }
            break;
          case 'bottom':
          default:
            if (_parentRect.top + _parentRect.height + _tooltipRect.height + 8 >= clientHeight) {
              position = topPosition(_parentRect, _tooltipRect);
              placementPos = 'top';
            } else {
              position = bottomPosition(_parentRect, _tooltipRect);
              placementPos = 'bottom';
            }
            break;
        }
        return {
          position: {
            ...position,
            position: renderAsPortal ? 'fixed' : undefined,
          },
          placement: placementPos,
        };
      }
      return undefined;
    }
  };
  const tooltip = (
    <div
      id={id}
      className={`${renderAsPortal ? 'tag-ds' : ''} tooltip ${placementSt ?? ''} ${className || ''}`}
      ref={tooltipRef}
      style={{...position}}
      {...rest}
    >
      {children}
    </div>
  );
  const container = document.getElementById('root') || document.body;
  return show ? (renderAsPortal ? ReactDOM.createPortal(tooltip, container) : tooltip) : null;
};
export default Tooltip;
