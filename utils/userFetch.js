const url = process.env.DATABASE_URL;

const fetchCourses = async (jwt) => {
	const res = await fetch(`${url}/courses`, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	const courses = await res.json();

	return courses;
};

const fetchUser = async (jwt) => {
	const res = await fetch(`${url}/users/me`, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});
	const user = await res.json();

	return user;
};

const fetchScores = async (user) => {
	const res = await fetch(`/api/getScores`);
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

const fetchSchedule = async () => {
	const schedRes = await fetch(`api/getSchedule`);
	const schedules = await schedRes.json();

	return schedules;
};

const fetchAllScores = async () => {
	const scoresReq = await fetch(`/api/getScores`);

	const scores = await scoresReq.json();

	return scores;
};

const fetchAllUsers = async () => {
	const usersReq = await fetch(`/api/getUsers`);

	const allUsers = await usersReq.json();

	return allUsers;
};

export async function getUserData(jwt) {
	const user = await fetchUser(jwt);

	if (user.role.type === 'admin') {
		const scores = await fetchScores(user);

		const schedules = await fetchSchedule();

		const courses = await fetchCourses(jwt);

		const allScores = await fetchAllScores();

		const allUsers = await fetchAllUsers();

		const userData = { user, scores, schedules, courses, allScores, allUsers };

		return userData;
	} else {
		const scores = await fetchScores(user);

		const schedules = await fetchSchedule();

		const courses = await fetchCourses(jwt);

		const userData = { user, scores, schedules, courses };

		return userData;
	}
}
