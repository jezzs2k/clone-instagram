import React from 'react';
import { Col, Row, Spin } from 'antd';
import { connect } from 'react-redux';

import StoryItemBook from './StoryItem';
import FastStory from './FastStory';
import RightContent from '../layout/infoUserAndSuggest';

import './Story.css';

const Story = ({ story, lastStoryElementRef }) => {
  const { stories, loadingStory } = story;

  if (loadingStory && stories.length <= 0) {
    return (
      <div className='container-spinner'>
        <Spin className='spinner-jezzs' />
      </div>
    );
  }

  return (
    <Row>
      <Col span={16} className='story'>
        <div className='story-a-day'>
          <FastStory />
        </div>
        <div className='center'>
          {stories.length > 0 &&
            stories.map((story, index) => {
              if (stories.length === index + 1) {
                return (
                  <StoryItemBook
                    lastStoryElementRef={lastStoryElementRef}
                    story={story}
                    key={story.id}></StoryItemBook>
                );
              } else {
                return (
                  <StoryItemBook story={story} key={story.id}></StoryItemBook>
                );
              }
            })}

          {loadingStory && (
            <div className='spinner-load-more'>
              <Spin className='spinner-load-more-story-jezzs' />
            </div>
          )}
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

const mapStateToProps = (state) => ({
  story: state.story,
});

export default connect(mapStateToProps, null)(Story);
