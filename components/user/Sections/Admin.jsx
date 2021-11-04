import React, { useState } from 'react';
import AdminTabs from './Admin/AdminTabs';
import NextRoundTable from './Admin/NextRoundTable';
import UserScores from './Admin/UserScores';
import UserTable from './Admin/UserTable';

export default function Admin({ nextRound, allUsers, allScores }) {
	const [adminTab, setAdminTab] = useState(1);
	return (
		<>
			<div className='px-4 py-8 sm:px-0'>
				<AdminTabs adminTab={adminTab} setAdminTab={setAdminTab} />
			</div>
			<div className='bg-white lg:min-w-0 lg:flex-1'>
				<div className={adminTab === 1 ? 'block' : 'hidden'}>
					<UserTable allUsers={allUsers} />
				</div>
				<div className={adminTab === 2 ? 'block' : 'hidden'}>
					<NextRoundTable nextRound={nextRound} allUsers={allUsers} />
				</div>
				<div className={adminTab === 3 ? 'block' : 'hidden'}>
					<UserScores allScores={allScores} />
				</div>

				<div className={adminTab === 4 ? 'block' : 'hidden'}></div>
			</div>
		</>
	);
}
