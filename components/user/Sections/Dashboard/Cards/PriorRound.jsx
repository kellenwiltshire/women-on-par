import React from 'react';
import { FlagIcon } from '@heroicons/react/outline';

export default function PriorRound({ priorRound }) {
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
					{priorRound.score}. You had {numBirdies} Birdies and {numChipIns} Chip
					Ins.
				</p>
			</div>
		</div>
	);
}
