import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import { Form, Input, Button, Checkbox, Alert } from 'antd';
import { Link, useHistory } from 'react-router-dom';

import { Login } from '../../redux/Actions/authAction';

import './Login.css';

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

const LoginForm = ({ Login, auth }) => {
  const { error, isAuthenticated } = auth;
  const history = useHistory();

  const onFinish = (values) => {
    console.log('Success:', values);
    Login({ email: values.email, password: values.password });
    history.push('/');
  };

  const onFinishFailed = (errorInfo) => {
    Error(errorInfo);
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <Fragment>
      {error && (
        <Alert message={error.message} className='alert-dev' type='error' />
      )}
      <div className='login'>
        <h2 className='title'>InStaGram</h2>
        <Form
          {...layout}
          name='basic'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
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

          <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
          <Link to='/register' className='linkToRegister'>
            Create new account
          </Link>
        </Form>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { Login })(LoginForm);
