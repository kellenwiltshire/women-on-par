import React, { useState } from 'react';
import EnterScore from './Scores/EnterScore';
import ScoresList from './Scores/ScoresList';

export default function Scores({
	scores,
	priorRound,
	user,
	lastScheduledRound,
}) {
	const [userScores, setUserScores] = useState(scores);

	return (
		<div className='px-4 py-8 sm:px-0'>
			<EnterScore
				priorRound={priorRound}
				user={user}
				lastScheduledRound={lastScheduledRound}
				userScores={userScores}
				setUserScores={setUserScores}
			/>
			<ScoresList scores={userScores} />
		</div>
	);
}
