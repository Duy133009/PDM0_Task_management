import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { KanbanBoard } from './components/KanbanBoard';
import { GanttChart } from './components/GanttChart';
import { ResourceView } from './components/ResourceView';
import { AnalyticsView } from './components/AnalyticsView';
import { TimeLogView } from './components/TimeLogView';
import { CreateTaskModal } from './components/CreateTaskModal';
import { MOCK_TASKS, MOCK_USERS, MOCK_PROJECTS, MOCK_TIME_ENTRIES } from './constants';
import { TimeEntry, Task, TaskStatus } from './types';
import { Plus } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [timeEntries, setTimeEntries] = useState(MOCK_TIME_ENTRIES);
  
  // Global Modal State
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskModalStatus, setTaskModalStatus] = useState<TaskStatus>(TaskStatus.TODO);

  const handleAddTimeEntry = (entry: Omit<TimeEntry, 'id'>) => {
    const newEntry: TimeEntry = {
      ...entry,
      id: Math.random().toString(36).substr(2, 9)
    };
    setTimeEntries([...timeEntries, newEntry]);
  };

  const handleAddTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTasks([...tasks, newTask]);
  };

  const openCreateTaskModal = (status: TaskStatus = TaskStatus.TODO) => {
    setTaskModalStatus(status);
    setIsTaskModalOpen(true);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard tasks={tasks} projects={MOCK_PROJECTS} />;
      case 'kanban':
        return <KanbanBoard tasks={tasks} users={MOCK_USERS} onAddTask={handleAddTask} onOpenCreateTask={openCreateTaskModal} />;
      case 'gantt':
        return <GanttChart tasks={tasks} users={MOCK_USERS} />;
      case 'resources':
        return <ResourceView tasks={tasks} users={MOCK_USERS} />;
      case 'analytics':
        return <AnalyticsView tasks={tasks} timeEntries={timeEntries} />;
      case 'time':
        return <TimeLogView tasks={tasks} timeEntries={timeEntries} addTimeEntry={handleAddTimeEntry} />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">Settings</h2>
              <p>Settings panel is under construction.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden font-sans">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 overflow-auto bg-gray-950 relative flex flex-col">
        {/* Top bar */}
        <div className="h-16 border-b border-gray-800 flex items-center justify-between px-8 bg-gray-950 sticky top-0 z-40 shrink-0">
          <div className="flex items-center gap-4">
             <div className="text-sm text-gray-400 hidden md:block">
                <span className="text-gray-600">Workspace / </span>
                <span className="text-white font-medium">InsightPM Platform</span>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-64 relative hidden md:block">
               <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full bg-gray-900 border border-gray-700 rounded-full py-1.5 px-4 text-sm text-gray-300 focus:border-primary-600 focus:outline-none transition-colors"
               />
             </div>
             
             {/* Global Add Task Button */}
             <button 
                onClick={() => openCreateTaskModal()}
                className="flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
             >
               <Plus size={16} />
               <span className="hidden sm:inline">New Task</span>
             </button>

             <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:bg-gray-700">
               AC
             </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          {renderView()}
        </div>
      </main>

      <CreateTaskModal 
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleAddTask}
        users={MOCK_USERS}
        initialStatus={taskModalStatus}
      />
    </div>
  );
};

export default App;