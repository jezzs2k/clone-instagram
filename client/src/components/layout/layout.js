import React, { useEffect, useCallback, useRef, useState } from 'react';
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
import FormCreateStory from '../Form/FormCreateStory';
import MultiplePreviewImg from '../story/MultiplePreviewImg';
import VideoPosted from '../user/VideoPosted';
import SaveStory from '../user/SaveStory';
import RelateStory from '../user/RelateStory';
import FormUpdateUser from '../Form/FormUpdateUser';

import './layout.css';

import { LoadUser } from '../../redux/Actions/userAction';
import { setAuthenticated } from '../../redux/Actions/authAction';
import { fetchStory, setLoading } from '../../redux/Actions/storyAction';

const LayoutApp = ({
  auth,
  user,
  story,
  setAuthenticated,
  LoadUser,
  fetchStory,
  setLoading,
}) => {
  const { isAuthenticated, token, error } = auth;
  const { loadingStory, hasMore } = story;
  const { infoUser } = user;
  const [pageNumber, setPageNumber] = useState(1);

  const observer = useRef();

  const lastStoryElementRef = useCallback(
    (node) => {
      if (loadingStory) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((pageNumber) => pageNumber + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loadingStory, hasMore]
  );

  useEffect(() => {
    if (isAuthenticated) {
      LoadUser();
    } else {
      setAuthenticated(token);
    }

    // eslint-disable-next-line
  }, [isAuthenticated]);

  useEffect(() => {
    setLoading();
    if (infoUser) {
      fetchStory({ pageNumber });
    }
    // eslint-disable-next-line
  }, [pageNumber, infoUser]);

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
            <Route exact path='/check_account' component={AlertCheckAccount} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route path='/' component={StatePage} />
          </Switch>
        </div>
      </div>
    );
  }

  return (
    <div className='Layout-Container'>
      <div className='header'>
        <Navbar />
      </div>

      <div className='body'>
        <Switch>
          <Route exact path='/'>
            <Story lastStoryElementRef={lastStoryElementRef} />
          </Route>
          <Route exact path='/message'>
            <div style={{ textAlign: 'center' }}>empty now</div>
          </Route>
          <Route exact path='/explore'>
            <div style={{ textAlign: 'center' }}>empty now</div>
          </Route>
          <Route exact path='/post/story' component={FormCreateStory} />
          <Route exact path='/story_detail/:id' component={StoryDetail} />
          <Route path='/system'>
            <div className='system-content'>
              <div className='left-content-sys'>
                <SystemUserInfo />
              </div>
              <div className='right-content-sys'>
                <Route exact path='/system' component={FormUpdateUser} />
                <Route exact path='/system/c_password'>
                  <div>Empty</div>
                </Route>
              </div>
            </div>
          </Route>
          <Route path='/isg_vi'>
            <UserDetail infoUser={user && user.infoUser} />
            <div className='total_story'>
              <Route exact path='/isg_vi'>
                <MultiplePreviewImg />
              </Route>
              <Route exact path='/isg_vi/igtv' component={VideoPosted} />
              <Route exact path='/isg_vi/saveat' component={SaveStory} />
              <Route exact path='/isg_vi/tag' component={RelateStory} />
            </div>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  story: state.story,
  user: state.user,
});

export default connect(mapStateToProps, {
  setAuthenticated,
  LoadUser,
  fetchStory,
  setLoading,
})(LayoutApp);
