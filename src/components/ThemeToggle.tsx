import { useEffect } from "react";
import { motion } from "framer-motion";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

interface ThemeToggleProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  isDarkMode,
  setIsDarkMode,
}) => {
  const toggleTheme = () => {
    setIsDarkMode((prevMode: boolean) => !prevMode);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      document.body.style.backgroundColor = "#0f172a";
    } else {
      root.classList.remove("dark");
      document.body.style.backgroundColor = "#f8fafc";
    }
  }, [isDarkMode]);

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-18 items-center rounded-full bg-gray-200 dark:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Switch background */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-blue-600 dark:to-purple-600"
        initial={false}
        animate={{
          opacity: isDarkMode ? 1 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Switch handle */}
      <motion.div
        className="relative inline-block h-8 w-8 transform rounded-full bg-white shadow-lg ring-0 transition-transform"
        initial={false}
        animate={{
          x: isDarkMode ? 32 : 4,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        {/* Icons */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            rotate: isDarkMode ? 180 : 0,
            opacity: 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {isDarkMode ? (
            <MoonIcon className="h-4 w-4 text-slate-600" />
          ) : (
            <SunIcon className="h-4 w-4 text-yellow-600" />
          )}
        </motion.div>
      </motion.div>
      
      {/* Labels */}
      <div className="absolute inset-0 flex items-center justify-between px-3 text-xs font-medium text-white">
        <span className={`transition-opacity ${!isDarkMode ? 'opacity-100' : 'opacity-0'}`}>
          ☀️
        </span>
        <span className={`transition-opacity ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}>
          🌙
        </span>
      </div>
    </motion.button>
  );
};

export default ThemeToggle;