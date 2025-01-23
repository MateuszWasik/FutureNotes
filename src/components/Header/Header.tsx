'use client';
import { Logout } from '../Logout/Logout';
import { AddNote } from '../AddNote/AddNote';

type HeaderProps = {
	onCreateNote: () => void;
};

export const Header = ({ onCreateNote }: HeaderProps) => {
	return (
		<header className='flex flex-col md:flex-row items-center justify-between w-full h-auto md:h-28 gap-4'>
			<div className='flex flex-row gap-2 items-center'>
				<h2>FUTURE</h2>
				<span className='text-xl p-2 md:p-4 md:text-[60px] font-bold bg-secondary text-white'>
					Notes
				</span>
			</div>

			<div className='flex flex-1 justify-between w-full'>
				<AddNote onCreateNote={onCreateNote} />
				<Logout />
			</div>
		</header>
	);
};
