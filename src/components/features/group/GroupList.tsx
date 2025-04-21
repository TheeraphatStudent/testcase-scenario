import React from 'react';
import GroupCard from './GroupCard';
import { GroupDataProps } from '../../../types/Group';

// {
//   name,
//   prefix: prefix.toUpperCase(),
//   description,
//   createdAt: new Date().toISOString(),
//   updatedAt: new Date().toISOString()
// }

interface GroupListProps {
  groupData: GroupDataProps[];

}



const GroupList: React.FC<GroupListProps> = ({
  groupData,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {groupData.length === 0 ? (
        <div className="col-span-full p-8 text-center text-gray-500">
          No group data match the current filter.
        </div>
      ) : (
        groupData.map((item: GroupDataProps, index: number) => {
          if (item !== null || item !== undefined) {
            return (
              <GroupCard
                groupData={item}
                onClick={() => { }}
                key={`group-card-${index}`}
              />
            )

          }
        })
      )}
    </div>
  );
};

export default GroupList;