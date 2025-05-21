import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ marginTop: "2rem" }}>
      <label style={{ fontWeight: "bold", marginRight: "1rem" }}>
        Modo {theme === "light" ? "Claro" : "Oscuro"}
      </label>
      <button onClick={toggleTheme}>
        {theme === "light" ? "Activar Oscuro" : "Activar Claro"}
      </button>
    </div>
  );
};

export default ThemeToggle;
