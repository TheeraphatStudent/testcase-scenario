import React from 'react';
import { updateDocument } from '../../../utils/hooks/useFirebaseDB';
import GroupForm from './GroupForm';
import { showToast } from '../../../utils/toast';
import { useThemeColors } from '../../../context/ThemeContext';

interface EditGroupProps {
  onClose: () => void;
  onGroupUpdated: () => void;
  groupId?: string;
  initialValues: {
    name: string;
    description: string;
    prefix: string;
  };
}

const EditGroup: React.FC<EditGroupProps> = ({
  onClose,
  onGroupUpdated,
  groupId,
  initialValues,
}) => {
  const colors = useThemeColors();

  const handleSubmit = async (values: { name: string; description: string; prefix: string }) => {
    try {
      await updateDocument({
        collectionName: 'groups',
        data: {
          id: groupId,
          name: values.name,
          description: values.description,
          prefix: values.prefix,
          updatedAt: new Date().toISOString(),
        },
      });

      showToast.success('Group updated successfully');
      onGroupUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating group:', error);
      showToast.error('Failed to update group. Please try again.');
    }
  };

  return (
    <div className={`fixed inset-0 ${colors.form.input} bg-opacity-50 flex items-center justify-center z-50 p-4`}>
      <div className={`${colors.card} rounded-lg shadow-xl max-w-md w-full`}>
        <div className={`p-4 border-b flex justify-between items-center ${colors.card}`}>
          <h2 className={`text-xl font-bold ${colors.cardText}`}>Edit Group</h2>
          <button
            onClick={onClose}
            className={`${colors.text} hover:opacity-70`}
          >
            ✕
          </button>
        </div>

        <GroupForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onCancel={onClose}
          submitButtonText="Update Group"
        />
      </div>
    </div>
  );
};

export default EditGroup; 