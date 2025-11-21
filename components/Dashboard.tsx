import React from 'react';
import { CheckCircle2, AlertCircle, Clock, PlayCircle } from 'lucide-react';
import { Task, TaskStatus, Project } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  tasks: Task[];
  projects: Project[];
}

export const Dashboard: React.FC<DashboardProps> = ({ tasks, projects }) => {
  const completedTasks = tasks.filter(t => t.status === TaskStatus.DONE).length;
  const inProgressTasks = tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length;
  const todoTasks = tasks.filter(t => t.status === TaskStatus.TODO).length;
  const overdueTasks = 0; // Mocked for simplicity

  const data = [
    { name: 'Todo', value: todoTasks, color: '#94a3b8' },
    { name: 'In Progress', value: inProgressTasks, color: '#06b6d4' },
    { name: 'Review', value: tasks.filter(t => t.status === TaskStatus.REVIEW).length, color: '#a855f7' },
    { name: 'Done', value: completedTasks, color: '#22c55e' },
  ];

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard</h2>
          <p className="text-gray-400">Project overview and key metrics</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400 bg-gray-900 px-4 py-2 rounded-full border border-gray-800">
          <span>This Week</span>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
              <CheckCircle2 size={20} />
            </div>
            <span className="text-xs text-gray-500">Total Tasks</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{tasks.length}</h3>
          <p className="text-sm text-gray-500">{completedTasks} completed</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-500">
              <PlayCircle size={20} />
            </div>
            <span className="text-xs text-gray-500">Active</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{inProgressTasks}</h3>
          <p className="text-sm text-gray-500">Active work items</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
              <AlertCircle size={20} />
            </div>
            <span className="text-xs text-gray-500">Overdue</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{overdueTasks}</h3>
          <p className="text-sm text-gray-500">Require attention</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
              <Clock size={20} />
            </div>
            <span className="text-xs text-gray-500">Team Velocity</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">92%</h3>
          <p className="text-sm text-gray-500">On track</p>
        </div>
      </div>

      {/* Charts & Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-900 p-6 rounded-xl border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-6">Task Distribution</h3>
          <div style={{ width: '100%', height: '256px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-6">Active Projects</h3>
          <div className="space-y-4 flex-1 overflow-y-auto">
            {projects.map(project => (
              <div key={project.id} className="p-4 bg-gray-800/50 rounded-lg border border-gray-800">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-white">{project.name}</h4>
                  <span className="text-xs px-2 py-1 bg-green-500/10 text-green-400 rounded-full">
                    {project.status}
                  </span>
                </div>
                <div className="w-full bg-gray-700 h-1.5 rounded-full mt-2">
                  <div 
                    className="bg-cyan-500 h-1.5 rounded-full transition-all duration-500" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};