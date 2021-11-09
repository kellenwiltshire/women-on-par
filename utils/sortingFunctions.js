export function findNextRound(schedules) {
	const currDate = new Date();

	if (schedules.length) {
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
	} else {
		const nextRound = {};
		return nextRound;
	}
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

export function findLastScheduledRound(schedules) {
	const currDate = new Date();

	if (schedules.length) {
		const lastRounds = schedules.filter((round) => {
			const date = Date.parse(round.date);
			if (date < currDate) {
				return round;
			}
		});

		const lastRoundsSorted = lastRounds.sort((a, b) => {
			const aDate = Date.parse(a.date);
			const bDate = Date.parse(b.date);

			return bDate - aDate;
		});

		const lastRound = lastRoundsSorted[0];

		return lastRound;
	} else {
		const lastRound = {};
		return lastRound;
	}
}

export function findMostRecentNews(news) {
	const newsSorted = news.sort((a, b) => {
		const aDate = Date.parse(a.date);
		const bDate = Date.parse(b.date);

		return bDate - aDate;
	});

	const recentNews = newsSorted[0];

	return recentNews;
}
