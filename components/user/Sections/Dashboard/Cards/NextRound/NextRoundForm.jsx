import React, { useEffect, useState } from 'react';
import ToggleSwitch from '@/components/Buttons/Toggle';
import { findNextRound } from '@/utils/sortingFunctions';
import { useScheduleContext } from '@/context/Store';

export default function NextRoundForm({ user, setSuccess, setFailure }) {
	const schedule = useScheduleContext();
	const nextRound = findNextRound(schedule);
	const currDate = new Date();
	//This sets the state so that the input reflect the already entered Data (if available) unless the current Date is after the last entered avaialability. If this is the case then it resets so that the user can set their availability for the next round
	const [attendance, setAttendance] = useState(false);

	useEffect(() => {
		if (currDate < Date.parse(user.availability[user.availability.length - 1].date)) {
			if (user.availability[user.availability.length - 1].available) {
				setAttendance(true);
			}
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		//build the new Entry
		const newEntry = {
			date: nextRound.date,
			available: attendance,
		};

		//build the body
		const body = {
			id: user.id,
			availability: [newEntry],
		};

		//PUT the new info into the DB so that the Admin can see what each User's availability is
		const req = await fetch(`/api/submitAvailability`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		if (req.status < 300) {
			setSuccess(true);
		} else {
			setFailure(true);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='mt-2 text-sm text-gray-500 flex flex-row align-middle'>
				<label htmlFor='attendance' className='block text-sm font-medium text-gray-700 mr-2'>
					Attending:
				</label>
				<ToggleSwitch enabled={attendance} setEnabled={setAttendance} />
			</div>
			<button
				type='submit'
				className='my-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
			>
				Save
			</button>
		</form>
	);
}
