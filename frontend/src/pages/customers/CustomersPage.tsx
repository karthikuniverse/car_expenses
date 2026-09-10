import React from 'react';
import { Card, Row, Col, Statistic, Tag, Avatar } from 'antd';
import { TeamOutlined, UserOutlined, PhoneOutlined, MailOutlined, UserAddOutlined } from '@ant-design/icons';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable } from '../../components/common/DataTable';

export const CustomersPage: React.FC = () => {
  const sampleCustomers = [
    {
      key: '1',
      name: 'Praveen Kumar',
      phone: '+91 9876543210',
      email: 'praveen@example.com',
      totalTrips: 14,
      totalSpent: '₹ 8,450',
      type: 'Regular',
    },
    {
      key: '2',
      name: 'Anitha Ramesh',
      phone: '+91 9840123456',
      email: 'anitha@example.com',
      totalTrips: 8,
      totalSpent: '₹ 5,200',
      type: 'Corporate',
    },
    {
      key: '3',
      name: 'Vimal Raj',
      phone: '+91 9789012345',
      email: 'vimal@example.com',
      totalTrips: 22,
      totalSpent: '₹ 14,300',
      type: 'VIP',
    },
  ];

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <div className="flex items-center gap-2.5">
          <Avatar icon={<UserOutlined />} className="bg-indigo-100 text-indigo-600 font-semibold" />
          <span className="font-semibold text-slate-800">{name}</span>
        </div>
      ),
    },
    {
      title: 'Contact',
      key: 'contact',
      render: (_: any, record: any) => (
        <div className="text-xs space-y-0.5">
          <div className="flex items-center gap-1.5 text-slate-600">
            <PhoneOutlined className="text-slate-400" /> {record.phone}
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <MailOutlined className="text-slate-400" /> {record.email}
          </div>
        </div>
      ),
    },
    {
      title: 'Total Trips',
      dataIndex: 'totalTrips',
      key: 'totalTrips',
      render: (val: number) => <span className="font-semibold text-slate-700">{val}</span>,
    },
    {
      title: 'Total Spent',
      dataIndex: 'totalSpent',
      key: 'totalSpent',
      render: (val: string) => <span className="font-bold text-indigo-600">{val}</span>,
    },
    {
      title: 'Category',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'VIP' ? 'gold' : type === 'Corporate' ? 'blue' : 'default'}>
          {type}
        </Tag>
      ),
    },
  ];

  return (
    <div className="space-y-4 fade-in">
      {/* Reusable Header */}
      <PageHeader
        title="Customer Management"
        description="View, add, and manage customer directories and travel histories."
        actionText="Add Customer"
        onAction={() => console.log('Add customer')}
      />

      {/* Stats Summary */}
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="shadow-sm rounded-xl border border-slate-200/80 !p-2">
            <Statistic
              title={<span className="text-slate-400 font-medium text-xs">Total Customers</span>}
              value={36}
              prefix={<TeamOutlined className="text-indigo-600 mr-1.5 text-base" />}
              valueStyle={{ color: '#4f46e5', fontWeight: 'bold', fontSize: '1.25rem' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="shadow-sm rounded-xl border border-slate-200/80 !p-2">
            <Statistic
              title={<span className="text-slate-400 font-medium text-xs">Corporate Accounts</span>}
              value={8}
              valueStyle={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '1.25rem' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="shadow-sm rounded-xl border border-slate-200/80 !p-2">
            <Statistic
              title={<span className="text-slate-400 font-medium text-xs">Active Bookings</span>}
              value={5}
              prefix={<UserAddOutlined className="text-emerald-500 mr-1.5 text-base" />}
              valueStyle={{ color: '#10b981', fontWeight: 'bold', fontSize: '1.25rem' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Reusable Customer Table */}
      <DataTable
        cardTitle="Customer Directory"
        dataSource={sampleCustomers}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

