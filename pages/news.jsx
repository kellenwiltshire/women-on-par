import News from '@/components/News/News';
import { fetchNews } from '@/utils/userFetch';
import { parseCookies } from 'nookies';
import React from 'react';

export default function news({ news }) {
	return <News news={news} />;
}

export async function getServerSideProps(props) {
	const cookies = parseCookies(props);
	const jwt = cookies.jwt;

	const news = await fetchNews(jwt);

	return {
		props: {
			news: news,
		},
	};
}
