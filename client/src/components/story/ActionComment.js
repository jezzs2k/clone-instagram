import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Input, Button } from 'antd';

import './ActionComment.css';

import Comment from './Comment';
import { sendComment, replyComment } from '../../redux/Actions/storyAction';

const ActionComment = ({ story, focusInput, replyComment, sendComment }) => {
  const [text, setText] = useState('');
  const [isTag, setTag] = useState(false);
  const [parentsComment, setParentsComment] = useState({
    parentsCommentId: null,
    receiverId: null,
  });

  const handleParams = (e) => {
    setText(e.target.value);
    if (text.trim() === '') {
      setTag(false);
    }
  };

  const handleSendComment = () => {
    sendComment(story.user.id, { articleId: story.id, text });
    setText('');
  };

  const handleReplyComment = () => {
    replyComment({
      parentId: parentsComment.parentsCommentId,
      receiverId: parentsComment.receiverId,
      articleId: story.id,
      text: text.split(' ').splice(1).join(' '),
    });
    setText('');
  };

  const handleFocusInput = ({ nickname, receiverId, parentsCommentId }) => {
    focusInput.current.focus();
    setText(`@${nickname} `);
    setTag(true);
    setParentsComment((parentsComment) => ({
      ...parentsComment,
      receiverId,
      parentsCommentId: parentsCommentId,
    }));
  };

  return (
    <div className='action-comment'>
      <Comment storyId={story.id} handleFocusInput={handleFocusInput} />
      <div className='post-comment-form'>
        <Input
          placeholder='Thêm bình luận ...'
          ref={focusInput}
          onChange={handleParams}
          value={text}
        />
        <Button
          type='primary'
          className='btn-comment'
          onClick={isTag ? handleReplyComment : handleSendComment}>
          Đăng
        </Button>
      </div>
    </div>
  );
};

export default connect(null, { sendComment, replyComment })(ActionComment);
