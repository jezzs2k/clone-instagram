import React from 'react';
import { Avatar } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

import Comment from './Comment';

import './StoryDetail.css';

const StoryDetail = () => {
  return (
    <div className='story-detail-jz'>
      <div className='image-story-jz'>
        <img
          src='https://instagram.fhan2-1.fna.fbcdn.net/v/t51.2885-15/e35/72416701_528406011041257_328057446135216136_n.jpg?_nc_ht=instagram.fhan2-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=q3gsISGdejMAX_fZBa0&oh=f1e65a431352f3f5afe1b38841aed2e7&oe=5F295088'
          alt='story'
        />
      </div>
      <div className='right-content-jz'>
        <div className='user-info-jz'>
          <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
          <h3 className='name-user-of-story'>vu Thanh hieu</h3>
          <div className='action-story-jz'>
            <EllipsisOutlined className='icon' />
          </div>
        </div>
        <div className='comment-jz'>
          <Comment />
          <Comment />
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;
