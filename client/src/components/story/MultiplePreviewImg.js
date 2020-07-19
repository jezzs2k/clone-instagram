import React from 'react';
import { Row, Col } from 'antd';
import PreviewStoryImage from './PreviewStoryImg';

import './MultiplePreviewImg.css';

const MultipleImageOfStory = ({ story }) => {
  return (
    <div className='grid-image-story'>
      <Row>
        {story.map((storyItem) => (
          <Col
            className='gutter-row'
            span={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            key={storyItem.id}>
            <PreviewStoryImage storyItem={storyItem} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MultipleImageOfStory;
