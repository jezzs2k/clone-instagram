import React, { useEffect } from 'react';
import { Layout, Progress } from 'antd';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from '../auth/Login';
import Register from '../auth/Register';
import Navbar from './Navbar';
import Story from '../story/Story';
import UserDetail from '../user/UserDetail';
import StoryDetail from '../story/StoryDetail';
import SystemUserInfo from './SystemUserInfo';
import FormCreateStory from '../Form/FormCreateStory';
import StatePage from '../page/StartPage';

import './layout.css';

import { setAuthenticated } from '../../redux/Actions/authAction';
import { LoadUser } from '../../redux/Actions/userAction';

const { Header } = Layout;

const LayoutApp = ({ setAuthenticated, LoadUser, auth }) => {
  const { loading, isAuthenticated } = auth;

  useEffect(() => {
    if (localStorage.token) {
      setAuthenticated();
      LoadUser();
    }

    // eslint-disable-next-line
  }, []);

  if (!localStorage.token && !isAuthenticated) {
    return (
      <div className='Layout-Container'>
        {!loading === false && (
          <div className='process-jezzs'>
            <Progress
              percent={95}
              status='active'
              className='process-percent'
              showInfo={false}
            />
          </div>
        )}
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
      {!loading === false && (
        <div className='process-jezzs'>
          <Progress
            percent={99}
            status='active'
            className='process-percent'
            showInfo={false}
          />
        </div>
      )}

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

export default connect(mapStateToProps, { setAuthenticated, LoadUser })(
  LayoutApp
);
