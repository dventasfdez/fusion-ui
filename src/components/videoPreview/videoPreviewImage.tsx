import React from 'react';

export interface IVideoPreviewImageProps {
  /**
   * Add class to video preview image
   */
  className?: string;
  [others: string]: any;
}

const VideoPreviewImage: React.FC<IVideoPreviewImageProps> = (props) => {
  const {children, className, ...rest} = props;

  return (
    <div className={`video-preview-image ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

export default VideoPreviewImage;
