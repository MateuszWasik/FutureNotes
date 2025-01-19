'use client';

import React from 'react';
import { useTheme } from '../ThemeProvider/ThemeProvider';

export const ThemeSelector = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<div className='fixed bottom-8 right-8 z-[9999]'>
			<button
				className='p-3 font-bold rounded-md bg-sky300 text-secondary'
				onClick={toggleTheme}
			>
				{theme === 'light' ? 'Make it darker' : 'Make it lighter'}
			</button>
		</div>
	);
};
