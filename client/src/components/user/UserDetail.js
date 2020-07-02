import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Profile from './Profile';

import MultiplePreviewImg from '../story/MultiplePreviewImg';
import VideoPosted from './VideoPosted';
import SaveStory from './SaveStory';
import RelateStory from './RelateStory';

import './UserDetail.css';

const UserDetail = () => {
  return (
    <div className='user-detail'>
      <Profile />
      <Switch>
        <Route exact path='/hieuat' component={MultiplePreviewImg} />
        <Route exact path='/hieuat/igtv' component={VideoPosted} />
        <Route exact path='/hieuat/saveat' component={SaveStory} />
        <Route exact path='/hieuat/tag' component={RelateStory} />
      </Switch>
    </div>
  );
};

export default UserDetail;
