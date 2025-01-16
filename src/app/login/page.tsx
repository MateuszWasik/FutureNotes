'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import LoginImage from '@images/login_page_image.webp';
import SurfeLogo from '@images/surfe_black_logo.webp';
import { loginConst } from './login-const';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const router = useRouter();

	const searchForUser = (email: string, password: string) => {
		return loginConst.find(
			(user) => user.email === email && user.password === password
		);
	};

	const handleOnLogin = () => {
		if (email === '' || password === '') {
			alert('Please fill in the form');
		}
		const correctUserData = searchForUser(email, password);

		if (correctUserData) {
			let userId = Cookies.get('surfenotes-id');
			if (!userId) {
				userId = uuidv4();
				Cookies.set('surfenotes-id', userId, { expires: 1 });
			}
			router.push(`/dashboard/${userId}`);
		} else {
			alert('Invalid email or password');
		}
	};
	return (
		<section className='flex justify-center items-center h-screen mx-auto bg-[#111827]'>
			<div className='grid md:grid-cols-2 gap-5 place-items-center h-[400px]'>
				<div className='md:col-span-1'>
					<div className='form flex flex-col item-center justify-center'>
						<div className='flex flex-wrap items-center flex-1 flex-row tracking-tight xl:tracking-tighter mb-3 gap-x-2 font-bold text-2xl lg:text-3xl xl:text-4xl'>
							<h1 className='pl-3 md:pl-0 text-sky200'>Welcome to</h1>
							<div className='flex'>
								<Image
									className='p-4 w-[150px] h-[70px] bg-primary'
									src={SurfeLogo}
									alt=''
									width={150}
									height={70}
									draggable={false}
								/>
							</div>
						</div>
						<div className='flex flex-col gap-2'>
							<label htmlFor='form_email' className='pl-2 text-sky200 text-md'>
								Email
							</label>
							<input
								onChange={(e) => setEmail(e.target.value)}
								id='form_email'
								type='text'
								className='appearance-none bg-[#2e416d] focus:outline-none focus:outline-funBlue h-9 rounded-md text-white px-2'
							/>
							<label
								htmlFor='form_password'
								className='pl-2 text-sky200 text-md'
							>
								Password
							</label>
							<input
								onChange={(e) => setPassword(e.target.value)}
								id='form_password'
								type='password'
								className='appearance-none bg-[#2e416d] focus:outline-none focus:outline-funBlue h-9 rounded-md text-white px-2'
							/>
							<div className='flex justify-between items-center mt-4'>
								<button
									onClick={() => {
										handleOnLogin();
									}}
									className='block px-4 py-2 text-secondary bg-primary rounded-lg bg-funBlue text-lg font-bold tracking-tight xl:tracking-tighter w-fit text-center'
								>
									Log in
								</button>
								<a
									role='link'
									href=''
									className='block font-semibold text-sky200'
								>
									Forget password?
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className='hidden md:block md:col-span-1 md:col-start-2 object-contain'>
					<Image
						src={LoginImage}
						alt='Four people leaing over a laptop sits on the lap of a person siting on a sofa'
						height='300'
					/>
				</div>
			</div>
		</section>
	);
}
