import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { List, Avatar, Spin } from 'antd';
import reqwest from 'reqwest';

import './Notification.css';

const fakeDataUrl =
  'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

const Notification = () => {
  const [state, setState] = useState({
    data: [],
    loading: false,
    hasMore: true,
  });

  useEffect(() => {
    fetchData((res) => {
      setState({
        ...state,
        data: res.results,
      });
    });
    // eslint-disable-next-line
  }, []);

  const fetchData = (callback) => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: (res) => {
        callback(res);
      },
    });
  };

  const handleInfiniteOnLoad = () => {
    let { data } = state;
    setState({
      ...state,
      loading: true,
    });
    if (data.length > 14) {
      setState({
        ...state,
        hasMore: false,
        loading: false,
      });
      return;
    }
    fetchData((res) => {
      data = data.concat(res.results);
      setState({
        ...state,
        data,
        loading: false,
      });
    });
  };

  return (
    <div className='infinite-container'>
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handleInfiniteOnLoad}
        hasMore={!state.loading && state.hasMore}
        useWindow={false}>
        <List
          dataSource={state.data}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={
                  <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                }
                title={<a href='https://ant.design'>{item.name.last}</a>}
              />
              <div></div>
            </List.Item>
          )}>
          {state.loading && state.hasMore && (
            <div className='loading-container'>
              <Spin />
            </div>
          )}
        </List>
      </InfiniteScroll>
    </div>
  );
};

export default Notification;
