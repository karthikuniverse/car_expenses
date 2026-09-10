import React from 'react';
import { Card, Table } from 'antd';
import type { TableProps } from 'antd';

export interface DataTableProps<T = any> extends TableProps<T> {
  cardTitle?: React.ReactNode;
  cardExtra?: React.ReactNode;
  headerBorder?: boolean;
  className?: string;
  striped?: boolean;
}

export function DataTable<T extends object = any>({
  cardTitle,
  cardExtra,
  headerBorder = true,
  className = '',
  columns,
  dataSource,
  loading,
  pagination = { pageSize: 5, size: 'small' },
  rowKey = 'key',
  striped = true,
  bordered = true,
  rowClassName,
  ...restProps
}: DataTableProps<T>) {
  const getRowClassName = (record: T, index: number, indent: number) => {
    let customClass = '';
    if (typeof rowClassName === 'function') {
      customClass = rowClassName(record, index, indent);
    } else if (typeof rowClassName === 'string') {
      customClass = rowClassName;
    }

    if (striped) {
      const stripeClass = index % 2 === 0 ? 'table-row-even' : 'table-row-odd';
      return `${stripeClass} ${customClass}`.trim();
    }
    return customClass;
  };

  return (
    <Card
      bordered={false}
      className={`shadow-xs rounded-xl overflow-hidden border border-slate-200/80 !p-0 ${className}`}
      styles={{ body: { padding: 0 } }}
    >
      {(cardTitle || cardExtra) && (
        <div
          className={`px-5 py-3.5 flex items-center justify-between bg-white ${
            headerBorder ? 'border-b border-slate-100' : ''
          }`}
        >
          {cardTitle && (
            <h3 className="text-sm sm:text-base font-bold text-slate-800 m-0">
              {cardTitle}
            </h3>
          )}
          {cardExtra && <div>{cardExtra}</div>}
        </div>
      )}

      <div className="overflow-x-auto">
        <Table<T>
          bordered={bordered}
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          pagination={
            pagination
              ? {
                  ...pagination,
                  className: '!my-3 !mr-4',
                  size: 'small',
                }
              : false
          }
          rowKey={rowKey}
          rowClassName={getRowClassName}
          size="middle"
          className="custom-data-table"
          {...restProps}
        />
      </div>
    </Card>
  );
}

export default DataTable;

