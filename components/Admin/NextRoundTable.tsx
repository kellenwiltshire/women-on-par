import { useAllUsersContext, useScheduleContext } from '@/context/Store';
import generateSchedule from '@/utils/schedule';
import { findNextRound } from '@/utils/sortingFunctions';
import { XIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import TeetimeSchedule from '../TeeTimeGenerater/TeetimeSchedule';
import Modal from '../Modals/Modal';

export default function NextRoundTable(): JSX.Element {
	const allUsers = useAllUsersContext();
	const schedule = useScheduleContext();
	const [users, setUsers] = useState(allUsers);

	console.log(users);

	const [scheduleOpen, setScheduleOpen] = useState(false);
	interface Group {
		teeTime: string;
		golfers: Golfer[];
	}

	interface Golfer {
		first_name: string;
		last_name: string;
		teeTime: boolean;
		carpool: string;
	}
	interface TeeTimes {
		teeTimeSchedule: Group[];
		waitingList: Golfer[];
	}
	const [teeTimeSchedule, setTeeTimeSchedule] = useState<TeeTimes>();

	const nextRound = findNextRound(schedule);

	if (nextRound && nextRound.course) {
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
			setTeeTimeSchedule(generateSchedule(users, nextRound, nextRound.course));

			setScheduleOpen(!scheduleOpen);
		};

		return (
			<div className='flex flex-col'>
				{scheduleOpen ? (
					<Modal open={scheduleOpen} setOpen={setScheduleOpen}>
						<TeetimeSchedule teeTimes={teeTimeSchedule} nextRound={nextRound} setScheduleOpen={setScheduleOpen} />
					</Modal>
				) : null}
				<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
						<div className='mb-3'>
							Next Round is: {nextRound.date} at {nextRound.course.name}
						</div>
						<button
							onClick={() => generateScheduleClicked()}
							className='inline-flex items-center px-6 py-2 border border-transparent text-sm rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4 ml-auto'
						>
							Generate Tee-Times
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
										<tr key={user.id} className={userIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
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
	} else {
		return (
			<div className='flex flex-col'>
				<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
						<div className='mb-3'>Next Round is: TBD</div>

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
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
