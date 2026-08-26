import React from 'react';
import { useAtomValue } from 'jotai';
import { userAtom } from '../../store/atoms';
import { Card, Col, Row, Statistic, Typography, Tag } from 'antd';
import { CarOutlined, DollarOutlined, ExperimentOutlined, UserOutlined, CalendarOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export const DashboardPage: React.FC = () => {
  const user = useAtomValue(userAtom);

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Title level={2} className="text-slate-800 font-extrabold m-0">
            Welcome back, {user?.name}!
          </Title>
          <Paragraph className="text-slate-500 m-0">
            Here is a summary of your driving logs and vehicle expenses.
          </Paragraph>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-100 shadow-sm">
          <CalendarOutlined className="text-indigo-500" />
          <span className="text-sm font-semibold text-slate-600">
            {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title={<span className="text-slate-400 font-medium">Total Expenses</span>}
              value={12450}
              precision={2}
              valueStyle={{ color: '#4f46e5', fontWeight: 'bold' }}
              prefix={<DollarOutlined className="mr-1" />}
              suffix="INR"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title={<span className="text-slate-400 font-medium">Distance Traveled</span>}
              value={1840}
              valueStyle={{ color: '#06b6d4', fontWeight: 'bold' }}
              prefix={<CarOutlined className="mr-1" />}
              suffix="km"
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} lg={8}>
          <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title={<span className="text-slate-400 font-medium">Fuel Refills</span>}
              value={12}
              valueStyle={{ color: '#10b981', fontWeight: 'bold' }}
              prefix={<ExperimentOutlined className="mr-1" />}
              suffix="times"
            />
          </Card>
        </Col>
      </Row>

      {/* Account Info Details */}
      <Card bordered={false} className="shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
          <span className="p-2 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
            <UserOutlined className="text-lg" />
          </span>
          <h3 className="text-lg font-bold text-slate-800 m-0">My Account Profile</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          <div className="flex justify-between border-b border-slate-50 py-2">
            <span className="text-slate-400">Full Name</span>
            <span className="font-semibold text-slate-700">{user?.name}</span>
          </div>
          <div className="flex justify-between border-b border-slate-50 py-2">
            <span className="text-slate-400">Email Address</span>
            <span className="font-semibold text-slate-700">{user?.email}</span>
          </div>
          <div className="flex justify-between border-b border-slate-50 py-2">
            <span className="text-slate-400">Phone Number</span>
            <span className="font-semibold text-slate-700">{user?.phone}</span>
          </div>
          <div className="flex justify-between border-b border-slate-50 py-2">
            <span className="text-slate-400">Account Role</span>
            <span className="font-semibold text-indigo-600 uppercase tracking-wider text-sm">{user?.role}</span>
          </div>
          {user?.role === 'driver' && (
            <div className="flex justify-between border-b border-slate-50 py-2">
              <span className="text-slate-400">Registered Car Number</span>
              <span className="font-semibold text-slate-700 uppercase">{user?.car_number || 'N/A'}</span>
            </div>
          )}
          <div className="flex justify-between border-b border-slate-50 py-2">
            <span className="text-slate-400">Account Status</span>
            <span>
              {user?.is_active ? (
                <Tag color="success" icon={<CheckCircleOutlined />}>Active</Tag>
              ) : (
                <Tag color="error">Inactive</Tag>
              )}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};
