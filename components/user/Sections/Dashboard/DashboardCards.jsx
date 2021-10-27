import {
	CakeIcon,
	CalendarIcon,
	FlagIcon,
	NewspaperIcon,
} from '@heroicons/react/outline';
import ToggleSwitch from '../../../Buttons/Toggle';
import { useState } from 'react';

const actions = [
	{
		title: 'Prior Round',
		icon: FlagIcon,
		info: 'Your last round was at COURSE 1 with a score of 52. You had X Birdies and Y Chip Ins.',
	},
	{
		title: 'Upcoming Events',
		href: '#',
		icon: CakeIcon,
		info: 'Next Event is BEST BALL at COURSE 1 on DATE',
	},
	{
		title: 'Recent News',
		href: '#',
		icon: NewspaperIcon,
		info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum. ',
	},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function DashboardCards({ schedules }) {
	//! Will need to sort through SCHEDULES to find next closest date to current date
	const nextRound = schedules[0];
	const [attendance, setAttendance] = useState(false); //!This will be updated to reflect information from API
	const [notes, setNotes] = useState(''); //!This will be updated to reflect information from API

	console.log(notes);

	const handleSubmit = (e) => {
		e.preventDefault();

		// Once submitted this function will push the data into the Schedules API for the upcoming week
	};

	return (
		<div className='rounded-lg bg-gray-200 shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px'>
			<div className='rounded-tl-lg rounded-tr-lg sm:rounded-tr-none relative group bg-white p-6'>
				<div>
					<span className='rounded-lg inline-flex p-3 ring-4 ring-white'>
						<CalendarIcon className='h-6 w-6' aria-hidden='true' />
					</span>
				</div>
				<div className='mt-8'>
					<h3 className='text-lg font-medium'>
						<span className='inset-0' aria-hidden='true' />
						Next Round Information
					</h3>
					<p className='mt-2 text-sm text-gray-500'>
						Course: {nextRound.course.name}
					</p>
					<p className='mt-2 text-sm text-gray-500'>
						Address: {nextRound.course.address}
					</p>
					<p className='mt-2 text-sm text-gray-500'>
						Course Phone Number: {nextRound.course.phone}
					</p>
					<p className='mt-2 text-sm text-gray-500'>
						Start Time: {nextRound.start_time}
					</p>
				</div>
				<form onSubmit={handleSubmit}>
					<div className='mt-2 text-sm text-gray-500 flex flex-row align-middle'>
						<label
							htmlFor='attendance'
							className='block text-sm font-medium text-gray-700 mr-2'
						>
							Attending:
						</label>
						<ToggleSwitch enabled={attendance} setEnabled={setAttendance} />
					</div>
					<div>
						<label
							htmlFor='notes'
							className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
						>
							Notes
						</label>
						<div className='mt-1'>
							<div className='max-w-lg flex rounded-md shadow-sm'>
								<input
									type='text'
									name='notes'
									id='notes'
									className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3'
									placeholder={notes || 'Notes'}
									onChange={(e) => setNotes(e.target.value)}
								/>
							</div>
						</div>
					</div>
					<button
						type='submit'
						className='my-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						Save
					</button>
				</form>
			</div>
			{actions.map((action, actionIdx) => (
				<div
					key={action.title}
					className={classNames(
						actionIdx === 0
							? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
							: '',
						actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
						actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
						actionIdx === actions.length - 1
							? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
							: '',
						'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500',
					)}
				>
					<div>
						<span
							className={classNames(
								action.iconBackground,
								action.iconForeground,
								'rounded-lg inline-flex p-3 ring-4 ring-white',
							)}
						>
							<action.icon className='h-6 w-6' aria-hidden='true' />
						</span>
					</div>
					<div className='mt-8'>
						<h3 className='text-lg font-medium'>
							<a href={action.href} className='focus:outline-none'>
								{/* Extend touch target to entire panel */}
								<span className='absolute inset-0' aria-hidden='true' />
								{action.title}
							</a>
						</h3>
						<p className='mt-2 text-sm text-gray-500'>{action.info}</p>
					</div>
				</div>
			))}
		</div>
	);
}
