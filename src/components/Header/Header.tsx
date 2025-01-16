import Image from 'next/image';
import SurfeLogo from '@images/surfe_black_logo.webp';
import { Logout } from '../Logout/Logout';
import { AddNote } from '../AddNote/AddNote';

type HeaderProps = {
	onCreateNote: () => void;
};

export const Header = ({ onCreateNote }: HeaderProps) => {
	return (
		<header className='flex flex-row items-center justify-between w-full h-28'>
			<div className='flex flex-row gap-2 items-center'>
				<Image src={SurfeLogo} alt='' width={150} height={50} />
				<span className='text-[60px] font-bold bg-secondary text-white'>
					Notes
				</span>
			</div>
			<AddNote onCreateNote={onCreateNote} />
			<Logout />
		</header>
	);
};
