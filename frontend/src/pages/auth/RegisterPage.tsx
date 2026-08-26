import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select, message, Typography } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, LockOutlined, CarOutlined } from '@ant-design/icons';
import { useRegisterMutation } from '../../services/authApi';
import { useSetAtom } from 'jotai';
import { tokenAtom, userAtom } from '../../store/atoms';
import type { RegisterPayload } from '../../types/auth';

const { Title, Text } = Typography;
const { Option } = Select;

export const RegisterPage: React.FC = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const setToken = useSetAtom(tokenAtom);
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // Track selected role to conditionally show/require Car Number input
  const [role, setRole] = useState<'driver' | 'admin'>('driver');

  const onFinish = async (values: RegisterPayload) => {
    try {
      // If role is admin, omit car_number
      const payload = {
        ...values,
        car_number: values.role === 'admin' ? undefined : values.car_number,
      };

      const response = await register(payload).unwrap();
      if (response.success) {
        localStorage.setItem('token', response.token);
        setToken(response.token);
        setUser(response.user);
        message.success('Account created successfully!');
        navigate('/dashboard');
      }
    } catch (err: any) {
      const errorMsg = err?.data?.error || 'Registration failed. Please check details.';
      message.error(errorMsg);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Title level={3} className="text-slate-800 font-extrabold m-0">Create Account</Title>
        <Text className="text-slate-400 text-sm">Join CarExpenses to start tracking today</Text>
      </div>

      <Form
        form={form}
        name="register_form"
        onFinish={onFinish}
        layout="vertical"
        size="large"
        initialValues={{ role: 'driver' }}
        className="space-y-3"
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input
            prefix={<UserOutlined className="text-slate-300 mr-2" />}
            placeholder="Full Name"
            className="hover:border-indigo-400 focus:border-indigo-500 rounded-lg"
          />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            { required: true, message: 'Please enter your phone number' },
            { pattern: /^[0-9+ \-()]{7,15}$/, message: 'Please enter a valid phone number' }
          ]}
        >
          <Input
            prefix={<PhoneOutlined className="text-slate-300 mr-2" />}
            placeholder="Phone Number"
            className="hover:border-indigo-400 focus:border-indigo-500 rounded-lg"
          />
        </Form.Item>

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
          rules={[
            { required: true, message: 'Please enter a password' },
            { min: 6, message: 'Password must be at least 6 characters' }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-slate-300 mr-2" />}
            placeholder="Password (min. 6 characters)"
            className="hover:border-indigo-400 focus:border-indigo-500 rounded-lg"
          />
        </Form.Item>

        <Form.Item
          name="role"
          label={<span className="text-slate-500 font-medium text-xs">I am registering as a:</span>}
          rules={[{ required: true, message: 'Please select a role' }]}
        >
          <Select
            onChange={(val) => setRole(val)}
            className="hover:border-indigo-400 focus:border-indigo-500 rounded-lg"
          >
            <Option value="driver">Driver</Option>
            <Option value="admin">Administrator</Option>
          </Select>
        </Form.Item>

        {role === 'driver' && (
          <Form.Item
            name="car_number"
            rules={[{ required: true, message: 'Please enter your car/vehicle number' }]}
          >
            <Input
              prefix={<CarOutlined className="text-slate-300 mr-2" />}
              placeholder="Car/Vehicle Number (e.g. TN-07-AL-1234)"
              className="hover:border-indigo-400 focus:border-indigo-500 rounded-lg"
            />
          </Form.Item>
        )}

        <Form.Item className="pt-2 m-0">
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="w-full h-12 text-base font-semibold rounded-lg"
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>

      <div className="text-center text-sm text-slate-500 pt-2 border-t border-slate-100">
        Already have an account?{' '}
        <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-semibold">
          Sign In
        </Link>
      </div>
    </div>
  );
};
