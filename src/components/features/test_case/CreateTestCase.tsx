import React from 'react';
import { TestCase } from '../../../types/TestCase';
import TestCaseForm from './TestCaseForm';

interface CreateTestCaseProps {
  onClose: () => void;
  onSave: (testCase: TestCase) => void;
}

const CreateTestCase: React.FC<CreateTestCaseProps> = ({ onClose, onSave }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Create New Test Case</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <TestCaseForm
          onClose={onClose}
          onSave={onSave}
          mode="create"
        />
      </div>
    </div>
  );
};

export default CreateTestCase;