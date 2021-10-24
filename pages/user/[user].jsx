import React, { useState } from 'react';
import Siderbar from '../../components/user/Sidebar';
import UserHeader from '../../components/user/UserHeader';
import { CogIcon, HomeIcon, PencilIcon } from '@heroicons/react/outline';
import Dashboard from '../../components/user/Sections/Dashboard';
import Scores from '../../components/user/Sections/Scores';
import Settings from '../../components/user/Sections/Settings';

const user = {
	name: 'Tom Cook',
	email: 'tom@example.com',
	imageUrl:
		'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const navigation = [
	{ num: 1, name: 'Dashboard', icon: HomeIcon },
	{ num: 2, name: 'Scores', icon: PencilIcon },
	{ num: 3, name: 'Settings', icon: CogIcon },
];

export default function User() {
	const [openTab, setOpenTab] = useState(1);
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
								<Siderbar
									openTab={openTab}
									setOpenTab={setOpenTab}
									navigation={navigation}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className='bg-white lg:min-w-0 lg:flex-1'>
					<div className={openTab === 1 ? 'block' : 'hidden'}>
						<Dashboard />
					</div>
					<div className={openTab === 2 ? 'block' : 'hidden'}>
						<Scores />
					</div>
					<div className={openTab === 3 ? 'block' : 'hidden'}>
						<Settings />
					</div>
				</div>
			</div>
		</div>
	);
}