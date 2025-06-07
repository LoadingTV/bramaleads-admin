// src/app/team/page.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import { 
  UserGroupIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PencilIcon,
  EyeIcon,
  CalendarIcon,
  ChartBarIcon,
  CogIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position: string;
  department: string;
  role: 'admin' | 'manager' | 'employee' | 'intern';
  status: 'active' | 'away' | 'offline';
  avatar?: string;
  joinDate: string;
  lastActivity: string;
  location: string;
  skills: string[];
  projectsCount: number;
  leadsAssigned: number;
  tasksCompleted: number;
  performance: number; // 0-100
  salary?: number;
  isOnline: boolean;
}

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Davis',
    email: 'sarah.davis@company.com',
    phone: '+1 555-0123',
    position: 'Senior Product Manager',
    department: 'Product',
    role: 'manager',
    status: 'active',
    joinDate: '2023-01-15',
    lastActivity: '2024-06-07T10:30:00Z',
    location: 'New York, USA',
    skills: ['Project Management', 'UI/UX', 'Analytics'],
    projectsCount: 8,
    leadsAssigned: 24,
    tasksCompleted: 156,
    performance: 95,
    isOnline: true
  },
  {
    id: '2',
    firstName: 'Mike',
    lastName: 'Chen',
    email: 'mike.chen@company.com',
    phone: '+1 555-0456',
    position: 'Full Stack Developer',
    department: 'Engineering',
    role: 'employee',
    status: 'active',
    joinDate: '2023-03-20',
    lastActivity: '2024-06-07T09:45:00Z',
    location: 'San Francisco, USA',
    skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    projectsCount: 12,
    leadsAssigned: 8,
    tasksCompleted: 203,
    performance: 88,
    isOnline: true
  },
  {
    id: '3',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@company.com',
    phone: '+1 555-0789',
    position: 'Marketing Director',
    department: 'Marketing',
    role: 'manager',
    status: 'away',
    joinDate: '2022-08-10',
    lastActivity: '2024-06-07T08:20:00Z',
    location: 'Austin, USA',
    skills: ['Digital Marketing', 'SEO', 'Content Strategy'],
    projectsCount: 6,
    leadsAssigned: 45,
    tasksCompleted: 134,
    performance: 92,
    isOnline: false
  },
  {
    id: '4',
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@company.com',
    phone: '+1 555-0321',
    position: 'CEO',
    department: 'Executive',
    role: 'admin',
    status: 'active',
    joinDate: '2021-01-01',
    lastActivity: '2024-06-07T11:15:00Z',
    location: 'Seattle, USA',
    skills: ['Leadership', 'Strategy', 'Business Development'],
    projectsCount: 15,
    leadsAssigned: 12,
    tasksCompleted: 89,
    performance: 98,
    isOnline: true
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Kim',
    email: 'david.kim@company.com',
    phone: '+1 555-0654',
    position: 'UX Designer',
    department: 'Design',
    role: 'employee',
    status: 'offline',
    joinDate: '2023-05-15',
    lastActivity: '2024-06-06T17:30:00Z',
    location: 'Los Angeles, USA',
    skills: ['Figma', 'User Research', 'Prototyping'],
    projectsCount: 7,
    leadsAssigned: 3,
    tasksCompleted: 98,
    performance: 85,
    isOnline: false
  },
  {
    id: '6',
    firstName: 'Lisa',
    lastName: 'Zhang',
    email: 'lisa.zhang@company.com',
    phone: '+1 555-0987',
    position: 'Sales Manager',
    department: 'Sales',
    role: 'manager',
    status: 'active',
    joinDate: '2022-11-08',
    lastActivity: '2024-06-07T10:00:00Z',
    location: 'Chicago, USA',
    skills: ['Sales Strategy', 'CRM', 'Lead Generation'],
    projectsCount: 4,
    leadsAssigned: 67,
    tasksCompleted: 187,
    performance: 94,
    isOnline: true
  },
  {
    id: '7',
    firstName: 'Robert',
    lastName: 'Wilson',
    email: 'robert.wilson@company.com',
    phone: '+1 555-0246',
    position: 'DevOps Engineer',
    department: 'Engineering',
    role: 'employee',
    status: 'active',
    joinDate: '2023-07-22',
    lastActivity: '2024-06-07T09:30:00Z',
    location: 'Denver, USA',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    projectsCount: 9,
    leadsAssigned: 2,
    tasksCompleted: 145,
    performance: 90,
    isOnline: true
  },
  {
    id: '8',
    firstName: 'Jennifer',
    lastName: 'Brown',
    email: 'jennifer.brown@company.com',
    position: 'Junior Developer',
    department: 'Engineering',
    role: 'intern',
    status: 'active',
    joinDate: '2024-02-01',
    lastActivity: '2024-06-07T09:15:00Z',
    location: 'Boston, USA',
    skills: ['JavaScript', 'React', 'HTML/CSS'],
    projectsCount: 3,
    leadsAssigned: 1,
    tasksCompleted: 42,
    performance: 78,
    isOnline: true
  }
];

