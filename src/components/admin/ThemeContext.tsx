"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
 theme: Theme;
 toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
 const [theme, setTheme] = useState<Theme>("light");

 useEffect(() => {
 // Read preference from localStorage or default to system
 const savedTheme = localStorage.getItem("admin-theme") as Theme;
 if (savedTheme) {
 setTheme(savedTheme);
 document.documentElement.classList.toggle("dark", savedTheme === "dark");
 } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
 setTheme("dark");
 document.documentElement.classList.add("dark");
 }
 }, []);

 const toggleTheme = () => {
 const nextTheme = theme === "light" ? "dark" : "light";
 setTheme(nextTheme);
 localStorage.setItem("admin-theme", nextTheme);
 document.documentElement.classList.toggle("dark", nextTheme === "dark");
 };

 return (
 <ThemeContext.Provider value={{ theme, toggleTheme }}>
 {children}
 </ThemeContext.Provider>
 );
}

export function useTheme() {
 const context = useContext(ThemeContext);
 if (!context) {
 throw new Error("useTheme must be used within a ThemeProvider");
 }
 return context;
}
