import { useUserContext } from '@/context/Store';
import React from 'react';

export default function UserHeader() {
	const user = useUserContext();
	console.log(user);
	return (
		<header className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
			<div className='md:flex md:items-center md:justify-between md:space-x-5'>
				<div className='flex items-start space-x-5'>
					<div className='flex-shrink-0'>
						<div className='relative'>
							<img
								className='h-24 w-24 rounded-full'
								src='https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80'
								alt=''
							/>
							<span
								className='absolute inset-0 shadow-inner rounded-full'
								aria-hidden='true'
							/>
						</div>
					</div>
					{/*
          Use vertical padding to simulate center alignment when both lines of text are one line,
          but preserve the same layout if the text wraps without making the image jump around.
        */}
					<div className='pt-1.5'>
						<h1 className='text-2xl font-bold text-gray-900'>{`${user.first_name} ${user.last_name}`}</h1>
						<p className='text-sm font-medium text-gray-500'>{user.email}</p>
					</div>
				</div>
			</div>
		</header>
	);
}
