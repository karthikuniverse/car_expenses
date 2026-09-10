import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAtom, useSetAtom } from 'jotai';
import { userAtom, tokenAtom } from '../../store/atoms';
import { useGetMeQuery } from '../../services/authApi';
import { Layout, Menu, Avatar, Dropdown, Spin, Tag } from 'antd';
import {
  CarOutlined,
  LogoutOutlined,
  UserOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { showSuccess, showError } from '../../utils/notification';
import { sidebarMenuItems } from '../../config/navigation';

const { Header, Content, Sider } = Layout;

export const DashboardLayout: React.FC = () => {
  const [user, setUser] = useAtom(userAtom);
  const setToken = useSetAtom(tokenAtom);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch current user details on component mount if user atom is empty
  const { data: meData, isLoading, isError } = useGetMeQuery(undefined, {
    skip: !localStorage.getItem('token'),
  });

  useEffect(() => {
    if (meData && meData.success) {
      setUser(meData.data);
    }
  }, [meData, setUser]);

  useEffect(() => {
    if (isError) {
      showError('Session Expired', 'Please login again.');
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
    showSuccess('Logged Out', 'You have been successfully logged out.');
    navigate('/login');
  };

  // Determine current active key from route path
  const currentKey =
    sidebarMenuItems.find((item) =>
      item.path === '/dashboard'
        ? location.pathname === '/dashboard'
        : location.pathname.startsWith(item.path)
    )?.key || 'dashboard';

  const userMenuItems = [
    {
      key: 'user-info',
      label: (
        <div className="px-3 py-2 border-b border-slate-100 min-w-[180px]">
          <p className="font-bold text-slate-800 m-0 text-sm">{user?.name}</p>
          <p className="text-xs text-slate-400 m-0 truncate">{user?.email}</p>
          <div className="mt-1.5">
            <Tag color="indigo" className="!text-[10px] uppercase font-semibold !m-0">
              {user?.role || 'User'}
            </Tag>
          </div>
        </div>
      ),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined className="text-rose-500" />,
      label: <span className="text-rose-600 font-medium">Log out</span>,
      onClick: handleLogout,
    },
  ];

  if (isLoading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Spin size="large" tip="Loading session..." />
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Top Header */}
      <Header
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '0 24px',
          height: '64px',
          lineHeight: '64px',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left Side: Brand Logo & Title */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate('/dashboard')}
        >
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-blue-500 rounded-xl flex items-center justify-center text-white shadow-sm">
            <CarOutlined className="text-xl" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-800">
            Car Expenses
          </span>
        </div>

        {/* Right Side: Current Logged In User Info */}
        <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
          <div className="flex items-center gap-3 cursor-pointer py-1.5 px-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
            <Avatar
              size={38}
              className="bg-indigo-600 text-white font-bold flex items-center justify-center shadow-sm"
            >
              {user?.name ? user.name.charAt(0).toUpperCase() : <UserOutlined />}
            </Avatar>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-sm font-bold text-slate-800 leading-tight">
                {user?.name || 'User'}
              </span>
              <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider leading-tight">
                {user?.role || 'Admin'}
              </span>
            </div>
            <DownOutlined className="text-[10px] text-slate-400 ml-1 hidden sm:inline-block" />
          </div>
        </Dropdown>
      </Header>

      <Layout style={{ minHeight: 'calc(100vh - 64px)', background: '#f8fafc' }}>
        {/* Sidebar Menu Loaded from Config */}
        <Sider
          width={240}
          style={{
            background: '#ffffff',
            borderRight: '1px solid #e2e8f0',
            minHeight: 'calc(100vh - 64px)',
          }}
          className="hidden md:block shadow-sm"
          trigger={null}
          collapsible={false}
        >
          <div className="p-3 sticky top-[64px]">
            <Menu
              mode="inline"
              selectedKeys={[currentKey]}
              onClick={({ key }) => {
                const navItem = sidebarMenuItems.find((item) => item.key === key);
                if (navItem) {
                  navigate(navItem.path);
                }
              }}
              className="!border-none space-y-1"
              items={sidebarMenuItems.map((item) => ({
                key: item.key,
                icon: item.icon,
                label: <span className="font-semibold text-sm">{item.label}</span>,
                className: '!rounded-lg !my-1',
              }))}
            />
          </div>
        </Sider>

        {/* Main Content Area */}
        <Layout className="p-4 md:p-8 bg-slate-50" style={{ minHeight: 'calc(100vh - 64px)' }}>
          <Content className="m-0 flex-1 min-h-full">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

