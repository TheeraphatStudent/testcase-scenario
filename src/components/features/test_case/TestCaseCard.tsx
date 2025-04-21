import React from 'react';
import { TestCase } from '../../../types/TestCase';
import { CheckCircle, XCircle, Clock, Play } from 'lucide-react';

interface TestCaseCardProps {
  testCase: TestCase;
  onClick: (testCase: TestCase) => void;
}

const statusConfig = {
  pass: { icon: CheckCircle, color: 'text-green-500', bgColor: 'bg-green-100' },
  fail: { icon: XCircle, color: 'text-red-500', bgColor: 'bg-red-100' },
  pending: { icon: Clock, color: 'text-yellow-500', bgColor: 'bg-yellow-100' },
  inProgress: { icon: Play, color: 'text-blue-500', bgColor: 'bg-blue-100' }
};

const priorityColors = {
  low: 'bg-gray-200 text-gray-800',
  medium: 'bg-blue-200 text-blue-800',
  high: 'bg-purple-200 text-purple-800'
};

const TestCaseCard: React.FC<TestCaseCardProps> = ({ testCase, onClick }) => {
  const { icon: StatusIcon, color, bgColor } = statusConfig[testCase.status];
  
  return (
    <div 
      className="bg-white rounded-2xl shadow-md p-6 cursor-pointer transition-transform duration-200 hover:shadow-xl hover:-translate-y-1"
      onClick={() => onClick(testCase)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{testCase.title}</h3>
        <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityColors[testCase.priority]}`}>
          {testCase.priority}
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{testCase.description}</p>
      
      <div className="flex justify-between items-center">
        <div className={`flex items-center gap-1 ${color} text-sm`}>
          <StatusIcon size={16} />
          <span className="capitalize">{testCase.status === 'inProgress' ? 'In Progress' : testCase.status}</span>
        </div>
        <div className="text-gray-500 text-xs">
          {testCase.updatedAt && new Date(testCase.updatedAt).toLocaleDateString()}
        </div>
      </div>
      
      <div className={`h-1 w-full text-end mt-3 rounded-full ${bgColor}`}></div>
    </div>
  );
};

export default TestCaseCard;