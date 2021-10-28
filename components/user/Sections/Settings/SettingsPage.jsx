export default function SettingsPage() {
	return (
		<form className='space-y-8 divide-y divide-gray-200'>
			<div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
				<div>
					<div>
						<h3 className='text-lg leading-6 font-medium text-gray-900'>
							User Information
						</h3>
					</div>

					<div className='mt-6 sm:mt-5 space-y-6 sm:space-y-5'>
						<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
							<label
								htmlFor='name'
								className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
							>
								Name
							</label>
							<div className='mt-1 sm:mt-0 sm:col-span-2'>
								<div className='max-w-lg flex rounded-md shadow-sm'>
									<input
										type='name'
										name='name'
										id='name'
										className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3'
										placeholder='Name'
									/>
								</div>
							</div>
						</div>

						<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
							<label
								htmlFor='email'
								className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
							>
								Email
							</label>
							<div className='mt-1 sm:mt-0 sm:col-span-2'>
								<div className='max-w-lg flex rounded-md shadow-sm'>
									<input
										type='email'
										name='email'
										id='email'
										className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3'
										placeholder='you@email.com'
									/>
								</div>
							</div>
						</div>

						<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
							<label
								htmlFor='password'
								className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
							>
								Password
							</label>
							<div className='mt-1 sm:mt-0 sm:col-span-2'>
								<button
									type='button'
									className='bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
								>
									Change Password
								</button>
							</div>
						</div>

						<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5'>
							<label
								htmlFor='photo'
								className='block text-sm font-medium text-gray-700'
							>
								Photo
							</label>
							<div className='mt-1 sm:mt-0 sm:col-span-2'>
								<div className='flex items-center'>
									<span className='h-12 w-12 rounded-full overflow-hidden bg-gray-100'>
										<svg
											className='h-full w-full text-gray-300'
											fill='currentColor'
											viewBox='0 0 24 24'
										>
											<path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
										</svg>
									</span>
									<button
										type='button'
										className='ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
									>
										Change
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='pt-5'>
				<div className='flex justify-end'>
					<button
						type='button'
						className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						Cancel
					</button>
					<button
						type='submit'
						className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						Save
					</button>
				</div>
			</div>
		</form>
	);
}