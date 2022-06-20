import React, { useState } from 'react';
import { CalendarIcon } from '@heroicons/react/outline';
import NextRoundInfo from './NextRoundInfo';
import NextRoundForm from './NextRoundForm';
import { useUserStore } from '@/context/Store';
import SaveSuccess from '@/components/Notifications/SaveSuccess';
import SaveFail from '@/components/Notifications/SaveFail';
import useSWR from 'swr';
import DashboardCardLoading from '@/components/LoadingModals/DashboardCardLoading';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function NextRound(): JSX.Element {
	const { data: schedule, error: scheduleError } = useSWR('/api/getSchedule', fetcher);

	const user = useUserStore().user;

	const [success, setSuccess] = useState(false);
	const [failure, setFailure] = useState(false);

	if (scheduleError) return <div>Failed to load</div>;
	if (!schedule) return <DashboardCardLoading />;

	return (
		<div className='rounded-tl-lg rounded-tr-lg sm:rounded-tr-none relative group bg-white p-6'>
			{success ? <SaveSuccess show={success} setShow={setSuccess} /> : null}
			{failure ? <SaveFail show={failure} setShow={setFailure} /> : null}
			<div className='rounded-lg inline-flex p-3 ring-4 ring-white'>
				<CalendarIcon className='h-6 w-6' aria-hidden='true' />
			</div>
			<NextRoundInfo schedule={schedule} />
			<NextRoundForm user={user} setSuccess={setSuccess} setFailure={setFailure} schedule={schedule} />
		</div>
	);
}
