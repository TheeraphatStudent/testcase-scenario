import React from 'react';
import { Search as SearchIcon } from 'lucide-react';

interface SearchProps {
  type: 'testCase' | 'group';
  value: string;
  onChange: (type: 'testCase' | 'group', value: string) => void;
  placeholder?: string;
}

const Search: React.FC<SearchProps> = ({ type, value, onChange, placeholder }) => {
  return (
    <div className="relative flex-grow md:max-w-[300px]">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      <input
        type="text"
        placeholder={placeholder || `Search ${type === 'testCase' ? 'test cases' : 'groups'}...`}
        value={value}
        onChange={(e) => onChange(type, e.target.value)}
        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Search; 