import { useNewsContext } from '@/context/Store';
import { findMostRecentNews } from '@/utils/sortingFunctions';
import { NewspaperIcon } from '@heroicons/react/outline';
import React from 'react';
import Link from 'next/link';

export default function NewsCard() {
	const news = useNewsContext();

	const recentNews = findMostRecentNews(news);

	const length = 100;
	const shortBody = recentNews.body.substring(0, length) + '...';

	console.log('NewsCard - news: ', news);
	return (
		<Link href='/articles'>
			<a>
				<div className='sm:rounded-tr-lg relative group bg-white p-6'>
					<div>
						<span className='rounded-lg inline-flex p-3 ring-4 ring-white'>
							<NewspaperIcon className='h-6 w-6' aria-hidden='true' />
						</span>
					</div>
					<div className='mt-8'>
						<h3 className='text-lg font-medium'>
							<span className='inset-0' aria-hidden='true' />
							Recent News
						</h3>
						<p className='mt-2 text-gray-500'>{recentNews.title}</p>
						<p className='mt-2 text-sm text-gray-500'>{shortBody}</p>
					</div>
				</div>
			</a>
		</Link>
	);
}