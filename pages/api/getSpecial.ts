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

const getSpecial = async (req: NextApiRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, cors);
	const url = process.env.DATABASE_URL;

	const cookies = parseCookies({ req });
	const jwt = cookies.womenonpar;

	const request = await fetch(`${url}/special-functions`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	const response = await request.json();

	res.json(response);
};

export default getSpecial;
