import React from 'react';

export interface IVideoPreviewTitleProps {
  /**
   * Add class to video preview title
   */
  className?: string;
  [others: string]: any;
}

const VideoPreviewTitle: React.FC<IVideoPreviewTitleProps> = (props) => {
  const {children, className, ...rest} = props;

  return (
    <div className={`video-preview-title ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

export default VideoPreviewTitle;
