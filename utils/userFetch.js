const url = process.env.PRODUCTION_URL;

const fetchCourses = async (jwt) => {
	const res = await fetch(`${url}/api/getCourses`, {
		method: 'POST',
		body: jwt,
	});

	const courses = await res.json();

	return courses;
};

const fetchUser = async (jwt) => {
	const res = await fetch(`${url}/api/getCurrentUser`, {
		method: 'POST',
		body: jwt,
	});
	const user = await res.json();

	return user;
};

const fetchScores = async (user, jwt) => {
	const res = await fetch(`${url}/api/getScores`, {
		method: 'POST',
		body: jwt,
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
	const schedRes = await fetch(`${url}/api/getSchedule`, {
		method: 'POST',
		body: jwt,
	});
	const schedules = await schedRes.json();

	return schedules;
};

const fetchAllScores = async (jwt) => {
	const scoresReq = await fetch(`${url}/api/getScores`, {
		method: 'POST',
		body: jwt,
	});

	const scores = await scoresReq.json();

	return scores;
};

const fetchAllUsers = async (jwt) => {
	const usersReq = await fetch(`${url}/api/getUsers`, {
		method: 'POST',
		body: jwt,
	});

	const allUsers = await usersReq.json();

	return allUsers;
};

export const fetchNews = async (jwt) => {
	const newsReq = await fetch(`${url}/api/getNews`, {
		method: 'POST',
		body: jwt,
	});

	const news = await newsReq.json();

	return news;
};

export const fetchArticle = async (jwt, id) => {
	const req = await fetch(`${url}/api/articles/${id}`, {
		method: 'POST',
		body: jwt,
	});

	const article = await req.json();

	return article;
};

export async function getAdminData(jwt) {
	const user = await fetchUser(jwt);

	const scores = await fetchScores(user, jwt);

	const schedules = await fetchSchedule(jwt);

	const courses = await fetchCourses(jwt);

	const allScores = await fetchAllScores(jwt);

	const allUsers = await fetchAllUsers(jwt);

	const news = await fetchNews(jwt);

	const userData = {
		user,
		scores,
		schedules,
		courses,
		allScores,
		allUsers,
		news,
	};

	return userData;
}

export async function getUserData(jwt) {
	const user = await fetchUser(jwt);

	console.log(user);

	const scores = await fetchScores(user, jwt);

	const schedules = await fetchSchedule(jwt);

	const courses = await fetchCourses(jwt);

	const news = await fetchNews(jwt);

	const userData = { user, scores, schedules, courses, news };

	return userData;
}
