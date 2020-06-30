import React from 'react';
import { Layout } from 'antd';

import Login from '../auth/Login';
import Register from '../auth/Register';
import Navbar from './Navbar';

import './layout.css';

const { Header, Content, Footer } = Layout;

const LayoutApp = () => {
  return (
    <div className='Layout-Container'>
      <Header
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          background: '#fff',
        }}
        className='header'>
        <Navbar />
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
