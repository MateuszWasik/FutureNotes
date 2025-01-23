'use client';

import { Note } from '@/hooks/useGet';

import { useEffect, useRef } from 'react';

type SingleNoteProps = {
	note: Note;
	onClick: (note: Note) => void;
};

export const SingleNote = ({ note, onClick }: SingleNoteProps) => {
	const preview = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (preview.current) {
			preview.current.innerHTML = note.body ?? '';
		}
	}, [note]);

	const handleOnClick = () => {
		onClick(note);
	};

	return (
		<>
			<div
				className='flex flex-col gap-4 w-[150px] md:w-[200px] h-[200px] p-6 bg-singleNoteBg border cursor-pointer rounded-lg'
				onClick={handleOnClick}
			>
				<div className='flex flex-row h-7 gap-1 justify-start items-center '>
					<div className='w-12 '></div>
					<div>
						<span className='font-semibold text-basicText  text-lg md:text-xl'>
							Notes
						</span>
					</div>
				</div>
				<div
					ref={preview}
					className='text-wrap text-basicText overflow-hidden'
				/>
			</div>
		</>
	);
};
