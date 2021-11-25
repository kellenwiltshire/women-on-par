import React from 'react';
import { parseCookies } from 'nookies';
import { fetchSpecialFunctions } from '@/utils/userFetch';
import FunctionItems from '@/components/SpecialFunctions/FunctionItems';

export default function specialfunctions({ specialFunctions }) {
	console.log(specialFunctions);
	return <FunctionItems specialFunctions={specialFunctions} />;
}

export async function getServerSideProps(props) {
	const cookies = parseCookies(props);
	const jwt = cookies.jwt;

	const specialFunctions = await fetchSpecialFunctions(jwt);

	return {
		props: {
			specialFunctions: specialFunctions,
		},
	};
}
