import React, { useEffect } from 'react';
import Image from 'next/image';

import SurfeOption from '@images/surfe_option.webp';
import { Note } from '@/hooks/useGet';
import { MentionTextarea } from '../TextAreaWithMention/TextAreaWithMention';

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
		<div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-row w-full max-w-[800px] h-dvh md:h-[600px] rounded-md bg-white'>
			<div className='flex flex-col justify-between items-center py-4 w-24'>
				<ul className='flex flex-col gap-2 justify-center w-12 bg-white'>
					{Array.from({ length: 6 }).map((_, index) => (
						<li key={index}>
							<Image src={SurfeOption} alt='' draggable={false} />
						</li>
					))}
				</ul>
				<button
					className='bg-secondary font-semibold text-white p-2 rounded-lg'
					onClick={handleOnClose}
				>
					Close
				</button>
			</div>
			<div className='p-4 pl-0 w-full'>
				<MentionTextarea note={note} />
			</div>
		</div>
	);
};
