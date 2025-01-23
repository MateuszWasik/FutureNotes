'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export const Logout = () => {
	const router = useRouter();

	const handleOnLogout = () => {
		Cookies.remove('futurenotes-id');
		router.push('/');
	};
	return (
		<button
			onClick={handleOnLogout}
			className='p-3 font-bold rounded-md bg-horizon text-secondary'
		>
			Log off
		</button>
	);
};
