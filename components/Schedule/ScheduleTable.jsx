import { sortSchedule } from '@/utils/sortingFunctions';

export default function ScheduleTable({ schedules }) {
	console.log('Schedules Table: ', schedules);

	const scheduleSorted = sortSchedule(schedules);
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
										Phone
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Address
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Interval
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Date
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Start Time
									</th>
								</tr>
							</thead>
							<tbody>
								{scheduleSorted.map((round, roundIdx) => (
									<tr
										key={round.id}
										className={roundIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
									>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
											{round.course.name}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
											{round.course.email}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
											{round.course.phone}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
											{round.course.address}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
											{round.course.interval}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
											{round.date}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
											{round.start_time}
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
