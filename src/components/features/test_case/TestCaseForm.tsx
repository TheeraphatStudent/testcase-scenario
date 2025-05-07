import React, { useState, useEffect } from 'react';
import { TestCase, TestStatus, PriorityTypes, TestStep } from '../../../types/TestCase';
import { Plus, Minus } from 'lucide-react';
import ImageUpload from '../../ImageUpload';
import { getCollection } from '../../../utils/hooks/useFirebaseDB';
import { GroupDataProps } from '../../../types/Group';

interface TestCaseFormProps {
  initialData?: TestCase;
  onClose: () => void;
  onSave: (testCase: TestCase) => void;
  mode: 'create' | 'edit';
}

const TestCaseForm: React.FC<TestCaseFormProps> = ({ initialData, onClose, onSave, mode }) => {
  const [groups, setGroups] = useState<GroupDataProps[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>(initialData?.groupId || '');
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [status, setStatus] = useState<TestStatus>(initialData?.status || 'pending');
  const [priority, setPriority] = useState<PriorityTypes>(initialData?.priority || 'medium');
  const [assignee, setAssignee] = useState(initialData?.assignee || '');
  const [expectedResult, setExpectedResult] = useState(initialData?.expectedResult || '');
  const [actualResult, setActualResult] = useState(initialData?.actualResult || '');
  const [steps, setSteps] = useState<TestStep[]>(
    initialData?.steps || [{ id: 'temp-1', description: '', order: 1 }]
  );
  const [beforeImages, setBeforeImages] = useState<string[]>(initialData?.beforeTestImages || []);
  const [afterImages, setAfterImages] = useState<string[]>(initialData?.afterTestImages || []);
  const [nextId, setNextId] = useState<string>(initialData?.jobId || '');

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (selectedGroup && mode === 'create') {
      generateNextId();
    }
  }, [selectedGroup, groups, mode]);

  const fetchGroups = async () => {
    try {
      const fetchedGroups = await getCollection('groups');
      setGroups(fetchedGroups as GroupDataProps[]);

      if (fetchedGroups.length > 0 && !selectedGroup) {
        setSelectedGroup(fetchedGroups[0].id);
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
      alert('Failed to fetch groups. Please try again.');
    }
  };

  const generateNextId = async () => {
    try {
      const group = groups.find(g => g.id === selectedGroup);
      if (!group) return;
      const querySnapshot = await getCollection('testCases')

      const existingCases = querySnapshot
        .map(doc => doc.data())
        .filter(tc => tc.groupId === selectedGroup);

      const number = (existingCases.length + 1).toString().padStart(6, '0');
      setNextId(`${group.prefix}-${number}`);
    } catch (error) {
      console.error('Error generating ID:', error);
    }
  };

  const handleAddStep = () => {
    setSteps([...steps, { id: `temp-${steps.length + 1}`, description: '', order: steps.length + 1 }]);
  };

  const handleRemoveStep = (index: number) => {
    if (steps.length > 1) {
      const newSteps = steps.filter((_, i) => i !== index);
      newSteps.forEach((step, i) => step.order = i + 1);
      setSteps(newSteps);
    }
  };

  const handleStepChange = (index: number, value: string) => {
    const newSteps = steps.map((step, i) =>
      i === index ? { ...step, description: value } : step
    );
    setSteps(newSteps);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedGroup || (mode === 'create' && !nextId)) {
      alert('Please select a group first');
      return;
    }

    try {
      const testCaseData: TestCase = {
        id: initialData?.id || '',
        jobId: mode === 'create' ? nextId : initialData!.jobId,
        groupId: selectedGroup,
        title,
        description,
        status,
        priority,
        assignee,
        expectedResult,
        actualResult,
        steps: steps.map((step, index) => ({
          id: mode === 'create' ? `${nextId}-step-${index + 1}` : step.id,
          description: step.description,
          order: step.order
        })),
        beforeTestImages: beforeImages,
        afterTestImages: afterImages,
        createdAt: mode === 'create' ? new Date().toISOString() : initialData!.createdAt,
        updatedAt: new Date().toISOString()
      };

      await onSave(testCaseData);
      onClose();
    } catch (error) {
      console.error('Error saving test case:', error);
      alert('Failed to save test case. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="space-y-6">
        {mode === 'create' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group
            </label>
            <select
              required
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {groups.map(group => (
                <option key={group.id} value={group.id}>
                  {group.name} ({group.prefix})
                </option>
              ))}
            </select>
          </div>
        )}

        {nextId && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Test Case ID
            </label>
            <input
              type="text"
              value={nextId}
              disabled
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TestStatus)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="inProgress">In Progress</option>
              <option value="pass">Pass</option>
              <option value="fail">Fail</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as PriorityTypes)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assignee
          </label>
          <input
            type="text"
            required
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expected Result
          </label>
          <textarea
            required
            value={expectedResult}
            onChange={(e) => setExpectedResult(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Actual Result
          </label>
          <textarea
            value={actualResult}
            onChange={(e) => setActualResult(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Test Steps
            </label>
            <button
              type="button"
              onClick={handleAddStep}
              className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
            >
              <Plus size={16} />
              Add Step
            </button>
          </div>
          <div className="space-y-2">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  required
                  value={step.description}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                  placeholder={`Step ${index + 1}`}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {steps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveStep(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Minus size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <ImageUpload
            images={beforeImages}
            onChange={setBeforeImages}
            label="Before Test Images"
          />
        </div>

        <div>
          <ImageUpload
            images={afterImages}
            onChange={setAfterImages}
            label="After Test Images"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {mode === 'create' ? 'Create Test Case' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

export default TestCaseForm; 