import { useAllUsersContext, useScheduleContext } from '@/context/Store';
import generateSchedule from '@/utils/schedule';
import { findNextRound } from '@/utils/sortingFunctions';
import { XIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';

export default function NextRoundTable() {
	const allUsers = useAllUsersContext();
	const schedule = useScheduleContext();
	const [users, setUsers] = useState([]);
	const [teeTimeSchedule, setTeeTimeSchedule] = useState([]);

	const nextRound = findNextRound(schedule);
	const findUsers = allUsers.filter((user) => {
		for (let i = 0; i < user.availability.length; i++) {
			if (user.availability[i].date === nextRound.date && user.availability[i].available) {
				return user;
			}
		}
	});

	useEffect(() => {
		setUsers(findUsers);
	}, []);

	const removeUserFromAvailability = async (user) => {
		const newEntry = {
			date: nextRound.date,
			available: false,
		};

		const body = {
			id: user.id,
			availability: [newEntry],
		};

		const req = await fetch(`/api/submitAvailability`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		//Filters out the removed person from the list of available golfers
		const newUsers = users.filter((person) => {
			if (person !== user) {
				return person;
			}
		});

		setUsers(newUsers);
	};

	const generateScheduleClicked = () => {
		setTeeTimeSchedule(generateSchedule(users, schedule, schedule.course));

		//Then will need to open a new page or modal with tee time schedule. Create a PDF?
	};

	return (
		<div className='flex flex-col'>
			<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
				<div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
					<div className='mb-3'>
						Next Round is: {nextRound.date} at {nextRound.course.name}
					</div>
					<button
						disabled
						className='inline-flex items-center px-6 py-2 border border-transparent text-sm rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4 ml-auto'
					>
						Generate Tee-Times (soon)
					</button>
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
										Remove
									</th>
								</tr>
							</thead>
							<tbody>
								{users.map((user, userIdx) => (
									<tr key={user.email} className={userIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
										<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
											{user.first_name} {user.last_name}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{user.email}</td>
										<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
											<button
												onClick={() => removeUserFromAvailability(user)}
												className='group flex items-center px-3 py-2 text-sm font-medium w-full'
											>
												<XIcon
													className='text-gray-400 group-hover:text-gray-500
									flex-shrink-0 h-6 w-6'
												/>
											</button>
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
