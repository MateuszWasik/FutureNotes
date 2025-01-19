import { useContext } from 'react';
import { NotesContext } from '../ContextProvider/ContextProvider';

export const SavingIndicator = () => {
	const notesContext = useContext(NotesContext);
	if (!notesContext?.isNoteSaving) return null;

	return <div className='text-secondary text-xs md:text-sm'>Saving...</div>;
};
