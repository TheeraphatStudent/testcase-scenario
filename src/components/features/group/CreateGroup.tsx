import React, { useState } from 'react';
import { createDocument } from '../../../utils/hooks/useFirebaseDB';

interface CreateGroupProps {
  onClose: () => void;
  onGroupCreated: () => void;
}

const CreateGroup: React.FC<CreateGroupProps> = ({ onClose, onGroupCreated }) => {
  const [name, setName] = useState<string>('');
  const [prefix, setPrefix] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createDocument({
        collectionName: 'groups',
        data: {
          name,
          prefix: prefix.toUpperCase(),
          description,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      });

      onGroupCreated();
      onClose();
    } catch (error) {
      console.error('Error creating group:', error);
      alert('Failed to create group. Please try again.');
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

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Group Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prefix (e.g., ABC)
              </label>
              <input
                type="text"
                required
                value={prefix}
                onChange={(e) => setPrefix(e.target.value.toUpperCase())}
                maxLength={6}
                minLength={1}
                pattern="[A-Za-z]+"
                title="Only letters are allowed"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
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
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;