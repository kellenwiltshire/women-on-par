import { useAllUsersContext, useScheduleContext } from '@/context/Store';
import generateSchedule from '@/utils/schedule';
import { findNextRound } from '@/utils/sortingFunctions';
import { XIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import TeetimeSchedule from '../TeeTimeGenerater/TeetimeSchedule';
import Modal from '../Modals/Modal';

//For testing purposes
const golfers = [
	{ name: 'Player One', carpool: '', teeTime: false },
	{ name: 'Player Two', carpool: 'Player Nine', teeTime: false },
	{ name: 'Player Three', carpool: '', teeTime: false },
	{ name: 'Player Four', carpool: '', teeTime: true },
	{ name: 'Player Five', carpool: 'Player Thirteen', teeTime: false },
	{ name: 'Player Six', carpool: '', teeTime: false },
	{ name: 'Player Seven', carpool: '', teeTime: false },
	{ name: 'Player Eight', carpool: '', teeTime: false },
	{ name: 'Player Nine', carpool: 'Player Two', teeTime: false },
	{ name: 'Player Ten', carpool: '', teeTime: true },
	{ name: 'Player Eleven', carpool: '', teeTime: false },
	{ name: 'Player Twelve', carpool: '', teeTime: false },
	{ name: 'Player Thirteen', carpool: 'Player Five', teeTime: false },
	{ name: 'Player Fourteen', carpool: '', teeTime: false },
	{ name: 'Player Fifteen', carpool: '', teeTime: false },
	{ name: 'Player Sixteen', carpool: '', teeTime: false },
	{ name: 'Player Seventeen', carpool: '', teeTime: false },
	{ name: 'Player Eighteen', carpool: '', teeTime: true },
	{ name: 'Player Nineteen', carpool: '', teeTime: false },
	{ name: 'Player Twenty', carpool: '', teeTime: false },
	{ name: 'Player Twentyone', carpool: '', teeTime: false },
	{ name: 'Player Twentytwo', carpool: '', teeTime: false },
	{ name: 'Player Twentythree', carpool: '', teeTime: false },
	{ name: 'Player TwentyFour', carpool: '', teeTime: true },
	{ name: 'Player TwentyFive', carpool: '', teeTime: false },
	{ name: 'Player TwentySix', carpool: '', teeTime: false },
	{ name: 'Player TwentySeven', carpool: '', teeTime: false },
	{ name: 'Player TwentyEight', carpool: '', teeTime: false },
	{ name: 'Player TwentyNine', carpool: '', teeTime: false },
	{ name: 'Player Thirty', carpool: '', teeTime: false },
	{ name: 'Player ThirtyOne', carpool: '', teeTime: false },
	{ name: 'Player ThirtyTwo', carpool: '', teeTime: true },
	{ name: 'Player ThirtyThree', carpool: '', teeTime: false },
	{ name: 'Player ThirtyFour', carpool: '', teeTime: false },
	{ name: 'Player ThirtyFive', carpool: '', teeTime: false },
	{ name: 'Player ThirtySix', carpool: '', teeTime: false },
	{ name: 'Player ThirtySeven', carpool: '', teeTime: false },
	{ name: 'Player ThirtyEight', carpool: '', teeTime: true },
	{ name: 'Player ThirtyNine', carpool: '', teeTime: false },
	{ name: 'Player Forty', carpool: '', teeTime: false },
	{ name: 'Player FortyOne', carpool: '', teeTime: false },
	{ name: 'Player FortyTwo', carpool: '', teeTime: false },
	{ name: 'Player FortyThree', carpool: '', teeTime: false },
	{ name: 'Player FortyFour', carpool: '', teeTime: false },
	{ name: 'Player FortyFive', carpool: '', teeTime: false },
	{ name: 'Player FortySix', carpool: '', teeTime: true },
	{ name: 'Player FortySeven', carpool: '', teeTime: false },
	{ name: 'Player FortyEight', carpool: '', teeTime: false },
	{ name: 'Player FORTYNINE', carpool: '', teeTime: false },
	{ name: 'Player FIFTY', carpool: '', teeTime: false },
	{ name: 'Player FIFTYONE', carpool: '', teeTime: false },
	{ name: 'Player FIFTYTWO', carpool: '', teeTime: true },
	{ name: 'Player FIFTYTHREE', carpool: '', teeTime: false },
];

export default function NextRoundTable() {
	const allUsers = useAllUsersContext();
	const schedule = useScheduleContext();
	const [users, setUsers] = useState([]);

	const [scheduleOpen, setScheduleOpen] = useState(false);
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

	console.log('Next Round Table - Schedule: ', nextRound);

	const generateScheduleClicked = () => {
		setTeeTimeSchedule(generateSchedule(golfers, nextRound, nextRound.course));

		setScheduleOpen(!scheduleOpen);

		console.log('Here: ', teeTimeSchedule);

		//Then will need to open a new page or modal with tee time schedule. Create a PDF?
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