const ROLE_CONFIG = {
  admin: { label: 'Admin', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' },
  manager: { label: 'Manager', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' },
  employee: { label: 'Employee', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
  intern: { label: 'Intern', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
};

const STATUS_CONFIG = {
  active: { label: 'Active', color: '#10B981', icon: CheckCircleIcon },
  away: { label: 'Away', color: '#F59E0B', icon: ClockIcon },
  offline: { label: 'Offline', color: '#6B7280', icon: ExclamationTriangleIcon },
};

const DEPARTMENTS = ['All', 'Engineering', 'Product', 'Marketing', 'Sales', 'Design', 'Executive'];

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  // const [showAddModal, setShowAddModal] = useState(false);
  const filteredMembers = mockTeamMembers.filter(member => {
    const matchesSearch = 
      member.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'All' || member.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  // Statistics
  const stats = {
    total: mockTeamMembers.length,
    active: mockTeamMembers.filter(m => m.status === 'active').length,
    departments: new Set(mockTeamMembers.map(m => m.department)).size,
    avgPerformance: Math.round(
      mockTeamMembers.reduce((sum, m) => sum + m.performance, 0) / mockTeamMembers.length
    )
  };

  // Chart data
  const departmentData = DEPARTMENTS.slice(1).map(dept => ({
    name: dept,
    count: mockTeamMembers.filter(m => m.department === dept).length,
    color: dept === 'Engineering' ? '#3B82F6' : 
          dept === 'Product' ? '#8B5CF6' :
          dept === 'Marketing' ? '#10B981' :
          dept === 'Sales' ? '#F59E0B' :
          dept === 'Design' ? '#EC4899' : '#6B7280'
  }));

  const performanceData = mockTeamMembers.map(member => ({
    name: `${member.firstName} ${member.lastName}`,
    performance: member.performance,
    tasks: member.tasksCompleted
  })).sort((a, b) => b.performance - a.performance).slice(0, 6);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  const getStatusIcon = (status: string) => {
    return STATUS_CONFIG[status as keyof typeof STATUS_CONFIG]?.icon || ClockIcon;
  };

  const formatLastActivity = (date: string) => {
    const now = new Date();
    const activity = new Date(date);
    const diffInHours = Math.abs(now.getTime() - activity.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 ml-64 pt-16">
      <div className="p-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Team Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your team members, roles, and performance
              </p>
            </div>
            <motion.button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled
            >
              <PlusIcon className="w-5 h-5" />
              <span>Add Member</span>
            </motion.button>
          </div>
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { title: 'Total Members', value: stats.total, icon: UserGroupIcon, color: 'from-blue-500 to-blue-600' },
              { title: 'Active Now', value: stats.active, icon: CheckCircleIcon, color: 'from-green-500 to-green-600' },
              { title: 'Departments', value: stats.departments, icon: CogIcon, color: 'from-purple-500 to-purple-600' },
              { title: 'Avg Performance', value: `${stats.avgPerformance}%`, icon: ChartBarIcon, color: 'from-orange-500 to-orange-600' },
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.title}
                  className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-xl p-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                    <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search team members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/70 dark:bg-slate-800/70 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Department Filter */}
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2 bg-white/70 dark:bg-slate-800/70 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                {DEPARTMENTS.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-white/70 dark:bg-slate-800/70 rounded-lg p-1">
              {['grid', 'table'].map((mode) => (
                <motion.button
                  key={mode}
                  onClick={() => setViewMode(mode as 'grid' | 'table')}
                  className={`px-3 py-1 rounded-md text-sm font-medium capitalize transition-all ${
                    viewMode === mode
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {mode}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Department Distribution */}
          <GlassCard title="Team by Department" delay={0.2}>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Performance Chart */}
          <GlassCard title="Top Performers" delay={0.3}>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#6B7280" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Bar dataKey="performance" fill="#3B82F6" name="Performance %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Team Members */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map((member, index) => {
              const StatusIcon = getStatusIcon(member.status);
              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <GlassCard
                    animate={false}
                    className="h-full hover:scale-105 transition-transform duration-200 cursor-pointer"
                  >
                    {/* Avatar */}
                    <div className="relative mb-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-white font-bold text-xl">
                          {getInitials(member.firstName, member.lastName)}
                        </span>
                      </div>
                      {/* Online Status */}
                      <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${
                        member.isOnline ? 'bg-green-500' : 'bg-gray-400'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          member.isOnline ? 'bg-green-300' : 'bg-gray-300'
                        }`} />
                      </div>
                    </div>

                    {/* Name and Position */}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {member.firstName} {member.lastName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {member.position}
                    </p>
                    
                    {/* Department and Role */}
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded">
                        {member.department}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded ${ROLE_CONFIG[member.role].color}`}>
                        {ROLE_CONFIG[member.role].label}
                      </span>
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-center space-x-1 mb-4">
                      <StatusIcon 
                        className="w-4 h-4" 
                        style={{ color: STATUS_CONFIG[member.status].color }}
                      />
                      <span 
                        className="text-xs font-medium"
                        style={{ color: STATUS_CONFIG[member.status].color }}
                      >
                        {STATUS_CONFIG[member.status].label}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 text-center border-t border-gray-200/50 dark:border-slate-700/50 pt-3">
                      <div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {member.projectsCount}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Projects</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {member.leadsAssigned}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Leads</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {member.performance}%
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Performance</p>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center justify-center space-x-2 mt-4">
                      <motion.button
                        className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `mailto:${member.email}`;
                        }}
                      >
                        <EnvelopeIcon className="w-4 h-4" />
                      </motion.button>
                      
                      {member.phone && (
                        <motion.button
                          className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                          whileHover={{ scale: 1.1 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = `tel:${member.phone}`;
                          }}
                        >
                          <PhoneIcon className="w-4 h-4" />
                        </motion.button>
                      )}
                      
                      <motion.button
                        className="p-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <PencilIcon className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <GlassCard delay={0.4}>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200/50 dark:border-slate-700/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Member</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Position</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Department</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Performance</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Last Activity</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50 dark:divide-slate-700/50">
                  {filteredMembers.map((member, index) => {
                    const StatusIcon = getStatusIcon(member.status);
                    return (
                      <tr
                        key={member.id}
                        className="hover:bg-gray-50/50 dark:hover:bg-slate-700/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">
                                  {getInitials(member.firstName, member.lastName)}
                                </span>
                              </div>
                              {member.isOnline && (
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border border-white" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {member.firstName} {member.lastName}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{member.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {member.position}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded">
                            {member.department}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded ${ROLE_CONFIG[member.role].color}`}>
                            {ROLE_CONFIG[member.role].label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1">
                            <StatusIcon 
                              className="w-4 h-4" 
                              style={{ color: STATUS_CONFIG[member.status].color }}
                            />
                            <span 
                              className="text-sm font-medium"
                              style={{ color: STATUS_CONFIG[member.status].color }}
                            >
                              {STATUS_CONFIG[member.status].label}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-900 dark:text-white mr-2">
                              {member.performance}%
                            </span>
                            <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${member.performance}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {formatLastActivity(member.lastActivity)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <motion.button
                              className="p-1.5 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded"
                              whileHover={{ scale: 1.1 }}
                              onClick={() => {
                                setSelectedMember(member);
                                setShowMemberModal(true);
                              }}
                            >
                              <EyeIcon className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              className="p-1.5 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                              whileHover={{ scale: 1.1 }}
                            >
                              <PencilIcon className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </GlassCard>
        )}

        {/* Member Detail Modal */}
        {showMemberModal && selectedMember && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMemberModal(false)}
          >
            <motion.div
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {getInitials(selectedMember.firstName, selectedMember.lastName)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedMember.firstName} {selectedMember.lastName}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedMember.position}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowMemberModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Member Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Contact Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <EnvelopeIcon className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700 dark:text-gray-300">{selectedMember.email}</span>
                    </div>
                    {selectedMember.phone && (
                      <div className="flex items-center space-x-3">
                        <PhoneIcon className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-700 dark:text-gray-300">{selectedMember.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-3">
                      <MapPinIcon className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700 dark:text-gray-300">{selectedMember.location}</span>
                    </div>
                  </div>
                </div>

                {/* Work Information */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Work Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Department:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedMember.department}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Role:</span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {ROLE_CONFIG[selectedMember.role].label}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Join Date:</span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Date(selectedMember.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Performance Stats */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50/50 dark:bg-slate-700/30 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedMember.projectsCount}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Projects</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50/50 dark:bg-slate-700/30 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedMember.tasksCompleted}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Tasks Done</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50/50 dark:bg-slate-700/30 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedMember.performance}%
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Performance</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4 pt-6 border-t border-gray-200 dark:border-slate-600 mt-6">
                <motion.button
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  whileHover={{ scale: 1.02 }}
                >
                  <EnvelopeIcon className="w-4 h-4 inline mr-2" />
                  Send Message
                </motion.button>
                <motion.button
                  className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  whileHover={{ scale: 1.02 }}
                >
                  <CalendarIcon className="w-4 h-4 inline mr-2" />
                  Schedule Meeting
                </motion.button>
                <motion.button
                  className="px-6 py-3 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors font-medium"
                  whileHover={{ scale: 1.02 }}
                >
                  <PencilIcon className="w-4 h-4 inline mr-2" />
                  Edit
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  );
}