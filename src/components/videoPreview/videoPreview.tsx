import React from 'react';
import VideoPreviewImage from './videoPreviewImage';
import VideoPreviewTitle from './videoPreviewTitle';
import VideoPreviewSubtitle from './videoPreviewSubtitle';
import VideoPreviewTag from './videoPreviewTag';
import VideoPreviewTimer from './videoPreviewTimer';

export interface IVideoPreviewProps {
  /**
   * Sets the video preview size as large
   */
  large?: boolean;
  /**
   * Sets the video preview size as small
   */
  small?: boolean;
  /**
   * Additional or alternative styling
   */
  className?: string;
  /**
   * Function which will be triggered when user clicks on the play button
   */
  onClick?: () => void;
  children:
    | React.ReactComponentElement<
        | typeof VideoPreviewImage
        | typeof VideoPreviewTitle
        | typeof VideoPreviewSubtitle
        | typeof VideoPreviewTag
        | typeof VideoPreviewTimer
      >[]
    | React.ReactComponentElement<
        | typeof VideoPreviewImage
        | typeof VideoPreviewTitle
        | typeof VideoPreviewSubtitle
        | typeof VideoPreviewTag
        | typeof VideoPreviewTimer
      >;
  [others: string]: any;
}

const VideoPreview: React.FC<IVideoPreviewProps> = (props) => {
  const {className, large, small, onClick, children, ...rest} = props;

  const renderFooter = (title: any, subtitle: any, timer: any) => {
    if (timer || subtitle || title || small) {
      if (small) {
        return (
          <div className="video-preview-footer">
            <div className="video-preview-footer-left">{timer}</div>
            <div className="video-preview-footer-right">
              <div className="video-preview-play-button-container">
                <div className="video-preview-small-play-title">play video</div>
                <span className="material-icons video-preview-small-play-button" onClick={onClick}>
                  play_circle_filled
                </span>
              </div>
            </div>
          </div>
        );
      }

      if (large) {
        return (
          <div className="video-preview-footer">
            <div className="video-preview-footer-left">
              {title}
              {subtitle}
            </div>
            <div className="video-preview-footer-right">{timer}</div>
          </div>
        );
      }

      return (
        <div className="video-preview-footer">
          <div className="video-preview-footer-left">{title}</div>
          <div className="video-preview-footer-right">{timer}</div>
        </div>
      );
    }
    return null;
  };

  const renderVideoPreviewContent = () => {
    let videoImg: any;
    let title: any;
    let subtitle: any;
    let tag: any;
    let timer: any;

    React.Children.forEach(children, (_childItem: any) => {
      switch (_childItem.type) {
        case VideoPreviewTitle:
          title = _childItem;
          break;
        case VideoPreviewSubtitle:
          subtitle = _childItem;
          break;
        case VideoPreviewTag:
          tag = _childItem;
          break;
        case VideoPreviewImage:
          videoImg = _childItem;
          break;
        case VideoPreviewTimer:
          timer = _childItem;
          break;
      }
    });

    return (
      <div className={`video-preview${large ? '_large' : small ? '_small' : ''} ${className || ''}`} {...rest}>
        <div className="video-preview-body">
          {!small && tag}
          {!small && (
            <span
              className={`material-icons video-preview-play-button ${!large ? 'video-preview-medium-play-button' : ''}`}
              onClick={onClick}
            >
              play_circle_filled
            </span>
          )}
          {videoImg}
        </div>
        {renderFooter(title, subtitle, timer)}
      </div>
    );
  };
  return <>{renderVideoPreviewContent()}</>;
};

export {VideoPreviewImage, VideoPreviewTitle, VideoPreviewSubtitle, VideoPreviewTag, VideoPreviewTimer};
export default VideoPreview;
