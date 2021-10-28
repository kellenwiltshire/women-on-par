export function findNextRound(schedules) {
	const currDate = new Date();

	const futureRounds = schedules.filter((round) => {
		const date = Date.parse(round.date);
		if (date > currDate) {
			return round;
		}
	});

	const futureRoundsSorted = futureRounds.sort((a, b) => {
		const aDate = Date.parse(a.date);
		const bDate = Date.parse(b.date);

		return aDate - bDate;
	});

	const nextRound = futureRoundsSorted[0];

	return nextRound;
}

export function findPriorRound(scores) {
	const scoresSorted = scores.sort((a, b) => {
		const aDate = Date.parse(a.date);
		const bDate = Date.parse(b.date);

		return bDate - aDate;
	});

	const priorRound = scoresSorted[0];

	return priorRound;
}
