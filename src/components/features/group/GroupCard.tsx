import React from 'react';
import { GroupDataProps } from '../../../types/Group';

interface GroupCardProps {
  groupData: GroupDataProps;
  onClick: (groupData: GroupDataProps) => void;
}

const GroupCard: React.FC<GroupCardProps> = ({ groupData, onClick }) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-md p-6 cursor-pointer transition-transform duration-200 hover:shadow-xl hover:-translate-y-1"
      onClick={() => onClick(groupData)}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{groupData.name}</h3>
        <span className="text-xs font-semibold bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
          {groupData.prefix}
        </span>
      </div>

      <p className="text-sm text-gray-700 mb-6 line-clamp-3">
        {groupData.description}
      </p>

      <div className="flex justify-end">
        <span className="text-xs text-gray-500">
          {groupData.updatedAt && `Updated: ${new Date(groupData.updatedAt).toLocaleDateString()}`}
        </span>
      </div>
    </div>

  );
};

export default GroupCard;