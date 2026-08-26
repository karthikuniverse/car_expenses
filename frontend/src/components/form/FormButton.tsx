import React from 'react';
import { Button } from 'antd';
import type { ButtonProps } from 'antd';

export interface FormButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export const FormButton: React.FC<FormButtonProps> = ({
  children,
  className = '',
  type = 'primary',
  htmlType = 'button',
  size,
  ...props
}) => {
  return (
    <Button
      type={type}
      htmlType={htmlType}
      size={size}
      className={`w-full text-base font-semibold rounded-lg flex items-center justify-center ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};
