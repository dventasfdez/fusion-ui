import React from 'react';

interface IEmptyStateImage extends React.HTMLAttributes<HTMLImageElement> {
  src: string;
  className?: string;
}

const Img: React.FC<IEmptyStateImage> = ({src, ...rest}) => {
  return <img src={src} {...rest} />;
};

export default Img;
