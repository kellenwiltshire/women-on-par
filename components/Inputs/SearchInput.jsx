export default function SearchInput({ inputName, inputChange }) {
	return (
		<div className='m-2'>
			<label
				htmlFor='search'
				className='block text-sm font-medium text-gray-700'
			>
				{inputName}
			</label>
			<div className='mt-1'>
				<input
					type='text'
					name='search'
					id='search'
					className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-40 sm:text-sm border border-gray-300 rounded-md'
					onChange={inputChange}
				/>
			</div>
		</div>
	);
}
