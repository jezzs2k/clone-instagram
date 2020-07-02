import React from 'react';
import Slider from 'react-slick';

import FastStoryItem from './FastStoryItem';

import './FastStory.css';

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 6,
  slidesToScroll: 3,
  autoplay: false,
};

const FastStory = () => {
  return (
    <div className='fast-story'>
      <Slider {...settings}>
        <FastStoryItem />
        <FastStoryItem />
        <FastStoryItem />
        <FastStoryItem />
        <FastStoryItem />
        <FastStoryItem />
        <FastStoryItem />
        <FastStoryItem />
        <FastStoryItem />
        <FastStoryItem />
        <FastStoryItem />
        <FastStoryItem />
        <FastStoryItem />
        <FastStoryItem />
        <FastStoryItem />
      </Slider>
    </div>
  );
};

export default FastStory;
