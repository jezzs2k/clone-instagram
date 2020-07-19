import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import { Spin } from 'antd';

import Profile from './Profile';

import MultiplePreviewImg from '../story/MultiplePreviewImg';
import VideoPosted from './VideoPosted';
import SaveStory from './SaveStory';
import RelateStory from './RelateStory';

import './UserDetail.css';

const UserDetail = ({ user }) => {
  const [story, setStory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalStory, setTotalStory] = useState(0);

  useEffect(() => {
    setLoading(true);
    async function fetchStoryOfUser() {
      try {
        const res = await axios.get('http://localhost:8000/api/articles/user');

        if (res.data.data) {
          setStory((story) => [...story, ...res.data.data]);
          setTotalStory(res.data.totalRow);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchStoryOfUser();

    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spin className='spinner-jezzs' />;
  }
  return (
    <div className='user-detail'>
      <Profile totalStory={totalStory} />
      <Switch>
        <Route exact path='/isg_vi'>
          <MultiplePreviewImg story={story} />
        </Route>
        <Route exact path='/isg_vi/igtv' component={VideoPosted} />
        <Route exact path='/isg_vi/saveat' component={SaveStory} />
        <Route exact path='/isg_vi/tag' component={RelateStory} />
      </Switch>
    </div>
  );
};

export default UserDetail;
