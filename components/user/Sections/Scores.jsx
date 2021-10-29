import React from 'react';
import EnterScore from './Scores/EnterScore';
import ScoresList from './Scores/ScoresList';

export default function Scores({ scores, priorRound, user }) {
	return (
		<div className='px-4 py-8 sm:px-0'>
			<EnterScore priorRound={priorRound} user={user} />
			<ScoresList scores={scores} />
		</div>
	);
}
