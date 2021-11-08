import React from 'react';
import { CalendarIcon } from '@heroicons/react/outline';
import { findNextRound } from '@/utils/sortingFunctions';
import NextRoundInfo from './NextRoundInfo';
import NextRoundForm from './NextRoundForm';
import { useScheduleContext, useUserContext } from '@/context/Store';

export default function NextRound() {
	const user = useUserContext();
	const schedule = useScheduleContext();

	const nextRound = findNextRound(schedule);
	if (nextRound) {
		return (
			<div className='rounded-tl-lg rounded-tr-lg sm:rounded-tr-none relative group bg-white p-6'>
				<div>
					<span className='rounded-lg inline-flex p-3 ring-4 ring-white'>
						<CalendarIcon className='h-6 w-6' aria-hidden='true' />
					</span>
				</div>
				<NextRoundInfo nextRound={nextRound} />
				<NextRoundForm user={user} />
			</div>
		);
	} else {
		return <div></div>;
	}
}
