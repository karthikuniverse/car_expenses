import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Checkbox, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useLoginMutation } from '../../services/authApi';
import { useSetAtom } from 'jotai';
import { tokenAtom, userAtom } from '../../store/atoms';
import type { LoginPayload } from '../../types/auth';
import { FormInput } from '../../components/form/FormInput';
import { FormButton } from '../../components/form/FormButton';
import { showSuccess, showError } from '../../utils/notification';

const { Text } = Typography;

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
        showSuccess('Welcome back!', `Logged in as ${response.user.name}`);
        navigate('/dashboard');
      }
    } catch (err: any) {
      const errorMsg = err?.data?.error || 'Login failed. Please check your credentials.';
      showError('Authentication Failed', errorMsg);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        {/* <Title level={3} className="text-slate-800 font-extrabold !m-0 !mb-1">Sign In</Title> */}
        <Text className="text-slate-400 text-sm">Enter your credentials to access your account</Text>
      </div>

      <Form
        name="login_form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        size="middle"
        className="space-y-3.5"
      >
        <FormInput
          name="email"
          label="Email Address"
          size="middle"
          placeholder="Enter your email address"
          prefix={<MailOutlined className="text-slate-300 mr-2" />}
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email address' }
          ]}
        />

        <FormInput
          name="password"
          label="Password"
          type="password"
          size="middle"
          placeholder="Enter your password"
          prefix={<LockOutlined className="text-slate-300 mr-2" />}
          rules={[{ required: true, message: 'Please enter your password' }]}
        />

        <div className="flex items-center justify-between text-sm">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="text-slate-500">Remember me</Checkbox>
          </Form.Item>
          <Link to="/forgot-password" className="text-indigo-600 hover:text-indigo-500 font-semibold">
            Forgot password?
          </Link>
        </div>

        <Form.Item className="!mb-0">
          <FormButton
            type="primary"
            htmlType="submit"
            size="middle"
            loading={isLoading}
          >
            Sign In
          </FormButton>
        </Form.Item>
      </Form>

      <div className="text-center text-sm text-slate-500 pt-3 border-t border-slate-100">
        Don't have an account?{' '}
        <Link to="/register" className="text-indigo-600 hover:text-indigo-500 font-semibold">
          Create account
        </Link>
      </div>
    </div>
  );
};
