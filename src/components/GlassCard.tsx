import React, { FC, ReactNode } from 'react'

interface GlassCardProps {
  /**
   * Заголовок карточки.
   */
  title?: string
  /**
   * Содержимое карточки.
   */
  children: ReactNode
  /**
   * Дополнительные CSS-классы для кастомизации внешнего вида.
   */
  className?: string
}

const GlassCard: FC<GlassCardProps> = ({ title, children, className = '' }) => {
  return (
    <div
      className={`bg-white/20 backdrop-blur-md rounded-2xl shadow-lg p-6 ${className}`}
    >
      {title && (
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
      )}
      <div>{children}</div>
    </div>
  )
}

export default GlassCard
