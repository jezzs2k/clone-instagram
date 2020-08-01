import React from 'react';
import { HeartOutlined, CommentOutlined } from '@ant-design/icons';

import './PreviewStoryImg.css';
import { Link } from 'react-router-dom';

const PreviewStoryImg = ({ storyItem }) => {
  return (
    <Link to={`/story_detail/${storyItem.id}`}>
      <div className='image-story'>
        <div className='bg'>
          <div className='like-total'>
            <HeartOutlined />
            {storyItem.likes.length}
          </div>
          <div className='comment-total'>
            <CommentOutlined />
            {storyItem.comments.length}
          </div>
        </div>
        <img src={storyItem.image} alt='story' />
      </div>
    </Link>
  );
};

export default PreviewStoryImg;
