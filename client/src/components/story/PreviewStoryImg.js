import React from 'react';
import { HeartOutlined, CommentOutlined } from '@ant-design/icons';

import './PreviewStoryImg.css';

const PreviewStoryImg = ({ image, likeTotal, commentTotal }) => {
  return (
    <div className='image-story'>
      <div className='bg'>
        <div className='like-total'>
          <HeartOutlined />
          12
        </div>
        <div className='comment-total'>
          <CommentOutlined />
          10
        </div>
      </div>
      <img src={image} alt='story' />
    </div>
  );
};

export default PreviewStoryImg;
