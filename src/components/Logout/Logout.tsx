'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export const Logout = () => {
	const router = useRouter();

	const handleOnLogout = () => {
		Cookies.remove('surfenotes-id');
		router.push('/');
	};
	return (
		<button
			onClick={handleOnLogout}
			className='p-4 font-bold rounded-md bg-secondary text-white'
		>
			Log off
		</button>
	);
};
