import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, message, Typography } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, LockOutlined, CarOutlined } from '@ant-design/icons';
import { useRegisterMutation } from '../../services/authApi';
import { useSetAtom } from 'jotai';
import { tokenAtom, userAtom } from '../../store/atoms';
import type { RegisterPayload } from '../../types/auth';
import { FormInput } from '../../components/form/FormInput';
import { FormButton } from '../../components/form/FormButton';

const { Title, Text } = Typography;

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
    <div className="space-y-3.5">
      <div className="text-center">
        <Title level={3} className="text-slate-800 font-extrabold !m-0 !mb-1">Create Account</Title>
        <Text className="text-slate-400 text-sm">Join CarExpenses to start tracking today</Text>
      </div>

      <Form
        form={form}
        name="register_form"
        onFinish={onFinish}
        layout="vertical"
        size="middle"
        initialValues={{ role: 'driver' }}
        className="space-y-2.5"
      >
        <FormInput
          name="name"
          label="Full Name"
          size="middle"
          placeholder="Enter your name"
          prefix={<UserOutlined className="text-slate-300 mr-2" />}
          rules={[{ required: true, message: 'Please enter your name' }]}
        />

        <FormInput
          name="phone"
          label="Phone Number"
          size="middle"
          placeholder="Enter your phone number"
          prefix={<PhoneOutlined className="text-slate-300 mr-2" />}
          rules={[
            { required: true, message: 'Please enter your phone number' },
            { pattern: /^[0-9+ \-()]{7,15}$/, message: 'Please enter a valid phone number' }
          ]}
        />

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
          placeholder="Enter a password (min. 6 characters)"
          prefix={<LockOutlined className="text-slate-300 mr-2" />}
          rules={[
            { required: true, message: 'Please enter a password' },
            { min: 6, message: 'Password must be at least 6 characters' }
          ]}
        />

        <FormInput
          name="role"
          type="select"
          size="middle"
          label={<span className="text-slate-500 font-medium text-xs">I am registering as a:</span>}
          options={[
            { label: 'Driver', value: 'driver' },
            { label: 'Administrator', value: 'admin' }
          ]}
          inputProps={{ onChange: (val: 'driver' | 'admin') => setRole(val) }}
          rules={[{ required: true, message: 'Please select a role' }]}
        />

        {role === 'driver' && (
          <FormInput
            name="car_number"
            label="Car/Vehicle Number"
            size="middle"
            placeholder="Car/Vehicle Number (e.g. TN-07-AL-1234)"
            prefix={<CarOutlined className="text-slate-300 mr-2" />}
            rules={[{ required: true, message: 'Please enter your car/vehicle number' }]}
          />
        )}

        <Form.Item className="!mb-0 pt-1">
          <FormButton
            type="primary"
            htmlType="submit"
            size="middle"
            loading={isLoading}
          >
            Sign Up
          </FormButton>
        </Form.Item>
      </Form>

      <div className="text-center text-sm text-slate-500 pt-2.5 border-t border-slate-100">
        Already have an account?{' '}
        <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-semibold">
          Sign In
        </Link>
      </div>
    </div>
  );
};
