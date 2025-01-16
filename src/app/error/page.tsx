'use client';

import { useRouter } from 'next/navigation';

export default function Error() {
	const router = useRouter();

	const handleRedirectionToLogin = () => {
		router.push('/');
	};

	return (
		<div>
			<h1> Looks like you are trying to access a page without log in. </h1>
			<button onClick={handleRedirectionToLogin}>Log in</button>
		</div>
	);
}
