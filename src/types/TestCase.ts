export type TestStatus = 'pass' | 'fail' | 'pending' | 'inProgress';
export type PriorityTypes = 'low' | 'medium' | 'high'

export interface TestCaseListProps {
  testCases: TestCase[];
  onSelectTestCase: (testCase: TestCase) => void;
}

export interface TestCase {
  id: string; 
  jobId: string;
  groupId: string;
  title: string;
  description: string;
  status: TestStatus;
  steps: TestStep[];
  expectedResult: string;
  actualResult?: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  beforeTestImages?: string[];
  afterTestImages?: string[];
}

export interface TestStep {
  id: string;
  description: string;
  order: number;
}

export interface TestStats {
  pass: number;
  fail: number;
  pending: number;
  inProgress: number;
  total: number;
}