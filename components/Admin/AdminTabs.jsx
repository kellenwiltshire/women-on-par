const tabs = [
	{ num: 1, name: 'Users' },
	{ num: 2, name: 'Next Round Availability' },
	{ num: 3, name: 'Scores' },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function AdminTabs({ adminTab, setAdminTab }) {
	return (
		<div className='pb-5 border-b border-gray-200 sm:pb-0'>
			<h3 className='text-lg leading-6 font-medium text-gray-900'>
				Admin Panel
			</h3>
			<div className='mt-3 sm:mt-4'>
				<div className='sm:hidden'>
					<label htmlFor='current-tab' className='sr-only'>
						Select a tab
					</label>
					<select
						id='current-tab'
						name='current-tab'
						className='block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
					>
						{tabs.map((tab) => (
							<option key={tab.name}>{tab.name}</option>
						))}
					</select>
				</div>
				<div className='hidden sm:block'>
					<nav className='-mb-px flex space-x-8'>
						{tabs.map((tab) => (
							<button
								onClick={(e) => {
									e.preventDefault();
									setAdminTab(tab.num);
								}}
								key={tab.name}
								href={tab.href}
								className={classNames(
									adminTab === tab.num
										? 'border-indigo-500 text-indigo-600'
										: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
									'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm',
								)}
								aria-current={adminTab === tab.num ? 'page' : undefined}
							>
								{tab.name}
							</button>
						))}
					</nav>
				</div>
			</div>
		</div>
	);
}
