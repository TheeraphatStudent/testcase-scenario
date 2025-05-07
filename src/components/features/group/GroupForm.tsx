import React from 'react';

interface GroupFormProps {
  initialValues?: {
    name: string;
    prefix: string;
    description: string;
  };
  onSubmit: (values: { name: string; prefix: string; description: string }) => void;
  onCancel: () => void;
  submitButtonText?: string;
  isEditMode?: boolean;
}

const GroupForm: React.FC<GroupFormProps> = ({
  initialValues = { name: '', prefix: '', description: '' },
  onSubmit,
  onCancel,
  submitButtonText = 'Create Group',
  isEditMode = false,
}) => {
  const [name, setName] = React.useState(initialValues.name);
  const [prefix, setPrefix] = React.useState(initialValues.prefix);
  const [description, setDescription] = React.useState(initialValues.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, prefix, description });
  };

  return (
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
          <label className="block text-xs font-light my-1">
            {!name && 'Enter name'}
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prefix
          </label>
          <input
            type="text"
            required
            value={prefix}
            onChange={(e) => setPrefix(e.target.value.toUpperCase())}
            maxLength={6}
            minLength={1}
            pattern="[A-Za-z0-9]+"
            title="Only letters and numbers are allowed"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
          />
          <label className="block text-xs font-light my-1">
            {prefix ? `${prefix}-XXXXXX` : 'Enter prefix'}
          </label>
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
          <label className="block text-xs font-light my-1">
            {!description && 'Enter description'}
          </label>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {submitButtonText}
        </button>
      </div>
    </form>
  );
};

export default GroupForm; 