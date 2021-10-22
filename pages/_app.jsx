import 'tailwindcss/tailwind.css';
import Layout from '../components/layout/Layout.jsx';

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
