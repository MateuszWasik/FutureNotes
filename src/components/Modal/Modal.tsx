import React, { useEffect } from 'react';

import { Note } from '@/hooks/useGet';
import { MentionTextarea } from '../TextAreaWithMention/TextAreaWithMention';
import { SavingIndicator } from '../SavingIndicator/SavingIndicator';

type ModalProps = {
	note: Note;
	onClose: () => void;
};
export const Modal = ({ note, onClose }: ModalProps) => {
	const handleOnClose = () => {
		localStorage.removeItem('note-id');
		localStorage.removeItem('note-edit');
		onClose();
	};

	useEffect(() => {
		document.body.classList.add('modal-open');

		return () => {
			document.body.classList.remove('modal-open');
		};
	}, []);

	return (
		<div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-row w-full max-w-[750px] h-dvh md:h-[600px]'>
			<div className='flex flex-col justify-between items-center py-4 w-24 bg-singleNoteBg'>
				<div className='flex flex-col gap-4 items-center'>
					<ul className='flex flex-col gap-2 justify-center w-12 bg-transparent'>
						{Array.from({ length: 6 }).map((_, index) => (
							<li key={index}></li>
						))}
					</ul>
					<SavingIndicator />
				</div>

				<button
					className='bg-sky300 text-secondary font-semibold p-2 rounded-lg'
					onClick={handleOnClose}
				>
					Close
				</button>
			</div>
			<div className='w-full'>
				<MentionTextarea note={note} />
			</div>
		</div>
	);
};
