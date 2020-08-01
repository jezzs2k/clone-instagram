import React, { useRef, useEffect } from 'react';

import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

import ActionOfStory from './ActionOfStory';
import ActionComment from './ActionComment';

import { joinStory } from '../../socket/socket';

import './StoryItem.css';

const StoryItem = ({ story, lastStoryElementRef }) => {
  const {
    title,
    image,
    user: { nickname },
  } = story;

  const focusInput = useRef(null);

  const focusHandle = () => {
    focusInput.current.focus();
  };

  useEffect(() => {
    joinStory(story.id);
    // eslint-disable-next-line
  }, []);

  return (
    <div className='story-item' ref={lastStoryElementRef}>
      <div className='top-jezzs'>
        <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
        <h3 className='name-user-of-article'>{nickname}</h3>
        <div className='action-story'>
          <EllipsisOutlined className='icon' />
        </div>
      </div>
      <div className='center-jezzs'>
        <div className='image'>
          <img alt='story' src={image} />
        </div>
        <div className='action'>
          <ActionOfStory storyId={story.id} focusHandle={focusHandle} />
        </div>
        <div className='deep-sentence'>
          <h3 className='name'>{nickname}</h3>
          <p className='state'>{title}</p>
        </div>
      </div>
      <div className='bottom-jezzs'>
        <ActionComment story={story} focusInput={focusInput} />
      </div>
    </div>
  );
};

StoryItem.propTypes = {
  story: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
  }),
};

export default StoryItem;
