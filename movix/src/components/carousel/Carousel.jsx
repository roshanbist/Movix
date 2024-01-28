import React, { useRef } from 'react';

import Card from '../card/Card';
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from 'react-icons/bs';
import './Carousel.scss';

const Carousel = ({ data, loading, endpoint }) => {
  const carouselRef = useRef();

  const navigation = (direction) => {
    const carouselContainer = carouselRef.current;
    // offset width return the total width including border-padding all and scrollLeft returns number of pixel an element is scrolled from its left edge
    const scrollAmount =
      direction === 'left'
        ? carouselContainer.scrollLeft - (carouselContainer.offsetWidth + 20)
        : carouselContainer.scrollLeft + (carouselContainer.offsetWidth + 20);

    // setting the scrollAmount in carouselContainer using js scrollTo
    carouselContainer.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  const skItem = () => {
    return (
      <div className='skeletonItem'>
        <div className='posterBlock'>
          <div className='textBlock'>
            <div className='title skeleton'></div>
            <div className='date skeleton'></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='carousel-slider'>
      <BsFillArrowLeftCircleFill
        className='carouselLeftNav carousel-slider__arrow'
        onClick={() => navigation('left')}
      />
      <BsFillArrowRightCircleFill
        className='carouselRighttNav carousel-slider__arrow'
        onClick={() => navigation('right')}
      />
      {!loading ? (
        <div className='carousel-slider__tracks' ref={carouselRef}>
          {data?.map((slide) => (
            <Card key={slide.id} data={slide} endpoint={endpoint} />
          ))}
        </div>
      ) : (
        <div className='loadingSkeleton'>
          {skItem()}
          {skItem()}
          {skItem()}
          {skItem()}
        </div>
      )}
    </div>
  );
};

export default Carousel;
