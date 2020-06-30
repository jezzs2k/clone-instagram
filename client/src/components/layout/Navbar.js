import React from 'react';
import { Menu, Avatar, Input } from 'antd';
import {
  HomeOutlined,
  HeartOutlined,
  SendOutlined,
  InstagramOutlined,
} from '@ant-design/icons';

import './Navbar.css';

const { Search } = Input;

const Navbar = () => {
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
          <Avatar
            className='avatar-jezzs'
            src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
          />
        </Menu.Item>
        <Menu.Item key='4' className='item-menu'>
          <HeartOutlined className='icon' />
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

export default Navbar;
