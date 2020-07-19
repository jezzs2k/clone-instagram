import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { Avatar, Spin } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

import { joinStory } from '../../socket/socket';
import ActionComment from '../story/ActionComment';

import './StoryDetail.css';

const StoryDetail = ({ user }) => {
  const { infoUser } = user;
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      joinStory(id);
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setLoading(true);
    async function fetchStoryWithId() {
      try {
        const res = await axios.get(`http://localhost:8000/api/articles/${id}`);

        if (res.data.data) {
          setStory(res.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchStoryWithId();

    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spin className='spinner-jezzs' />;
  }

  return (
    <div className='story-detail-jz'>
      <div className='image-story-jz'>
        <img src={story && story.image} alt='story' />
      </div>
      <div className='right-content-jz'>
        <div className='user-info-jz'>
          <Avatar src={infoUser && infoUser.avatar} />
          <h3 className='name-user-of-story'>
            {infoUser && infoUser.nickname}
          </h3>
          <div className='action-story-jz'>
            <EllipsisOutlined className='icon' />
          </div>
        </div>
        <div className='status'>
          <h3 className='name'>{infoUser && infoUser.nickname}</h3>
          <p className='state'>{story && story.title}</p>
        </div>

        <div className='comments-article'>
          {story && <ActionComment story={story} />}
        </div>
      </div>
    </div>
  );
};

const mapToPropState = (state) => ({
  user: state.user,
});

export default connect(mapToPropState, null)(StoryDetail);
