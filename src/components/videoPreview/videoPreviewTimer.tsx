import React from 'react';

export interface IVideoPreviewTimerProps {
  /**
   * Add class to video preview timer
   */
  className?: string;
  [others: string]: any;
}

const VideoPreviewTimer: React.FC<IVideoPreviewTimerProps> = (props) => {
  const {children, className, ...rest} = props;

  return (
    <div className={`video-preview-timer ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

export default VideoPreviewTimer;
