import React from 'react';
import HeroBackground from './heroBackground';
import HeroBody from './heroBody';
import HeroFooter from './heroFooter';
import HeroHeader from './heroHeader';

export {default as HeroBackground} from './heroBackground';
export {default as HeroBody} from './heroBody';
export {default as HeroFooter} from './heroFooter';
export {default as HeroHeader} from './heroHeader';
export interface IHeroProps {
  search?: boolean;
  interior?: boolean;
  banner?: boolean;
  accent?: boolean;
  onBack?: () => void;
  'text-back'?: string;
  children:
    | React.ReactComponentElement<typeof HeroHeader>
    | React.ReactComponentElement<typeof HeroBody>
    | React.ReactComponentElement<typeof HeroFooter>
    | React.ReactComponentElement<typeof HeroBackground>
    | React.ReactComponentElement<typeof HeroHeader | typeof HeroBody | typeof HeroFooter | typeof HeroBackground>[];
  [others: string]: any;
}

const Hero: React.FC<IHeroProps> = ({className, search, interior, banner, accent, children, onBack, ...rest}) => {
  const renderHero = () => {
    const _child = children;
    let _heroBackground: any = null;
    const _heroContents: any = [];

    React.Children.forEach(_child, (_childItem: any) => {
      if (_childItem)
        if (_childItem.type === HeroBackground) {
          _heroBackground = _childItem;
        } else if (_childItem.type === HeroBody || _childItem.type === HeroHeader || _childItem.type === HeroFooter) {
          _heroContents.push(_childItem);
        }
    });

    return (
      <div className={`hero${accent ? '_accent' : ''}${banner ? '_banner' : ''} ${className || ''}`} {...rest}>
        <div className={`hero-content${search ? '_search' : interior ? '_interior' : ''}`}>
          {interior && typeof onBack === 'function' && (
            <div className="hero-back" onClick={onBack}>
              <span className="material-icons left">chevron_left</span>
              {rest['text-back'] || 'Go back'}
            </div>
          )}
          {_heroContents}
        </div>
        {_heroBackground}
      </div>
    );
  };
  return renderHero();
};

export default Hero;
