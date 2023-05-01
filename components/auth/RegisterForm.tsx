import React from 'react';
import { setCookie } from 'nookies';
import { useRouter } from 'next/router';
import { Button, Form, Input, notification } from 'antd';
import { RegisterFormDto } from '@/api/dto/auth.dto';
import * as Api from '@/api';

import styles from './Auth.module.scss';

const RegisterForm = () => {
  const router = useRouter();
  const onSubmit = async (values: RegisterFormDto) => {
    try {
      const { token } = await Api.auth.register(values);
      notification.success({
        message: 'Успешно!',
        description: 'Перенаправление в админ-панель!',
        duration: 2,
      });
      setCookie(null, '_token', token, {
        path: '/',
      });
      router.push('/dashboard');
      // location.href = '/dashboard';
    } catch (error) {
      console.warn('RegisterForm', error);

      notification.error({
        message: 'Ошибка!',
        description: 'Ошибка при регистрации',
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
          label="Имя"
          name="fullName"
          rules={[{ required: true, message: 'Укажите полное имя!' }]}
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
            Регистрация
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
