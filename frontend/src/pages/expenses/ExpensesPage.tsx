import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Button, Typography } from 'antd';
import { DollarOutlined, ExperimentOutlined, ToolOutlined, PlusOutlined, FileTextOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export const ExpensesPage: React.FC = () => {
  const sampleExpenses = [
    {
      key: '1',
      title: 'Full Tank Petrol',
      category: 'Fuel',
      amount: '₹ 3,450',
      date: '2026-09-09',
      notes: 'Shell Petrol Bunk, OMR',
    },
    {
      key: '2',
      title: 'Engine Oil & Filter Service',
      category: 'Maintenance',
      amount: '₹ 4,200',
      date: '2026-09-06',
      notes: 'Quarterly routine vehicle service',
    },
    {
      key: '3',
      title: 'Toll Fastag Recharge',
      category: 'Toll / Parking',
      amount: '₹ 1,000',
      date: '2026-09-04',
      notes: 'Fastag highway balance topup',
    },
    {
      key: '4',
      title: 'Water Wash & Interior Cleaning',
      category: 'Cleaning',
      amount: '₹ 600',
      date: '2026-09-01',
      notes: 'Car spa full cleaning',
    },
  ];

  const columns = [
    {
      title: 'Expense Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => (
        <span className="font-semibold text-slate-800 flex items-center gap-1.5">
          <FileTextOutlined className="text-slate-400" /> {text}
        </span>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => (
        <Tag
          color={
            category === 'Fuel'
              ? 'green'
              : category === 'Maintenance'
              ? 'orange'
              : category === 'Toll / Parking'
              ? 'blue'
              : 'purple'
          }
        >
          {category}
        </Tag>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: string) => <span className="font-bold text-indigo-600">{amount}</span>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => <span className="text-slate-500 text-xs">{date}</span>,
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
      render: (notes: string) => <span className="text-slate-500 text-xs">{notes || '-'}</span>,
    },
  ];

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Title level={2} className="text-slate-800 font-extrabold m-0">
            Expenses Management
          </Title>
          <Paragraph className="text-slate-500 m-0">
            Monitor, record, and track vehicle fuel, maintenance, and running costs.
          </Paragraph>
        </div>
        <Button type="primary" icon={<PlusOutlined />} className="!bg-indigo-600 !h-10 px-4 rounded-lg font-semibold">
          Add Expense
        </Button>
      </div>

      {/* Stats Summary */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title={<span className="text-slate-400 font-medium">Monthly Expenses</span>}
              value={9250}
              prefix={<DollarOutlined className="text-indigo-600 mr-1.5" />}
              suffix="INR"
              valueStyle={{ color: '#4f46e5', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title={<span className="text-slate-400 font-medium">Fuel Refill Total</span>}
              value={4450}
              prefix={<ExperimentOutlined className="text-emerald-500 mr-1.5" />}
              suffix="INR"
              valueStyle={{ color: '#10b981', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title={<span className="text-slate-400 font-medium">Maintenance Cost</span>}
              value={4200}
              prefix={<ToolOutlined className="text-amber-500 mr-1.5" />}
              suffix="INR"
              valueStyle={{ color: '#f59e0b', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Expenses Table */}
      <Card bordered={false} className="shadow-sm">
        <h3 className="text-base font-bold text-slate-800 mb-4">Recorded Expense Items</h3>
        <Table
          dataSource={sampleExpenses}
          columns={columns}
          pagination={{ pageSize: 5 }}
          className="overflow-x-auto"
        />
      </Card>
    </div>
  );
};
