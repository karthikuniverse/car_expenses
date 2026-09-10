import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Button, Typography, Avatar } from 'antd';
import { TeamOutlined, UserOutlined, PhoneOutlined, MailOutlined, PlusOutlined, UserAddOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

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
    <div className="space-y-6 fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Title level={2} className="text-slate-800 font-extrabold m-0">
            Customer Management
          </Title>
          <Paragraph className="text-slate-500 m-0">
            View, add, and manage customer directories and travel histories.
          </Paragraph>
        </div>
        <Button type="primary" icon={<PlusOutlined />} className="!bg-indigo-600 !h-10 px-4 rounded-lg font-semibold">
          Add Customer
        </Button>
      </div>

      {/* Stats Summary */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title={<span className="text-slate-400 font-medium">Total Customers</span>}
              value={36}
              prefix={<TeamOutlined className="text-indigo-600 mr-1.5" />}
              valueStyle={{ color: '#4f46e5', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title={<span className="text-slate-400 font-medium">Corporate Accounts</span>}
              value={8}
              valueStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title={<span className="text-slate-400 font-medium">Active Bookings</span>}
              value={5}
              prefix={<UserAddOutlined className="text-emerald-500 mr-1.5" />}
              valueStyle={{ color: '#10b981', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Customer List */}
      <Card bordered={false} className="shadow-sm">
        <h3 className="text-base font-bold text-slate-800 mb-4">Customer Directory</h3>
        <Table
          dataSource={sampleCustomers}
          columns={columns}
          pagination={{ pageSize: 5 }}
          className="overflow-x-auto"
        />
      </Card>
    </div>
  );
};
