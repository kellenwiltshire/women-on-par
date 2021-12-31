import Cors from 'cors';
const { parseCookies } = require('nookies');

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

const addUser = async (req, res) => {
	await runMiddleware(req, res, cors);
	const url = process.env.DATABASE_URL;

	const data = req.body;
	const cookies = parseCookies({ req });
	const jwt = cookies.jwt;

	try {
		const request = await fetch(`${url}/users`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${jwt}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		const response = await request.json();

		const confirmation = await fetch(`${url}/auth/send-email-confirmation`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${jwt}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email: response.email }),
		});

		const resp = await confirmation.json();

		console.log('confirmation: ', resp);

		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Failed to Edit Score', response: error });
	}
};

export default addUser;
