import React, { useState } from 'react';
import Siderbar from '@/components/user/Sidebar';
import UserHeader from '@/components/user/UserHeader';
import { CogIcon, HomeIcon, PencilIcon, UserIcon } from '@heroicons/react/outline';
import Dashboard from '@/components/user/Sections/Dashboard';
import Scores from '@/components/user/Sections/Scores';
import Settings from '@/components/user/Sections/Settings';

import Admin from '@/components/user/Sections/Admin';

import useSWR from 'swr';
import UserLoading from '@/components/LoadingModals/UserLoading';
import { useUserStore } from '@/context/Store';

const fetcher = (url) => fetch(url).then((r) => r.json());

const adminNav = [
	{ num: 1, name: 'Dashboard', icon: HomeIcon },
	{ num: 2, name: 'Scores', icon: PencilIcon },
	{ num: 3, name: 'Settings', icon: CogIcon },
	{ num: 4, name: 'Admin', icon: UserIcon },
];

export default function AdminPage(): JSX.Element {
	const { data: user, error: userError } = useSWR('/api/getUser', fetcher);

	const userStore = useUserStore();
	userStore.updateUser(user);

	const [openTab, setOpenTab] = useState(1);

	if (userError) return <div>Failed to load</div>;
	if (!user) return <UserLoading />;

	return (
		<div className='py-10'>
			<UserHeader />

			<div className='flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex'>
				<div className='sm:pl-6 lg:pl-8 xl:pl-0'>
					<div className='flex items-center justify-between'>
						<div className='flex-1 space-y-8'>
							<div className='space-y-8 sm:space-y-0 sm:flex sm:justify-between sm:items-center xl:block xl:space-y-8'>
								<Siderbar openTab={openTab} setOpenTab={setOpenTab} navigation={adminNav} />
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
					<div className={openTab === 4 ? 'block' : 'hidden'}>
						<Admin />
					</div>
				</div>
			</div>
		</div>
	);
}
