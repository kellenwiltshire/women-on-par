import React from 'react';
import { parseCookies } from 'nookies';
import { fetchFunction } from '@/utils/userFetch';
import FunctionPage from '@/components/SpecialFunctions/FunctionPage';

export default function specialfunctions({ specialFunction }) {
	return <FunctionPage specialFunction={specialFunction} />;
}

export async function getServerSideProps(props) {
	const cookies = parseCookies(props);
	const jwt = cookies.jwt;

	const id = props.query.slug;

	const specialFunction = await fetchFunction(jwt, id);

	return {
		props: {
			specialFunction: specialFunction,
		},
	};
}
