'use client';
import Cookies from 'js-cookie';
import { useCallback } from 'react';

export const useSaveNote = (noteId: string) => {
	const sessionId = Cookies.get('surfenotes-id');

	const saveNote = useCallback(
		async (data: string) => {
			if (!sessionId) {
				console.error('No session ID found');
				return;
			}

			const fetchOptions = {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ body: data }),
			};

			try {
				const response = await fetch(
					`https://challenge.surfe.com/${sessionId}/notes/${noteId}`,
					fetchOptions
				);

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
			} catch (error) {
				console.error('Error saving note:', error);
			}
		},
		[sessionId, noteId]
	);

	return saveNote;
};
