import React from 'react';
import { LayoutDashboard, KanbanSquare, GanttChartSquare, Users, BarChart3, Clock, Settings } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'kanban', label: 'Kanban Board', icon: KanbanSquare },
    { id: 'gantt', label: 'Gantt Chart', icon: GanttChartSquare },
    { id: 'resources', label: 'Resource Mgmt', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'time', label: 'Time Logging', icon: Clock },
  ];

  return (
    <div className="w-64 h-screen bg-gray-950 border-r border-gray-800 flex flex-col text-gray-300">
      <div className="p-6 flex items-center gap-3 border-b border-gray-800">
        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">I</div>
        <h1 className="text-lg font-bold text-white">InsightPM</h1>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 mt-2 px-2">
          Main Menu
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-gray-800 text-primary-500' 
                  : 'text-gray-400 hover:bg-gray-900 hover:text-gray-200'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={() => setCurrentView('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
             currentView === 'settings' ? 'bg-gray-800 text-primary-500' : 'text-gray-400 hover:bg-gray-900'
          }`}
        >
          <Settings size={18} />
          Settings
        </button>
      </div>
    </div>
  );
};