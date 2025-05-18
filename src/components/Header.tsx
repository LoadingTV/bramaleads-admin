'use client'

import React, { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { href: '/leads', label: 'Leads' },
  { href: '/settings', label: 'Settings' },
]

const Header: FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement
    if (isDarkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <header className="flex text-black items-center justify-between bg-white dark:bg-blackBg px-6 py-4 shadow">
      <Link href="/" className="flex items-center">
    
      </Link>

      <nav className="flex items-center space-x-6">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className="text-gray-700  hover:underline"
          >
            {item.label}
          </Link>
        ))}
        <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </nav>
    </header>
  )
}

export default Header
