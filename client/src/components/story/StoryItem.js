import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Input, Button } from 'antd';
import {
  HeartOutlined,
  SendOutlined,
  CommentOutlined,
  HeartTwoTone,
  EllipsisOutlined,
} from '@ant-design/icons';

import Comment from './Comment';
import './StoryItem.css';

const StoryItem = ({ story }) => {
  return (
    <div className='story-item'>
      <div className='top-jezzs'>
        <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
        <h3 className='name-user-of-article'>vu Thanh hieu</h3>
        <div className='action-story'>
          <EllipsisOutlined className='icon' />
        </div>
      </div>
      <div className='center-jezzs'>
        <div className='image'>
          <img
            alt='story'
            src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
          />
        </div>
        <div className='action'>
          <HeartOutlined className='story-icon' />
          {/* <HeartTwoTone className='story-icon' twoToneColor='#eb2f96' /> */}
          <CommentOutlined className='story-icon' />
          <SendOutlined className='story-icon' />
        </div>
        <div className='deep-sentence'>
          <h4>27 lượt thích</h4>
          <h3 className='name'>Vu Thanh Hieu</h3>
          <p className='state'>
            Hoom nay toi buon qua cos ai di choi voi t khong, Free
          </p>
        </div>
      </div>
      <div className='bottom-jezzs'>
        <div className='comment'>
          <Comment />
        </div>
        <div className='post-comment-form'>
          <Input placeholder='Thêm bình luận ...' />
          <Button type='primary' className='btn-comment'>
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

export default StoryItem;
