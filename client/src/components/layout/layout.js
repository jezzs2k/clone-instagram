import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { Spin, Alert } from 'antd';

import Login from '../auth/Login';
import Register from '../auth/Register';
import Navbar from './Navbar';
import Story from '../story/Story';
import UserDetail from '../user/UserDetail';
import StoryDetail from '../story/StoryDetail';
import SystemUserInfo from './SystemUserInfo';
import AlertCheckAccount from '../page/alertCheckMail';
import StatePage from '../page/StartPage';

import './layout.css';

import { LoadUser } from '../../redux/Actions/userAction';
import { setAuthenticated } from '../../redux/Actions/authAction';

const { Header } = Layout;

const LayoutApp = ({ auth, setAuthenticated, LoadUser }) => {
  const { isAuthenticated, token, error } = auth;

  useEffect(() => {
    if (isAuthenticated) {
      LoadUser();
    } else {
      setAuthenticated(token);
    }

    // eslint-disable-next-line
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return localStorage.token ? (
      <Spin className='spinner-load-more-story-jezzs' />
    ) : (
      <div className='Layout-Container'>
        <div className='body'>
          {error && (
            <Alert
              message='Tên đăng nhập hoặc mật khẩu không chính xác !'
              type='error'
              showIcon
            />
          )}
          <Switch>
            <Route exact path='/' component={StatePage} />
            <Route exact path='/check_account' component={AlertCheckAccount} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </Switch>
        </div>
      </div>
    );
  }

  return (
    <div className='Layout-Container'>
      <Header
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          background: '#fff',
          borderBottom: '1px solid #dbdbdb',
        }}
        className='header'>
        <Navbar />
      </Header>
      <div className='body'>
        <Switch>
          <Route exact path='/' component={Story} />
          <Route exact path='/story_detail/:id' component={StoryDetail} />
          <Route path='/system'>
            <SystemUserInfo />
          </Route>
          <Route path='/isg_vi'>
            <UserDetail />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAuthenticated, LoadUser })(
  LayoutApp
);
