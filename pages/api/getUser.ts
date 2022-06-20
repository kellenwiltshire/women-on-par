import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
const { parseCookies } = require('nookies');

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

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, cors);
	const url = process.env.DATABASE_URL;

	const cookies = parseCookies({ req });
	const jwt = cookies.womenonpar;

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
	date.splice(4, 10);

	fetch(`${url}/users/${userID}`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${jwt}`,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ lastLogin: date.join(' ') }),
	});

	res.json(response);
};

export default getUser;
