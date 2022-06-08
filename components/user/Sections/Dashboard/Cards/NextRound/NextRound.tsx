import React, { useState, useEffect } from 'react';
import { CalendarIcon } from '@heroicons/react/outline';
import { findNextRound } from '@/utils/sortingFunctions';
import NextRoundInfo from './NextRoundInfo';
import NextRoundForm from './NextRoundForm';
import { useScheduleContext, useUserContext } from '@/context/Store';
import SaveSuccess from '@/components/Notifications/SaveSuccess';
import SaveFail from '@/components/Notifications/SaveFail';

function findCurrentRound(schedules) {
	const currDate = new Date();

	if (schedules.length) {
		const nextRound = schedules.filter((round) => {
			const date = new Date(round.date);
			if (date < currDate) {
				return round;
			}
		});

		return nextRound[nextRound.length - 1];
	} else {
		const nextRound = {};
		return nextRound;
	}
}

export default function NextRound(): JSX.Element {
	const user = useUserContext();
	const schedule = useScheduleContext();
	const currDate = new Date();

	const [success, setSuccess] = useState(false);
	const [failure, setFailure] = useState(false);

	const [nextRound, setNextRound] = useState(findNextRound(schedule));

	const [cutOffPast, setCutOffPast] = useState(false);

	useEffect(() => {
		const dayOfWeek = currDate.getDay(); //0 is Sunday

		if (dayOfWeek >= 1 && dayOfWeek <= 3) {
			if (dayOfWeek === 3) {
				const time = currDate.getHours();

				if (time > 14) {
					setCutOffPast(false);
				} else {
					setNextRound(findCurrentRound(schedule));
					setCutOffPast(true);
				}
			} else {
				setCutOffPast(true);
			}
		}
	}, []);

	return (
		<div className='rounded-tl-lg rounded-tr-lg sm:rounded-tr-none relative group bg-white p-6'>
			{success ? <SaveSuccess show={success} setShow={setSuccess} /> : null}
			{failure ? <SaveFail show={failure} setShow={setFailure} /> : null}
			<div className='rounded-lg inline-flex p-3 ring-4 ring-white'>
				<CalendarIcon className='h-6 w-6' aria-hidden='true' />
			</div>
			<NextRoundInfo nextRound={nextRound} />
			<NextRoundForm user={user} setSuccess={setSuccess} setFailure={setFailure} cutOffPast={cutOffPast} />
		</div>
	);
}
