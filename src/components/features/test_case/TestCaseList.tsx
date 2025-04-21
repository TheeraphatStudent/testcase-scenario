import React from 'react';
import { TestCaseListProps } from '../../../types/TestCase';
import TestCaseCard from './TestCaseCard';

const TestCaseList: React.FC<TestCaseListProps> = ({ testCases, onSelectTestCase }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {testCases.length === 0 ? (
        <div className="col-span-full p-8 text-center text-gray-500">
          No test cases match the current filter.
        </div>
      ) : (
        testCases.map(testCase => (
          <TestCaseCard 
            key={testCase.jobId} 
            testCase={testCase} 
            onClick={onSelectTestCase} 
          />
        ))
      )}
    </div>
  );
};

export default TestCaseList;