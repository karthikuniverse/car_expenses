import React from 'react';
import { Form, Input, Select, DatePicker, InputNumber } from 'antd';

export interface FormInputProps {
  name: string;
  label?: string | React.ReactNode;
  type?: 'string' | 'password' | 'number' | 'select' | 'datepicker';
  placeholder?: string;
  rules?: any[];
  prefix?: React.ReactNode;
  options?: { label: string; value: any }[];
  className?: string;
  required?: boolean;
  inputProps?: any;
  size?: 'small' | 'middle' | 'large';
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  type = 'string',
  placeholder,
  rules,
  prefix,
  options = [],
  className = '',
  required,
  inputProps = {},
  size,
}) => {
  const renderInput = () => {
    switch (type) {
      case 'password':
        return (
          <Input.Password
            prefix={prefix}
            placeholder={placeholder}
            size={size}
            className="hover:border-indigo-400 focus:border-indigo-500 rounded-lg text-slate-700"
            {...inputProps}
          />
        );
      case 'number':
        return (
          <InputNumber
            placeholder={placeholder}
            size={size}
            className="w-full hover:border-indigo-400 focus:border-indigo-500 rounded-lg text-slate-700 flex items-center"
            {...inputProps}
          />
        );
      case 'select':
        return (
          <Select
            placeholder={placeholder}
            options={options}
            size={size}
            className="w-full hover:border-indigo-400 focus:border-indigo-500 rounded-lg text-slate-700"
            popupClassName="rounded-lg"
            {...inputProps}
          />
        );
      case 'datepicker':
        return (
          <DatePicker
            placeholder={placeholder}
            size={size}
            className="w-full hover:border-indigo-400 focus:border-indigo-500 rounded-lg text-slate-700"
            {...inputProps}
          />
        );
      case 'string':
      default:
        return (
          <Input
            prefix={prefix}
            placeholder={placeholder}
            size={size}
            className="hover:border-indigo-400 focus:border-indigo-500 rounded-lg text-slate-700"
            {...inputProps}
          />
        );
    }
  };

  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      required={required}
      className={`!mb-4 ${className}`}
    >
      {renderInput()}
    </Form.Item>
  );
};
