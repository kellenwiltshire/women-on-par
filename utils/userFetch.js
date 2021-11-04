const fetchCourses = async () => {
	const res = await fetch(`/api/getCourses`);

	const courses = await res.json();

	return courses;
};

const fetchUser = async () => {
	const res = await fetch(`/api/getCurrentUser`);
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

export async function getUserData() {
	const user = await fetchUser();

	if (user.role.type === 'admin') {
		const scores = await fetchScores(user);

		const schedules = await fetchSchedule();

		const courses = await fetchCourses();

		const allScores = await fetchAllScores();

		const allUsers = await fetchAllUsers();

		const userData = { user, scores, schedules, courses, allScores, allUsers };

		return userData;
	} else {
		const scores = await fetchScores(user);

		const schedules = await fetchSchedule();

		const courses = await fetchCourses();

		const userData = { user, scores, schedules, courses };

		return userData;
	}
}
