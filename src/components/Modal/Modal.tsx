import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import SurfeOption from '@images/surfe_option.webp';
import { useDebounce } from '@/hooks/useDebounce';
import { Note } from '@/hooks/useGet';
import { useSaveNote } from '@/hooks/useSaveNote';

type ModalProps = {
	note: Note;
	onClose: () => void;
};
export const Modal = ({ note, onClose }: ModalProps) => {
	const [inputValue, setInputValue] = useState(note.body ?? '');
	const saveNote = useSaveNote(note.id);
	const debouncedValue = useDebounce(inputValue, 1000);
	const previousValue = useRef<string>(note.body ?? '');

	useEffect(() => {
		if (debouncedValue && debouncedValue !== previousValue.current) {
			saveNote(debouncedValue);
			previousValue.current = debouncedValue;
		}
	}, [debouncedValue, saveNote, inputValue]);

	useEffect(() => {
		document.body.classList.add('modal-open');

		return () => {
			document.body.classList.remove('modal-open');
		};
	}, []);

	return (
		<div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-row w-[800px] max-w-[800px] h-[600px] rounded-md bg-white'>
			<div className='flex flex-col justify-between items-center py-4 w-24'>
				<ul className='flex flex-col gap-2 justify-center w-12 bg-white'>
					<li>
						<Image src={SurfeOption} alt='' draggable={false} />
					</li>
					<li>
						<Image src={SurfeOption} alt='' draggable={false} />
					</li>
					<li>
						<Image src={SurfeOption} alt='' draggable={false} />
					</li>
					<li>
						<Image src={SurfeOption} alt='' draggable={false} />
					</li>
					<li>
						<Image src={SurfeOption} alt='' draggable={false} />
					</li>
					<li>
						<Image src={SurfeOption} alt='' draggable={false} />
					</li>
				</ul>
				<button
					className='bg-secondary text-white p-2 rounded-lg'
					onClick={onClose}
				>
					Close
				</button>
			</div>
			<div className='p-4 pl-0 w-full'>
				<textarea
					style={{ resize: 'none' }}
					className='w-full h-full bg-primary p-4 focus-visible:outline-none'
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
			</div>
		</div>
	);
};
