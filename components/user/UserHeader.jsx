import { useUserContext } from '@/context/Store';
import React, { useEffect } from 'react';
import Image from 'next/image';

export default function UserHeader() {
	const user = useUserContext();
	console.log(user);
	const [picture, setPicture] = useState('/brand/logoNoText.jpg');

	useEffect(() => {
		user.picture.picture.url
			? setPicture(user.picture.picture.url)
			: setPicture('/brand/logoNoText.jpg');
	}, []);
	return (
		<header className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
			<div className='md:flex md:items-center md:justify-between md:space-x-5'>
				<div className='flex items-start space-x-5'>
					<div className='flex-shrink-0'>
						<div className='relative'>
							<Image
								className='h-24 w-24 rounded-full'
								src={picture}
								alt=''
								height={96}
								width={96}
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
