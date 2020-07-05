import React, { useState } from 'react';

import { Upload, Input, message, Checkbox, Button } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';

import './FormCreateStory.css';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const FormCreateStory = () => {
  const [state, setState] = useState({
    loading: false,
    imageUrl: '',
  });

  const [form, setForm] = useState({
    text: '',
    checkBox: false,
  });

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      console.log('You can only upload JPG/PNG file!');
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      console.log('Image must smaller than 2MB!');
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setState({ ...state, loading: true });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl) =>
        setState({ ...state, imageUrl, loading: false })
      );
    }
  };

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
        ? e.target.value
        : e.target.checked || false,
    });
  };

  const uploadButton = (
    <div>
      {state.loading ? <LoadingOutlined /> : <PlusOutlined />}

      <div className='ant-upload-text'>
        Click hoặc kéo thả ảnh vào đây
        <p>Ảnh là .png hoặc jpg và ảnh phải nhỏ hơn 2M</p>
      </div>
    </div>
  );

  return (
    <div className='post-story'>
      <div className='upload-image'>
        <Upload
          listType='picture-card'
          name='avatar'
          className='image-uploader'
          showUploadList={false}
          action='https://www.mocky.io/v3/5202b138-be55-40e8-a30f-8a8790d3a42d'
          onChange={handleChange}
          beforeUpload={beforeUpload}>
          {state.imageUrl ? (
            <img alt='story' style={{ width: '100%' }} src={state.imageUrl} />
          ) : (
            uploadButton
          )}
        </Upload>
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
            <Checkbox value={form.checkBox} name='checkBox' onChange={onChange}>
              Đăng bài xem trước
            </Checkbox>
          </p>
          <Button type='primary' htmlType='submit'>
            Đăng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormCreateStory;
