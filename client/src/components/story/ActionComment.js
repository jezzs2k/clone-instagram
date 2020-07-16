import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Input, Button } from 'antd';

import Comment from './Comment';
import { sendComment, replyComment } from '../../redux/Actions/storyAction';

const ActionComment = ({ story, focusInput, replyComment, sendComment }) => {
  const [text, setText] = useState('');
  const [isTag, setTag] = useState(false);
  const [commentInfo, setCommentInfo] = useState({
    commentId: null,
    receiverId: null,
  });

  const handleParams = (e) => {
    setText(e.target.value);
    if (text.trim() === '') {
      setTag(false);
    }
  };

  const handleSendComment = () => {
    sendComment(story.id, story.user.id, text);
    setText('');
  };

  const handleReplyComment = () => {
    replyComment(
      commentInfo.commentId,
      commentInfo.receiverId,
      story.id,
      story.user.id,
      text
    );
    setText('');
  };

  const handleFocusInput = (nickname, receiverId, commentId) => {
    focusInput.current.focus();
    setText(`@${nickname} `);
    setTag(true);
    setCommentInfo((commentInfo) => ({
      ...commentInfo,
      receiverId,
      commentId,
    }));
  };

  return (
    <div className='comment'>
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
