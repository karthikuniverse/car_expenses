import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as JotaiProvider } from 'jotai';
import { ConfigProvider } from 'antd';
import { store } from './store';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <ReduxProvider store={store}>
      <JotaiProvider>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#4f46e5', // Indigo primary color for custom branding
              colorSuccess: '#10b981',
              colorWarning: '#f59e0b',
              colorError: '#ef4444',
              colorInfo: '#3b82f6',
              borderRadius: 8,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            },
          }}
        >
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ConfigProvider>
      </JotaiProvider>
    </ReduxProvider>
  );
}

export default App;
