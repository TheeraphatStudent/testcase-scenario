import * as XLSX from 'xlsx';
import { TestCase } from '../types/TestCase';
import { GroupDataProps } from '../types/Group';

interface ExportDataProps {
  groups: GroupDataProps[],
  testCases: TestCase[],
  fileName: string
}

export const exportToExcel = ({
  groups,
  testCases,
  fileName = 'test-cases'
}: ExportDataProps): void => {
  const workbook = XLSX.utils.book_new();

  groups.forEach(group => {
    const groupSheetName = group.name.replace(/\s+/g, '-').toLowerCase();
    const groupTestCases = testCases.filter(testCase => testCase.groupId === group.id);
    
    const groupData = groupTestCases.map(testCase => ({
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

    const testCasesSheet = XLSX.utils.json_to_sheet(groupData);

    // Initialize dynamic column widths for this group
    const dynamicColumnWidths = {
      'ID': 8,
      'Title': 15,
      'Description': 20,
      'Status': 8,
      'Expected Result': 20,
      'Actual Result': 20,
      'Assignee': 10,
      'Priority': 8,
      'Created': 8,
      'Updated': 8,
      'Steps': 20
    };

    groupData.forEach(row => {
      Object.keys(row).forEach(key => {
        const value = String(row[key as keyof typeof row]);
        const length = value.length;
        if (length > dynamicColumnWidths[key as keyof typeof dynamicColumnWidths]) {
          dynamicColumnWidths[key as keyof typeof dynamicColumnWidths] = length;
        }
      });
    });

    const colWidths = Object.keys(dynamicColumnWidths).map(key => ({
      wch: Math.min(dynamicColumnWidths[key as keyof typeof dynamicColumnWidths], 100)
    }));

    testCasesSheet['!cols'] = colWidths;
    XLSX.utils.book_append_sheet(workbook, testCasesSheet, groupSheetName);
  });

  const githubInfo = [
    { 'Author': 'Theeraphat Student', 'Github': 'https://github.com/TheeraphatStudent' }
  ];

  const githubSheet = XLSX.utils.json_to_sheet(githubInfo);
  XLSX.utils.book_append_sheet(workbook, githubSheet, 'GitHub Info');

  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};