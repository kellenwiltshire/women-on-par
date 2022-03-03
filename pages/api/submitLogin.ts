import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'nookies';

const cors = Cors({
	methods: ['POST', 'HEAD'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result) => {
			if (result instanceof Error) {
				return reject(result);
			}

			return resolve(result);
		});
	});
}

const submitLogin = async (req: NextApiRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, cors);
	const url = process.env.DATABASE_URL;

	const loginInfo = req.body;

	try {
		const login = await fetch(`${url}/auth/local`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(loginInfo),
		});

		const loginResponse = await login.json();

		const userID = loginResponse.user.id;
		const jwt = loginResponse.jwt;
		const newDate = new Date().toString();

		const date = newDate.split(' ');
		date.splice(4, 10);

		const updateLoginTime = await fetch(`${url}/users/${userID}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${jwt}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ lastLogin: date.join(' ') }),
		});

		res.status(200).json(loginResponse);
	} catch (error) {
		res.status(500).json({ error: 'Error Logging In', response: error });
	}
};

export default submitLogin;
