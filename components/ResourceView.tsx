import React from 'react';
import { User, Task, TaskStatus } from '../types';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface ResourceViewProps {
  users: User[];
  tasks: Task[];
}

export const ResourceView: React.FC<ResourceViewProps> = ({ users, tasks }) => {
  // Filter active tasks only for capacity calculation
  const activeTasks = tasks.filter(t => 
    t.status === TaskStatus.TODO || 
    t.status === TaskStatus.IN_PROGRESS ||
    t.status === TaskStatus.REVIEW
  );

  // Helper to calculate user load
  const getUserLoad = (userId: string) => {
    // In a real app, we would calculate this based on date ranges. 
    // Here we sum total active assigned hours to simulate "Current Sprint Load".
    const userTasks = activeTasks.filter(t => t.assigneeId === userId);
    const totalHours = userTasks.reduce((acc, t) => acc + t.estimatedTime, 0);
    
    // Assuming a 1-week sprint (5 days) for the "capacity" visual comparison
    const sprintCapacity = users.find(u => u.id === userId)?.dailyCapacityHours! * 5;
    const percentage = Math.round((totalHours / sprintCapacity) * 100);
    
    return { totalHours, sprintCapacity, percentage, taskCount: userTasks.length };
  };

  const overallStats = {
    teamSize: users.length,
    overallocated: users.filter(u => getUserLoad(u.id).percentage > 100).length,
    atCapacity: users.filter(u => {
      const p = getUserLoad(u.id).percentage;
      return p >= 80 && p <= 100;
    }).length,
  };

  return (
    <div className="p-8 space-y-8">
      <header>
        <h2 className="text-2xl font-bold text-white">Resource Management</h2>
        <p className="text-gray-400">Monitor team capacity and workload distribution</p>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
          <span className="text-gray-500 text-xs uppercase font-bold">Team Size</span>
          <div className="text-2xl font-bold text-white mt-1">{overallStats.teamSize}</div>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
          <span className="text-red-500 text-xs uppercase font-bold">Overallocated</span>
          <div className="text-2xl font-bold text-white mt-1">{overallStats.overallocated}</div>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
          <span className="text-yellow-500 text-xs uppercase font-bold">At Capacity</span>
          <div className="text-2xl font-bold text-white mt-1">{overallStats.atCapacity}</div>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
          <span className="text-gray-500 text-xs uppercase font-bold">Avg Capacity</span>
          <div className="text-2xl font-bold text-white mt-1">
             {Math.round(users.reduce((acc, u) => acc + getUserLoad(u.id).percentage, 0) / users.length)}%
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {users.map(user => {
          const { percentage, totalHours, sprintCapacity, taskCount } = getUserLoad(user.id);
          const isOverloaded = percentage > 100;
          const isAtRisk = percentage >= 80 && percentage <= 100;
          
          let statusColor = 'text-green-400 bg-green-500/10 border-green-500/20';
          let ringColor = 'stroke-green-500';
          let statusText = 'Available';

          if (isOverloaded) {
            statusColor = 'text-red-400 bg-red-500/10 border-red-500/20';
            ringColor = 'stroke-red-500';
            statusText = 'Overallocated';
          } else if (isAtRisk) {
            statusColor = 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
            ringColor = 'stroke-yellow-500';
            statusText = 'At Capacity';
          }

          return (
            <div key={user.id} className="bg-gray-900 rounded-xl border border-gray-800 p-6 flex flex-col shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full border-2 border-gray-800" />
                  <div>
                    <h3 className="font-bold text-white text-sm">{user.name}</h3>
                    <p className="text-xs text-gray-500">{user.role}</p>
                    <span className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-medium border ${statusColor}`}>
                      {statusText}
                    </span>
                  </div>
                </div>

                {/* Radial Progress using SVG */}
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-800" />
                    <circle 
                      cx="32" cy="32" r="28" 
                      stroke="currentColor" strokeWidth="4" fill="transparent" 
                      strokeDasharray={175.9} 
                      strokeDashoffset={175.9 - (175.9 * Math.min(percentage, 100)) / 100}
                      className={`${ringColor} transition-all duration-1000 ease-out`}
                    />
                  </svg>
                  <span className="absolute text-xs font-bold text-white">{percentage}%</span>
                </div>
              </div>

              <div className="space-y-3 mb-6 flex-1">
                <div className="flex justify-between text-xs text-gray-400 border-b border-gray-800 pb-2">
                    <span>Assigned Tasks ({taskCount})</span>
                    <span>Hours</span>
                </div>
                {activeTasks.filter(t => t.assigneeId === user.id).slice(0, 3).map(task => (
                  <div key={task.id} className="flex justify-between items-center">
                    <span className="text-sm text-gray-300 truncate max-w-[200px]">{task.title}</span>
                    <span className="text-xs text-gray-500">{task.estimatedTime}h</span>
                  </div>
                ))}
                {taskCount > 3 && <div className="text-xs text-gray-500 italic">+ {taskCount - 3} more tasks</div>}
              </div>

              <div className="mt-auto">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Capacity Usage</span>
                  <span>{totalHours} / {sprintCapacity} h</span>
                </div>
                <button className="w-full py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 text-xs transition-colors">
                  Reassign Tasks
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};