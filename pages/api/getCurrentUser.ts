import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

const cors = Cors({
	methods: ['GET', 'HEAD'],
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

const getCurrentUser = async (req: NextApiRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, cors);
	const url = process.env.DATABASE_URL;

	const jwt = req.body;

	try {
		const request = await fetch(`${url}/users/me`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		});

		const response = await request.json();

		const userID = response.id;
		const newDate = new Date().toString();

		const date = newDate.split(' ');
		date.splice(5, 10);

		const updateLoginTime = await fetch(`${url}/users/${userID}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${jwt}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ lastLogin: date.join(' ') }),
		});

		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error Getting User', response: error });
	}
};

export default getCurrentUser;
