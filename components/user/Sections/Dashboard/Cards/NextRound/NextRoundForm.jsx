import React, { useState } from 'react';
import ToggleSwitch from '@/components/Buttons/Toggle';
import { findNextRound } from '@/utils/sortingFunctions';

export default function NextRoundForm({ user }) {
	const [error, setError] = useState(false);
	const currDate = new Date();
	//This sets the state so that the input reflect the already entered Data (if available) unless the current Date is after the last entered avaialability. If this is the case then it resets so that the user can set their availability for the next round
	const [attendance, setAttendance] = useState(
		user.availability.length
			? currDate <
			  Date.parse(user.availability[user.availability.length - 1].date)
				? user.availability[user.availability.length - 1].available
				: false
			: false,
	);
	const [notes, setNotes] = useState(
		user.availability.length
			? currDate <
			  Date.parse(user.availability[user.availability.length - 1].date)
				? user.availability[user.availability.length - 1].available
				: ''
			: '',
	);

	const handleSubmit = async (e) => {
		e.preventDefault();

		//Get an updated schedule incase the page was stale
		const updatedScheduleRes = await fetch('/api/getSchedule');
		const updatedSchedule = await updatedScheduleRes.json();

		const confirmedNextRound = await findNextRound(updatedSchedule);

		//build the new Entry
		const newEntry = {
			date: confirmedNextRound.date,
			available: attendance,
			notes: notes,
		};

		console.log(newEntry);

		//build the body
		const body = {
			id: user.id,
			availability: [...user.availability, newEntry],
		};

		try {
			//PUT the new info into the DB so that the Admin can see what each User's availability is
			const pushRes = await fetch(`/api/submitAvailability`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});

			const response = await pushRes.json();

			console.log('Response: ', response);

			if (response.statusCode) {
				setError(true);
			}
		} catch (error) {
			console.log('ERROR: ', error);
		}
	};

	console.log('Availability Error: ', error);
	return (
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
	);
}
