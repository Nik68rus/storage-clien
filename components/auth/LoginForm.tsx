import React from 'react';
import styles from './Auth.module.scss';
import { Button, Form, Input, notification } from 'antd';
import { LoginFormDto } from '@/api/dto/auth.dto';

import * as Api from '@/api';
import { setCookie } from 'nookies';

const LoginForm = () => {
  const onSubmit = async (values: LoginFormDto) => {
    try {
      const { token } = await Api.auth.login(values);
      notification.success({
        message: 'Успешно!',
        description: 'Перенаправление в админ-панель!',
        duration: 2,
      });
      setCookie(null, '_token', token, {
        path: '/',
      });
      location.href = '/dashboard';
    } catch (error) {
      console.warn('LoginForm', error);

      notification.error({
        message: 'Ошибка!',
        description: 'Неверный логин или пароль',
        duration: 2,
      });
    }
  };

  return (
    <div className={styles.formBlock}>
      <Form name="basic" labelCol={{ span: 8 }} onFinish={onSubmit}>
        <Form.Item
          label="E-mail"
          name="email"
          rules={[{ required: true, message: 'Введите почту!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Введите пароль!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
