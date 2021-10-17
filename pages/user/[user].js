import React from 'react';
import Siderbar from '../../components/user/Sidebar';
import UserHeader from '../../components/user/UserHeader';

const user = {
	name: 'Tom Cook',
	email: 'tom@example.com',
	imageUrl:
		'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

export default function User() {
	return (
		<div className='py-10'>
			<UserHeader name={user.name} />
			{/* 3 column wrapper */}
			<div className='flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex'>
				{/* 3 column wrapper */}
				<div className='pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0'>
					<div className='flex items-center justify-between'>
						<div className='flex-1 space-y-8'>
							<div className='space-y-8 sm:space-y-0 sm:flex sm:justify-between sm:items-center xl:block xl:space-y-8'>
								<Siderbar />
							</div>
						</div>
					</div>
				</div>
				<div className='bg-white lg:min-w-0 lg:flex-1'>
					{/* Replace with your content */}
					<div className='px-4 py-8 sm:px-0'>
						<div className='border-4 border-dashed border-gray-200 rounded-lg h-96' />
					</div>
					{/* /End replace */}
				</div>
			</div>
		</div>
	);
}
