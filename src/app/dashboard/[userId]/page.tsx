'use client';
import { Header } from '@/components/Header/Header';
import { Modal } from '@/components/Modal/Modal';
import { SingleNote } from '@/components/SingleNote/SingleNote';
import { Note, useGetNote } from '@/hooks/useGet';
import { useState } from 'react';
import { createPortal } from 'react-dom';

export default function Dashboard() {
	const [showModal, setShowModal] = useState(false);
	const [clickedNote, setClickedNote] = useState<Note>({ id: '', body: '' });
	const { notes, reloadNotes } = useGetNote();

	const handleOnNoteOpen = (note: Note) => {
		setShowModal(true);
		setClickedNote(note);
	};

	const handleOnModalClose = () => {
		setShowModal(false);
		reloadNotes();
	};

	return (
		<section className='flex flex-col h-screen max-w-screen-md mx-auto'>
			<div className='p-4'>
				<Header onCreateNote={reloadNotes} />
				<main className='flex flex-col gap-8 row-start-2 mt-10 items-center sm:items-start'>
					<ul className='flex flex-row flex-1 flex-wrap justify-center md:justify-normal w-full gap-4'>
						{notes?.map((note, index) => (
							<li key={`${note.id}-${index}`}>
								<SingleNote note={note} onClick={handleOnNoteOpen} />
							</li>
						))}
					</ul>
				</main>
			</div>
			{showModal &&
				createPortal(
					<Modal note={clickedNote} onClose={handleOnModalClose} />,
					document.body.querySelector('#modal-root')!
				)}
			<div id='modal-root' />
		</section>
	);
}
