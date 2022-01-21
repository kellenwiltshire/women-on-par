import NewsItems from '@/components/News/NewsItems';
import { fetchNews } from '@/utils/userFetch';
import { parseCookies } from 'nookies';
import React from 'react';

export default function news({ news }) {
	return <NewsItems news={news} />;
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
