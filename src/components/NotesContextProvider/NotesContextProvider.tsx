'use client';
import { createContext, PropsWithChildren, useState } from 'react';

type InitialContextType = {
	isNoteSaving: boolean;
	updateIsNoteSaving: (newValue: boolean) => void;
};

export const NotesContext = createContext<InitialContextType | undefined>(
	undefined
);

export const NotesContextProvider = ({ children }: PropsWithChildren) => {
	const [isNoteSaving, setIsNoteSaving] = useState(false);

	const updateIsNoteSaving = (newValue: boolean) => {
		setIsNoteSaving(newValue);
	};

	return (
		<NotesContext.Provider value={{ isNoteSaving, updateIsNoteSaving }}>
			{children}
		</NotesContext.Provider>
	);
};
