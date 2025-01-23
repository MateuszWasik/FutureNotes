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
				const response = await new Promise<Response>((resolve, reject) => {
					fetch(``, fetchOptions)
						.then((response) => {
							if (response.ok) {
								resolve(response);
							} else {
								reject(new Error('Network response was not ok'));
							}
						})
						.catch((error) => {
							reject(error);
						});
				});
				const data = await response.json();
				setUsers(data);
			} catch (error) {
				console.error('Error saving note:', error);
			}
		};

		fetchData();
	}, []);

	return users;
};
