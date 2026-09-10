import React from 'react';
import { Card, Form, Input, DatePicker, Select, Button, Row, Col } from 'antd';

const { RangePicker } = DatePicker;

export interface FilterFieldConfig {
  name: string;
  label: string;
  placeholder?: string | [string, string];
  type?: 'text' | 'date-range' | 'date' | 'select' | 'number';
  options?: { label: string; value: any }[];
  colSpan?: { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
}

export interface FilterCardProps {
  fields?: FilterFieldConfig[];
  onSearch?: (values: any) => void;
  onClear?: () => void;
  initialValues?: Record<string, any>;
  loading?: boolean;
  clearText?: string;
  searchText?: string;
  className?: string;
  children?: React.ReactNode;
}

export const FilterCard: React.FC<FilterCardProps> = ({
  fields = [],
  onSearch,
  onClear,
  initialValues,
  loading = false,
  clearText = 'Clear',
  searchText = 'Search',
  className = '',
  children,
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    if (onSearch) {
      onSearch(values);
    }
  };

  const handleReset = () => {
    form.resetFields();
    if (onClear) {
      onClear();
    }
  };

  const renderFieldInput = (field: FilterFieldConfig) => {
    switch (field.type) {
      case 'date-range':
        return (
          <RangePicker
            className="w-full !rounded-lg !h-9 border-slate-200 hover:border-indigo-400 focus:border-indigo-600"
            placeholder={
              Array.isArray(field.placeholder)
                ? field.placeholder
                : ['From Date', 'To Date']
            }
            format="YYYY-MM-DD"
          />
        );
      case 'date':
        return (
          <DatePicker
            className="w-full !rounded-lg !h-9 border-slate-200 hover:border-indigo-400 focus:border-indigo-600"
            placeholder={typeof field.placeholder === 'string' ? field.placeholder : 'Select Date'}
            format="YYYY-MM-DD"
          />
        );
      case 'select':
        return (
          <Select
            className="w-full !h-9"
            placeholder={field.placeholder || `Select ${field.label}`}
            allowClear
            options={field.options || []}
          />
        );
      case 'text':
      default:
        return (
          <Input
            className="w-full !rounded-lg !h-9 border-slate-200 hover:border-indigo-400 focus:border-indigo-600 text-sm"
            placeholder={typeof field.placeholder === 'string' ? field.placeholder : `Enter ${field.label}`}
            allowClear
          />
        );
    }
  };

  return (
    <Card
      bordered={false}
      className={`shadow-xs rounded-xl border border-slate-200/90 bg-white transition-all duration-300 ${className}`}
      styles={{ body: { padding: '16px 20px' } }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleFinish}
        className="m-0"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="flex-1">
            {children ? (
              children
            ) : (
              <Row gutter={[16, 12]} align="bottom">
                {fields.map((field) => (
                  <Col
                    key={field.name}
                    xs={field.colSpan?.xs || 24}
                    sm={field.colSpan?.sm || 12}
                    md={field.colSpan?.md || 6}
                    lg={field.colSpan?.lg || 6}
                    xl={field.colSpan?.xl || 6}
                  >
                    <Form.Item
                      name={field.name}
                      label={
                        <span className="text-xs font-semibold text-slate-700 tracking-tight">
                          {field.label}
                        </span>
                      }
                      className="!mb-0"
                    >
                      {renderFieldInput(field)}
                    </Form.Item>
                  </Col>
                ))}
              </Row>
            )}
          </div>

          {/* Action Buttons (Clear & Search) */}
          <div className="flex items-center justify-end gap-2.5 pt-1 lg:pt-0 self-end">
            <Button
              onClick={handleReset}
              className="!h-9 !px-4 !rounded-lg border-slate-300 text-slate-600 hover:!text-slate-800 hover:!border-slate-400 font-medium text-xs sm:text-sm shadow-2xs"
            >
              {clearText}
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="!h-9 !px-5 !rounded-lg font-semibold text-xs sm:text-sm !bg-[#232066] hover:!bg-[#1c1955] text-white shadow-sm inline-flex items-center justify-center gap-1.5"
            >
              {searchText}
            </Button>
          </div>
        </div>
      </Form>
    </Card>
  );
};

export default FilterCard;
