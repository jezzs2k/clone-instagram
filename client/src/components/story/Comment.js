import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

import './Comment.css';
import CommentItem from './CommentItem';

import { userCommentedContent } from '../../socket/socket';

const CommentArticle = ({ storyId, handleFocusInput }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const observer = useRef();
  const lastCommentElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(pageNumber + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, pageNumber]
  );

  const handleAfterDeleteComment = (commentId) => {
    setComments((comments) => [
      ...comments.slice(
        0,
        comments.findIndex((comment) => comment.id === commentId)
      ),
      ...comments.slice(
        comments.findIndex((comment) => comment.id === commentId) + 1
      ),
    ]);
  };

  async function fetchComment() {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8000/api/comments/${storyId}?page=${pageNumber}`
      );
      if (res.data.data) {
        setLoading(false);
        setHasMore(res.data.totalRow > 9);
        setComments([...comments, ...res.data.data]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCommentById(commentId) {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/comment/${commentId}`
      );

      if (res.data.data) {
        setComments((comments) => [res.data.data, ...comments]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchComment();

    // eslint-disable-next-line
  }, [pageNumber]);

  useEffect(() => {
    setLoading(true);
    userCommentedContent(fetchCommentById, storyId);
    // eslint-disable-next-line
  }, []);

  return (
    <div className='comments'>
      {comments.map((comment, i) => {
        if (i === comments.length - 1) {
          return (
            <CommentItem
              storyId={storyId}
              comment={comment}
              lastCommentElementRef={lastCommentElementRef}
              fetchCommentById={fetchCommentById}
              handleFocusInput={handleFocusInput}
              handleAfterDeleteComment={handleAfterDeleteComment}
              key={comment.id}
            />
          );
        } else {
          return (
            <CommentItem
              storyId={storyId}
              comment={comment}
              fetchCommentById={fetchCommentById}
              handleFocusInput={handleFocusInput}
              handleAfterDeleteComment={handleAfterDeleteComment}
              key={comment.id}
            />
          );
        }
      })}
      {/* {loading && <Spin className='spinner-jezzs' />} */}
    </div>
  );
};

export default CommentArticle;
