import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAtom, useSetAtom } from 'jotai';
import { userAtom, tokenAtom } from '../../store/atoms';
import { useGetMeQuery } from '../../services/authApi';
import { Layout, Menu, Button, Avatar, Dropdown, message, Spin } from 'antd';
import { CarOutlined, LogoutOutlined, UserOutlined, DashboardOutlined, DollarOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

export const DashboardLayout: React.FC = () => {
  const [user, setUser] = useAtom(userAtom);
  const setToken = useSetAtom(tokenAtom);
  const navigate = useNavigate();

  // Fetch current user details on component mount if user atom is empty
  const { data: meData, error, isLoading, isError } = useGetMeQuery(undefined, {
    skip: !localStorage.getItem('token'),
  });

  useEffect(() => {
    if (meData && meData.success) {
      setUser(meData.data);
    }
  }, [meData, setUser]);

  useEffect(() => {
    if (isError) {
      message.error('Session expired, please login again.');
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [isError, setToken, setUser, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    message.success('Logged out successfully');
    navigate('/login');
  };

  if (isLoading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Spin size="large" tip="Loading session..." />
      </div>
    );
  }

  const userMenuItems = [
    {
      key: 'profile',
      label: (
        <div className="px-4 py-2 border-b border-slate-100">
          <p className="font-semibold text-slate-800 m-0">{user?.name}</p>
          <p className="text-xs text-slate-500 m-0 capitalize">{user?.role}</p>
        </div>
      ),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Header className="bg-white border-b border-slate-100 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="p-2 bg-indigo-50 rounded-lg flex items-center justify-center">
            <CarOutlined className="text-indigo-600 text-xl" />
          </span>
          <span className="text-xl font-bold tracking-tight text-slate-800">CarExpenses</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
            <div className="flex items-center gap-3 cursor-pointer p-1.5 hover:bg-slate-50 rounded-lg transition-colors">
              <Avatar icon={<UserOutlined />} className="bg-indigo-600" />
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-slate-700 m-0 leading-tight">{user?.name}</p>
                <p className="text-xs text-slate-400 m-0 leading-none capitalize">{user?.role}</p>
              </div>
            </div>
          </Dropdown>
        </div>
      </Header>
      
      <Layout>
        <Sider width={240} className="bg-white border-r border-slate-100 hidden md:block" trigger={null} collapsible={false}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['dashboard']}
            className="h-full border-r-0 pt-4"
            items={[
              {
                key: 'dashboard',
                icon: <DashboardOutlined />,
                label: 'Dashboard',
              },
              {
                key: 'expenses',
                icon: <DollarOutlined />,
                label: 'Expenses',
                disabled: true,
              },
            ]}
          />
        </Sider>
        
        <Layout className="p-6 bg-slate-50">
          <Content className="m-0 min-h-[280px]">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
