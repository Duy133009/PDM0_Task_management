import React from 'react';
import { Task, User } from '../types';

interface GanttChartProps {
  tasks: Task[];
  users: User[];
}

export const GanttChart: React.FC<GanttChartProps> = ({ tasks, users }) => {
  // Simplified Calendar Grid Generation
  // Assuming a range around Nov 2023 based on mock data
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date('2023-11-15');
    d.setDate(d.getDate() + i);
    return d;
  });

  const getTaskStyle = (task: Task) => {
    const start = new Date(task.startDate);
    const end = new Date(task.dueDate);
    const totalDays = (end.getTime() - start.getTime()) / (1000 * 3600 * 24) + 1;
    
    const timelineStart = days[0];
    const offsetDays = (start.getTime() - timelineStart.getTime()) / (1000 * 3600 * 24);
    
    return {
      left: `${offsetDays * 100}px`,
      width: `${totalDays * 100}px`
    };
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Done': return 'bg-green-500';
      case 'In Progress': return 'bg-cyan-500';
      case 'Review': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-8 h-full flex flex-col overflow-hidden">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-white">Gantt Chart</h2>
        <p className="text-gray-400">Timeline view of project tasks and dependencies</p>
      </header>

      <div className="flex-1 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden flex flex-col">
        {/* Timeline Header */}
        <div className="flex border-b border-gray-800">
          <div className="w-64 p-4 border-r border-gray-800 shrink-0 bg-gray-900 z-10">
            <span className="text-sm font-semibold text-gray-400">Task Name</span>
          </div>
          <div className="flex overflow-hidden">
             {days.map(day => (
               <div key={day.toISOString()} className="w-[100px] shrink-0 border-r border-gray-800 p-2 text-center">
                 <div className="text-xs text-gray-500">{day.toLocaleDateString('en-US', { month: 'short' })}</div>
                 <div className="text-sm font-medium text-gray-300">{day.getDate()}</div>
               </div>
             ))}
          </div>
        </div>

        {/* Timeline Body */}
        <div className="flex-1 overflow-auto relative">
          {tasks.map(task => {
             const assignee = users.find(u => u.id === task.assigneeId);
             const style = getTaskStyle(task);

             return (
               <div key={task.id} className="flex border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors group">
                 {/* Task Info Sidebar */}
                 <div className="w-64 p-3 border-r border-gray-800 shrink-0 flex flex-col justify-center z-10 bg-gray-900/50 backdrop-blur-sm">
                   <div className="font-medium text-sm text-gray-200 truncate">{task.title}</div>
                   <div className="flex items-center gap-2 mt-1">
                     {assignee && (
                       <img src={assignee.avatar} className="w-4 h-4 rounded-full" alt="" />
                     )}
                     <span className="text-xs text-gray-500">{assignee?.name}</span>
                   </div>
                 </div>
                 
                 {/* Timeline Bar Area */}
                 <div className="relative flex-1 h-16">
                   {/* Grid Lines */}
                   <div className="absolute inset-0 flex h-full">
                      {days.map((_, i) => (
                        <div key={i} className="w-[100px] shrink-0 border-r border-gray-800/30 h-full"></div>
                      ))}
                   </div>

                   {/* The Bar */}
                   <div 
                      className={`absolute top-4 h-8 rounded-md ${getStatusColor(task.status)} opacity-80 hover:opacity-100 cursor-pointer flex items-center px-3 shadow-lg transition-all`}
                      style={style}
                   >
                      <span className="text-xs font-bold text-white drop-shadow-md truncate">{task.progress || 0}%</span>
                   </div>

                   {/* Dependency Line Mockup (Static for demo visual) */}
                   {task.dependencies && task.dependencies.length > 0 && (
                     <div className="absolute top-8 -left-4 w-4 h-[1px] bg-gray-600 z-0"></div>
                   )}
                 </div>
               </div>
             );
          })}
          
          {/* Current Time Indicator */}
          <div className="absolute top-0 bottom-0 left-[650px] w-[1px] bg-red-500 z-20 pointer-events-none">
            <div className="w-2 h-2 bg-red-500 rounded-full -ml-[3px] -mt-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};