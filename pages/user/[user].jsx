import React, { useState } from 'react';
import Siderbar from '../../components/user/Sidebar';
import UserHeader from '../../components/user/UserHeader';
import { CogIcon, HomeIcon, PencilIcon } from '@heroicons/react/outline';
import Dashboard from '../../components/user/Sections/Dashboard';
import Scores from '../../components/user/Sections/Scores';
import Settings from '../../components/user/Sections/Settings';
import { parseCookies } from 'nookies';

const navigation = [
	{ num: 1, name: 'Dashboard', icon: HomeIcon },
	{ num: 2, name: 'Scores', icon: PencilIcon },
	{ num: 3, name: 'Settings', icon: CogIcon },
];

export default function User({ scores, user, schedules }) {
	console.log(scores, user, schedules);
	const [openTab, setOpenTab] = useState(1);
	return (
		<div className='py-10'>
			<UserHeader name={user.username} />
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
						<Dashboard schedules={schedules} scores={scores} />
					</div>
					<div className={openTab === 2 ? 'block' : 'hidden'}>
						<Scores scores={scores} />
					</div>
					<div className={openTab === 3 ? 'block' : 'hidden'}>
						<Settings />
					</div>
				</div>
			</div>
		</div>
	);
}

export async function getServerSideProps(pageProps) {
	const jwt = parseCookies(pageProps).jwt;

	const res = await fetch(`http://localhost:1337/scores`, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});
	const scores = await res.json();

	const userRes = await fetch(`http://localhost:1337/users/me`, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});
	const user = await userRes.json();
	console.log(user);

	console.log('Scores: ', scores);

	const filteredScores = scores.filter((score) => {
		return score.user?.username === user.username;
	});

	const schedRes = await fetch(`http://localhost:1337/schedules`, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});
	const schedules = await schedRes.json();

	console.log(filteredScores);
	return {
		props: {
			scores: filteredScores,
			user: user,
			schedules: schedules,
		},
	};
}
