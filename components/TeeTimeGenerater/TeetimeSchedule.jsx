import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import CloseSchedule from '../Modals/CloseSchedule';
import ScheduleCards from './ScheduleCards';

export default function TeetimeSchedule({ teeTimes, nextRound, setScheduleOpen }) {
	const scheduledRound = teeTimes.teeTimeSchedule;
	const waitingList = teeTimes.waitingList;
	const [warningOpen, setWarningOpen] = useState(false);

	const componentRef = useRef();

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});
	return (
		<div className='mb-5'>
			{warningOpen ? (
				<CloseSchedule open={warningOpen} setOpen={setWarningOpen} setScheduleOpen={setScheduleOpen} />
			) : null}
			<div className='w-full h-full ' ref={componentRef}>
				<style type='text/css' media='print'>
					{
						'\
					{ html,body{height:100%;width:100%;margin:0;padding:0;} @page { size: A4 landscape; max-height:100%; max-width:100% }\
'
					}
				</style>
				<h2 className='text-gray-500 text-xs font-medium uppercase tracking-wide'>
					{nextRound.course.name} - {nextRound.date} - {nextRound.start_time}
				</h2>
				<div className='mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4'>
					<ScheduleCards schedule={scheduledRound} waitingList={waitingList} />
				</div>
			</div>
			<div className='col-span-4 flex flex-row gap-1 my-2'>
				<button
					onClick={handlePrint}
					className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
				>
					PRINT
				</button>
				<button
					onClick={() => setWarningOpen(!warningOpen)}
					className='inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
				>
					CANCEL
				</button>
			</div>
		</div>
	);
}
