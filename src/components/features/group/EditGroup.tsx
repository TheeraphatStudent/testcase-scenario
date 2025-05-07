import React from 'react';
import { updateDocument } from '../../../utils/hooks/useFirebaseDB';
import GroupForm from './GroupForm';

interface EditGroupProps {
  onClose: () => void;
  onGroupUpdated: () => void;
  groupId?: string;
  initialValues: {
    name: string;
    description: string;
  };
}

const EditGroup: React.FC<EditGroupProps> = ({
  onClose,
  onGroupUpdated,
  groupId,
  initialValues,
}) => {
  const handleSubmit = async (values: { name: string; description: string }) => {
    try {
      await updateDocument({
        collectionName: 'groups',
        data: {
          id: groupId,
          name: values.name,
          description: values.description,
          updatedAt: new Date().toISOString(),
        },
      });

      onGroupUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating group:', error);
      alert('Failed to update group. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Edit Group</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <GroupForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onCancel={onClose}
          submitButtonText="Update Group"
          isEditMode={true}
        />
      </div>
    </div>
  );
};

export default EditGroup; 