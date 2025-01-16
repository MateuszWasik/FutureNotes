'use client';
import Cookies from 'js-cookie';
import { useCallback } from 'react';

export const useCreateNote = () => {
	const sessionId = Cookies.get('surfenotes-id');

	const createNote = useCallback(async () => {
		if (!sessionId) {
			console.error('No session ID found');
			return;
		}

		const fetchOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ body: 'Note Title' }),
		};

		try {
			const response = await fetch(
				`https://challenge.surfe.com/${sessionId}/notes`,
				fetchOptions
			);

			if (!response.ok) {
				console.log('response', response);
				throw new Error('Network response was not ok');
			}
		} catch (error) {
			console.error('Error saving note:', error);
		}
	}, [sessionId]);

	return createNote;
};
