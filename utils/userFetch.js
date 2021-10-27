export async function fetchCourses(jwt) {
	const res = await fetch('http://localhost:1337/courses', {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	const courses = await res.json();

	return courses;
}

export async function fetchUser(jwt) {
	const res = await fetch(`http://localhost:1337/users/me`, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});
	const user = await res.json();

	return user;
}

export async function fetchScores(jwt, user) {
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
}

export async function fetchSchedule(jwt) {
	const schedRes = await fetch(`http://localhost:1337/schedules`, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});
	const schedules = await schedRes.json();

	return schedules;
}
