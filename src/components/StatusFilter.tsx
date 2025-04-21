import React from 'react';
import { TestStatus } from '../types/TestCase';
import { CheckCircle, XCircle, Clock, Play, Filter } from 'lucide-react';

interface StatusFilterProps {
  selectedStatus: TestStatus | 'all';
  onChange: (status: TestStatus | 'all') => void;
}

const statusConfig = {
  all: { icon: Filter, color: 'text-gray-600', bgColor: 'bg-gray-100', activeColor: 'bg-gray-600', label: 'All' },
  pass: { icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-100', activeColor: 'bg-green-600', label: 'Pass' },
  fail: { icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-100', activeColor: 'bg-red-600', label: 'Fail' },
  pending: { icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-100', activeColor: 'bg-yellow-600', label: 'Pending' },
  inProgress: { icon: Play, color: 'text-blue-600', bgColor: 'bg-blue-100', activeColor: 'bg-blue-600', label: 'In Progress' }
};

const StatusFilter: React.FC<StatusFilterProps> = ({ selectedStatus, onChange }) => {
  const filterOptions: Array<TestStatus | 'all'> = ['all', 'pass', 'fail', 'pending', 'inProgress'];
  
  return (
    <div className="flex flex-wrap gap-2">
      {filterOptions.map(status => {
        const { icon: StatusIcon, color, bgColor, activeColor, label } = statusConfig[status];
        const isActive = selectedStatus === status;
        
        return (
          <button
            key={status}
            onClick={() => onChange(status)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors
              ${isActive 
                ? `${activeColor} text-white` 
                : `${bgColor} ${color} hover:bg-opacity-80`
              }`}
          >
            <StatusIcon size={16} />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default StatusFilter;