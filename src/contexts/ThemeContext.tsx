import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  toggleTheme: () => {},
});

// Función para obtener el tema inicial de forma segura
const isTheme = (value: string | null): value is "light" | "dark" => {
  return value === "light" || value === "dark";
};

const getInitialTheme = (): "light" | "dark" => {
  if (typeof localStorage === "undefined") return "light";
  const savedTheme = localStorage.getItem("theme");
  return isTheme(savedTheme) ? savedTheme : "light";
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.remove("light", "dark");
      document.body.classList.add(theme);
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
