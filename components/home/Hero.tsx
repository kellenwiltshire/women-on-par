import Link from 'next/link';
import Image from 'next/image';

export default function Hero(): JSX.Element {
	return (
		<main className='lg:relative min-h-screen'>
			<div className='mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left'>
				<div className='px-4 lg:w-1/2 sm:px-8 xl:pr-16'>
					<h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl'>
						<span className='block xl:inline'>Women on Par</span>
					</h1>
					<p className='mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl'>
						Since 1990 Women On Par has offered a fun and welcoming environment for women to enjoy playing golf. We
						value fair play and provide an opportunity to meet and form new friendships in a safe and inclusive setting.
						We strive to promote the love of golf in a competitive environment.
					</p>
					<p className='mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl'>
						Golf & Membership Group
					</p>

					<p className='mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl'>
						Closed for the Season. See you in 2023!
					</p>

					{/* <div className='mt-10 sm:flex sm:justify-center lg:justify-start'>
						<div className='rounded-md shadow'>
							<Link href='/login'>
								<a className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10'>
									Login
								</a>
							</Link>
						</div>
					</div> */}
				</div>
			</div>
			<div className='relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-20 lg:right-0 lg:w-1/2 lg:h-96'>
				<Image className='object-cover' src='/brand/logoWithText.jpg' height={488} width={330} alt='Logo' />
			</div>
		</main>
	);
}
