import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Col, Row, Spin } from 'antd';
import { connect } from 'react-redux';

import StoryItemBook from './StoryItem';
import FastStory from './FastStory';
import RightContent from '../layout/infoUserAndSuggest';

import { fetchStory, setLoading } from '../../redux/Actions/storyAction';

import './Story.css';
import { joinStory } from '../../socket/socket';

const Story = ({ fetchStory, setLoading, story, user }) => {
  const [pageNumber, setPageNumber] = useState(1);

  const { stories, loadingStory, hasMore } = story;
  const { infoUser } = user;

  const observer = useRef();

  const lastStoryElementRef = useCallback(
    (node) => {
      if (loadingStory) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(pageNumber + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loadingStory, hasMore, pageNumber]
  );

  useEffect(() => {
    joinStory();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (infoUser) {
      setLoading();
      fetchStory({ pageNumber });
    }

    // eslint-disable-next-line
  }, [pageNumber, infoUser]);

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
  user: state.user,
});

export default connect(mapStateToProps, {
  fetchStory,
  setLoading,
})(Story);
