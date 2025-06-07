// src/app/calendar/page.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import { 
  CalendarIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  UserGroupIcon,
  VideoCameraIcon,
  PhoneIcon,
  MapPinIcon,
  XMarkIcon,
  PencilIcon,
  TrashIcon,
  BellIcon
} from '@heroicons/react/24/outline';

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  type: 'meeting' | 'call' | 'deadline' | 'reminder' | 'interview';
  attendees?: string[];
  location?: string;
  isOnline?: boolean;
  color: string;
  priority: 'low' | 'medium' | 'high';
}

const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Client Meeting - Tech Solutions',
    description: 'Discuss project requirements and timeline',
    start: new Date(2024, 5, 7, 10, 0),
    end: new Date(2024, 5, 7, 11, 30),
    type: 'meeting',
    attendees: ['John Smith', 'Sarah Davis', 'Mike Chen'],
    location: 'Conference Room A',
    color: '#3B82F6',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Product Demo Call',
    description: 'Present new features to prospect client',
    start: new Date(2024, 5, 7, 14, 0),
    end: new Date(2024, 5, 7, 15, 0),
    type: 'call',
    attendees: ['Alex Johnson', 'Emily Rodriguez'],
    isOnline: true,
    color: '#10B981',
    priority: 'medium'
  },
  {
    id: '3',
    title: 'Project Deadline - CRM Update',
    description: 'Final delivery for CRM system update',
    start: new Date(2024, 5, 8, 17, 0),
    end: new Date(2024, 5, 8, 17, 0),
    type: 'deadline',
    color: '#EF4444',
    priority: 'high'
  },
  {
    id: '4',
    title: 'Team Standup',
    description: 'Daily team synchronization',
    start: new Date(2024, 5, 10, 9, 0),
    end: new Date(2024, 5, 10, 9, 30),
    type: 'meeting',
    attendees: ['Development Team'],
    isOnline: true,
    color: '#8B5CF6',
    priority: 'medium'
  },
  {
    id: '5',
    title: 'Job Interview - React Developer',
    description: 'Technical interview for senior position',
    start: new Date(2024, 5, 11, 15, 0),
    end: new Date(2024, 5, 11, 16, 30),
    type: 'interview',
    attendees: ['HR Team', 'Tech Lead'],
    location: 'Office - Room 302',
    color: '#F59E0B',
    priority: 'high'
  },
  {
    id: '6',
    title: 'Follow-up: Marketing Campaign',
    description: 'Review campaign performance metrics',
    start: new Date(2024, 5, 12, 11, 0),
    end: new Date(2024, 5, 12, 11, 0),
    type: 'reminder',
    color: '#06B6D4',
    priority: 'low'
  }
];

