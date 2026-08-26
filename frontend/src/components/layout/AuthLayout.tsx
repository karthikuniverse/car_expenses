import React from 'react';
import { Outlet } from 'react-router-dom';
import { CarOutlined } from '@ant-design/icons';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 p-4 md:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_40%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.15),transparent_40%)] pointer-events-none" />
      
      <div className="w-full max-w-5xl flex flex-col md:flex-row glass-card rounded-2xl overflow-hidden shadow-2xl fade-in">
        {/* Left Side Info Panel */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-600 to-violet-700 p-8 md:p-12 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-cover opacity-10 bg-[url('https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200')]" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-2xl font-bold tracking-tight mb-8">
              <span className="p-2 bg-white/10 rounded-lg flex items-center justify-center">
                <CarOutlined className="text-white text-3xl" />
              </span>
              <span>CarExpenses</span>
            </div>
            
            <div className="space-y-4 my-auto md:my-16">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white m-0">
                Track Your Drive, <br />
                <span className="text-indigo-200">Manage Your Spend.</span>
              </h1>
              <p className="text-base text-indigo-100 max-w-sm">
                The ultimate companion for drivers and administrators to track expenses, log fuel, and manage fleet costs effortlessly.
              </p>
            </div>
          </div>
          
          <div className="relative z-10 text-xs text-indigo-200 flex justify-between mt-8">
            <span>© 2026 CarExpenses Inc.</span>
            <span>All rights reserved.</span>
          </div>
        </div>

        {/* Right Side Form Panel */}
        <div className="w-full md:w-1/2 bg-white/85 p-8 md:p-12 flex flex-col justify-center relative">
          <div className="w-full max-w-md mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
