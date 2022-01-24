function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Siderbar({ navigation, openTab, setOpenTab }): JSX.Element {
	return (
		<div className='flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto md:mr-3'>
			<div className='mt-5 flex-grow flex flex-col'>
				<nav className='flex-1 bg-white space-y-1' aria-label='Sidebar'>
					{navigation.map((item) => (
						<button
							key={item.name}
							onClick={(e) => {
								e.preventDefault();
								setOpenTab(item.num);
							}}
							className={classNames(
								openTab === item.num
									? 'bg-indigo-50 border-indigo-600 text-indigo-600'
									: 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
								'group flex items-center px-3 py-2 text-sm font-medium border-l-4 w-full',
							)}
						>
							<item.icon
								className={classNames(
									openTab === item.num ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500',
									'mr-3 flex-shrink-0 h-6 w-6',
								)}
								aria-hidden='true'
							/>
							{item.name}
						</button>
					))}
				</nav>
			</div>
		</div>
	);
}
