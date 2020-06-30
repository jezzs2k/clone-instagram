import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Store from './redux/Store/store';

import './App.css';

import Layout from './components/layout/layout';

const App = () => {
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
