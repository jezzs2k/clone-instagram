import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Comment.css';

import { userCommentedContent } from '../../socket/socket';

import CommentItem from './CommentItem';

const CommentArticle = ({ storyId, handleFocusInput }) => {
  const [comments, setComments] = useState([]);

  // const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    async function fetchComment() {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/comment/${storyId}?q=1`
        );

        setComments([...res.data.data]);
      } catch (error) {
        console.log(error);
      }
    }

    userCommentedContent(fetchComment, storyId);

    fetchComment();
    // eslint-disable-next-line
  }, []);

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
