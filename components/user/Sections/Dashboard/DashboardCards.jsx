import {
	CakeIcon,
	CalendarIcon,
	FlagIcon,
	NewspaperIcon,
} from '@heroicons/react/outline';
import ToggleSwitch from '../../../Buttons/Toggle';
import { useState } from 'react';
import NextRound from './NextRound';

const actions = [
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

//TODO News and Upcoming Events from API

export default function DashboardCards({ schedules, scores }) {
	//! Will need to sort through SCHEDULES to find next closest date to current date
	const nextRound = schedules[0];
	const priorRound = scores[scores.length - 1];

	const getBirdies = () => {
		let num = 0;
		for (let i = 0; i < priorRound.holes.length; i++) {
			if (priorRound.holes[i].birdie) {
				num++;
			}
		}
		return num;
	};

	const getChipIns = () => {
		let num = 0;
		for (let i = 0; i < priorRound.holes.length; i++) {
			if (priorRound.holes[i].chip) {
				num++;
			}
		}
		return num;
	};

	const numBirdies = getBirdies();
	const numChipIns = getChipIns();

	return (
		<div className='rounded-lg bg-gray-200 shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px'>
			<NextRound nextRound={nextRound} />
			<div className='sm:rounded-tr-lg relative group bg-white p-6'>
				<div>
					<span className='rounded-lg inline-flex p-3 ring-4 ring-white'>
						<FlagIcon className='h-6 w-6' aria-hidden='true' />
					</span>
				</div>
				<div className='mt-8'>
					<h3 className='text-lg font-medium'>
						<span className='inset-0' aria-hidden='true' />
						Prior Round
					</h3>
					<p className='mt-2 text-sm text-gray-500'>
						Your last round was at {priorRound.course.name} with a score of{' '}
						{priorRound.score}. You had {numBirdies} Birdies and {numChipIns}{' '}
						Chip Ins.
					</p>
				</div>
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
