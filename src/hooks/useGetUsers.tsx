import { useEffect, useState } from 'react';

export type User = {
	first_name: string;
	last_name: string;
	username: string;
};

export const useGetUsers = () => {
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const fetchOptions = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			};

			try {
				const response = await fetch(
					`https://challenge.surfe.com/users`,
					fetchOptions
				);
				const data = await response.json();

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}

				setUsers(data);
			} catch (error) {
				console.error('Error saving note:', error);
			}
		};

		fetchData();
	}, []);

	return users;
};
