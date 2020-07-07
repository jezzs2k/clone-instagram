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
        <Route exact path='/name' component={MultiplePreviewImg} />
        <Route exact path='/name/igtv' component={VideoPosted} />
        <Route exact path='/name/saveat' component={SaveStory} />
        <Route exact path='/name/tag' component={RelateStory} />
      </Switch>
    </div>
  );
};

export default UserDetail;
