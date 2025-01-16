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
			className='p-4 font-bold rounded-md bg-secondary text-white'
		>
			Create note
		</button>
	);
};
