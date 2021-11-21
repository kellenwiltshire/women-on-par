import React from 'react';

export default function EditCourseForm({ course }) {
	return (
		<>
			<div className='min-h-full flex items-center justify-center mb-2 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-md w-full space-y-8'>
					<div>
						<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
							Edit Course
						</h2>
					</div>
					<form className='mt-8 space-y-6' action='#' method='POST'>
						<input type='hidden' name='remember' defaultValue='true' />
						<div className='rounded-md shadow-sm -space-y-px'>
							<div>
								<label htmlFor='name' className='sr-only'>
									Name
								</label>
								<input
									id='name'
									name='name'
									type='name'
									required
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder={course.name}
								/>
							</div>
							<div>
								<label htmlFor='address' className='sr-only'>
									Address
								</label>
								<input
									id='address'
									name='address'
									type='text'
									required
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder={course.address}
								/>
							</div>
							<div>
								<label htmlFor='phone-number' className='sr-only'>
									Phone NUmber
								</label>
								<input
									id='phone-number'
									name='phone-number'
									type='text'
									required
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder={course.phone}
								/>
							</div>
							<div>
								<label htmlFor='email-address' className='sr-only'>
									Email address
								</label>
								<input
									id='email-address'
									name='email'
									type='email'
									autoComplete='email'
									required
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder={course.email}
								/>
							</div>
							<div>
								<label htmlFor='interval' className='sr-only'>
									Interval
								</label>
								<input
									id='interval'
									name='interval'
									type='number'
									required
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder={course.interval}
								/>
							</div>
						</div>

						<div>
							<button
								type='submit'
								className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							>
								<span className='absolute left-0 inset-y-0 flex items-center pl-3'></span>
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
