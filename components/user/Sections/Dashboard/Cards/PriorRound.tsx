import React, { useEffect, useState } from 'react';
import { FlagIcon } from '@heroicons/react/outline';
import { useAllScoresContext, useScheduleContext, useScoreContext } from '@/context/Store';
import {
	findLastScheduledRound,
	findPriorRoundResults,
	findPriorRound,
	findPriorRoundWinner,
} from '@/utils/sortingFunctions';

export default function PriorRound(): JSX.Element {
	const scores = useScoreContext();
	const allScores = useAllScoresContext();
	const priorRound = findPriorRound(scores);
	const schedule = useScheduleContext();

	interface User {
		user: {
			first_name: string;
			last_name: string;
		};
		score: number;
	}

	const [winner, setWinner] = useState<User>();

	const priorRoundDate = findLastScheduledRound(schedule);

	const priorRoundScores = findPriorRoundResults(allScores, priorRoundDate.date);

	useEffect(() => {
		setWinner(findPriorRoundWinner(priorRoundScores, priorRoundDate));
	}, []);

	if (priorRound) {
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
						Your last round was at {priorRound?.course?.name} with a score of {priorRound?.score}. You had {numBirdies}{' '}
						Birdies and {numChipIns} Chip Ins.
					</p>
				</div>
				{winner ? (
					<div className='mt-8'>
						<h3 className='text-lg font-medium'>
							<span className='inset-0' aria-hidden='true' />
							Results
						</h3>
						<p className='mt-2 text-sm text-gray-500'>
							The winning Golfer was {winner.user.first_name} {winner.user.last_name} with a score of {winner.score}
						</p>
						<p className='mt-2 text-sm text-gray-500'>
							Players with Birdies:{' '}
							{priorRoundScores.map((score) => {
								let birdie = false;
								score.holes.map((hole) => {
									if (hole.birdie) {
										birdie = true;
									}
								});
								if (birdie) {
									return (
										<span key={score.id}>
											{score.user.first_name} {score.user.last_name},{' '}
										</span>
									);
								}
							})}
						</p>
						<p className='mt-2 text-sm text-gray-500'>
							Players with Chip-Ins:{' '}
							{priorRoundScores.map((score) => {
								let chip = false;
								score.holes.map((hole) => {
									if (hole.chip) {
										chip = true;
									}
								});
								if (chip) {
									return (
										<span key={score.id}>
											{score.user.first_name} {score.user.last_name},{' '}
										</span>
									);
								}
							})}
						</p>
					</div>
				) : null}
			</div>
		);
	} else {
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
					<p className='mt-2 text-sm text-gray-500'>NO PRIOR ROUND</p>
				</div>
				{winner ? (
					<div className='mt-8'>
						<h3 className='text-lg font-medium'>
							<span className='inset-0' aria-hidden='true' />
							Results
						</h3>
						<p className='mt-2 text-sm text-gray-500'>
							The winning Golfer was {winner.user.first_name} {winner.user.last_name} with a score of {winner.score}
						</p>
						<p className='mt-2 text-sm text-gray-500'>
							Players with Birdies:{' '}
							{priorRoundScores.map((score) => {
								const birdie = score.holes.map((hole) => {
									if (hole.birdie) {
										return true;
									}
								});
								if (birdie) {
									return (
										<span key={score.id}>
											{score.user.first_name} {score.user.last_name},{' '}
										</span>
									);
								}
							})}
						</p>
						<p className='mt-2 text-sm text-gray-500'>
							Players with Chip-Ins:{' '}
							{priorRoundScores.map((score) => {
								const chip = score.holes.map((hole) => {
									if (hole.chip) {
										return true;
									}
								});
								if (chip) {
									return (
										<span key={score.id}>
											{score.user.first_name} {score.user.last_name},{' '}
										</span>
									);
								}
							})}
						</p>
					</div>
				) : null}
			</div>
		);
	}
}
