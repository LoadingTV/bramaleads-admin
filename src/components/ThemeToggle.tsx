import { useEffect } from "react";

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
    if (isDarkMode) {
      document.body.classList.add("dark");
      document.body.style.backgroundColor = "#282828";
    } else {
      document.body.classList.remove("dark");
      document.body.style.backgroundColor = "black";
    }
  }, [isDarkMode]);

  return (
    <button onClick={toggleTheme} className="uppercase">
      {isDarkMode ? "🌙 Night mode" : "☀️ Day mode"}
    </button>
  );
};

export default ThemeToggle;
