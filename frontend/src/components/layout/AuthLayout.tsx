import React from 'react';
import { Outlet } from 'react-router-dom';
import { CarOutlined } from '@ant-design/icons';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100/80 to-indigo-50/40 p-4 md:p-8 relative overflow-hidden">
      {/* Soft background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white border border-slate-100 rounded-2xl shadow-xl p-6 md:p-8 relative z-10 fade-in">
        {/* Brand Logo & Name */}
        <div className="flex items-center justify-center gap-2.5 mb-1">
          {/* <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
            <CarOutlined className="text-xl" />
          </div> */}
          <span className="text-xl font-bold tracking-tight text-slate-800">Car Expenses Tracker</span>
        </div>

        <Outlet />
      </div>

      <div className="mt-8 text-xs text-slate-400 flex gap-2 relative z-10">
        <span>© 2026 CarExpenses Inc.</span>
        <span>•</span>
        <span>All rights reserved.</span>
      </div>
    </div>
  );
};
