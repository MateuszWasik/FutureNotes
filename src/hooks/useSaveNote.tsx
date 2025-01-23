'use client';
import { NotesContext } from '@/components/NotesContextProvider/NotesContextProvider';
import Cookies from 'js-cookie';
import { useCallback, useContext, useState } from 'react';

export const useSaveNote = (noteId?: string) => {
	const [isSaving, setIsSaving] = useState(false);
	const notesContext = useContext(NotesContext);

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
				notesContext?.updateIsNoteSaving(true);
				const response = await new Promise<Response>((resolve, reject) => {
					fetch(``, fetchOptions)
						.then((response) => {
							if (response.ok) {
								notesContext?.updateIsNoteSaving(false);
								resolve(response);
							} else {
								reject(new Error('Network response was not ok'));
							}
						})
						.catch((error) => {
							reject(error);
						});
				});

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
			} catch (error) {
				console.error('Error saving note:', error);
				setIsSaving(false);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[noteId, sessionId]
	);

	return { saveNote, isSaving };
};
