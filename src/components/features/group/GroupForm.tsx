import React from 'react';
import { useThemeColors } from '../../../context/ThemeContext';

interface GroupFormProps {
  initialValues?: {
    name: string;
    prefix: string;
    description: string;
  };
  onSubmit: (values: { name: string; prefix: string; description: string }) => void;
  onCancel: () => void;
  submitButtonText?: string;
}

const GroupForm: React.FC<GroupFormProps> = ({
  initialValues = { name: '', prefix: '', description: '' },
  onSubmit,
  onCancel,
  submitButtonText = 'Create Group'
}) => {
  const colors = useThemeColors();
  const [name, setName] = React.useState(initialValues.name);
  const [prefix, setPrefix] = React.useState(initialValues.prefix);
  const [description, setDescription] = React.useState(initialValues.description);

  const labelClass = colors.form.label;
  const placeholderClass = 'placeholder-gray-400'; // Use a consistent placeholder color

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, prefix, description });
  };

  return (
    <form onSubmit={handleSubmit} className={`p-6 ${colors.card}`}>
      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-medium ${labelClass} mb-1`}>
            Group Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-3 py-2 border ${colors.form.border} rounded-md focus:outline-none focus:ring-2 ${colors.form.focus} ${colors.form.input} ${colors.form.inputText} ${placeholderClass}`}
            placeholder="Enter name"
          />
          <label className={`block text-xs font-light my-1 ${labelClass}`}>
            {!name && 'Enter name'}
          </label>
        </div>

        <div>
          <label className={`block text-sm font-medium ${labelClass} mb-1`}>
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
            className={`w-full px-3 py-2 border ${colors.form.border} rounded-md focus:outline-none focus:ring-2 ${colors.form.focus} uppercase ${colors.form.input} ${colors.form.inputText} ${placeholderClass}`}
            placeholder="Enter prefix"
          />
          <label className={`block text-xs font-light my-1 ${labelClass}`}>
            {prefix ? `${prefix}-XXXXXX` : 'Enter prefix'}
          </label>
        </div>

        <div>
          <label className={`block text-sm font-medium ${labelClass} mb-1`}>
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className={`w-full px-3 py-2 border ${colors.form.border} rounded-md focus:outline-none focus:ring-2 ${colors.form.focus} ${colors.form.input} ${colors.form.inputText} ${placeholderClass}`}
            placeholder="Enter description"
          />
          <label className={`block text-xs font-light my-1 ${labelClass}`}>
            {!description && 'Enter description'}
          </label>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className={`px-4 py-2 ${colors.button.secondary} rounded-md transition-colors`}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`px-4 py-2 ${colors.button.primary} rounded-md transition-colors`}
        >
          {submitButtonText}
        </button>
      </div>
    </form>
  );
};

export default GroupForm; 