import { ReactNode } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: number;
  changePeriod?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon,
  change,
  changePeriod = 'from last period',
  className = '',
}: StatCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="p-2 bg-primary-50 rounded-lg text-primary-500">
          {icon}
        </div>
      </div>
      
      <div className="mt-2">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
      
      {typeof change !== 'undefined' && (
        <div className="mt-2 flex items-center text-sm">
          <span
            className={`flex items-center ${
              isPositive
                ? 'text-success-500'
                : isNegative
                ? 'text-error-500'
                : 'text-gray-500'
            }`}
          >
            {isPositive ? (
              <ArrowUp className="h-3 w-3 mr-1" />
            ) : isNegative ? (
              <ArrowDown className="h-3 w-3 mr-1" />
            ) : null}
            {Math.abs(change)}%
          </span>
          <span className="ml-1 text-gray-500">{changePeriod}</span>
        </div>
      )}
    </div>
  );
}