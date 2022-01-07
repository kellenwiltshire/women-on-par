import React from 'react';
import ScheduleCards from './ScheduleCards';

export default function TeetimeSchedule({ teeTimes }) {
	const scheduledRound = teeTimes.teeTimeSchedule;
	const waitingList = teeTimes.waitingList;
	return (
		<div className='mb-5'>
			<h2 className='text-gray-500 text-xs font-medium uppercase tracking-wide'>COURSE NAME - DATE - START TIME</h2>
			<div className='mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4'>
				<ScheduleCards schedule={scheduledRound} waitingList={waitingList} />

				<div className='col-span-4 flex flex-row gap-1 my-2'>
					<button className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
						PRINT
					</button>
					<button
						type='reset'
						className='inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						CANCEL
					</button>
				</div>
			</div>
		</div>
	);
}
