const fetchCourses = async (jwt) => {
	const res = await fetch('https://women-on-par-db.herokuapp.com/courses', {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	const courses = await res.json();

	return courses;
};

const fetchUser = async (jwt) => {
	const res = await fetch(`https://women-on-par-db.herokuapp.com/users/me`, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});
	const user = await res.json();

	return user;
};

const fetchScores = async (jwt, user) => {
	const res = await fetch(`https://women-on-par-db.herokuapp.com/scores`, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});
	const scores = await res.json();

	if (scores.length) {
		const filteredScores = scores.filter((score) => {
			return score.user?.username === user.username;
		});

		return filteredScores;
	} else {
		const filteredScores = [];
		return filteredScores;
	}
};

const fetchSchedule = async (jwt) => {
	const schedRes = await fetch(
		`https://women-on-par-db.herokuapp.com/schedules`,
		{
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		},
	);
	const schedules = await schedRes.json();

	return schedules;
};

export async function getUserData(jwt) {
	const user = await fetchUser(jwt);

	const scores = await fetchScores(jwt, user);

	const schedules = await fetchSchedule(jwt);

	const courses = await fetchCourses(jwt);

	const userData = { user, scores, schedules, courses };

	return userData;
}
