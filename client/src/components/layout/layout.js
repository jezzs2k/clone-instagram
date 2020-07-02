import React, { useState } from 'react';
import { Layout, Progress } from 'antd';

import Login from '../auth/Login';
import Register from '../auth/Register';
import Navbar from './Navbar';
import Story from '../story/Story';
import UserDetail from '../user/UserDetail';

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
        <UserDetail />
        {/* <Story /> */}
      </div>
    </div>
  );
};

export default LayoutApp;
