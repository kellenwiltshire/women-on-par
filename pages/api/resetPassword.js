import Cors from 'cors';
import { parseCookies } from 'nookies';

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

const setNewPass = async (req, res) => {
	await runMiddleware(req, res, cors);
	const url = process.env.DATABASE_URL;

	const cookies = parseCookies({ req });
	const jwt = cookies.jwt;

	const email = req.body;

	try {
		const login = await fetch(`${url}/auth/forgot-password`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${jwt}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email: email }),
		});

		const loginResponse = await login.json();

		console.log(loginResponse);

		res.status(200).json(loginResponse);
	} catch (error) {
		res.status(500).json({ error: 'Error Changing Password', response: error });
	}
};

export default setNewPass;
