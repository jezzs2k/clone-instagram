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
            <Link to='/system'>Chỉnh sửa trang cá nhân</Link>
          </Menu.Item>
          <Menu.Item key='2'>
            <Link to='/system/c_password'>Đổi mật khẩu</Link>
          </Menu.Item>
          <Menu.Item key='3'>
            <Link to='/system/#'>Ứng dụng và trang web</Link>
          </Menu.Item>
          <Menu.Item key='4'>
            <Link to='/system/#'>Email và SMS</Link>
          </Menu.Item>
          <Menu.Item key='5'>
            <Link to='/system/#'>Thông báo đẩy</Link>
          </Menu.Item>
          <Menu.Item key='6'>
            <Link to='/system/#'>Quản lý danh bạ</Link>
          </Menu.Item>
          <Menu.Item key='7'>
            <Link to='/system/#'>Bảo mật và quền riêng tư</Link>{' '}
          </Menu.Item>
          <Menu.Item key='8'>
            <Link to='/system/#'>Hoạt động đăng nhập</Link>{' '}
          </Menu.Item>
          <Menu.Item key='9'>
            <Link to='/system/#'>Email từ instagram</Link>
          </Menu.Item>
        </Menu>
      </div>
      <div className='form-change'>
        <Switch>
          <Route exact path='/system' component={FormUpdateUser} />
          <Route exact path='/system/c_password'>
            <div>Empty</div>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default SystemUserInfo;
