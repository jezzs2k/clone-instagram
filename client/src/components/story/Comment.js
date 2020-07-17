import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Spin } from 'antd';

import './Comment.css';
import CommentItem from './CommentItem';

import { userCommentedContent } from '../../socket/socket';

const CommentArticle = ({ storyId, handleFocusInput }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(null);

  // const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setLoading(true);
    async function fetchComment() {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/comment/${storyId}?q=1`
        );

        setLoading(false);
        setComments([...res.data.data]);
      } catch (error) {
        console.log(error);
      }
    }

    userCommentedContent(fetchComment, storyId);

    fetchComment();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <div className='comments'>
        <Spin className='spinner-jezzs' />
      </div>
    );
  }

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
    </div>
  );
};

export default CommentArticle;
