import React, { FC, ReactNode } from 'react'

interface GlassCardProps {
  /** Заголовок карточки */
  title?: string
  /** Содержимое карточки */
  children: ReactNode
  /** Дополнительные CSS-классов */
  className?: string
}

const GlassCard: FC<GlassCardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={` backdrop-blur-md text-black dark:text-black shadow-lg rounded-2xl p-6 ${className}`}>
      {title && <h2 className="text-xl font-semibold mb-4 ">{title}</h2>}
      <div className='w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-700 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition'>{children}</div>
    </div>
  )
}

export default GlassCard
