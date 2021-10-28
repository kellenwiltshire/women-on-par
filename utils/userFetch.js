const fetchCourses = async (jwt) => {
	const res = await fetch('http://localhost:1337/courses', {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	const courses = await res.json();

	return courses;
};

const fetchUser = async (jwt) => {
	const res = await fetch(`http://localhost:1337/users/me`, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});
	const user = await res.json();

	return user;
};

const fetchScores = async (jwt, user) => {
	const res = await fetch(`http://localhost:1337/scores`, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});
	const scores = await res.json();

	const filteredScores = scores.filter((score) => {
		return score.user?.username === user.username;
	});

	return filteredScores;
};

const fetchSchedule = async (jwt) => {
	const schedRes = await fetch(`http://localhost:1337/schedules`, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});
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
