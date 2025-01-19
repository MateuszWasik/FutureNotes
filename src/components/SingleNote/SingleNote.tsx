'use client';

import { Note } from '@/hooks/useGet';
import Image from 'next/image';
import SurfeLogoDark from '@images/surfe_black_logo.webp';
import SurfeLogoWhite from '@images/surfe_white_logo.webp';
import { useEffect, useRef } from 'react';
import { useTheme } from '../ThemeProvider/ThemeProvider';

type SingleNoteProps = {
	note: Note;
	onClick: (note: Note) => void;
};

export const SingleNote = ({ note, onClick }: SingleNoteProps) => {
	const preview = useRef<HTMLDivElement>(null);
	const { theme } = useTheme();

	useEffect(() => {
		if (preview.current) {
			preview.current.innerHTML = note.body ?? '';
		}
	}, [note]);

	const themeLogoProvider = () => {
		if (theme === 'light') {
			return SurfeLogoDark;
		} else {
			return SurfeLogoWhite;
		}
	};

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
					<div className='w-12 '>
						<Image
							src={themeLogoProvider()}
							alt='Surfe Logo'
							draggable={false}
							width={48}
							height={15}
						/>
					</div>
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
