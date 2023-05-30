import React from 'react';
import {useDevice} from '../../hooks/useDevice/useDevice';

export interface ISplashScreen {
  /**
   * Set a accent colour as a background for splash screen component
   */
  accent?: boolean;
  /**
   * Set an image as a background for splash screen component
   */
  image?: React.ReactNode;
  /**
   * Set an video/animation as a background for splash screen component
   */
  video?: React.ReactNode;
  /**
   * Set an image of a person or company
   */
  logo: React.ReactNode;
  /**
   * Add class for splash screen component
   */
  className?: string;
  [others: string]: any;
}

const SplashScreen: React.FC<ISplashScreen> = ({image, video, logo, className, accent, ...rest}) => {
  const {isMobile} = useDevice();
  const renderLogo = () => {
    if (typeof logo === 'string') {
      return (
        <img
          src={logo}
          alt="logo"
          className="splash-screen-logo"
          data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-logo-image` : undefined}
        />
      );
    }
    return React.cloneElement(logo as any, {
      ...(logo as any).props,
      className: `${(logo as any).props?.className || ''} splash-screen-logo`,
      'data-testid': rest && rest['data-testid'] ? `${rest['data-testid']}-logo-wrapper` : undefined,
    });
  };

  const _image = image ? (
    typeof image === 'string' ? (
      <img
        className="splash-screen-image"
        src={image}
        alt="splash-img"
        data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-image` : undefined}
      />
    ) : (
      React.cloneElement(image as any, {
        ...(image as any).props,
        className: `${(image as any).props?.className || ''} splash-screen-image`,
        'data-testid': rest && rest['data-testid'] ? `${rest['data-testid']}-image` : undefined,
      })
    )
  ) : null;

  const _video = video ? (
    <div
      data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-video-wrapper` : undefined}
      className="splash-screen-video"
    >
      {typeof video === 'string' ? (
        <video autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        video
      )}
    </div>
  ) : null;

  return isMobile ? (
    <div
      className={`splash-screen${accent ? '_accent' : ''} ${className || ''}`}
      data-testid={rest && rest['data-testid'] ? rest['data-testid'] : undefined}
      {...rest}
    >
      {_image}
      {_video}
      {renderLogo()}
    </div>
  ) : null;
};

export default SplashScreen;
