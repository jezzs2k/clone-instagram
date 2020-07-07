import React from 'react';
import { Col, Row } from 'antd';

import StoryItemBook from './StoryItem';
import FastStory from './FastStory';
import RightContent from '../layout/infoUserAndSuggest';
import './Story.css';

const Story = () => {
  return (
    <Row>
      <Col span={16} className='story'>
        <div className='story-a-day'>
          <FastStory />
        </div>
        <div className='center'>
          <StoryItemBook />
          <StoryItemBook />
          <StoryItemBook />
        </div>
      </Col>
      <Col span={8} className='info-provide'>
        <div className='right-content'>
          <RightContent />
        </div>
      </Col>
    </Row>
  );
};

export default Story;
