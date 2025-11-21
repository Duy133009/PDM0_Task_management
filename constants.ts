import { Task, User, TaskStatus, Priority, Project, TimeEntry } from './types';

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Alex Chen', role: 'Product Manager', avatar: 'https://picsum.photos/id/1005/40/40', dailyCapacityHours: 8 },
  { id: 'u2', name: 'Sam Taylor', role: 'Frontend Dev', avatar: 'https://picsum.photos/id/1012/40/40', dailyCapacityHours: 8 },
  { id: 'u3', name: 'Morgan Kim', role: 'Backend Dev', avatar: 'https://picsum.photos/id/1025/40/40', dailyCapacityHours: 8 },
  { id: 'u4', name: 'Jordan Lee', role: 'Designer', avatar: 'https://picsum.photos/id/1027/40/40', dailyCapacityHours: 6 },
];

export const MOCK_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Design System Architecture Review',
    status: TaskStatus.TODO,
    priority: Priority.HIGH,
    assigneeId: 'u4',
    startDate: '2023-11-20',
    dueDate: '2023-11-22',
    estimatedTime: 8,
    tags: ['design', 'architecture'],
  },
  {
    id: 't2',
    title: 'Implement User Auth Flow',
    status: TaskStatus.IN_PROGRESS,
    priority: Priority.HIGH,
    assigneeId: 'u3',
    startDate: '2023-11-21',
    dueDate: '2023-11-24',
    estimatedTime: 16,
    tags: ['backend', 'security'],
    dependencies: ['t1']
  },
  {
    id: 't3',
    title: 'Dashboard UI Components',
    status: TaskStatus.IN_PROGRESS,
    priority: Priority.MEDIUM,
    assigneeId: 'u2',
    startDate: '2023-11-22',
    dueDate: '2023-11-25',
    estimatedTime: 12,
    tags: ['frontend', 'ui'],
  },
  {
    id: 't4',
    title: 'Setup CI/CD Pipeline',
    status: TaskStatus.DONE,
    priority: Priority.MEDIUM,
    assigneeId: 'u3',
    startDate: '2023-11-15',
    dueDate: '2023-11-18',
    estimatedTime: 6,
    tags: ['devops'],
  },
  {
    id: 't5',
    title: 'User Research Interviews',
    status: TaskStatus.TODO,
    priority: Priority.LOW,
    assigneeId: 'u1',
    startDate: '2023-11-25',
    dueDate: '2023-11-28',
    estimatedTime: 10,
    tags: ['product'],
  },
   {
    id: 't6',
    title: 'API Documentation',
    status: TaskStatus.REVIEW,
    priority: Priority.MEDIUM,
    assigneeId: 'u3',
    startDate: '2023-11-23',
    dueDate: '2023-11-24',
    estimatedTime: 4,
    tags: ['docs'],
  }
];

export const MOCK_PROJECTS: Project[] = [
  { id: 'p1', name: 'InsightPM Platform', description: 'Core project management platform', status: 'Active', progress: 68 },
  { id: 'p2', name: 'Mobile App Dev', description: 'iOS and Android native apps', status: 'Active', progress: 34 },
];

export const MOCK_TIME_ENTRIES: TimeEntry[] = [
  { id: 'te1', taskId: 't4', userId: 'u3', hours: 7, date: '2023-11-16' }, // Over estimate
  { id: 'te2', taskId: 't2', userId: 'u3', hours: 5, date: '2023-11-21' },
  { id: 'te3', taskId: 't3', userId: 'u2', hours: 4, date: '2023-11-22' },
];
