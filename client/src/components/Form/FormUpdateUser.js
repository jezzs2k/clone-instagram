import React from 'react';
import { Avatar, Form, Input, Button, Select } from 'antd';
import { Link } from 'react-router-dom';

import './FormUpdateUser.css';

const { TextArea } = Input;
const { Option } = Select;

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 20,
  },
};

const FormUpdateUser = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='form-change-info-user'>
      <div className='info-user'>
        <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
        <div>
          <h3 className='name-user-of-story'>vu Thanh hieu</h3>
          <h4 className='btn-avatar'>Thay đổi ảnh đại diện</h4>
        </div>
      </div>
      <div className='form-detail'>
        <Form
          {...layout}
          name='basic'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            label='Tên'
            name='fullName'
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}>
            <Input className='input-param' />
          </Form.Item>

          <Form.Item label='Chú ý'>
            <p className='waring'>
              Hãy lấy tên mà bạn thường dùng để tài khoản của bạn dễ tìm thấy
              hơn. Đó có thể là tên đầy đủ, biệt danh hoặc tên doanh nghiệp. Bạn
              chỉ có thể đổi tên mình 2 lần trong vòng 14 ngày.
            </p>
          </Form.Item>

          <Form.Item
            label='Tên người dùng'
            name='nickname'
            rules={[
              {
                required: true,
                message: 'Please input your nickname!',
              },
            ]}>
            <Input className='input-param' />
          </Form.Item>

          <Form.Item label='Tiểu sử' name='historical'>
            <TextArea className='input-param' />
          </Form.Item>

          <Form.Item label='Trang Web' name='linkWeb'>
            <Input className='input-param' />
          </Form.Item>

          <Form.Item
            label='Email'
            name='email'
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}>
            <Input className='input-param' />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type='primary' htmlType='submit'>
              Xác nhận Email
            </Button>
          </Form.Item>

          <Form.Item label='Số điện thoại' name='phone'>
            <Input className='input-param' />
          </Form.Item>

          <Form.Item name='gender' label='Giới tính'>
            <Select value={'male'}>
              <Option value='male'>Nam</Option>
              <Option value='female'>Nử</Option>
              <Option value='violet'>Giới tính thứ 3</Option>
              <Option value='otherGender'>Không muốn tiết lộ</Option>
            </Select>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type='primary' htmlType='submit' disabled>
              Gửi
            </Button>
            <Link to='/dis_account' className='disconnect-account'>
              Tam thời vô hiệu hóa tài khoản
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default FormUpdateUser;
