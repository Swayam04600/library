import { ReactNode, useState } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
  cell?: (item: T) => ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  className?: string;
  onRowClick?: (item: T) => void;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  className = '',
  onRowClick,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: 'asc' | 'desc' | null;
  }>({
    key: null,
    direction: null,
  });

  const handleSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' | null = 'asc';
    
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = null;
      }
    }
    
    setSortConfig({ key: direction ? key : null, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key || !sortConfig.direction) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue === bValue) return 0;
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (aValue === null || aValue === undefined) return sortConfig.direction === 'asc' ? -1 : 1;
    if (bValue === null || bValue === undefined) return sortConfig.direction === 'asc' ? 1 : -1;
    
    return sortConfig.direction === 'asc'
      ? (aValue < bValue ? -1 : 1)
      : (bValue < aValue ? -1 : 1);
  });

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  column.sortable ? 'cursor-pointer select-none' : ''
                }`}
                onClick={() => column.sortable && typeof column.accessor === 'string' && handleSort(column.accessor)}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.header}</span>
                  {column.sortable && typeof column.accessor === 'string' && (
                    <span className="inline-flex">
                      {sortConfig.key === column.accessor ? (
                        sortConfig.direction === 'asc' ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )
                      ) : (
                        <ChevronsUpDown className="h-4 w-4 text-gray-300" />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((item) => (
            <tr 
              key={keyExtractor(item)} 
              className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
              onClick={() => onRowClick && onRowClick(item)}
            >
              {columns.map((column, index) => (
                <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {column.cell
                    ? column.cell(item)
                    : typeof column.accessor === 'function'
                    ? column.accessor(item)
                    : item[column.accessor] as ReactNode}
                </td>
              ))}
            </tr>
          ))}
          
          {data.length === 0 && (
            <tr>
              <td 
                colSpan={columns.length} 
                className="px-6 py-8 text-center text-sm text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}