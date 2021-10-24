import {
	CakeIcon,
	CalendarIcon,
	FlagIcon,
	NewspaperIcon,
} from '@heroicons/react/outline';

const actions = [
	{
		title: 'Next Round Information',
		icon: CalendarIcon,
	},
	{
		title: 'Prior Round',
		icon: FlagIcon,
	},
	{
		title: 'Upcoming Events',
		href: '#',
		icon: CakeIcon,
	},
	{
		title: 'Recent News',
		href: '#',
		icon: NewspaperIcon,
	},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function DashboardCards() {
	return (
		<div className='rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px'>
			{actions.map((action, actionIdx) => (
				<div
					key={action.title}
					className={classNames(
						actionIdx === 0
							? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
							: '',
						actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
						actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
						actionIdx === actions.length - 1
							? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
							: '',
						'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500',
					)}
				>
					<div>
						<span
							className={classNames(
								action.iconBackground,
								action.iconForeground,
								'rounded-lg inline-flex p-3 ring-4 ring-white',
							)}
						>
							<action.icon className='h-6 w-6' aria-hidden='true' />
						</span>
					</div>
					<div className='mt-8'>
						<h3 className='text-lg font-medium'>
							<a href={action.href} className='focus:outline-none'>
								{/* Extend touch target to entire panel */}
								<span className='absolute inset-0' aria-hidden='true' />
								{action.title}
							</a>
						</h3>
						<p className='mt-2 text-sm text-gray-500'>
							Doloribus dolores nostrum quia qui natus officia quod et dolorem.
							Sit repellendus qui ut at blanditiis et quo et molestiae.
						</p>
					</div>
				</div>
			))}
		</div>
	);
}
