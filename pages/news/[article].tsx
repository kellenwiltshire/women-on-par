import News from '@/components/News/News';
import { fetchArticle } from '@/utils/userFetch';
import { parseCookies } from 'nookies';
import React from 'react';

export default function Article({ article }) {
	return <News news={article} />;
}

export async function getServerSideProps(props) {
	const cookies = parseCookies(props);
	const jwt = cookies.jwt;

	const id = props.query.slug;

	const article = await fetchArticle(jwt, id);

	return {
		props: {
			article: article,
		},
	};
}
