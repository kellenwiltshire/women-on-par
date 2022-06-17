import React, { useState } from 'react';
import EnterScore from './Scores/EnterScore';
import ScoresList from './Scores/ScoresList';
import { useUserStore } from '@/context/Store';
import { findLastScheduledRound, getUserScores } from '@/utils/sortingFunctions';
import SaveSuccess from '@/components/Notifications/SaveSuccess';
import SaveFail from '@/components/Notifications/SaveFail';
import useSWR from 'swr';
import TableLoading from '@/components/LoadingModals/TableLoading';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Scores(): JSX.Element {
	const { data: schedule, error: scheduleError } = useSWR('/api/getSchedule', fetcher);
	const { data: scores, error: scoresError } = useSWR('/api/getScores', fetcher);

	const userStore = useUserStore();
	const user = userStore.user;

	const [success, setSuccess] = useState(false);
	const [failure, setFailure] = useState(false);

	if (scoresError) return <div>Failed to load Scores</div>;
	if (scheduleError) return <div>Failed to load Schedule Info</div>;

	if (!scores || !schedule) return <TableLoading />;

	const lastScheduledRound = findLastScheduledRound(schedule);

	const userScores = getUserScores(user, scores);
	return (
		<div className='px-4 py-8 sm:px-0'>
			{success ? <SaveSuccess show={success} setShow={setSuccess} /> : null}
			{failure ? <SaveFail show={failure} setShow={setFailure} /> : null}
			{scores[scores.length - 1].date === lastScheduledRound.date || !lastScheduledRound ? null : (
				<EnterScore
					user={user}
					lastScheduledRound={lastScheduledRound}
					userScores={userScores}
					setSuccess={setSuccess}
					setFailure={setFailure}
				/>
			)}

			<ScoresList scores={userScores} />
		</div>
	);
}
