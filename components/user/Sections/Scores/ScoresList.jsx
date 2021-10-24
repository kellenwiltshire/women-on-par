const scores = [
	{
		date: 'May 4, 2021',
		course: 'Couse 1',
		birdies: [1, 3, 5],
		chipins: [2, 4],
		score: 45,
	},
	{
		date: 'June 14, 2021',
		course: 'Couse 2',
		birdies: [1, 5],
		chipins: [2, 4, 9],
		score: 52,
	},
];

export default function ScoresList() {
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
										Date
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Course
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Birdies
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Chip Ins
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Score
									</th>
								</tr>
							</thead>
							<tbody>
								{scores.map((score, scoreIdx) => (
									<tr
										key={score.date}
										className={scoreIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
									>
										<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
											{score.date}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
											{score.course}
										</td>

										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
											{score.birdies.map((bird) => {
												return <span key={bird}>{bird} </span>;
											})}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
											{score.chipins.map((chip) => {
												return <span key={chip}>{chip} </span>;
											})}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
											{score.score}
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
