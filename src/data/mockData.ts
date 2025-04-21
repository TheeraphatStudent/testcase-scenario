import { TestCase, TestStats } from '../types/TestCase';


export const calculateTestStats = (testCases: TestCase[]): TestStats => {
  const initialStats = { pass: 0, fail: 0, pending: 0, inProgress: 0, total: testCases.length };
  
  return testCases.reduce((stats, testCase) => {
    stats[testCase.status] += 1;
    return stats;
  }, initialStats);
};