import Cors from 'cors';

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

	const loginInfo = req.body;

	const id = loginInfo.user.id;
	const password = { password: loginInfo.newPass };

	const info = {
		identifier: loginInfo.user.username,
		password: loginInfo.newPass,
	};

	try {
		const login = await fetch(`${url}/auth/reset-password`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(info),
		});

		const loginResponse = await login.json();

		console.log(loginResponse);

		res.status(200).json(loginResponse);
	} catch (error) {
		res.status(500).json({ error: 'Error Changing Password', response: error });
	}
};

export default setNewPass;
