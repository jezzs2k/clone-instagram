import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Store from './redux/Store/store';

import './App.css';

import Layout from './components/layout/layout';
import { connectServer } from './socket/socket';

const App = () => {
  useEffect(() => {
    connectServer();
    // eslint-disable-next-line
  }, []);
  return (
    <Provider store={Store}>
      <Router>
        <div className='App'>
          <Layout />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
