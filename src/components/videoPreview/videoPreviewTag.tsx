import React from 'react';

export interface IVideoPreviewTagProps {
  /**
   * Add class to video preview tag
   */
  className?: string;
  [others: string]: any;
}

const VideoPreviewTag: React.FC<IVideoPreviewTagProps> = (props) => {
  const {children, className, ...rest} = props;

  return (
    <div className={`status-tag ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

export default VideoPreviewTag;
