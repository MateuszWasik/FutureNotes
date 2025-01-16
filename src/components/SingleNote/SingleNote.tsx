'use client';

import { createPortal } from 'react-dom';
import { Modal } from '../Modal/Modal';
import { useState } from 'react';
import { Note } from '@/hooks/useGet';
import Image from 'next/image';
import SurfeLogo from '@images/surfe_black_logo.webp';

type SingleNoteProps = {
	note: Note;
	onModalClose: () => void;
};

export const SingleNote = ({ note, onModalClose }: SingleNoteProps) => {
	const [showModal, setShowModal] = useState(false);

	const handleOpenNote = () => {
		setShowModal(true);
	};

	const handleOnClose = () => {
		setShowModal(false);
		onModalClose();
	};
	return (
		<>
			<div
				className='flex flex-col gap-4 w-[400px] h-[200px] p-6 bg-white border cursor-pointer rounded-lg'
				onClick={handleOpenNote}
			>
				<div className='flex flex-row h-7 gap-1 justify-start items-center '>
					<div className='w-12 '>
						<Image src={SurfeLogo} alt='' />
					</div>
					<div>
						<span className='font-semibold text-xl'>Notes</span>
					</div>
				</div>
				<div className='text-wrap'>
					<p>{note.body.slice(0, 100)}</p>
				</div>
			</div>

			{showModal &&
				createPortal(
					<Modal note={note} onClose={handleOnClose} />,
					document.body.querySelector('#modal-root')!
				)}
		</>
	);
};
