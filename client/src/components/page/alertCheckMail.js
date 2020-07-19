import React from 'react';
import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const AlertCheckMail = () => {
  return (
    <div>
      <Result
        icon={<SmileOutlined />}
        title='Great, we have done create a account! Please check your mail !'
        extra={
          <Button type='primary'>
            <a href='https://mail.google.com/mail/'>Go to your mail</a>
          </Button>
        }
      />
    </div>
  );
};

export default AlertCheckMail;
