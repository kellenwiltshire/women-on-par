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

const getScores = async (req: NextApiRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, cors);
	const url = process.env.DATABASE_URL;

	const cookies = parseCookies({ req });
	const jwt = cookies.womenonpar;

	try {
		const request = await fetch(`${url}/scores?_limit=10000`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${jwt}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});

		const response = await request.json();

		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Failed to get Scores', response: error });
	}
};

export default getScores;
