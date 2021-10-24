import React from 'react';
import ToggleSwitch from '../../../Buttons/Toggle';

const course = {
	name: 'Course',
	input: '',
};

const holes = [
	{
		name: '1',
		chipIn: false,
		birder: false,
	},
	{
		name: '2',
		chipIn: false,
		birder: false,
	},
	{
		name: '3',
		chipIn: false,
		birder: false,
	},
	{
		name: '4',
		chipIn: false,
		birder: false,
	},
	{
		name: '5',
		chipIn: false,
		birder: false,
	},
	{
		name: '6',
		chipIn: false,
		birder: false,
	},
	{
		name: '7',
		chipIn: false,
		birder: false,
	},
	{
		name: '8',
		chipIn: false,
		birder: false,
	},
	{
		name: '9',
		chipIn: false,
		birder: false,
	},
];

const score = {
	name: 'Total',
	input: '',
};

export default function EnterScore() {
	return (
		<div className='mb-5'>
			<h2 className='text-gray-500 text-xs font-medium uppercase tracking-wide'>
				Enter Score
			</h2>
			<ul
				role='list'
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
							>
								<option>Course 1</option>
								<option>Course 2</option>
								<option>Course 3</option>
							</select>
						</div>
					</div>
				</li>

				{holes.map((hole) => (
					<li key={hole.name} className='col-span-1 flex shadow-sm rounded-md'>
						<div className='flex-shrink-0 flex items-center justify-center w-16 text-black text-sm font-medium rounded-l-md border'>
							{hole.name}
						</div>
						<div className='flex-1 flex items-center justify-between border border-gray-200 bg-white rounded-r-md truncate'>
							<div className='flex-1 px-4 py-2 text-sm truncate'>
								<div className='flex flex-row h-10 w-full justify-between align-middle'>
									<span>Chip In: </span>
									<ToggleSwitch />
								</div>
								<div className='flex flex-row h-6 w-full justify-between align-middle'>
									<span>Birdie: </span>
									<ToggleSwitch />
								</div>
							</div>
						</div>
					</li>
				))}
				<li className='col-span-1 flex shadow-sm rounded-md'>
					<div className='flex-shrink-0 flex items-center justify-center w-16 text-black text-sm font-medium rounded-l-md border'>
						{score.name}
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
								className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3'
								placeholder='Score'
							/>
						</div>
					</div>
				</li>
			</ul>
			<div className='flex flex-row gap-1 my-2'>
				<button
					type='button'
					className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
				>
					Save
				</button>
				<button
					type='button'
					className='inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
				>
					Reset
				</button>
			</div>
		</div>
	);
}
