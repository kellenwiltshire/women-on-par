import React from 'react';
import UserTable from './Admin/UserTable';

export default function Admin({ user, jwt }) {
	return (
		<div className='px-4 py-8 sm:px-0'>
			<UserTable jwt={jwt} />
		</div>
	);
}
