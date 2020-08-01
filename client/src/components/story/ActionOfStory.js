import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import {
  HeartOutlined,
  HeartTwoTone,
  SendOutlined,
  CommentOutlined,
} from '@ant-design/icons';

import { likeActionContent } from '../../redux/Actions/storyAction';
import { userLikedContent } from '../../socket/socket';

const ActionOfStory = ({
  storyId,
  employer,
  likeActionContent,
  focusHandle,
}) => {
  const [isLike, setIsLike] = useState(false);
  const [likes, setLike] = useState([]);
  const [likeTotal, setLikeTotal] = useState(0);

  const likeStoryHandle = () => {
    setIsLike(true);
    setLikeTotal((likeTotal) => likeTotal + 1);
    likeActionContent({ articleId: storyId });
  };

  const unlikeStoryHandle = () => {
    setIsLike(false);
    setLikeTotal((likeTotal) => likeTotal - 1);
    likeActionContent({ articleId: storyId });
  };

  useEffect(() => {
    setIsLike(false);
    likes.map((like) => {
      if (like.senderId === employer.infoUser.id) {
        setIsLike(true);
      }
      return like;
    });

    // eslint-disable-next-line
  }, [likes]);

  useEffect(() => {
    async function fetchLikeData() {
      const res = await axios.get(
        `http://localhost:8000/api/like?articleId=${storyId}`
      );
      if (res.data.success) {
        setLike([]);
        setLike((likes) => [...likes, ...res.data.data]);
        setLikeTotal(res.data.data.length);
      }
    }

    userLikedContent(fetchLikeData, storyId);
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
      {likeTotal > 0 && (
        <h4 style={{ margin: 0, marginLeft: '10px' }}>
          {likeTotal} lượt thích
        </h4>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  employer: state.user,
});

export default connect(mapStateToProps, { likeActionContent })(ActionOfStory);
