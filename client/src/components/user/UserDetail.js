import React from 'react';

import Profile from './Profile';

import './UserDetail.css';

const UserDetail = ({ infoUser }) => {
  return (
    <div className='user-detail'>
      <Profile totalStory={infoUser && infoUser.articles.length} />
    </div>
  );
};

export default UserDetail;
