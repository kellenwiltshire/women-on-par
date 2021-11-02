import React, { useState } from 'react';
import Link from 'next/link';
import { LockClosedIcon } from '@heroicons/react/solid';
import { setCookie } from 'nookies';
import Router from 'next/router';

export default function login() {
	const [userEmail, setUserEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loginError, setLoginError] = useState(false);

	const submitForm = async (e) => {
		e.preventDefault();
		const loginInfo = {
			identifier: userEmail,
			password: password,
		};

		try {
			const login = await fetch(`/api/submitLogin`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(loginInfo),
			});

			const loginResponse = await login.json();

			Router.push(`/user/${loginResponse.user.username.toLowerCase()}`);
		} catch (error) {
			setLoginError(true);
		}
	};
	return (
		<>
			<div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-md w-full space-y-8'>
					<div>
						<img
							className='mx-auto h-12 w-auto'
							src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
							alt='Workflow'
						/>
						<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
							Sign in to your account
						</h2>
						<p className='mt-2 text-center text-sm text-gray-600'>
							Or{' '}
							<Link href='/login'>
								<a className='font-medium text-indigo-600 hover:text-indigo-500'>
									Register
								</a>
							</Link>
						</p>
					</div>
					{loginError ? (
						<div>
							<p className='mt-2 text-center text-sm text-red-600'>
								Login Error: Your Email or Password is Incorrect
							</p>
						</div>
					) : null}

					<form className='mt-8 space-y-6' onSubmit={submitForm}>
						<input type='hidden' name='remember' defaultValue='true' />
						<div className='rounded-md shadow-sm -space-y-px'>
							<div>
								<label htmlFor='email-address' className='sr-only'>
									Email address
								</label>
								<input
									id='email-address'
									name='email'
									type='email'
									autoComplete='email'
									required
									onChange={(e) => setUserEmail(e.target.value)}
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder='Email address'
								/>
							</div>
							<div>
								<label htmlFor='password' className='sr-only'>
									Password
								</label>
								<input
									id='password'
									name='password'
									type='password'
									autoComplete='current-password'
									required
									onChange={(e) => setPassword(e.target.value)}
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder='Password'
								/>
							</div>
						</div>

						<div className='flex items-center justify-between'>
							<div className='text-sm'>
								<a
									href='#'
									className='font-medium text-indigo-600 hover:text-indigo-500'
								>
									Forgot your password?
								</a>
							</div>
						</div>

						<div>
							<button
								type='submit'
								className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							>
								<span className='absolute left-0 inset-y-0 flex items-center pl-3'>
									<LockClosedIcon
										className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
										aria-hidden='true'
									/>
								</span>
								Sign in
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
