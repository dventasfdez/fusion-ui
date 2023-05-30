import React from 'react';

export interface IVideoPreviewSubtitleProps {
  /**
   * Add class to video preview subtitle
   */
  className?: string;
  [others: string]: any;
}

const VideoPreviewSubtitle: React.FC<IVideoPreviewSubtitleProps> = (props) => {
  const {children, className, ...rest} = props;

  return (
    <div className={`video-preview-subtitle ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

export default VideoPreviewSubtitle;
