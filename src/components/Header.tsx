'use client'

import React, { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ThemeToggle from './ThemeToggle'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const navItems = [
  { href: '/leads', label: 'Leads' },
  { href: '/projects', label: 'Projects' },
  { href: '/settings', label: 'Settings' },
]

const Header: FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    const root = document.documentElement
    if (isDarkMode) root.classList.add('dark')
    else root.classList.remove('dark')
  }, [isDarkMode])

  const handleProfileClick = () => {
    if (session) router.push('/profile')
    else router.push('/auth/login')
  }

  return (
    <header className="flex items-center justify-between bg-white text-black dark:bg-blackBg dark:text-black px-6 py-4 shadow">
      <Link href="/" className="flex items-center text-black">
        <Image
          src={isDarkMode ? '/abadub_logo_dark.svg' : '/abadub_logo.svg'}
          alt="BramaLeads Logo"
          width={150}
          height={40}
        />
      </Link>

      <nav className="flex items-center space-x-6">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className="hover:underline"
          >
            {item.label}
          </Link>
        ))}

        <button
          onClick={handleProfileClick}
          className="flex items-center hover:opacity-80 transition"
        >
          <Image src="/user_icon.svg" alt="Profile" width={24} height={24} />
          {session && (
            <span className="ml-2 text-sm">
              {session.user?.name || session.user?.email}
            </span>
          )}
        </button>

        <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </nav>
    </header>
  )
}

export default Header
