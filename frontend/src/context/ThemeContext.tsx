import React, { createContext, useContext, useState } from 'react';

interface ThemeContextType {
 theme: string;
 setTheme: (theme: string) => void;
 accentColor: string;
 setAccentColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
 theme: 'light',
 setTheme: () => {},
 accentColor: '#F47B20',
 setAccentColor: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const [theme, setTheme] = useState('light');
 const [accentColor, setAccentColor] = useState('#F47B20');

 return (
 <ThemeContext.Provider value={{ theme, setTheme, accentColor, setAccentColor }}>
 {children}
 </ThemeContext.Provider>
 );
};

export const useTheme = () => useContext(ThemeContext);
