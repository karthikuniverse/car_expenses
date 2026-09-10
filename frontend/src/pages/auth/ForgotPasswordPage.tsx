import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Typography, Tooltip } from 'antd';
import { MailOutlined, LockOutlined, CheckCircleFilled, LoadingOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useVerifyEmailMutation, useResetPasswordMutation } from '../../services/authApi';
import { FormInput } from '../../components/form/FormInput';
import { FormButton } from '../../components/form/FormButton';
import { showSuccess, showError } from '../../utils/notification';

const { Text } = Typography;

export const ForgotPasswordPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [resetPassword, { isLoading: isResetting }] = useResetPasswordMutation();

  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [verifiedEmail, setVerifiedEmail] = useState<string>('');
  const [verifiedName, setVerifiedName] = useState<string>('');

  // Handle email verification on blur or button click
  const handleEmailVerification = async () => {
    try {
      // Validate only the email field first
      await form.validateFields(['email']);
      const emailValue = form.getFieldValue('email')?.trim();

      if (!emailValue) {
        return;
      }

      // If already verified for the same email, don't re-trigger
      if (isVerified && verifiedEmail.toLowerCase() === emailValue.toLowerCase()) {
        return;
      }

      const res = await verifyEmail({ email: emailValue }).unwrap();
      if (res.success) {
        setIsVerified(true);
        setVerifiedEmail(emailValue);
        setVerifiedName(res.data?.name || '');
        showSuccess('Email Verified', res.message || `Account verified for ${res.data?.name || emailValue}`);
      }
    } catch (err: any) {
      setIsVerified(false);
      setVerifiedEmail('');
      setVerifiedName('');
      const errorMsg = err?.data?.error || err?.message || 'No account found with this email';
      form.setFields([
        {
          name: 'email',
          errors: [errorMsg],
        },
      ]);
      showError('Verification Failed', errorMsg);
    }
  };

  // When email input changes, reset verification if user modifies the verified email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentVal = e.target.value?.trim();
    if (isVerified && currentVal.toLowerCase() !== verifiedEmail.toLowerCase()) {
      setIsVerified(false);
      setVerifiedEmail('');
      setVerifiedName('');
    }
  };

  // Submit full form after verification
  const onFinish = async (values: any) => {
    if (!isVerified) {
      await handleEmailVerification();
      return;
    }

    try {
      const response = await resetPassword({
        email: verifiedEmail,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      }).unwrap();

      if (response.success) {
        showSuccess('Password Reset Success', response.message || 'Password has been reset successfully! Please sign in.');
        navigate('/login');
      }
    } catch (err: any) {
      const errorMsg = err?.data?.error || 'Failed to reset password. Please try again.';
      showError('Reset Failed', errorMsg);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <Text className="text-slate-400 text-sm">
          {isVerified
            ? 'Set a strong new password for your account'
            : 'Enter your registered email to verify and reset password'}
        </Text>
      </div>

      {/* Verified User Banner */}
      {isVerified && (
        <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-3 flex items-center gap-2.5 text-emerald-800 text-xs fade-in">
          <CheckCircleFilled className="text-emerald-500 text-base flex-shrink-0" />
          <div>
            <span className="font-semibold">Verified account: </span>
            <span>{verifiedName ? `${verifiedName} (${verifiedEmail})` : verifiedEmail}</span>
          </div>
        </div>
      )}

      <Form
        form={form}
        name="forgot_password_form"
        onFinish={onFinish}
        layout="vertical"
        size="middle"
        className="space-y-3.5"
      >
        {/* Email Input with Verification Indicator */}
        <FormInput
          name="email"
          label="Email Address"
          size="middle"
          placeholder="Enter your registered email"
          prefix={<MailOutlined className="text-slate-300 mr-2" />}
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email address' },
          ]}
          inputProps={{
            onBlur: handleEmailVerification,
            onChange: handleEmailChange,
            suffix: isVerifying ? (
              <LoadingOutlined className="text-indigo-600 animate-spin" />
            ) : isVerified ? (
              <Tooltip title="Email verified">
                <CheckCircleFilled className="text-emerald-500 text-lg cursor-pointer" />
              </Tooltip>
            ) : null,
          }}
        />

        {/* New Password and Confirm Password fields show only when Email is Verified */}
        {isVerified && (
          <div className="space-y-3.5 fade-in">
            <FormInput
              name="newPassword"
              label="New Password"
              type="password"
              size="middle"
              placeholder="Enter new password (min. 6 characters)"
              prefix={<LockOutlined className="text-slate-300 mr-2" />}
              rules={[
                { required: true, message: 'Please enter your new password' },
                { min: 6, message: 'Password must be at least 6 characters' },
              ]}
            />

            <FormInput
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              size="middle"
              placeholder="Re-enter your new password"
              prefix={<LockOutlined className="text-slate-300 mr-2" />}
              rules={[
                { required: true, message: 'Please confirm your new password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            />
          </div>
        )}

        <Form.Item className="!mb-0 !mt-2">
          {isVerified ? (
            <FormButton
              type="primary"
              htmlType="submit"
              size="middle"
              loading={isResetting}
            >
              Reset Password
            </FormButton>
          ) : (
            <FormButton
              type="primary"
              htmlType="button"
              size="middle"
              loading={isVerifying}
              onClick={handleEmailVerification}
            >
              Verify Email
            </FormButton>
          )}
        </Form.Item>
      </Form>

      <div className="text-center text-sm text-slate-500 pt-3 border-t border-slate-100">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-500 font-semibold"
        >
          <ArrowLeftOutlined className="text-xs" /> Back to Sign In
        </Link>
      </div>
    </div>
  );
};
