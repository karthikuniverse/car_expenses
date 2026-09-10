import React from 'react';
import { Button, Tooltip } from 'antd';
import { PlusOutlined, FilterOutlined } from '@ant-design/icons';

export interface PageHeaderProps {
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  actionText?: string;
  actionIcon?: React.ReactNode;
  onAction?: () => void;
  action?: React.ReactNode;
  showFilterButton?: boolean;
  isFilterOpen?: boolean;
  onFilterToggle?: () => void;
  filterButtonText?: string;
  extraActions?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actionText,
  actionIcon = <PlusOutlined />,
  onAction,
  action,
  showFilterButton = false,
  isFilterOpen = false,
  onFilterToggle,
  filterButtonText = 'Filter',
  extraActions,
  className = '',
}) => {
  const shouldShowFilter = showFilterButton || !!onFilterToggle;

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 ${className}`}>
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight m-0 leading-snug">
          {title}
        </h1>
        {description && (
          <p className="text-xs sm:text-sm text-slate-400 m-0 mt-0.5 font-normal">
            {description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        {shouldShowFilter && onFilterToggle && (
          <Tooltip title={isFilterOpen ? 'Hide Filters' : 'Show Filters'}>
            <Button
              icon={<FilterOutlined className={isFilterOpen ? 'text-indigo-600' : 'text-slate-500'} />}
              onClick={onFilterToggle}
              className={`!h-9 !px-3.5 !text-xs sm:!text-sm font-medium !rounded-lg inline-flex items-center justify-center gap-1.5 transition-all duration-200 ${
                isFilterOpen
                  ? '!border-indigo-600 !text-indigo-600 !bg-indigo-50/80 shadow-xs ring-2 ring-indigo-100'
                  : '!border-slate-200 !text-slate-600 hover:!border-indigo-400 hover:!text-indigo-600 !bg-white'
              }`}
            >
              {filterButtonText}
            </Button>
          </Tooltip>
        )}

        {extraActions}

        {action ? (
          action
        ) : actionText ? (
          <Button
            type="primary"
            icon={actionIcon}
            onClick={onAction}
            className="!h-9 !px-3.5 !py-1 !text-xs sm:!text-sm font-semibold !rounded-lg inline-flex items-center justify-center gap-1.5 shadow-sm"
          >
            {actionText}
          </Button>
        ) : null}
      </div>
    </div>
  );
};

