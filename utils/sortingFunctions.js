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

export function findPriorRoundResults(allScores, date) {
	const priorRoundScores = allScores.filter((score) => {
		const scoreDate = Date.parse(score.date);
		const roundDate = Date.parse(date);

		if (scoreDate === roundDate) {
			return score;
		}
	});

	return priorRoundScores;
}

export function findPriorRoundWinner(scores) {
	const winningGolfer = scores.sort((a, b) => {
		return a.score - b.score;
	});

	return winningGolfer[0];
}

export function getUserScores(user, allScores) {
	const userScores = allScores.filter((score) => {
		if (score.user.email === user.email) {
			return score;
		}
	});

	return userScores;
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
		const aDate = Date.parse(a.created_at);
		const bDate = Date.parse(b.created_at);

		return bDate - aDate;
	});

	const recentNews = newsSorted[0];

	return recentNews;
}

export function findNextSpecialEvent(events) {
	const currDate = new Date();

	const futureEvents = events.filter((event) => {
		const date = Date.parse(event.date);
		if (date > currDate) {
			return event;
		}
	});

	const eventsSorted = futureEvents.sort((a, b) => {
		const aDate = Date.parse(a.created_at);
		const bDate = Date.parse(b.created_at);

		return bDate - aDate;
	});

	return eventsSorted[0];
}

export function sortSchedule(schedule) {
	const scheduleSorted = schedule.sort((a, b) => {
		const aDate = Date.parse(a.date);
		const bDate = Date.parse(b.date);

		return aDate - bDate;
	});

	return scheduleSorted;
}
