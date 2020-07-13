import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import { Link } from 'react-router-dom';

import { Register } from '../../redux/Actions/authAction';

import './Register.css';

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

const RegisterForm = ({ Register, error }) => {
  const onFinish = (values) => {
    console.log(values);
    Register({
      fullName: values.fullName,
      nickname: values.nickname,
      email: values.email,
      password: values.password,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Fragment>
      {error && (
        <Alert message={error.message} className='alert-dev' type='error' />
      )}
      <div className='register'>
        <h2 className='title'>INSaGraM</h2>
        <Form
          {...layout}
          name='basic'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            label='Nickname'
            name='nickname'
            rules={[
              {
                required: true,
                message: 'Please input your nickname!',
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label='FullName'
            name='fullName'
            rules={[
              {
                required: true,
                message: 'Please input your nickname!',
              },
            ]}>
            <Input />
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
            <Input />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            name='confirm'
            label='Confirm Password'
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    'The two passwords that you entered do not match!'
                  );
                },
              }),
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
          <Link to='/login' className='linkToRegister'>
            SignIn
          </Link>
        </Form>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  error: state.auth.error,
});

export default connect(mapStateToProps, { Register })(RegisterForm);