const EVENT_TYPES = {
  meeting: { label: 'Meeting', icon: UserGroupIcon, color: '#3B82F6' },
  call: { label: 'Call', icon: PhoneIcon, color: '#10B981' },
  deadline: { label: 'Deadline', icon: ClockIcon, color: '#EF4444' },
  reminder: { label: 'Reminder', icon: BellIcon, color: '#06B6D4' },
  interview: { label: 'Interview', icon: UserGroupIcon, color: '#F59E0B' },
};

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  // Generate calendar days
  const calendarDays = [];
  
  // Previous month days
  const prevMonth = new Date(year, month - 1, 0);
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    calendarDays.push({
      date: new Date(year, month - 1, prevMonth.getDate() - i),
      isCurrentMonth: false,
      isToday: false
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    calendarDays.push({
      date,
      isCurrentMonth: true,
      isToday: date.toDateString() === today.toDateString()
    });
  }

  // Next month days
  const remainingDays = 42 - calendarDays.length;
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push({
      date: new Date(year, month + 1, day),
      isCurrentMonth: false,
      isToday: false
    });
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getEventsForDate = (date: Date) => {
    return mockEvents.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getEventTypeIcon = (type: string) => {
    const typeConfig = EVENT_TYPES[type as keyof typeof EVENT_TYPES];
    return typeConfig ? typeConfig.icon : ClockIcon;
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
                Calendar
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your schedule and appointments
              </p>
            </div>
            <motion.button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlusIcon className="w-5 h-5" />
              <span>New Event</span>
            </motion.button>
          </div>

          {/* Calendar Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </motion.button>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {MONTHS[month]} {year}
              </h2>
              
              <motion.button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRightIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </motion.button>

              <motion.button
                onClick={() => setCurrentDate(new Date())}
                className="px-4 py-2 text-sm bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
              >
                Today
              </motion.button>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-white/70 dark:bg-slate-800/70 rounded-lg p-1">
              {['month', 'week', 'day'].map((mode) => (
                <motion.button
                  key={mode}
                  onClick={() => setViewMode(mode as 'month' | 'week' | 'day')}
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Calendar Grid */}
          <div className="lg:col-span-3">
            <GlassCard>
              {/* Calendar Header */}
              <div className="grid grid-cols-7 gap-px mb-4">
                {DAYS.map((day) => (
                  <div key={day} className="p-4 text-center font-semibold text-gray-700 dark:text-gray-300">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                {calendarDays.map((day, index) => {
                  const dayEvents = getEventsForDate(day.date);
                  
                  return (
                    <motion.div
                      key={index}
                      className={`min-h-[120px] p-2 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors cursor-pointer ${
                        !day.isCurrentMonth ? 'opacity-50' : ''
                      } ${day.isToday ? 'ring-2 ring-blue-500' : ''}`}
                      onClick={() => setSelectedDate(day.date)}
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.01 }}
                    >
                      <div className={`text-sm font-medium mb-2 ${
                        day.isToday 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : day.isCurrentMonth 
                            ? 'text-gray-900 dark:text-white' 
                            : 'text-gray-400 dark:text-gray-500'
                      }`}>
                        {day.date.getDate()}
                      </div>
                      
                      <div className="space-y-1">
                        {dayEvents.slice(0, 3).map((event) => {
                          const EventIcon = getEventTypeIcon(event.type);
                          return (
                            <motion.div
                              key={event.id}
                              className="p-1 rounded text-xs text-white font-medium cursor-pointer truncate flex items-center"
                              style={{ backgroundColor: event.color }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedEvent(event);
                                setShowEventModal(true);
                              }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <EventIcon className="w-3 h-3 mr-1 flex-shrink-0" />
                              <span className="truncate">{event.title}</span>
                            </motion.div>
                          );
                        })}
                        {dayEvents.length > 3 && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            +{dayEvents.length - 3} more
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </GlassCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Events */}
            <GlassCard title="Today's Events" delay={0.2}>
              <div className="space-y-3">
                {getEventsForDate(today).length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">
                    No events today
                  </p>
                ) : (
                  getEventsForDate(today).map((event) => {
                    const EventIcon = getEventTypeIcon(event.type);
                    return (
                      <motion.div
                        key={event.id}
                        className="p-3 bg-gray-50/50 dark:bg-slate-700/30 rounded-lg cursor-pointer hover:bg-gray-100/50 dark:hover:bg-slate-600/50 transition-colors"
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowEventModal(true);
                        }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start space-x-3">
                          <div 
                            className="p-1.5 rounded" 
                            style={{ backgroundColor: event.color + '20' }}
                          >
                            <EventIcon 
                              className="w-4 h-4" 
                              style={{ color: event.color }} 
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                              {event.title}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {formatTime(event.start)} - {formatTime(event.end)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </GlassCard>

            {/* Upcoming Events */}
            <GlassCard title="Upcoming Events" delay={0.3}>
              <div className="space-y-3">
                {mockEvents
                  .filter(event => event.start > today)
                  .slice(0, 5)
                  .map((event) => {
                    const EventIcon = getEventTypeIcon(event.type);
                    return (
                      <motion.div
                        key={event.id}
                        className="p-3 bg-gray-50/50 dark:bg-slate-700/30 rounded-lg cursor-pointer hover:bg-gray-100/50 dark:hover:bg-slate-600/50 transition-colors"
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowEventModal(true);
                        }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start space-x-3">
                          <div 
                            className="p-1.5 rounded" 
                            style={{ backgroundColor: event.color + '20' }}
                          >
                            <EventIcon 
                              className="w-4 h-4" 
                              style={{ color: event.color }} 
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                              {event.title}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {event.start.toLocaleDateString()} at {formatTime(event.start)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </GlassCard>

            {/* Quick Stats */}
            <GlassCard title="Calendar Stats" delay={0.4}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">This Week</span>
                  <span className="font-semibold text-gray-900 dark:text-white">12 events</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">This Month</span>
                  <span className="font-semibold text-gray-900 dark:text-white">48 events</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Meetings</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">32</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Deadlines</span>
                  <span className="font-semibold text-red-600 dark:text-red-400">8</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Event Detail Modal */}
        {showEventModal && selectedEvent && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEventModal(false)}
          >
            <motion.div
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-2xl p-6 max-w-md w-full"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedEvent.title}
                </h3>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <ClockIcon className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {selectedEvent.start.toLocaleDateString()} • {formatTime(selectedEvent.start)} - {formatTime(selectedEvent.end)}
                  </span>
                </div>

                {selectedEvent.location && (
                  <div className="flex items-center space-x-3">
                    <MapPinIcon className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">{selectedEvent.location}</span>
                  </div>
                )}

                {selectedEvent.isOnline && (
                  <div className="flex items-center space-x-3">
                    <VideoCameraIcon className="w-5 h-5 text-blue-500" />
                    <span className="text-blue-600 dark:text-blue-400">Online Meeting</span>
                  </div>
                )}

                {selectedEvent.attendees && (
                  <div className="flex items-start space-x-3">
                    <UserGroupIcon className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">Attendees:</p>
                      <ul className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedEvent.attendees.map((attendee, index) => (
                          <li key={index}>• {attendee}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {selectedEvent.description && (
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">Description:</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {selectedEvent.description}
                    </p>
                  </div>
                )}

                <div className="flex items-center space-x-3 pt-4 border-t border-gray-200 dark:border-slate-600">
                  <motion.button
                    className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    whileHover={{ scale: 1.02 }}
                  >
                    <PencilIcon className="w-4 h-4 inline mr-2" />
                    Edit
                  </motion.button>
                  <motion.button
                    className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    whileHover={{ scale: 1.02 }}
                  >
                    <TrashIcon className="w-4 h-4 inline mr-2" />
                    Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Create Event Modal */}
        {showCreateModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Create New Event
                </h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Event title"
                  className="w-full px-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />

                <textarea
                  placeholder="Description (optional)"
                  rows={3}
                  className="w-full px-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <select className="w-full px-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                  <option value="">Select event type</option>
                  {Object.entries(EVENT_TYPES).map(([key, type]) => (
                    <option key={key} value={key}>{type.label}</option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Location (optional)"
                  className="w-full px-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />

                <div className="flex items-center space-x-4 pt-4 border-t border-gray-200 dark:border-slate-600">
                  <motion.button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Create Event
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-3 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  );
}