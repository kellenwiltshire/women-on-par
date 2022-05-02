import React from 'react';
import DownButton from '../Buttons/DownButton';
import UpButton from '../Buttons/UpButton';

export default function ScheduleCards({ schedule, waitingList }): JSX.Element {
	const newWaitingList = waitingList.reverse();

	const handleMoveDown = (golfer) => {
		const findTeetime = schedule.find((teeTime) =>
			teeTime.golfers.find((player) => player.id === golfer.id),
		);

		const findTeetimeIndex = schedule.findIndex(
			(teeTime) => teeTime.teeTime === findTeetime.teeTime,
		);

		const findPlayerIndex = findTeetime.golfers.findIndex(
			(player) => player.id === golfer.id,
		);

		if (findPlayerIndex >= findTeetime.golfers.length) {
			const item1 = schedule[findTeetimeIndex + 1].golfers[0];
			const item2 = findTeetime.golfers[findPlayerIndex];

			schedule[findTeetimeIndex + 1].golfers.splice(0, 1);
			schedule[findTeetimeIndex + 1].golfers.splice(0, 0, item2);

			schedule[findTeetimeIndex + 1].golfers.splice(findPlayerIndex, 1);
			schedule[findTeetimeIndex + 1].golfers.splice(findPlayerIndex, 0, item1);
		} else {
			const item = findTeetime.golfers[findPlayerIndex];
			findTeetime.golfers.splice(findPlayerIndex, 1);
			findTeetime.golfers.splice(findPlayerIndex + 1, 0, item);
		}

		console.log(findTeetime.golfers);
	};
	return (
		<div className='flex w-full justify-center flex-row flex-wrap'>
			{schedule.map((teeTime) => {
				return (
					<div
						key={teeTime.teeTime}
						className='flex shadow-sm rounded-md m-2 w-1/4'
					>
						<div className='flex-shrink-0 flex flex-col items-center justify-center w-16 text-black text-sm font-medium rounded-l-md border'>
							<p>{teeTime.teeTime}</p>
						</div>
						<div className='flex-1 flex flex-col justify-center border border-gray-200 bg-white rounded-r-md truncate'>
							{teeTime.golfers.map((golfer) => {
								return (
									<div key={golfer.id}>
										<p className='mx-1'>
											{golfer.first_name} {golfer.last_name} <UpButton />{' '}
											<DownButton
												handleClick={handleMoveDown}
												golfer={golfer}
											/>
										</p>
										{/* {golfer.carpool ? <p className='mx-1 text-xs text-gray-400'>carpool: {golfer.carpool}</p> : null} */}
									</div>
								);
							})}
						</div>
					</div>
				);
			})}
			<div className='col-span-1 flex shadow-sm rounded-md m-2 w-1/4'>
				<div className='flex-shrink-0 flex flex-col items-center justify-center w-16 text-black text-sm font-medium rounded-l-md border'>
					<p>Waiting List</p>
				</div>
				<div className='flex-1 flex flex-col justify-center border border-gray-200 bg-white rounded-r-md truncate'>
					{newWaitingList.map((golfer) => {
						return (
							<p key={golfer.first_name} className='mx-1'>
								{golfer.first_name} {golfer.last_name}
							</p>
						);
					})}
				</div>
			</div>
		</div>
	);
}
