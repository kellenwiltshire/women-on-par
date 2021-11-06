import Cors from 'cors';
const { parseCookies } = require('nookies');

const cors = Cors({
	methods: ['PUT', 'HEAD'],
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

const submitScore = async (req, res) => {
	await runMiddleware(req, res, cors);
	const url = process.env.DATABASE_URL;

	console.log(req.body);
	const id = req.body.score.id;
	const score = req.body.score.data;
	const cookies = parseCookies({ req });
	const jwt = cookies.jwt;

	try {
		const request = await fetch(`${url}/scores/${id}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${jwt}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(score),
		});

		const response = await request.json();

		res.json(response);
	} catch (error) {
		console.log(error);
		res.status(400).json('Error Submitting Score', error);
	}
};

export default submitScore;