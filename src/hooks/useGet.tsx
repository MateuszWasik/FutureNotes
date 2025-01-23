'use client';
import { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';

export type Note = {
	id: string;
	body: string;
};

export const useGetNote = () => {
	const [notes, setNotes] = useState<Note[]>([]);

	const sessionId = Cookies.get('surfenotes-id');

	const getNote = useCallback(async () => {
		if (!sessionId) {
			console.warn('No sessionId found.');
			return;
		}

		try {
			const response = await fetch(``);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			setNotes(data);
		} catch (error) {
			console.error('Error fetching notes:', error);
		}
	}, [sessionId]);

	useEffect(() => {
		getNote();
	}, [getNote]);

	return { notes, reloadNotes: getNote };
};
