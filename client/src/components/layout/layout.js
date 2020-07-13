import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from '../auth/Login';
import Register from '../auth/Register';
import Navbar from './Navbar';
import Story from '../story/Story';
import UserDetail from '../user/UserDetail';
import StoryDetail from '../story/StoryDetail';
import SystemUserInfo from './SystemUserInfo';
// import FormCreateStory from '../Form/FormCreateStory';
import StatePage from '../page/StartPage';

import './layout.css';

import {
  setAuthenticated,
  setAuthLoading,
} from '../../redux/Actions/authAction';
import { LoadUser, setUserLoading } from '../../redux/Actions/userAction';

const { Header } = Layout;

const LayoutApp = ({
  setAuthenticated,
  setAuthLoading,
  setUserLoading,
  LoadUser,
  auth,
}) => {
  const { isAuthenticated } = auth;

  useEffect(() => {
    if (localStorage.token) {
      setAuthLoading();
      setAuthenticated();
      setUserLoading();
      LoadUser();
    }
    // eslint-disable-next-line
  }, [localStorage.token]);

  if (!localStorage.token && !isAuthenticated) {
    return (
      <div className='Layout-Container'>
        <div className='body'>
          <Switch>
            <Route exact path='/' component={StatePage} />
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
          <Route exact path='/story_detail' component={StoryDetail} />
          <Route path='/system'>
            <SystemUserInfo />
          </Route>
          <Route path='/name'>
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

export default connect(mapStateToProps, {
  setAuthenticated,
  setAuthLoading,
  setUserLoading,
  LoadUser,
})(LayoutApp);
