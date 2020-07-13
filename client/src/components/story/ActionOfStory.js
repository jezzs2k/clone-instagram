import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import {
  HeartOutlined,
  HeartTwoTone,
  SendOutlined,
  CommentOutlined,
} from '@ant-design/icons';

import { likeContent, unlikeContent } from '../../redux/Actions/storyAction';
import {
  listenEventLikeOfAnotherUser,
  listenEventUnlikeOfAnotherUser,
} from '../../socket/socket';

const ActionOfStory = ({
  storyId,
  authorOfStoryId,
  employer,
  likeContent,
  unlikeContent,
  focusHandle,
}) => {
  const [isLike, setIsLike] = useState(false);
  const [likes, setLike] = useState([]);

  const likeStoryHandle = () => {
    console.log('like');
    likeContent(storyId, authorOfStoryId); //thang nay bi gui len 2 lan
  };

  const unlikeStoryHandle = () => {
    console.log('unlike');
    unlikeContent(storyId, authorOfStoryId);
  };

  useEffect(() => {
    setIsLike(false);
    likes.map((like) => {
      if (like.userId === employer.infoUser.id) {
        setIsLike(true);
      }
      return like;
    });

    // eslint-disable-next-line
  }, [likes]);

  useEffect(() => {
    async function fetchLikeData() {
      const res = await axios.get(
        `http://localhost:8000/api/like/article/${storyId}`
      );
      if (res.data.success) {
        setLike([]);
        setLike((likes) => [...likes, ...res.data.data]);
      }
    }

    listenEventLikeOfAnotherUser(fetchLikeData);
    listenEventUnlikeOfAnotherUser(fetchLikeData);
    fetchLikeData();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {!isLike && (
        <HeartOutlined className='story-icon' onClick={likeStoryHandle} />
      )}
      {isLike && (
        <HeartTwoTone
          className='story-icon'
          twoToneColor='#eb2f96'
          onClick={unlikeStoryHandle}
        />
      )}
      <CommentOutlined className='story-icon' onClick={focusHandle} />
      <SendOutlined className='story-icon' />
      {likes.length > 0 && (
        <h4 style={{ margin: 0, marginLeft: '10px' }}>
          {likes.length} lượt thích
        </h4>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  employer: state.user,
});

export default connect(mapStateToProps, { likeContent, unlikeContent })(
  ActionOfStory
);
