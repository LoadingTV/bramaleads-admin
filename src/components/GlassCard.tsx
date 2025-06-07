import React, { FC, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface GlassCardProps {
  /** Заголовок карточки */
  title?: string
  /** Содержимое карточки */
  children: ReactNode
  /** Дополнительные CSS-классы */
  className?: string
  /** Анимация при появлении */
  animate?: boolean
  /** Задержка анимации */
  delay?: number
}

const GlassCard: FC<GlassCardProps> = ({ 
  title, 
  children, 
  className = '', 
  animate = true,
  delay = 0 
}) => {
  const cardContent = (
    <div className={`
      bg-white/70 dark:bg-slate-800/70 
      backdrop-blur-xl 
      border border-white/20 dark:border-slate-700/50
      shadow-xl shadow-black/5 dark:shadow-black/20
      rounded-2xl 
      p-6 
      transition-all duration-300
      hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-black/30
      hover:bg-white/80 dark:hover:bg-slate-800/80
      ${className}
    `}>
      {title && (
        <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
          {title}
        </h2>
      )}
      <div className="text-gray-700 dark:text-gray-200">
        {children}
      </div>
    </div>
  )

  if (!animate) {
    return cardContent
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      {cardContent}
    </motion.div>
  )
}

export default GlassCard