import 'tailwindcss/tailwind.css';
import Layout from '@/components/layout/Layout';
import nProgress from 'nprogress';
import { Router } from 'next/router';
import 'nprogress/nprogress.css';
import { useState } from 'react';
import Head from 'next/head';
import Providers from '@/components/layout/Providers';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

function MyApp({ Component, pageProps }) {
	const [signedIn, setSignedIn] = useState(false);
	return (
		<Providers>
			<Head>
				<title>Women On Par | Golf and Membership Group</title>
			</Head>
			<Layout signedIn={signedIn} setSignedIn={setSignedIn}>
				<Component {...pageProps} signedIn={signedIn} setSignedIn={setSignedIn} />
			</Layout>
		</Providers>
	);
}

export default MyApp;
