import { memo } from "react";
import Carousel, { Settings } from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export interface CustomCarouselProps extends Settings {
  wrapper?: boolean,
  wrapperClass?: string,
};

const CustomCarousel = (props: CustomCarouselProps) => {
  const {
    wrapper = false,
    wrapperClass = '',
  } = props;

  if (wrapper) {
    return (
      <div className={wrapperClass}>
        <Carousel  className={`custom-carousel ${wrapperClass}`} {...props}>
          {props.children}
        </Carousel>
      </div>
    );
  }

  return (
    <Carousel className={`custom-carousel ${wrapperClass}`} {...props}>
      {props.children}
    </Carousel>
  );
};

export default memo(CustomCarousel)
