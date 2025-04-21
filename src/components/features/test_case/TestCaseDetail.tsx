import React from 'react';
import { CheckCircle, XCircle, Clock, Play, Download } from 'lucide-react';
import { exportToExcel } from '../../../utils/excelExport';
import { TestCase } from '../../../types/TestCase';

interface TestCaseDetailProps {
  testCase: TestCase;
  onClose: () => void;
}

const statusConfig = {
  pass: { icon: CheckCircle, color: 'text-green-500', bgColor: 'bg-green-100', label: 'Pass' },
  fail: { icon: XCircle, color: 'text-red-500', bgColor: 'bg-red-100', label: 'Fail' },
  pending: { icon: Clock, color: 'text-yellow-500', bgColor: 'bg-yellow-100', label: 'Pending' },
  inProgress: { icon: Play, color: 'text-blue-500', bgColor: 'bg-blue-100', label: 'In Progress' }
};

const TestCaseDetail: React.FC<TestCaseDetailProps> = ({ testCase, onClose }) => {
  const { icon: StatusIcon, color, label } = statusConfig[testCase.status];
  
  const handleExport = () => {
    exportToExcel([testCase], `test-case-${testCase.jobId}`);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Test Case Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{testCase.title}</h1>
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors"
            >
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
              <div className={`inline-flex items-center gap-1.5 ${color} text-sm font-medium`}>
                <StatusIcon size={18} />
                <span>{label}</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Priority</h3>
              <span className="capitalize">{testCase.priority}</span>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Assignee</h3>
              <span>{testCase.assignee}</span>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Last Updated</h3>
              <span>{new Date(testCase.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-md font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-700">{testCase.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-md font-semibold text-gray-800 mb-2">Test Steps</h3>
            <ol className="list-decimal list-inside space-y-2">
              {testCase.steps.map(step => (
                <li key={step.id} className="text-gray-700">{step.description}</li>
              ))}
            </ol>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-2">Expected Result</h3>
              <p className="text-gray-700">{testCase.expectedResult}</p>
            </div>
            
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-2">Actual Result</h3>
              <p className="text-gray-700">{testCase.actualResult || 'Not recorded'}</p>
            </div>
          </div>
        </div>
        
        <div className="sticky bottom-0 bg-gray-50 p-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestCaseDetail;