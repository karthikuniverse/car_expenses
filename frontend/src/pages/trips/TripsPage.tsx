import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Button, Typography } from 'antd';
import { CompassOutlined, CheckCircleOutlined, SyncOutlined, PlusOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export const TripsPage: React.FC = () => {
  const sampleTrips = [
    {
      key: '1',
      tripId: 'TRP-1001',
      route: 'Chennai Central -> Airport',
      customer: 'Praveen Kumar',
      distance: '24 km',
      fare: '₹ 650',
      status: 'Completed',
      date: '2026-09-10',
    },
    {
      key: '2',
      tripId: 'TRP-1002',
      route: 'OMR Tech Park -> T Nagar',
      customer: 'Anitha Ramesh',
      distance: '18 km',
      fare: '₹ 480',
      status: 'Ongoing',
      date: '2026-09-10',
    },
    {
      key: '3',
      tripId: 'TRP-1003',
      route: 'Tambaram -> Koyambedu',
      customer: 'Vimal Raj',
      distance: '28 km',
      fare: '₹ 720',
      status: 'Completed',
      date: '2026-09-09',
    },
  ];

  const columns = [
    {
      title: 'Trip ID',
      dataIndex: 'tripId',
      key: 'tripId',
      render: (text: string) => <span className="font-semibold text-indigo-600">{text}</span>,
    },
    {
      title: 'Route',
      dataIndex: 'route',
      key: 'route',
      render: (text: string) => (
        <span className="flex items-center gap-1.5 text-slate-700 font-medium">
          <EnvironmentOutlined className="text-slate-400" /> {text}
        </span>
      ),
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      render: (text: string) => <span className="text-slate-600">{text}</span>,
    },
    {
      title: 'Distance',
      dataIndex: 'distance',
      key: 'distance',
    },
    {
      title: 'Fare',
      dataIndex: 'fare',
      key: 'fare',
      render: (text: string) => <span className="font-semibold text-slate-800">{text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag
          color={status === 'Completed' ? 'success' : 'processing'}
          icon={status === 'Completed' ? <CheckCircleOutlined /> : <SyncOutlined spin />}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => <span className="text-slate-400 text-xs">{text}</span>,
    },
  ];

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Title level={2} className="text-slate-800 font-extrabold m-0">
            Trips Management
          </Title>
          <Paragraph className="text-slate-500 m-0">
            Track and monitor all vehicle travel logs and trip records.
          </Paragraph>
        </div>
        <Button type="primary" icon={<PlusOutlined />} className="!bg-indigo-600 !h-10 px-4 rounded-lg font-semibold">
          New Trip
        </Button>
      </div>

      {/* Stats Summary */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title={<span className="text-slate-400 font-medium">Total Trips</span>}
              value={48}
              prefix={<CompassOutlined className="text-indigo-600 mr-1.5" />}
              valueStyle={{ color: '#4f46e5', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title={<span className="text-slate-400 font-medium">Ongoing Trips</span>}
              value={2}
              prefix={<SyncOutlined spin className="text-blue-500 mr-1.5" />}
              valueStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title={<span className="text-slate-400 font-medium">Total Distance</span>}
              value={1240}
              suffix="km"
              valueStyle={{ color: '#10b981', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Trips Table */}
      <Card bordered={false} className="shadow-sm">
        <h3 className="text-base font-bold text-slate-800 mb-4">Recent Trips</h3>
        <Table
          dataSource={sampleTrips}
          columns={columns}
          pagination={{ pageSize: 5 }}
          className="overflow-x-auto"
        />
      </Card>
    </div>
  );
};
