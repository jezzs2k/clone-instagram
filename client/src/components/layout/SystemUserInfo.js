import React from 'react';
import { Menu } from 'antd';
import { Switch, Route, Link } from 'react-router-dom';

import FormUpdateUser from '../Form/FormUpdateUser';

import './SystemUserInfo.css';

const SystemUserInfo = () => {
  return (
    <div className='update-user'>
      <div className='action-function'>
        <Menu theme='light' defaultSelectedKeys={['1']} mode='inline'>
          <Menu.Item key='1'>
            <Link to='/personal'>Chỉnh sửa trang cá nhân</Link>
          </Menu.Item>
          <Menu.Item key='2'>
            <Link to='/c_password'>Đổi mật khẩu</Link>
          </Menu.Item>
          <Menu.Item key='3'>
            <Link to='/#'>Ứng dụng và trang web</Link>
          </Menu.Item>
          <Menu.Item key='4'>
            <Link to='/#'>Email và SMS</Link>
          </Menu.Item>
          <Menu.Item key='5'>
            <Link to='/#'>Thông báo đẩy</Link>
          </Menu.Item>
          <Menu.Item key='6'>
            <Link to='/#'>Quản lý danh bạ</Link>
          </Menu.Item>
          <Menu.Item key='7'>
            <Link to='/#'>Bảo mật và quền riêng tư</Link>{' '}
          </Menu.Item>
          <Menu.Item key='8'>
            <Link to='/#'>Hoạt động đăng nhập</Link>{' '}
          </Menu.Item>
          <Menu.Item key='9'>
            <Link to='/#'>Email từ instagram</Link>
          </Menu.Item>
        </Menu>
      </div>
      <div className='form-change'>
        <Switch>
          <Route exact path='/personal' component={FormUpdateUser} />
        </Switch>
      </div>
    </div>
  );
};

export default SystemUserInfo;
