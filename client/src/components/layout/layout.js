import React from 'react';

import Login from '../auth/Login';
import Register from '../auth/Register';

import './layout.css';

const Layout = () => {
  return (
    <div className='Layout-Container'>
      <div className='header'></div>
      <div className='body'>
        <div className='left'></div>
        <div className='center center-login-register'>
          <Register />
        </div>
        <div className='right'></div>
      </div>
      <div className='footer'></div>
    </div>
  );
};

export default Layout;
