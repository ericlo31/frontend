// ThemeToggle.tsx
import { useTheme } from "./ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";
import styles from "../styles/themeToggle.module.css";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`${styles.toggleButton} ${
        theme === "dark" ? styles.dark : styles.light
      }`}
      aria-label="Cambiar tema"
    >
      {theme === "dark" ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeToggle;
