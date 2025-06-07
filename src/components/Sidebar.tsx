'use client'

import React, { FC } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  HomeIcon, 
  UsersIcon, 
  FolderIcon, 
  CalendarIcon, 
  DocumentTextIcon, 
  ChartBarIcon,
  CogIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

interface TeamItem {
  id: string
  name: string
  avatar: string
  color: string
}

const mainNavItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: HomeIcon },
  { href: '/team', label: 'Team', icon: UsersIcon },
  { href: '/projects', label: 'Projects', icon: FolderIcon },
  { href: '/calendar', label: 'Calendar', icon: CalendarIcon },
  { href: '/documents', label: 'Documents', icon: DocumentTextIcon },
  { href: '/reports', label: 'Reports', icon: ChartBarIcon },
]

const teams: TeamItem[] = [
  { id: 'heroicons', name: 'Heroicons', avatar: 'H', color: 'bg-purple-500' },
  { id: 'tailwind', name: 'Tailwind Labs', avatar: 'T', color: 'bg-blue-500' },
  { id: 'workcation', name: 'Workcation', avatar: 'W', color: 'bg-green-500' },
]

const Sidebar: FC = () => {
  const pathname = usePathname()

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-slate-900 text-white flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <h1 className="text-xl font-semibold">Brama CRM</h1>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {mainNavItems.map((item) => {
          const isActive = pathname === item.href
          const IconComponent = item.icon
          
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Teams Section */}
      <div className="px-4 py-4 border-t border-slate-700">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Your teams
        </h3>
        <div className="space-y-2">
          {teams.map((team) => (
            <Link key={team.id} href={`/teams/${team.id}`}>
              <motion.div
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <div className={`w-6 h-6 ${team.color} rounded text-white text-xs flex items-center justify-center font-semibold`}>
                  {team.avatar}
                </div>
                <span className="text-sm font-medium">{team.name}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="p-4 border-t border-slate-700">
        <Link href="/settings">
          <motion.div
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              pathname === '/settings' 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <CogIcon className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </motion.div>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar