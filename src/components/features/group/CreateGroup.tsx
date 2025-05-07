import React from 'react';
import { createDocument } from '../../../utils/hooks/useFirebaseDB';
import GroupForm from './GroupForm';
import { showToast } from '../../../utils/toast';

interface CreateGroupProps {
  onClose: () => void;
  onGroupCreated: () => void;
}

const CreateGroup: React.FC<CreateGroupProps> = ({ onClose, onGroupCreated }) => {
  const handleSubmit = async (values: { name: string; prefix?: string; description: string }) => {
    if (!values.prefix) {
      showToast.warning('Prefix is required');
      return;
    }

    console.log(values)

    try {
      await createDocument({
        collectionName: 'groups',
        data: {
          name: values.name,
          prefix: values.prefix.toUpperCase(),
          description: values.description,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      });

      showToast.success('Group created successfully');
      onGroupCreated();
      onClose();
    } catch (error) {
      console.error('Error creating group:', error);
      showToast.error('Failed to create group. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Create New Group</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <GroupForm
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
};

export default CreateGroup;