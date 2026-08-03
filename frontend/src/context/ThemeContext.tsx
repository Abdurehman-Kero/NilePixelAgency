import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
 theme: string;
 setTheme: (theme: string) => void;
 accentColor: string;
 setAccentColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
 theme: 'dark',
 setTheme: () => {},
 accentColor: '#00A3FF',
 setAccentColor: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const [theme, setTheme] = useState('dark');
 const [accentColor, setAccentColor] = useState('#00A3FF');

 useEffect(() => {
 document.documentElement.classList.add('dark');
 }, []);

 return (
 <ThemeContext.Provider value={{ theme, setTheme, accentColor, setAccentColor }}>
 {children}
 </ThemeContext.Provider>
 );
};

export const useTheme = () => useContext(ThemeContext);
