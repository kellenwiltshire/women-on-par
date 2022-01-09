import React from 'react';

export default function ScheduleCards({ schedule, waitingList }) {
	const newWaitingList = waitingList.reverse();
	return (
		<div className='flex w-full justify-center flex-row flex-wrap'>
			{schedule.map((teeTime) => {
				return (
					<li key={teeTime.teeTime} className='flex shadow-sm rounded-md m-2 w-1/4'>
						<div className='flex-shrink-0 flex flex-col items-center justify-center w-16 text-black text-sm font-medium rounded-l-md border'>
							<p>{teeTime.teeTime}</p>
						</div>
						<div className='flex-1 flex flex-col justify-center border border-gray-200 bg-white rounded-r-md truncate'>
							{teeTime.golfers.map((golfer) => {
								return (
									<div key={golfer.name} className='mx-1'>
										{golfer.name}
									</div>
								);
							})}
						</div>
					</li>
				);
			})}
			<li className='col-span-1 flex shadow-sm rounded-md m-2 w-1/4'>
				<div className='flex-shrink-0 flex flex-col items-center justify-center w-16 text-black text-sm font-medium rounded-l-md border'>
					<p>Waiting List</p>
				</div>
				<div className='flex-1 flex flex-col justify-center border border-gray-200 bg-white rounded-r-md truncate'>
					{newWaitingList.map((golfer) => {
						return (
							<div key={golfer.name} className='mx-1'>
								{golfer.name}
							</div>
						);
					})}
				</div>
			</li>
		</div>
	);
}
