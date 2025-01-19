'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type ThemeContextType = {
	theme: string;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<string>('light');

	const toggleTheme = () => {
		if (theme === 'light') {
			document.documentElement.classList.add('dark');
			document.documentElement.classList.remove('light');
			setTheme('dark');
		} else {
			document.documentElement.classList.add('light');
			document.documentElement.classList.remove('dark');
			setTheme('light');
		}
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};
