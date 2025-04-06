import { ReactNode, memo } from 'react';
import './styles.scss'

type ImageTextType = {
  className?: string,
  image: ReactNode,
  text: ReactNode,
}

const ImageText = (props: ImageTextType) => {
  const {
    className = '',
    image,
    text,
  } = props;

  return (
    <div className={`image-text-wrapper ${className}`}>
      {image}
      {text}
    </div>
  );
};

export default memo(ImageText);
