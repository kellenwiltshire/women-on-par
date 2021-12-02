import Modal from '@/components/Modals/Modal';
import SaveFail from '@/components/Notifications/SaveFail';
import SaveSuccess from '@/components/Notifications/SaveSuccess';
import { useUserContext } from '@/context/Store';
import { Router } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function SettingsPage() {
	const user = useUserContext();
	const [firstName, setFirstName] = useState(user.first_name);
	const [lastName, setLastName] = useState(user.last_name);
	const [email, setEmail] = useState(user.email);
	const [success, setSuccess] = useState(false);
	const [failure, setFailure] = useState(false);
	const [picture, setPicture] = useState('/avatars/avatar.png');
	const [phone, setPhone] = useState(user.phone);
	const [conditions, setConditions] = useState(user.conditions);
	const [open, setOpen] = useState(false);
	const [uploadPicture, setUploeadPicture] = useState(false);

	useEffect(() => {
		if (user.picture) {
			setPicture(user.picture.picture.url);
		}
	}, []);

	const submitChange = async (e) => {
		e.preventDefault();

		const info = {
			id: user.id,
			data: {
				username: email,
				first_name: firstName,
				last_name: lastName,
				email: email,
				phone: phone,
				conditions: conditions,
			},
		};

		const res = await fetch('/api/editUser', {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(info),
		});

		if (res.status < 300) {
			setSuccess(true);
		} else {
			console.log(res);
			setFailure(true);
		}
	};

	const resetPassword = async () => {
		const req = await fetch('/api/resetPassword', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(email),
		});

		if (req.status < 300) {
			setOpen(true);
		} else {
			setFailure(true);
		}
	};

	return (
		<form
			onSubmit={submitChange}
			className='space-y-8 divide-y divide-gray-200'
		>
			{success ? <SaveSuccess show={success} setShow={setSuccess} /> : null}
			{failure ? <SaveFail show={failure} setShow={setFailure} /> : null}

			{uploadPicture ? (
				<Modal open={uploadPicture} setOpen={setUploeadPicture}>
					TEST
				</Modal>
			) : null}

			{
				//TODO Make this prettier
				open ? (
					<Modal open={open} setOpen={setOpen}>
						An email has been sent to your inbox to begin the password reset
						process.
					</Modal>
				) : null
			}
			<div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
				<div>
					<div>
						<h3 className='text-lg leading-6 font-medium text-gray-900'>
							User Information
						</h3>
					</div>

					<div className='mt-6 sm:mt-5 space-y-6 sm:space-y-5'>
						<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
							<label
								htmlFor='firstName'
								className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
							>
								First Name
							</label>
							<div className='mt-1 sm:mt-0 sm:col-span-2'>
								<div className='max-w-lg flex rounded-md shadow-sm'>
									<input
										type='name'
										name='firstName'
										id='firstName'
										onChange={(e) => setFirstName(e.target.value)}
										value={firstName}
										className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3'
										placeholder={firstName}
									/>
								</div>
							</div>
						</div>
						<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
							<label
								htmlFor='lastName'
								className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
							>
								Last Name
							</label>
							<div className='mt-1 sm:mt-0 sm:col-span-2'>
								<div className='max-w-lg flex rounded-md shadow-sm'>
									<input
										type='name'
										name='lastName'
										id='lastName'
										onChange={(e) => setLastName(e.target.value)}
										value={lastName}
										className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3'
										placeholder={lastName}
									/>
								</div>
							</div>
						</div>

						<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
							<label
								htmlFor='email'
								className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
							>
								Email
							</label>
							<div className='mt-1 sm:mt-0 sm:col-span-2'>
								<div className='max-w-lg flex rounded-md shadow-sm'>
									<input
										type='email'
										name='email'
										id='email'
										onChange={(e) => setEmail(e.target.value)}
										value={email}
										className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3'
										placeholder={email}
									/>
								</div>
							</div>
						</div>
						<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
							<label
								htmlFor='phone'
								className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
							>
								Phone Number
							</label>
							<div className='mt-1 sm:mt-0 sm:col-span-2'>
								<div className='max-w-lg flex rounded-md shadow-sm'>
									<input
										type='phone'
										name='phone'
										id='phone'
										onChange={(e) => setPhone(e.target.value)}
										value={phone}
										className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3'
										placeholder={phone}
									/>
								</div>
							</div>
						</div>

						<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
							<label
								htmlFor='conditions'
								className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
							>
								Conditions
							</label>
							<div className='mt-1 sm:mt-0 sm:col-span-2'>
								<div className='max-w-lg flex rounded-md shadow-sm'>
									<input
										type='text'
										rows={4}
										name='conditions'
										id='conditions'
										onChange={(e) => setConditions(e.target.value)}
										value={conditions}
										className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3'
										placeholder={conditions}
									/>
								</div>
							</div>
						</div>

						<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
							<label
								htmlFor='password'
								className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
							>
								Password
							</label>
							<div className='mt-1 sm:mt-0 sm:col-span-2'>
								<button
									onClick={resetPassword}
									type='button'
									className='bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
								>
									Change/Reset Password
								</button>
							</div>
						</div>

						<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5'>
							<label
								htmlFor='photo'
								className='block text-sm font-medium text-gray-700'
							>
								Photo
							</label>
							<div className='mt-1 sm:mt-0 sm:col-span-2'>
								<div className='flex items-center'>
									<span className='h-12 w-12 rounded-full overflow-hidden bg-gray-100'>
										<img src={picture} />
									</span>
									<button
										onClick={() => setUploeadPicture(true)}
										type='button'
										className='ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
									>
										Change
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='pt-5'>
				<div className='flex justify-end'>
					<button
						type='button'
						className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						Cancel
					</button>
					<button
						type='submit'
						className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						Save
					</button>
				</div>
			</div>
		</form>
	);
}
