import React, { useEffect, useState } from 'react';
import ScoreToggle from '../../../Buttons/ScoreToggle';
import ToggleSwitch from '../../../Buttons/Toggle';

const holesArray = [
	{
		id: 0,
		name: '1',
		chipIn: false,
		birdie: false,
	},
	{
		id: 1,
		name: '2',
		chipIn: false,
		birdie: false,
	},
	{
		id: 2,
		name: '3',
		chipIn: false,
		birdie: false,
	},
	{
		id: 3,
		name: '4',
		chipIn: false,
		birdie: false,
	},
	{
		id: 4,
		name: '5',
		chipIn: false,
		birdie: false,
	},
	{
		id: 5,
		name: '6',
		chipIn: false,
		birdie: false,
	},
	{
		id: 6,
		name: '7',
		chipIn: false,
		birdie: false,
	},
	{
		id: 7,
		name: '8',
		chipIn: false,
		birdie: false,
	},
	{
		id: 8,
		name: '9',
		chipIn: false,
		birdie: false,
	},
];

export default function EnterScore({ courses }) {
	const [holes, setHoles] = useState(holesArray);
	const [course, setCourse] = useState('');
	const [score, setScore] = useState();

	const handleSubmit = (e) => {
		e.preventDefault();

		const targets = Array.from(e.target);

		const holeInfo = targets.filter((tar) => {
			if (tar.id !== 'score' || tar.name !== 'course') {
				return tar;
			}
		});

		console.log(targets);
	};

	console.log(holes);
	return (
		<div className='mb-5'>
			<h2 className='text-gray-500 text-xs font-medium uppercase tracking-wide'>
				Enter Score
			</h2>
			<form
				onSubmit={handleSubmit}
				className='mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4'
			>
				<li className='col-span-1 flex shadow-sm rounded-md'>
					<div className='flex-shrink-0 flex items-center justify-center w-16 text-black text-sm font-medium rounded-l-md border'>
						{course.name}
					</div>
					<div className='flex-1 flex items-center justify-between border border-gray-200 bg-white rounded-r-md truncate'>
						<div className='mx-1'>
							<label
								htmlFor='course'
								className='block text-sm font-medium text-gray-700'
							></label>
							<select
								id='course'
								name='course'
								className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
								defaultValue='Course 1'
								onChange={(e) => setCourse(e.target.value)}
							>
								{courses.map((course) => {
									return <option key={course.id}>{course.name}</option>;
								})}
							</select>
						</div>
					</div>
				</li>

				{holes.map((hole, holeIdx) => {
					const [chip, setChip] = useState(hole.chipIn);
					const [birdie, setBirdie] = useState(hole.birdie);
					console.log(chip);

					return (
						<div
							key={hole.name}
							className='col-span-1 flex shadow-sm rounded-md'
						>
							<div className='flex-shrink-0 flex items-center justify-center w-16 text-black text-sm font-medium rounded-l-md border'>
								{hole.name}
							</div>
							<div className='flex-1 flex items-center justify-between border border-gray-200 bg-white rounded-r-md truncate'>
								<div className='flex-1 px-4 py-2 text-sm truncate'>
									<div className='flex flex-row h-10 w-full justify-between align-middle'>
										<span>Chip In: </span>
										<input
											id={holeIdx}
											aria-describedby='chip-in'
											name='chip-in'
											type='checkbox'
											className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
										/>
									</div>

									<div className='flex flex-row h-10 w-full justify-between align-middle'>
										<span>Birdie </span>
										<input
											id={holeIdx}
											aria-describedby='birdie'
											name='birdie'
											type='checkbox'
											className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
										/>
									</div>
								</div>
							</div>
						</div>
					);
				})}
				<li className='col-span-1 flex shadow-sm rounded-md'>
					<div className='flex-shrink-0 flex items-center justify-center w-16 text-black text-sm font-medium rounded-l-md border'>
						Score
					</div>
					<div className='flex-1 flex items-center justify-between border border-gray-200 bg-white rounded-r-md truncate'>
						<div className='mx-1'>
							<label htmlFor='score' className='sr-only'>
								Score
							</label>
							<input
								type='score'
								name='score'
								id='score'
								onChange={(e) => setScore(e.target.value)}
								className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3'
								placeholder='Score'
							/>
						</div>
					</div>
				</li>
				<div className='col-span-4 flex flex-row gap-1 my-2'>
					<button
						type='submit'
						className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						Save
					</button>
					<button
						type='reset'
						className='inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						Reset
					</button>
				</div>
			</form>
		</div>
	);
}
