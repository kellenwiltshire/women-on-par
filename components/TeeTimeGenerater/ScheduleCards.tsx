import React from 'react';
import DownButton from '../Buttons/DownButton';
import UpButton from '../Buttons/UpButton';

export default function ScheduleCards({
	schedule,
	waitingList,
	setScheduledRound,
}): JSX.Element {
	const newWaitingList = waitingList.reverse();

	const handleMoveDown = (golfer) => {
		const changeSchedule = schedule;
		const findTeetime = changeSchedule.find((teeTime) =>
			teeTime.golfers.find((player) => player.id === golfer.id),
		);

		const findTeetimeIndex = changeSchedule.findIndex(
			(teeTime) => teeTime.teeTime === findTeetime.teeTime,
		);

		const findPlayerIndex = findTeetime.golfers.findIndex(
			(player) => player.id === golfer.id,
		);

		if (findPlayerIndex >= findTeetime.golfers.length - 1) {
			const item1 = changeSchedule[findTeetimeIndex + 1].golfers[0];
			console.log('Player One: ', item1);
			//current player being moved
			const item2 = findTeetime.golfers[findPlayerIndex];
			console.log('Player Two: ', item2);
			if (changeSchedule[findTeetimeIndex + 1].golfers.length < 4) {
				changeSchedule[findTeetimeIndex].golfers.splice(findPlayerIndex, 1);
				changeSchedule[findTeetimeIndex + 1].golfers.splice(0, 0, item1);
			} else {
				//Find player from next tee time
				const item1 = changeSchedule[findTeetimeIndex + 1].golfers[0];
				console.log('Player One: ', item1);
				//current player being moved
				const item2 = findTeetime.golfers[findPlayerIndex];
				console.log('Player Two: ', item2);

				//replace next tee time player with player being moved
				changeSchedule[findTeetimeIndex + 1].golfers.splice(0, 1);

				changeSchedule[findTeetimeIndex + 1].golfers.splice(0, 0, item2);

				//move replaced player to where player being moved was
				changeSchedule[findTeetimeIndex].golfers.splice(findPlayerIndex, 1);

				changeSchedule[findTeetimeIndex].golfers.splice(
					findPlayerIndex,
					0,
					item1,
				);
			}
		} else {
			const item = findTeetime.golfers[findPlayerIndex];
			findTeetime.golfers.splice(findPlayerIndex, 1);
			findTeetime.golfers.splice(findPlayerIndex + 1, 0, item);
		}

		setScheduledRound([...changeSchedule]);
	};

	const handleMoveUp = (golfer) => {
		const changeSchedule = schedule;
		const findTeetime = changeSchedule.find((teeTime) =>
			teeTime.golfers.find((player) => player.id === golfer.id),
		);

		const findTeetimeIndex = changeSchedule.findIndex(
			(teeTime) => teeTime.teeTime === findTeetime.teeTime,
		);

		const findPlayerIndex = findTeetime.golfers.findIndex(
			(player) => player.id === golfer.id,
		);

		if (findPlayerIndex === 0) {
			//Find player from next tee time
			const item1 =
				changeSchedule[findTeetimeIndex - 1].golfers[
					changeSchedule[findTeetimeIndex - 1].golfers.length - 1
				];
			const prevArrayLength =
				changeSchedule[findTeetimeIndex - 1].golfers.length;
			console.log('Player One: ', item1);
			//current player being moved
			const item2 = findTeetime.golfers[findPlayerIndex];
			console.log('Player Two: ', item2);

			if (prevArrayLength < 4) {
				// changeSchedule[findTeetimeIndex - 1].golfers.splice(prevArrayLength, 1);
				changeSchedule[findTeetimeIndex - 1].golfers.splice(
					prevArrayLength,
					0,
					item2,
				);
			} else {
				//replace next tee time player with player being moved
				changeSchedule[findTeetimeIndex - 1].golfers.splice(
					prevArrayLength - 1,
					1,
				);
				changeSchedule[findTeetimeIndex - 1].golfers.splice(
					prevArrayLength - 1,
					0,
					item2,
				);
			}

			//move replaced player to where player being moved was
			changeSchedule[findTeetimeIndex].golfers.splice(findPlayerIndex, 1);
			changeSchedule[findTeetimeIndex].golfers.splice(
				findPlayerIndex,
				0,
				item1,
			);
		} else {
			const item = findTeetime.golfers[findPlayerIndex];
			findTeetime.golfers.splice(findPlayerIndex, 1);
			findTeetime.golfers.splice(findPlayerIndex - 1, 0, item);
		}

		setScheduledRound([...changeSchedule]);
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
						<ul className='flex-1 flex flex-col justify-center border border-gray-200 bg-white rounded-r-md truncate'>
							{teeTime.golfers.map((golfer) => {
								return (
									<li key={golfer.id}>
										{golfer.first_name} {golfer.last_name}{' '}
										<UpButton handleClick={handleMoveUp} golfer={golfer} />{' '}
										<DownButton handleClick={handleMoveDown} golfer={golfer} />
										{/* {golfer.carpool ? <p className='mx-1 text-xs text-gray-400'>carpool: {golfer.carpool}</p> : null} */}
									</li>
								);
							})}
						</ul>
					</div>
				);
			})}
			<div className='col-span-1 flex shadow-sm rounded-md m-2 w-1/4'>
				<div className='flex-shrink-0 flex flex-col items-center justify-center w-16 text-black text-sm font-medium rounded-l-md border'>
					<p>Waiting List</p>
				</div>
				<ul className='flex-1 flex flex-col justify-center border border-gray-200 bg-white rounded-r-md truncate'>
					{newWaitingList.map((golfer) => {
						return (
							<li key={golfer.first_name} className='mx-1'>
								{golfer.first_name} {golfer.last_name}
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
