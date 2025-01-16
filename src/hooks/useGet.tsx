'use client';
import { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';

export type Note = {
	id: string;
	body: string;
};

export const useGetNote = () => {
	const [notes, setNotes] = useState<Note[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [reload, setReload] = useState(false);

	const sessionId = Cookies.get('surfenotes-id');

	const reloadNotes = useCallback(() => {
		setReload((prev) => !prev);
	}, []);

	useEffect(() => {
		const getNote = async () => {
			try {
				const res = await fetch(
					`https://challenge.surfe.com/${sessionId}/notes`
				);
				const data = await res.json();
				setNotes(data);
				setLoading(false);
			} catch {
				setError(true);
				setLoading(false);
			}
		};
		getNote();
	}, [sessionId, reload]);

	return { notes, loading, error, reloadNotes };
};
