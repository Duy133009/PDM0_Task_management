import React from 'react';
import { Task, TaskStatus, Priority, User } from '../types';
import { Plus, MoreHorizontal, Calendar } from 'lucide-react';

interface KanbanBoardProps {
  tasks: Task[];
  users: User[];
  onAddTask: (task: Omit<Task, 'id'>) => void;
  onOpenCreateTask: (status?: TaskStatus) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, users, onOpenCreateTask }) => {
  const columns = [
    { id: TaskStatus.TODO, title: 'To Do', color: 'border-gray-500' },
    { id: TaskStatus.IN_PROGRESS, title: 'In Progress', color: 'border-cyan-500' },
    { id: TaskStatus.REVIEW, title: 'In Review', color: 'border-purple-500' },
    { id: TaskStatus.DONE, title: 'Done', color: 'border-green-500' },
  ];

  const getPriorityColor = (p: Priority) => {
    switch (p) {
      case Priority.HIGH: return 'bg-red-500/10 text-red-400 border-red-500/20';
      case Priority.MEDIUM: return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case Priority.LOW: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-400';
    }
  };

  const getUser = (id: string) => users.find(u => u.id === id);

  return (
    <div className="p-8 h-full flex flex-col relative">
      <header className="flex justify-between items-center mb-8 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-white">Kanban Board</h2>
            <span className="px-2 py-0.5 bg-gray-800 text-xs rounded-full text-gray-400">InsightPM</span>
          </div>
          <p className="text-gray-400">{tasks.length} tasks across all stages</p>
        </div>
        <button 
          onClick={() => onOpenCreateTask(TaskStatus.TODO)}
          className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={18} />
          Add Task
        </button>
      </header>

      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-6 h-full min-w-[1000px]">
          {columns.map(col => {
            const colTasks = tasks.filter(t => t.status === col.id);
            return (
              <div key={col.id} className="flex-1 flex flex-col min-w-[300px]">
                <div className={`flex items-center justify-between mb-4 border-t-2 ${col.color} pt-4`}>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-200">{col.title}</h3>
                    <span className="bg-gray-800 text-gray-400 text-xs px-2 py-0.5 rounded-full">
                      {colTasks.length}
                    </span>
                  </div>
                  <button className="text-gray-500 hover:text-gray-300">
                    <MoreHorizontal size={16} />
                  </button>
                </div>

                <div className="flex-1 space-y-3 overflow-y-auto pr-2 pb-4">
                  {colTasks.map(task => {
                    const assignee = getUser(task.assigneeId);
                    return (
                      <div key={task.id} className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-all group cursor-pointer shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-xs px-2 py-0.5 rounded border ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          <button className="text-gray-600 hover:text-gray-400 opacity-0 group-hover:opacity-100">
                            <MoreHorizontal size={16} />
                          </button>
                        </div>
                        
                        <h4 className="text-white font-medium mb-3 text-sm leading-snug">{task.title}</h4>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {task.tags.map(tag => (
                            <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-gray-800 text-gray-400 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-800">
                          {assignee && (
                            <div className="flex items-center gap-2" title={assignee.name}>
                              <img src={assignee.avatar} alt={assignee.name} className="w-6 h-6 rounded-full border border-gray-700" />
                              <span className="text-xs text-gray-500 hidden sm:inline">{assignee.name.split(' ')[0]}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar size={12} />
                            {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  <button 
                    onClick={() => onOpenCreateTask(col.id)}
                    className="w-full py-2 rounded-lg border border-dashed border-gray-800 text-gray-500 hover:border-gray-700 hover:text-gray-400 hover:bg-gray-900/50 text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <Plus size={16} />
                    Add card
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};