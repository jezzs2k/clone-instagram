import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { Avatar, Input, Button } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

import ActionOfStory from './ActionOfStory';
import Comment from './Comment';

import './StoryItem.css';

import { sendComment } from '../../redux/Actions/storyAction';

const StoryItem = ({ story, lastStoryElementRef, sendComment }) => {
  const {
    title,
    image,
    user: { nickname },
  } = story;

  const focusInput = useRef(null);
  const [text, setText] = useState('');

  const focusHandle = () => {
    focusInput.current.focus();
  };

  const handleParams = (e) => {
    setText(e.target.value);
  };

  const handleSendComment = () => {
    sendComment(story.id, story.user.id, text);
    setText('');
  };

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
          <ActionOfStory
            storyId={story.id}
            authorOfStoryId={story.user.id}
            focusHandle={focusHandle}
          />
        </div>
        <div className='deep-sentence'>
          <h3 className='name'>{nickname}</h3>
          <p className='state'>{title}</p>
        </div>
      </div>
      <div className='bottom-jezzs'>
        <div className='comment'>
          <Comment storyId={story.id} />
        </div>
        <div className='post-comment-form'>
          <Input
            placeholder='Thêm bình luận ...'
            ref={focusInput}
            onChange={handleParams}
            value={text}
          />
          <Button
            type='primary'
            className='btn-comment'
            onClick={handleSendComment}>
            Đăng
          </Button>
        </div>
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

export default connect(null, { sendComment })(StoryItem);
