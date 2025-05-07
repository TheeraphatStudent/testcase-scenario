import React from 'react';
import { GroupDataProps } from '../../../types/Group';
import { useThemeColors } from '../../../context/ThemeContext';

interface GroupCardProps {
  groupData: GroupDataProps;
  onClick: (groupData: GroupDataProps) => void;
}

const GroupCard: React.FC<GroupCardProps> = ({ groupData, onClick }) => {
  const colors = useThemeColors();

  return (
    <div
      className={`${colors.card} rounded-2xl shadow-md p-6 cursor-pointer transition-transform duration-200 hover:shadow-xl hover:-translate-y-1`}
      onClick={() => onClick(groupData)}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className={`${colors.cardText} text-xl font-bold line-clamp-1`}>{groupData.name}</h3>
        <span className={`${colors.cardText} text-xs font-semibold bg-gray-200 text-gray-800 px-3 py-1 rounded-full`}>
          {groupData.prefix}
        </span>
      </div>

      <p className={`${colors.cardText} text-sm mb-6 line-clamp-3`}>
        {groupData.description}
      </p>

      <div className="flex justify-end">
        <span className={`${colors.cardText} text-xs text-gray-500`}>
          {groupData.updatedAt && `Updated: ${new Date(groupData.updatedAt).toLocaleDateString()}`}
        </span>
      </div>
    </div>

  );
};

export default GroupCard;