import React, { useEffect, useState } from 'react';
import PreviewStoryImage from './PreviewStoryImg';

import { Row, Col, Spin } from 'antd';

import axios from 'axios';

import './MultiplePreviewImg.css';

const MultipleImageOfStory = () => {
  const [story, setStory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchStoryOfUser() {
      try {
        const res = await axios.get('http://localhost:8000/api/articles/user');

        if (res.data.data) {
          setStory((story) => [...story, ...res.data.data]);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchStoryOfUser();

    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spin className='spinner-jezzs' />;
  }

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
