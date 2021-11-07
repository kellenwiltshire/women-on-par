import React from 'react';
import EnterScore from './Scores/EnterScore';
import ScoresList from './Scores/ScoresList';
import {
	useScheduleContext,
	useScoreContext,
	useUserContext,
} from '@/context/Store';
import {
	findLastScheduledRound,
	findPriorRound,
} from '@/utils/sortingFunctions';

export default function Scores() {
	const schedule = useScheduleContext();
	const scores = useScoreContext();
	const user = useUserContext();

	const priorRound = findPriorRound(scores);

	const lastScheduledRound = findLastScheduledRound(schedule);
	return (
		<div className='px-4 py-8 sm:px-0'>
			<EnterScore
				priorRound={priorRound}
				user={user}
				lastScheduledRound={lastScheduledRound}
				userScores={scores}
			/>
			<ScoresList scores={scores} />
		</div>
	);
}
