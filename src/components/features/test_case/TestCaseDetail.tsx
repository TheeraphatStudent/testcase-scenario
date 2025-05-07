import React, { useState } from 'react';
import { TestCase } from '../../../types/TestCase';
import TestCaseForm from './TestCaseForm';
import { updateDocument } from '../../../utils/hooks/useFirebaseDB';

interface TestCaseDetailProps {
  testCase: TestCase;
  onClose: () => void;
  onTestCaseUpdated: () => void;
}

const TestCaseDetail: React.FC<TestCaseDetailProps> = ({ testCase, onClose, onTestCaseUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async (updatedTestCase: TestCase) => {
    try {
      await updateDocument({
        collectionName: 'testCases',
        data: updatedTestCase
      });
      onTestCaseUpdated();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating test case:', error);
      alert('Failed to update test case. Please try again.');
    }
  };

  if (isEditing) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Edit Test Case</h2>
            <button
              onClick={() => setIsEditing(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <TestCaseForm
            initialData={testCase}
            onClose={() => setIsEditing(false)}
            onSave={handleSave}
            mode="edit"
          />
        </div>
      </div>
    );
  }

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
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Edit
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Test Case ID</h3>
              <span>{testCase.jobId}</span>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
              <span className="capitalize">{testCase.status === 'inProgress' ? 'In Progress' : testCase.status}</span>
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

          {testCase.beforeTestImages && testCase.beforeTestImages.length > 0 && (
            <div className="mb-6">
              <h3 className="text-md font-semibold text-gray-800 mb-2">Before Test Images</h3>
              <div className="grid grid-cols-2 gap-4">
                {testCase.beforeTestImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Before test ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          {testCase.afterTestImages && testCase.afterTestImages.length > 0 && (
            <div className="mb-6">
              <h3 className="text-md font-semibold text-gray-800 mb-2">After Test Images</h3>
              <div className="grid grid-cols-2 gap-4">
                {testCase.afterTestImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`After test ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}
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