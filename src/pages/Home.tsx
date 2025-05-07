import React, { useState, useEffect } from 'react';
import { calculateTestStats } from '../data/stats';
import { TestCase, TestStatus } from '../types/TestCase';
import Dashboard from '../components/Dashboard';
import TestCaseList from '../components/features/test_case/TestCaseList';
import TestCaseDetail from '../components/features/test_case/TestCaseDetail';
import StatusFilter from '../components/StatusFilter';
import CreateTestCase from '../components/features/test_case/CreateTestCase';
import CreateGroup from '../components/features/group/CreateGroup';
import EditGroup from '../components/features/group/EditGroup';
import { exportToExcel } from '../utils/excelExport';
import { Plus, FolderPlus } from 'lucide-react';
import { getCollection } from '../utils/hooks/useFirebaseDB';
import GroupList from '../components/features/group/GroupList';
import { GroupDataProps } from '../types/Group';
import { Navbar } from '../components/Navbar';
import Search from '../components/Search';
import Footer from '../components/Footer';
import { showToast } from '../utils/toast';
import { Seggested } from '../components/Seggested';

function HomePage() {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [groupData, setGroupData] = useState<GroupDataProps[]>([]);

  const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<TestStatus | 'all'>('all');
  const [selectedGroup, setSelectedGroup] = useState<GroupDataProps | null>(null);

  const [searchTerm, setSearchTerm] = useState<{
    testCase: string;
    group: string
  }>({
    group: "",
    testCase: "",
  });

  const [stats, setStats] = useState(calculateTestStats(testCases));
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [isEditGroupModalOpen, setIsEditGroupModalOpen] = useState(false);

  const [filteredTestCases, setFilteredTestCases] = useState<TestCase[]>([]);
  const [filteredGroup, setFilteredGroup] = useState<GroupDataProps[]>([]);

  useEffect(() => {
    fetchTestCases();
  }, []);

  useEffect(() => {
    const filteredTestCases = testCases.filter(testCase => {
      const matchesStatus = selectedStatus === 'all' || testCase.status === selectedStatus;
      const matchesSearch = testCase.title.toLowerCase().includes(searchTerm.testCase.toLowerCase()) ||
        testCase.description.toLowerCase().includes(searchTerm.testCase.toLowerCase());
      return matchesStatus && matchesSearch;
    });
    setFilteredTestCases(filteredTestCases);
  
    const filteredGroup = groupData.filter((item: GroupDataProps) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.group.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.group.toLowerCase()) || item.prefix.toLowerCase().includes(searchTerm.group.toLowerCase());
  
      console.log(matchesSearch)
  
      return matchesSearch;
    });
    setFilteredGroup(filteredGroup);

  }, [searchTerm])

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const fetchTestCases = async () => {
    try {
      const [testCaseContain, groupContain] = await Promise.all([getCollection('testCases'), getCollection('groups')]);

      setTestCases(testCaseContain as TestCase[]);
      setGroupData(groupContain as GroupDataProps[]);

      setFilteredTestCases(testCaseContain as TestCase[]);
      setFilteredGroup(groupContain as GroupDataProps[]);

      setStats(calculateTestStats(testCaseContain as TestCase[]));

    } catch (error) {
      console.error('Error fetching test cases:', error);
      showToast.error('Failed to fetch test cases. Please try again.');
    }
  };

  const handleSelectTestCase = (testCase: TestCase) => {
    setSelectedTestCase(testCase);
  };

  const handleCloseDetail = () => {
    setSelectedTestCase(null);
  };

  const handleStatusChange = (status: TestStatus | 'all') => {
    setSelectedStatus(status);
  };

  const handleExportAll = () => {
    exportToExcel({
      groups: groupData,
      testCases: testCases,
      fileName: 'all-test-cases'
    });
  };

  const handleGroupClick = (group: GroupDataProps) => {
    setSelectedGroup(group);
    setIsEditGroupModalOpen(true);
  };

  const handleGroupUpdated = async () => {
    await fetchTestCases();
    setIsEditGroupModalOpen(false);
    setSelectedGroup(null);
  };

  const handleSearchChange = (type: 'testCase' | 'group', value: string) => {
    setSearchTerm(prev => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pb-[350px]">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <Dashboard stats={stats} onExportAll={handleExportAll} />
        </div>

        {/* Group Section */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-800">Group</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsCreateGroupModalOpen(true)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  <FolderPlus size={18} />
                  <span>New Group</span>
                </button>
              </div>
            </div>

            <div className="flex items-center w-full md:w-auto">
              <Search
                type="group"
                value={searchTerm.group}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <GroupList
            groupData={filteredGroup}
            onGroupClick={handleGroupClick}
          />
        </section>

        {/* Test Case Section */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-800">Test Cases</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (groupData.length === 0) {
                      showToast.warning('Please create a group first');
                      return;
                    }

                    setIsCreateModalOpen(true)
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus size={18} />
                  <span>New Test Case</span>
                </button>
              </div>
            </div>

            <div className="flex items-center w-full md:w-auto">
              <Search
                type="testCase"
                value={searchTerm.testCase}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <div className="mb-6">
            <StatusFilter selectedStatus={selectedStatus} onChange={handleStatusChange} />
          </div>

          <TestCaseList
            testCases={filteredTestCases}
            onSelectTestCase={handleSelectTestCase}
          />
        </section>
      </main>

      <Seggested />

      {selectedTestCase && (
        <TestCaseDetail
          testCase={selectedTestCase}
          onClose={handleCloseDetail}
          onTestCaseUpdated={fetchTestCases}
        />
      )}

      {isCreateModalOpen && (
        <CreateTestCase
          onClose={() => setIsCreateModalOpen(false)}
          onTestCaseCreated={fetchTestCases}
        />
      )}

      {isCreateGroupModalOpen && (
        <CreateGroup
          onClose={() => setIsCreateGroupModalOpen(false)}
          onGroupCreated={fetchTestCases}
        />
      )}

      {isEditGroupModalOpen && selectedGroup && (
        <EditGroup
          onClose={() => {
            setIsEditGroupModalOpen(false);
            setSelectedGroup(null);
          }}
          onGroupUpdated={handleGroupUpdated}
          groupId={selectedGroup.id}
          initialValues={{
            name: selectedGroup.name,
            description: selectedGroup.description
          }}
        />
      )}

      <Footer />
    </div>
  );
}

export default HomePage;