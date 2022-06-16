import React, { useState, useEffect } from 'react';
import { CalendarIcon } from '@heroicons/react/outline';
import { findNextRound } from '@/utils/sortingFunctions';
import NextRoundInfo from './NextRoundInfo';
import NextRoundForm from './NextRoundForm';
import { useScheduleContext, useUserContext } from '@/context/Store';
import SaveSuccess from '@/components/Notifications/SaveSuccess';
import SaveFail from '@/components/Notifications/SaveFail';
import useSWR from 'swr';
import DashboardCardLoading from '@/components/LoadingModals/DashboardCardLoading';

const fetcher = (url) => fetch(url).then((r) => r.json());

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
	const { data: schedule, error: scheduleError } = useSWR('/api/getSchedule', fetcher);

	const user = useUserContext().user;

	const [success, setSuccess] = useState(false);
	const [failure, setFailure] = useState(false);
	const [nextRound, setNextRound] = useState();

	const [cutOffPast, setCutOffPast] = useState(false);

	if (scheduleError) return <div>Failed to load</div>;
	if (!schedule) return <DashboardCardLoading />;

	setNextRound(findNextRound(schedule));
	const currDate = new Date();

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
			<NextRoundForm
				user={user}
				setSuccess={setSuccess}
				setFailure={setFailure}
				cutOffPast={cutOffPast}
				nextRound={nextRound}
			/>
		</div>
	);
}
