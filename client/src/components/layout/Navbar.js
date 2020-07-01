import React from 'react';
import { Menu, Avatar, Input, Popover } from 'antd';
import PropsType from 'prop-types';
import {
  HomeOutlined,
  HeartOutlined,
  SendOutlined,
  InstagramOutlined,
  UserOutlined,
  DownloadOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import Notification from './Notification';
import './Navbar.css';

const { Search } = Input;

const systemModal = (
  <div className='system-modal'>
    <Menu.Item key='8' className='modal-item' icon={<UserOutlined />}>
      <h4 className='text'>Trang cá nhân</h4>
    </Menu.Item>
    <Menu.Item key='6' className='modal-item' icon={<DownloadOutlined />}>
      <h4 className='text'>Đã lưu</h4>
    </Menu.Item>
    <Menu.Item key='7' className='modal-item' icon={<SettingOutlined />}>
      <h4 className='text'>Cài đặt</h4>
    </Menu.Item>
    <Menu.Item key='10' className='modal-item bottom'>
      <h4 className='text'>Đăng xuất</h4>
    </Menu.Item>
  </div>
);

const Navbar = ({ setProcess }) => {
  return (
    <div className='navbar'>
      <div className='logo'>
        <h2>iNsTagRam</h2>
      </div>
      <div className='search'>
        <Search
          className='search-form'
          placeholder='Tìm kiếm'
          onSearch={(value) => console.log(value)}
          style={{ width: 200 }}
        />
      </div>
      <Menu theme='light' mode='horizontal' className='menu-jezzs'>
        <Menu.Item key='5' className='item-menu'>
          <Popover
            placement='bottomRight'
            content={systemModal}
            trigger='click'>
            <Avatar
              className='avatar-jezzs'
              src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
            />
          </Popover>
        </Menu.Item>
        <Menu.Item key='4' className='item-menu'>
          <Popover
            placement='bottomRight'
            content={<Notification />}
            trigger='click'>
            <HeartOutlined className='icon' />
          </Popover>
        </Menu.Item>
        <Menu.Item key='3' className='item-menu'>
          <InstagramOutlined className='icon' />
        </Menu.Item>
        <Menu.Item key='2' className='item-menu'>
          <SendOutlined className='icon' />
        </Menu.Item>
        <Menu.Item key='1' className='item-menu'>
          <HomeOutlined className='icon' />
        </Menu.Item>
      </Menu>
    </div>
  );
};

Navbar.prosType = {
  setProcess: PropsType.func.isRequired,
};

export default Navbar;
