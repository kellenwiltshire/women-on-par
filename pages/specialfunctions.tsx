import React from 'react';
import { parseCookies } from 'nookies';
import { fetchSpecialFunctions } from '@/utils/userFetch';
import FunctionItems from '@/components/SpecialFunctions/FunctionItems';
import { sortSchedule } from '@/utils/sortingFunctions';

export default function specialfunctions({ specialFunctions }) {
	const sortedFunctions = sortSchedule(specialFunctions);
	return <FunctionItems specialFunctions={sortedFunctions} />;
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
