import React from 'react';
import { connect } from 'react-redux';

import { Menu, Avatar, Input, Popover } from 'antd';
import PropsType from 'prop-types';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  HeartOutlined,
  SendOutlined,
  InstagramOutlined,
  UserOutlined,
  DownloadOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import { logout } from '../../redux/Actions/authAction';
import Notification from './Notification';
import './Navbar.css';

const { Search } = Input;

const Navbar = ({ logout, user }) => {
  const { infoUser } = user;

  const handleLogout = () => {
    logout();
  };

  const systemModal = (
    <div className='system-modal'>
      <Menu.Item key='8' className='modal-item' icon={<UserOutlined />}>
        <Link to='/isg_vi'>
          <h4 className='text'>Trang cá nhân</h4>
        </Link>
      </Menu.Item>
      <Menu.Item key='6' className='modal-item' icon={<DownloadOutlined />}>
        <Link to='save_story'>
          <h4 className='text'>Đã lưu</h4>
        </Link>
      </Menu.Item>
      <Menu.Item key='7' className='modal-item' icon={<SettingOutlined />}>
        <Link to='/system'>
          <h4 className='text'>Cài đặt</h4>
        </Link>
      </Menu.Item>
      <Menu.Item key='10' className='modal-item bottom'>
        <h4 className='text' onClick={handleLogout}>
          Đăng xuất
        </h4>
      </Menu.Item>
    </div>
  );

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
        <Menu.Item key='5' className='item-menu' onItemHover={null}>
          <Popover
            placement='bottomRight'
            content={systemModal}
            trigger='click'>
            <Avatar
              className='avatar-jezzs'
              src={infoUser && infoUser.avatar}
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
          <Link to='/explore'>
            <InstagramOutlined className='icon' />
          </Link>
        </Menu.Item>
        <Menu.Item key='2' className='item-menu'>
          <Link to='/message'>
            <SendOutlined className='icon' />
          </Link>
        </Menu.Item>
        <Menu.Item key='1' className='item-menu'>
          <Link to='/'>
            <HomeOutlined className='icon' />
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

Navbar.prosType = {
  setProcess: PropsType.func.isRequired,
};

const mapToPropState = (state) => ({
  user: state.user,
});

export default connect(mapToPropState, { logout })(Navbar);
