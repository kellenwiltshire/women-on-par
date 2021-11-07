import CourseFilterInput from '@/components/Inputs/CourseFilterInput';
import DateFilterInput from '@/components/Inputs/DateFilterInput';
import SearchInput from '@/components/Inputs/SearchInput';
import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import EditScore from '../Modals/EditScore';
import { findLastScheduledRound } from '@/utils/sortingFunctions';
import {
	useAllScoresContext,
	useCoursesContext,
	useScheduleContext,
} from '@/context/Store';

export default function UserScores() {
	const allScores = useAllScoresContext();
	const schedules = useScheduleContext();
	const courses = useCoursesContext();
	const [scores, setScores] = useState(allScores);
	const [editUserScore, setEditUserScore] = useState(false);

	const lastScheduledRound = findLastScheduledRound(schedules);
	const [selectedScore, setSelectedScore] = useState({});
	const [selectUser, setSelectedUser] = useState({});

	const userSearchChange = (e) => {
		e.preventDefault();
		if (e.target.value) {
			let nameFilter = [];
			scores.map((score) => {
				const fullName = `${score.user.first_name} ${score.user.last_name}`;
				const name = fullName.toLowerCase();
				if (name.includes(e.target.value.toLowerCase())) {
					nameFilter.push(score);
				}
			});
			setScores(nameFilter);
		} else {
			setScores(allScores);
		}
	};

	const courseFilterChange = (e) => {
		e.preventDefault();
		if (e.target.value) {
			let courseFilter = [];
			scores.map((score) => {
				if (score.course.name === e.target.value) {
					courseFilter.push(score);
				}
			});
			setScores(courseFilter);
		} else {
			setScores(allScores);
		}
	};

	const dateFilterChange = (e) => {
		e.preventDefault();
		if (e.target.value) {
			let dateFilter = [];
			scores.map((score) => {
				if (score.date === e.target.value) {
					dateFilter.push(score);
				}
			});
			setScores(dateFilter);
		} else {
			setScores(allScores);
		}
	};

	const resetForm = () => {
		setScores(allScores);
	};
	return (
		<div className='flex flex-col'>
			<EditScore
				open={editUserScore}
				setOpen={setEditUserScore}
				lastScheduledRound={lastScheduledRound}
				user={selectUser}
				selectedScore={selectedScore}
			/>
			<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
				<div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
					<div className='w-full flex flex-row'>
						<SearchInput
							inputName='Search Players'
							inputChange={userSearchChange}
						/>
						<CourseFilterInput
							inputName='Filter Courses'
							courses={courses}
							inputChange={courseFilterChange}
						/>
						<DateFilterInput
							inputName='Filter Dates'
							schedules={schedules}
							inputChange={dateFilterChange}
						/>
						<div className='mt-2'>
							<button
								type='reset'
								className='inline-flex items-center px-6 py-2 border border-transparent text-sm rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
								onClick={resetForm}
							>
								Reset
							</button>
						</div>
					</div>

					<div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className='bg-gray-50'>
								<tr>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										User ID
									</th>
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
										Course
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
										Holes Birdies (Hole No.)
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Holes Chipped (Hole No.)
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Total Score
									</th>
									<th scope='col' className='relative px-6 py-3'>
										<span className='sr-only'>Edit</span>
									</th>
								</tr>
							</thead>
							<tbody>
								{scores.map((score, scoreIdx) => (
									<tr
										key={score.id}
										className={scoreIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
									>
										<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
											{score.user.id}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
											{score.user.first_name} {score.user.last_name}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
											{score.course.name}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
											{score.date}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
											{score.holes.map((hole) => {
												let birdies = [];
												if (hole.birdie) {
													birdies.push(hole.hole);
												}

												return birdies.map((bird) => {
													return <span key={bird}>{bird} </span>;
												});
											})}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
											{score.holes.map((hole) => {
												let chips = [];
												if (hole.chip) {
													chips.push(hole.hole);
												}

												return chips.map((chip) => {
													return <span key={chip}>{chip} </span>;
												});
											})}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
											{score.score}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
											<button
												onClick={() => {
													setEditUserScore(!editUserScore);
													setSelectedUser(score.user);
													setSelectedScore(score);
												}}
												className='group flex items-center px-3 py-2 text-sm font-medium w-full'
											>
												<PencilIcon
													className='text-gray-400 group-hover:text-gray-500
									 flex-shrink-0 h-6 w-6'
												/>
											</button>
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
											<button className='group flex items-center px-3 py-2 text-sm font-medium w-full'>
												<TrashIcon
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
