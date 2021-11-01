import React, { useState } from 'react';
import Siderbar from '@/components/user/Sidebar';
import UserHeader from '@/components/user/UserHeader';
import {
	CogIcon,
	HomeIcon,
	PencilIcon,
	UserIcon,
} from '@heroicons/react/outline';
import Dashboard from '@/components/user/Sections/Dashboard';
import Scores from '@/components/user/Sections/Scores';
import Settings from '@/components/user/Sections/Settings';
import { parseCookies } from 'nookies';
import { getUserData } from '@/utils/userFetch';
import {
	findLastScheduledRound,
	findNextRound,
	findPriorRound,
} from '@/utils/sortingFunctions';
import Admin from '@/components/user/Sections/Admin';

const navigation = [
	{ num: 1, name: 'Dashboard', icon: HomeIcon },
	{ num: 2, name: 'Scores', icon: PencilIcon },
	{ num: 3, name: 'Settings', icon: CogIcon },
];

const adminNav = [
	{ num: 1, name: 'Dashboard', icon: HomeIcon },
	{ num: 2, name: 'Scores', icon: PencilIcon },
	{ num: 3, name: 'Settings', icon: CogIcon },
	{ num: 4, name: 'Admin', icon: UserIcon },
];

export default function User({ scores, user, schedules }) {
	const [openTab, setOpenTab] = useState(1);

	const nextRound = findNextRound(schedules);

	const priorRound = findPriorRound(scores);

	const lastScheduledRound = findLastScheduledRound(schedules);

	if (user.role.type === 'admin') {
		return (
			<div className='py-10'>
				<UserHeader name={user.first_name} />
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
										navigation={adminNav}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className='bg-white lg:min-w-0 lg:flex-1'>
						<div className={openTab === 1 ? 'block' : 'hidden'}>
							<Dashboard
								nextRound={nextRound}
								priorRound={priorRound}
								user={user}
							/>
						</div>
						<div className={openTab === 2 ? 'block' : 'hidden'}>
							<Scores
								scores={scores}
								priorRound={priorRound}
								user={user}
								lastScheduledRound={lastScheduledRound}
							/>
						</div>
						<div className={openTab === 3 ? 'block' : 'hidden'}>
							<Settings />
						</div>
						<div className={openTab === 4 ? 'block' : 'hidden'}>
							<Admin user={user} nextRound={nextRound} />
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className='py-10'>
				<UserHeader name={user.first_name} />
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
							<Dashboard
								nextRound={nextRound}
								priorRound={priorRound}
								user={user}
							/>
						</div>
						<div className={openTab === 2 ? 'block' : 'hidden'}>
							<Scores
								scores={scores}
								priorRound={priorRound}
								user={user}
								lastScheduledRound={lastScheduledRound}
							/>
						</div>
						<div className={openTab === 3 ? 'block' : 'hidden'}>
							<Settings />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export async function getServerSideProps(pageProps) {
	const jwt = parseCookies(pageProps).jwt;

	const userData = await getUserData(jwt);

	return {
		props: {
			scores: userData.scores,
			user: userData.user,
			schedules: userData.schedules,
			courses: userData.courses,
		},
	};
}
