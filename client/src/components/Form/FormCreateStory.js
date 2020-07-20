import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Input, Button, Progress } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';

import './FormCreateStory.css';

import { postStory, setLoading } from '../../redux/Actions/storyAction';

const FormCreateStory = ({ postStory, setLoading, story, history }) => {
  const [state, setState] = useState({
    loading: false,
    imageUrl: '',
  });
  const [postLoading, setPostLoading] = useState(false);

  const [form, setForm] = useState({
    text: '',
    checkBox: false,
  });

  const handleChange = async (e) => {
    const files = e.target.files;
    const data = new FormData();

    data.append('file', files[0]);
    data.append('upload_preset', 'gt53vrho');

    setState((state) => ({ ...state, loading: true }));

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dt9wztdih/image/upload',
      { method: 'POST', body: data }
    );

    const file = await res.json();
    setState((state) => ({
      ...state,
      loading: false,
      imageUrl: file.secure_url,
    }));
  };

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const uploadButton = (
    <div className='form-upload'>
      <Input onChange={handleChange} type='file' className='form-input' />
      <div className='upload-text'>
        {state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className='ant-upload-text'>
          Click hoặc kéo thả ảnh vào đây
          <p>Ảnh là .png hoặc jpg và ảnh phải nhỏ hơn 2M</p>
        </div>
      </div>
    </div>
  );

  const handlePostStory = () => {
    setLoading();
    postStory({ image: state.imageUrl, title: form.text });
    setPostLoading(true);
    setTimeout(() => {
      history.push('/');
    }, 2000);
  };

  return (
    <div className='post-story'>
      {postLoading && (
        <div className='progress-jz'>
          <Progress
            percent={90}
            showInfo={false}
            size='small'
            status='active'
          />
        </div>
      )}
      <div className='upload-image'>
        {state.imageUrl ? (
          <img
            alt='story'
            style={{ width: '100%' }}
            src={state.imageUrl}
            className='image-preview'
          />
        ) : (
          uploadButton
        )}
      </div>
      <div className='state-detail'>
        <div className='top-content'>
          <h2 className='title'>Cập nhật trạng thái</h2>
        </div>
        <div className='center-content'>
          <h3 className='label'>Tiêu đề</h3>
          <Input
            name='text'
            value={form.text}
            onChange={onChange}
            placeholder='Viết một thứ gì đó cho bài viết của bạn ...'
          />
          <h3>Hiển thị trên trang cá nhân và bảng tin của bạn</h3>
          <p>
            {/* <Checkbox value={form.checkBox} name='checkBox' onChange={onChange}>
              Đăng bài xem trước
            </Checkbox> */}
          </p>
          <Button type='primary' htmlType='submit' onClick={handlePostStory}>
            Đăng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { postStory, setLoading })(FormCreateStory);
