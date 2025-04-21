import * as XLSX from 'xlsx';
import { TestCase } from '../types/TestCase';

export const exportToExcel = (testCases: TestCase[], fileName: string = 'test-cases'): void => {
  // Prepare data for export
  const exportData = testCases.map(testCase => ({
    'ID': testCase.jobId,
    'Title': testCase.title,
    'Description': testCase.description,
    'Status': testCase.status,
    'Expected Result': testCase.expectedResult,
    'Actual Result': testCase.actualResult || 'N/A',
    'Assignee': testCase.assignee,
    'Priority': testCase.priority,
    'Created': new Date(testCase.createdAt).toLocaleDateString(),
    'Updated': new Date(testCase.updatedAt).toLocaleDateString(),
    'Steps': testCase.steps.map(step => `${step.order}. ${step.description}`).join('\n')
  }));

  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(exportData);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Test Cases');

  // Generate Excel file and trigger download
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};