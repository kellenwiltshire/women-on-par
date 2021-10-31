import useSWR from 'swr';

export default function NextRoundTable({ jwt, nextRound }) {
	const fetcher = (url) =>
		fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		}).then((res) => res.json());

	const { data, error } = useSWR('http://localhost:1337/users', fetcher);

	if (error) return <div>Failed to Load Users</div>;
	if (!data) return <div>Loading Users...</div>;

	if (data) {
		const users = data.filter((user) => {
			for (let i = 0; i < user.availability.length; i++) {
				if (user.availability[i].date === nextRound.date) {
					return user;
				}
			}
		});

		console.log('Filtered Next Round Users: ', users);

		return (
			<div className='flex flex-col'>
				<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
						<div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
							<table className='min-w-full divide-y divide-gray-200'>
								<thead className='bg-gray-50'>
									<tr>
										<th
											scope='col'
											className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
										>
											Name
										</th>
										<th
											scope='col'
											className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
										>
											Email
										</th>
										<th
											scope='col'
											className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
										>
											Notes
										</th>
										<th scope='col' className='relative px-6 py-3'>
											<span className='sr-only'>Edit</span>
										</th>
									</tr>
								</thead>
								<tbody>
									{users.map((user, userIdx) => (
										<tr
											key={user.email}
											className={userIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
										>
											<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
												{user.first_name} {user.last_name}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
												{user.email}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
												{user.availability.map((date) => {
													if (date.date === nextRound.date) {
														return date.notes;
													}
												})}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
