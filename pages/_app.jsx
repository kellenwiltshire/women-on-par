import 'tailwindcss/tailwind.css';
import Layout from '@/components/layout/Layout.jsx';
import nProgress from 'nprogress';
import { Router } from 'next/router';
import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
