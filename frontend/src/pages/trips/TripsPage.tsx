import React, { useState, useMemo } from 'react';
import { Tag } from 'antd';
import { CheckCircleOutlined, SyncOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable } from '../../components/common/DataTable';
import { FilterCard, type FilterFieldConfig } from '../../components/common/FilterCard';

export const TripsPage: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<Record<string, any>>({});

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
    {
      key: '4',
      tripId: 'TRP-1004',
      route: 'Velachery -> Guindy',
      customer: 'Suresh Raina',
      distance: '12 km',
      fare: '₹ 320',
      status: 'Completed',
      date: '2026-09-08',
    },
    {
      key: '5',
      tripId: 'TRP-1005',
      route: 'Porur -> Marina Beach',
      customer: 'Kavitha S',
      distance: '22 km',
      fare: '₹ 560',
      status: 'Ongoing',
      date: '2026-09-08',
    },
  ];

  const filterFields: FilterFieldConfig[] = [
    {
      name: 'dateRange',
      label: 'Voucher Date',
      type: 'date-range',
      placeholder: ['From Date', 'To Date'],
      colSpan: { xs: 24, sm: 12, md: 6, lg: 6 },
    },
    {
      name: 'tripId',
      label: 'Voucher No',
      type: 'text',
      placeholder: 'Enter Voucher No',
      colSpan: { xs: 24, sm: 12, md: 6, lg: 6 },
    },
    {
      name: 'customer',
      label: 'Ledger Name',
      type: 'text',
      placeholder: 'Enter Ledger Name',
      colSpan: { xs: 24, sm: 12, md: 6, lg: 6 },
    },
    {
      name: 'route',
      label: 'Booking No',
      type: 'text',
      placeholder: 'Search Booking No',
      colSpan: { xs: 24, sm: 12, md: 6, lg: 6 },
    },
  ];

  const handleSearch = (values: Record<string, any>) => {
    setFilters(values);
  };

  const handleClear = () => {
    setFilters({});
  };

  const filteredTrips = useMemo(() => {
    return sampleTrips.filter((item) => {
      if (
        filters.tripId &&
        !item.tripId.toLowerCase().includes(filters.tripId.trim().toLowerCase())
      ) {
        return false;
      }
      if (
        filters.customer &&
        !item.customer.toLowerCase().includes(filters.customer.trim().toLowerCase())
      ) {
        return false;
      }
      if (
        filters.route &&
        !item.route.toLowerCase().includes(filters.route.trim().toLowerCase())
      ) {
        return false;
      }
      if (
        filters.dateRange &&
        Array.isArray(filters.dateRange) &&
        filters.dateRange[0] &&
        filters.dateRange[1]
      ) {
        const [start, end] = filters.dateRange;
        const tripDate = new Date(item.date).getTime();
        const startTime = start.startOf ? start.startOf('day').valueOf() : new Date(start).setHours(0, 0, 0, 0);
        const endTime = end.endOf ? end.endOf('day').valueOf() : new Date(end).setHours(23, 59, 59, 999);
        if (tripDate < startTime || tripDate > endTime) {
          return false;
        }
      }
      return true;
    });
  }, [filters, sampleTrips]);

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
    <div className="space-y-4 fade-in">
      {/* Reusable Header with Filter Toggle and Action */}
      <PageHeader
        title="Trips Management"
        description="Track and monitor all vehicle travel logs and trip records."
        actionText="New Trip"
        onAction={() => console.log('New trip')}
        showFilterButton={true}
        isFilterOpen={isFilterOpen}
        onFilterToggle={() => setIsFilterOpen(!isFilterOpen)}
      />

      {/* Reusable Filter Card */}
      {isFilterOpen && (
        <div className="fade-in">
          <FilterCard
            fields={filterFields}
            onSearch={handleSearch}
            onClear={handleClear}
            clearText="Clear"
            searchText="Search"
          />
        </div>
      )}

      {/* Reusable Data Table with alternating row colors and styled header */}
      <DataTable
        cardTitle="Recent Trips"
        dataSource={filteredTrips}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default TripsPage;
