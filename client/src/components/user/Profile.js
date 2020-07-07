import React from 'react';
import { Link } from 'react-router-dom';
import {
  SettingOutlined,
  PicLeftOutlined,
  DownloadOutlined,
  AliyunOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Avatar, Menu } from 'antd';

import './Profile.css';

const User = ({ user }) => {
  return (
    <div className='info-user-detail'>
      <div className='page-user'>
        <div className='avatar-user'>
          <Avatar
            src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
            className='avatar'
          />
        </div>
        <div className='info-user'>
          <div className='top-profile'>
            <h2 className='name-user'>{'jezzs'}</h2>
            <Link to='/system' className='edit-profile'>
              <div className='btn btn-edit'>
                <span>Chỉnh sửa trang cá nhân</span>
              </div>
              <SettingOutlined className='icon-edit' />
            </Link>
          </div>
          <div className='info-detail'>
            <h2 className='article-total'>{'2'} Bài viết</h2>
            <h2 className='follow'>{'46'} Người theo dõi</h2>
            <h2 className='request-follow'>
              Đang theo dõi {'46'} Người theo dõi
            </h2>
          </div>
          <h3 className='full-name'>Vu Thanh Hieu</h3>
        </div>
      </div>
      <div className='action'>
        <Menu
          theme='light'
          className='bg-menu'
          mode='horizontal'
          defaultSelectedKeys={['1']}>
          <Menu.Item className='action-item' key='1'>
            <Link to='/name'>
              <PicLeftOutlined />
              Bài viết
            </Link>
          </Menu.Item>
          <Menu.Item className='action-item' key='2'>
            <Link to='/name/igtv'>
              <AliyunOutlined />
              IGTV
            </Link>
          </Menu.Item>
          <Menu.Item className='action-item' key='3'>
            <Link to='/name/saveat'>
              <DownloadOutlined />
              Đã lưu
            </Link>
          </Menu.Item>
          <Menu.Item className='action-item' key='4'>
            <Link to='/name/tag'>
              <UserAddOutlined />
              Được gắn thẻ
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default User;
