import React from 'react';
import {
  DashboardOutlined,
  CompassOutlined,
  TeamOutlined,
  DollarOutlined,
} from '@ant-design/icons';

export interface NavigationItem {
  key: string;
  label: string;
  path: string;
  icon: React.ReactNode;
}

export const sidebarMenuItems: NavigationItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardOutlined className="text-base" />,
  },
  {
    key: 'trips',
    label: 'Trips',
    path: '/trips',
    icon: <CompassOutlined className="text-base" />,
  },
  {
    key: 'customers',
    label: 'Customers',
    path: '/customers',
    icon: <TeamOutlined className="text-base" />,
  },
  {
    key: 'expenses',
    label: 'Expenses',
    path: '/expenses',
    icon: <DollarOutlined className="text-base" />,
  },
];
