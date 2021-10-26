import 'tailwindcss/tailwind.css';
import Layout from '../components/layout/Layout.jsx';
import { parseCookies } from 'nookies';

function MyApp({ Component, pageProps }) {
	const jwt = parseCookies(pageProps).jwt;
	console.log('JWT: ', jwt);
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
