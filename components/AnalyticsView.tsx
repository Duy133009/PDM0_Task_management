import React from 'react';
import { Task, TimeEntry } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface AnalyticsViewProps {
  tasks: Task[];
  timeEntries: TimeEntry[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ tasks, timeEntries }) => {
  // Prepare data for Estimated vs Actual
  // In a real app, this would use SQL Views aggregated by Supabase
  const data = [
    { name: 'Week 1', estimated: 120, actual: 135 },
    { name: 'Week 2', estimated: 140, actual: 145 },
    { name: 'Week 3', estimated: 130, actual: 125 }, // Better
    { name: 'Week 4', estimated: 150, actual: 155 },
  ];

  // Calculate Variance for Table
  const taskVariance = tasks.map(task => {
    const actualHours = timeEntries
        .filter(te => te.taskId === task.id)
        .reduce((sum, entry) => sum + entry.hours, 0);
    
    const variance = actualHours - task.estimatedTime;
    const variancePct = task.estimatedTime > 0 ? (variance / task.estimatedTime) * 100 : 0;
    
    return { ...task, actualHours, variance, variancePct };
  }).filter(t => t.actualHours > 0); // Only show tasks with logged time

  return (
    <div className="p-8 space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-white">Analytics & Reports</h2>
        <p className="text-gray-400">Data-driven insights for better project decisions</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Avg Variance</p>
            <h3 className="text-2xl font-bold text-red-400">+8.2%</h3>
            <p className="text-xs text-gray-500 mt-1">Tasks taking longer than estimated</p>
          </div>
          <div className="bg-red-500/10 p-3 rounded-full">
            <ArrowUpRight className="text-red-500" />
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">On-Track Tasks</p>
            <h3 className="text-2xl font-bold text-green-400">65%</h3>
            <p className="text-xs text-gray-500 mt-1">Meeting or beating estimates</p>
          </div>
          <div className="bg-green-500/10 p-3 rounded-full">
             <ArrowDownRight className="text-green-500" />
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Total Hours Logged</p>
            <h3 className="text-2xl font-bold text-cyan-400">{timeEntries.reduce((a, b) => a + b.hours, 0)}h</h3>
            <p className="text-xs text-gray-500 mt-1">Across all projects</p>
          </div>
           {/* Placeholder icon */}
           <div className="bg-cyan-500/10 p-3 rounded-full text-cyan-500 font-bold">H</div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-6">Estimated vs Actual Effort Trend</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#f3f4f6' }}
              />
              <Legend />
              <Line type="monotone" dataKey="actual" stroke="#f87171" strokeWidth={2} name="Actual Hours" dot={{r: 4}} activeDot={{r: 6}} />
              <Line type="monotone" dataKey="estimated" stroke="#06b6d4" strokeWidth={2} name="Estimated Hours" dot={{r: 4}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Variance Table */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h3 className="text-lg font-semibold text-white">Task Variance Analysis</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-950 text-gray-400">
              <tr>
                <th className="p-4 font-medium">Task</th>
                <th className="p-4 font-medium text-right">Estimated</th>
                <th className="p-4 font-medium text-right">Actual</th>
                <th className="p-4 font-medium text-right">Variance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {taskVariance.map(t => (
                <tr key={t.id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="p-4 text-gray-200 font-medium">{t.title}</td>
                  <td className="p-4 text-right text-gray-400">{t.estimatedTime}h</td>
                  <td className="p-4 text-right text-gray-200">{t.actualHours}h</td>
                  <td className={`p-4 text-right font-bold ${t.variance > 0 ? 'text-red-400' : 'text-green-400'}`}>
                    {t.variance > 0 ? '+' : ''}{t.variancePct.toFixed(1)}%
                  </td>
                </tr>
              ))}
              {taskVariance.length === 0 && (
                 <tr>
                   <td colSpan={4} className="p-8 text-center text-gray-500">No time entries logged yet to calculate variance.</td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};