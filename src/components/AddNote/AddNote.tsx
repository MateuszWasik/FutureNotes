'use client';

import { useCreateNote } from '@/hooks/useCreateNote';

type AddNoteProps = {
	onCreateNote: () => void;
};

export const AddNote = ({ onCreateNote }: AddNoteProps) => {
	const createNote = useCreateNote();

	const handleAddNote = async () => {
		try {
			await createNote();
			onCreateNote();
		} catch (error) {
			console.error('Error creating note:', error);
		}
	};

	return (
		<button
			onClick={handleAddNote}
			className='p-3 font-bold rounded-md bg-sky300 text-secondary'
		>
			Create note
		</button>
	);
};
