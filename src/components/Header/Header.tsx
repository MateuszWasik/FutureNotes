import Image from 'next/image';
import SurfeLogo from '@images/surfe_black_logo.webp';
import { Logout } from '../Logout/Logout';
import { AddNote } from '../AddNote/AddNote';

type HeaderProps = {
	onCreateNote: () => void;
};

export const Header = ({ onCreateNote }: HeaderProps) => {
	return (
		<header className='flex flex-col md:flex-row items-center justify-between w-full h-auto md:h-28 gap-4'>
			<div className='flex flex-row gap-2 items-center'>
				<Image
					src={SurfeLogo}
					alt=''
					width={150}
					height={50}
					className='w-[100px] md:w-[150px] h-[30px] md:h-[50px]'
				/>
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
