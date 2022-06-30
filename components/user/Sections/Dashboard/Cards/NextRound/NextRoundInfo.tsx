import { findNextRound } from '@/utils/sortingFunctions';
import React, { useEffect, useState } from 'react';

function findCurrentRound(schedules) {
	const currDate = new Date();

	if (schedules.length) {
		const nextRound = schedules.filter((round) => {
			const date = new Date(round.date);
			if (date < currDate) {
				return round;
			}
		});

		return nextRound[nextRound.length - 1];
	} else {
		const nextRound = {};
		return nextRound;
	}
}

export default function NextRoundInfo({ schedule }): JSX.Element {
	const [nextRound, setNextRound] = useState(findNextRound(schedule));
	const currDate = new Date();

	const dayOfWeek = currDate.getDay(); //0 is Sunday

	useEffect(() => {
		if (dayOfWeek >= 1 && dayOfWeek <= 3) {
			if (dayOfWeek === 3) {
				const time = currDate.getHours();
				if (time > 14) {
					setNextRound(findNextRound(schedule));
				} else {
					setNextRound(findCurrentRound(schedule));
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (nextRound && nextRound.course) {
		let game = '';
		if (nextRound.game) {
			game = nextRound.game.replaceAll('_', ' ');
		}
		return (
			<div className='mt-8'>
				<h3 className='text-lg font-medium'>
					<span className='inset-0' aria-hidden='true' />
					Next Round Information
				</h3>
				<p className='mt-2 text-sm text-gray-500'>Course: {nextRound.course.name}</p>
				<p className='mt-2 text-sm text-gray-500'>Address: {nextRound.course.address}</p>
				<p className='mt-2 text-sm text-gray-500'>Course Phone Number: {nextRound.course.phone}</p>
				<p className='mt-2 text-sm text-gray-500'>Date: {nextRound.date}</p>
				<p className='mt-2 text-sm text-gray-500'>Start Time: {nextRound.start_time}</p>
				<p className='mt-2 text-sm text-gray-500'>Game: {game}</p>
			</div>
		);
	} else {
		return (
			<div className='mt-8'>
				<h3 className='text-lg font-medium'>
					<span className='inset-0' aria-hidden='true' />
					Next Round Information
				</h3>
				<p className='mt-2 text-sm text-gray-500'>Next Round Not Scheduled Yet</p>
			</div>
		);
	}
}
