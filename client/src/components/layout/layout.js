import React, { useState } from 'react';
import { Layout, Progress, Col, Row } from 'antd';

import Login from '../auth/Login';
import Register from '../auth/Register';
import Navbar from './Navbar';
import StoryItemBook from '../story/StoryItem';
import RightContent from './infoUserAndSuggest';
import FastStory from '../story/FastStory';

import './layout.css';

const { Header } = Layout;

const LayoutApp = () => {
  const [process, setProcess] = useState(false);

  return (
    <div className='Layout-Container'>
      {process && (
        <div className='process-jezzs'>
          <Progress
            percent={75}
            status='active'
            className='process-percent'
            showInfo={false}
          />
        </div>
      )}

      <Header
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          background: '#fff',
          borderBottom: '1px solid #dbdbdb',
        }}
        className='header'>
        <Navbar setProcess={setProcess} />
      </Header>
      <div className='body'>
        <Row>
          <Col span={16}>
            <div className='story-a-day'>
              <FastStory />
            </div>
            <div className='center center-login-register'>
              {/* <Register /> */}
              <StoryItemBook />
            </div>
          </Col>
          <Col span={8}>
            <div className='right'>
              <RightContent />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LayoutApp;
