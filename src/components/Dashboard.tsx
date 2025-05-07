import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { TestStats } from '../types/TestCase';
import { CheckCircle, XCircle, Clock, Play } from 'lucide-react';

interface DashboardProps {
  stats: TestStats;
  onExportAll: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, onExportAll }) => {
  const chartData = [
    { name: 'Pass', value: stats.pass, color: '#10B981' },
    { name: 'Fail', value: stats.fail, color: '#EF4444' },
    { name: 'Pending', value: stats.pending, color: '#F59E0B' },
    { name: 'In Progress', value: stats.inProgress, color: '#3B82F6' }
  ];

  const statusItems = [
    { label: 'Pass', value: stats.pass, icon: CheckCircle, color: 'text-green-500', bgColor: 'bg-green-100' },
    { label: 'Fail', value: stats.fail, icon: XCircle, color: 'text-red-500', bgColor: 'bg-red-100' },
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-yellow-500', bgColor: 'bg-yellow-100' },
    { label: 'In Progress', value: stats.inProgress, icon: Play, color: 'text-blue-500', bgColor: 'bg-blue-100' }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow-md rounded border border-gray-200">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
          <p className="text-sm text-gray-500">{`${((payload[0].value / stats.total) * 100).toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Test Results Summary</h2>
        <button
          onClick={onExportAll}
          className="mt-2 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Export 
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="grid grid-cols-1 gap-4">
            {statusItems.map(item => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.label} 
                  className={`rounded-lg p-4 ${item.bgColor} flex items-center justify-between`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={item.color} size={24} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="text-2xl font-bold">{item.value}</div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total</span>
              <span className="text-2xl font-bold">{stats.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;