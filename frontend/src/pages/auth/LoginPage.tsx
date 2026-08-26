import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, message, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useLoginMutation } from '../../services/authApi';
import { useSetAtom } from 'jotai';
import { tokenAtom, userAtom } from '../../store/atoms';
import type { LoginPayload } from '../../types/auth';

const { Title, Text } = Typography;

export const LoginPage: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const setToken = useSetAtom(tokenAtom);
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  const onFinish = async (values: LoginPayload) => {
    try {
      const response = await login(values).unwrap();
      if (response.success) {
        localStorage.setItem('token', response.token);
        setToken(response.token);
        setUser(response.user);
        message.success('Welcome back!');
        navigate('/dashboard');
      }
    } catch (err: any) {
      const errorMsg = err?.data?.error || 'Login failed. Please check your credentials.';
      message.error(errorMsg);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Title level={3} className="text-slate-800 font-extrabold m-0">Sign In</Title>
        <Text className="text-slate-400 text-sm">Enter your credentials to access your account</Text>
      </div>

      <Form
        name="login_form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        size="large"
        className="space-y-4"
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email address' }
          ]}
        >
          <Input
            prefix={<MailOutlined className="text-slate-300 mr-2" />}
            placeholder="Email Address"
            className="hover:border-indigo-400 focus:border-indigo-500 rounded-lg"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-slate-300 mr-2" />}
            placeholder="Password"
            className="hover:border-indigo-400 focus:border-indigo-500 rounded-lg"
          />
        </Form.Item>

        <div className="flex items-center justify-between text-sm">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="text-slate-500">Remember me</Checkbox>
          </Form.Item>
          <a className="text-indigo-600 hover:text-indigo-500 font-semibold" href="#forgot">
            Forgot password?
          </a>
        </div>

        <Form.Item className="m-0">
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="w-full h-12 text-base font-semibold rounded-lg"
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>

      <div className="text-center text-sm text-slate-500 pt-2 border-t border-slate-100">
        Don't have an account?{' '}
        <Link to="/register" className="text-indigo-600 hover:text-indigo-500 font-semibold">
          Create account
        </Link>
      </div>
    </div>
  );
};
