import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import './StartPage.css';

const StartPage = ({ history }) => {
  useEffect(() => {
    const startPageIndex = history.length - 1;
    history.go(-startPageIndex);

    // eslint-disable-next-line
  }, []);

  return (
    <div className='instagram-app'>
      <h1 className='text-logo'>iNsTagRam</h1>
      <div className='action'>
        <Button type='primary' className='btn-login'>
          <Link to='/login'>Login</Link>
        </Button>
        <Button danger className='btn-register'>
          <Link to='/register'>Register</Link>
        </Button>
      </div>
    </div>
  );
};

export default StartPage;
