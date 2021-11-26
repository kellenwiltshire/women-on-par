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

	console.log(req.body);

	const code = req.body.code;
	const newPass = req.body.newPass;
	const confirmPass = req.body.confirmPass;

	try {
		const login = await fetch(`${url}/auth/reset-password`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				code: code,
				password: newPass,
				passwordConfirmation: confirmPass,
			}),
		});

		if (req.status < 300) {
			const response = await req.json();
			const id = response.user.id;

			const update = await fetch('/api/editUser', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id: id, initialLogin: false }),
			});

			if (update.status < 300) {
				const loginResponse = await login.json();

				console.log(loginResponse);

				res.status(200).json(loginResponse);
			}
		}
	} catch (error) {
		res.status(500).json({ error: 'Error Changing Password', response: error });
	}
};

export default setNewPass;
