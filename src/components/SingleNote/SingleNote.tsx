'use client';

import { Note } from '@/hooks/useGet';
import Image from 'next/image';
import SurfeLogo from '@images/surfe_black_logo.webp';

type SingleNoteProps = {
	note: Note;
	onClick: (note: Note) => void;
};

export const SingleNote = ({ note, onClick }: SingleNoteProps) => {
	const handleOnClick = () => {
		onClick(note);
	};
	return (
		<>
			<div
				className='flex flex-col gap-4 w-[150px] md:w-[200px] h-[200px] p-6 bg-white border cursor-pointer rounded-lg'
				onClick={handleOnClick}
			>
				<div className='flex flex-row h-7 gap-1 justify-start items-center '>
					<div className='w-12 '>
						<Image src={SurfeLogo} alt='' />
					</div>
					<div>
						<span className='font-semibold  text-lg md:text-xl'>Notes</span>
					</div>
				</div>
				<div className='text-wrap overflow-hidden'>
					<p>{note.body.slice(0, 100)}</p>
				</div>
			</div>
		</>
	);
};
