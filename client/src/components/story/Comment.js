import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Spin } from 'antd';

import './Comment.css';
import CommentItem from './CommentItem';

import {
  userCommentedContent,
  deletedParentsComment,
} from '../../socket/socket';

const CommentArticle = ({ storyId, handleFocusInput }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  const fetchComment = async () => {
    try {
      const pageNumber =
        comments.length === 0
          ? 1
          : comments.length < 5
          ? 2
          : Math.round(comments.length / 5) + 1;
      const res = await axios.get(
        `http://localhost:8000/api/comment/${storyId}?q=${pageNumber}`
      );

      setLoading(false);
      setHasMore(res.data.data.length > 4);
      setComments([...comments, ...res.data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    userCommentedContent(fetchComment, storyId);
    deletedParentsComment(fetchComment, storyId);
    fetchComment();
    // eslint-disable-next-line
  }, []);

  const handleLoadMoreComment = () => {
    fetchComment();
  };

  return (
    <div className='comments'>
      {comments.map((comment) => (
        <CommentItem
          storyId={storyId}
          comment={comment}
          handleFocusInput={handleFocusInput}
          key={comment.id}
        />
      ))}
      {hasMore && (
        <p onClick={handleLoadMoreComment} className='load-comment'>
          Xem thêm bình luận ...
        </p>
      )}
      {loading && <Spin className='spinner-jezzs' />}
    </div>
  );
};

export default CommentArticle;
