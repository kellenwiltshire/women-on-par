import React from 'react';
import DashboardCards from './Dashboard/DashboardCards';

export default function Dashboard({ schedules }) {
	return (
		<div className='px-4 py-8 sm:px-0'>
			<DashboardCards schedules={schedules} />
		</div>
	);
}
