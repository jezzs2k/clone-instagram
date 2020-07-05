import React from 'react';
import { Avatar } from 'antd';

import './FastStoryItem.css';

const FastStoryItem = ({ story }) => {
  return (
    <div className='fast-story-item'>
      <Avatar
        className='image'
        src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
      />

      <p>jezzs_depTrai</p>
    </div>
  );
};

export default FastStoryItem;
