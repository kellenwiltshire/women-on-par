import React, { useState } from 'react';
import { CalendarIcon } from '@heroicons/react/outline';
import ToggleSwitch from '../../../../Buttons/Toggle';
import { findNextRound } from '../../../../../utils/sortingFunctions';

export default function NextRound({ nextRound, user, jwt }) {
	const [attendance, setAttendance] = useState(
		user.availability[user.availability.length - 1].available,
	); //!This will be updated to reflect information from API
	const [notes, setNotes] = useState(
		user.availability[user.availability.length - 1].notes,
	); //!This will be updated to reflect information from API

	const handleSubmit = async (e) => {
		e.preventDefault();

		//Get an updated schedule incase the page was stale
		const updatedScheduleRes = await fetch('http://localhost:1337/schedules', {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		});
		const updatedSchedule = await updatedScheduleRes.json();

		const confirmedNextRound = await findNextRound(updatedSchedule);

		//build the new Entry
		const newEntry = {
			date: confirmedNextRound.date,
			available: attendance,
			notes: notes,
		};

		//build the body
		const body = {
			...user,
			availability: [...user.availability, newEntry],
		};

		//PUT the new info into the DB so that the Admin can see what each User's availability is
		const pushRes = await fetch(`http://localhost:1337/users/${user.id}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${jwt}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		console.log(pushRes);

		const response = await pushRes.json();

		console.log(response);
	};

	if (nextRound) {
		return (
			<div className='rounded-tl-lg rounded-tr-lg sm:rounded-tr-none relative group bg-white p-6'>
				<div>
					<span className='rounded-lg inline-flex p-3 ring-4 ring-white'>
						<CalendarIcon className='h-6 w-6' aria-hidden='true' />
					</span>
				</div>
				<div className='mt-8'>
					<h3 className='text-lg font-medium'>
						<span className='inset-0' aria-hidden='true' />
						Next Round Information
					</h3>
					<p className='mt-2 text-sm text-gray-500'>
						Course: {nextRound.course.name}
					</p>
					<p className='mt-2 text-sm text-gray-500'>
						Address: {nextRound.course.address}
					</p>
					<p className='mt-2 text-sm text-gray-500'>
						Course Phone Number: {nextRound.course.phone}
					</p>
					<p className='mt-2 text-sm text-gray-500'>Date: {nextRound.date}</p>
					<p className='mt-2 text-sm text-gray-500'>
						Start Time: {nextRound.start_time}
					</p>
				</div>
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
			</div>
		);
	} else {
		return <div></div>;
	}
}
