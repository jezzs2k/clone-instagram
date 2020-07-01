import React, { useState } from 'react';
import { Layout, Progress } from 'antd';

import Login from '../auth/Login';
import Register from '../auth/Register';
import Navbar from './Navbar';

import './layout.css';

const { Header, Content, Footer } = Layout;

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
        }}
        className='header'>
        <Navbar setProcess={setProcess} />
      </Header>
      <div className='body'>
        <div className='left'></div>
        <div className='center center-login-register'>{/* <Register /> */}</div>
        <div className='right'></div>
      </div>
      <div className='footer'></div>
    </div>
  );
};

export default LayoutApp;
