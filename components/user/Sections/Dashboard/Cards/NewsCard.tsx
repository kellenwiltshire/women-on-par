import { useNewsContext } from '@/context/Store';
import { findMostRecentNews } from '@/utils/sortingFunctions';
import { NewspaperIcon } from '@heroicons/react/outline';
import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import useSwr from 'swr';
import DashboardCardLoading from '@/components/LoadingModals/DashboardCardLoading';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function NewsCard(): JSX.Element {
	const { data, error } = useSwr('/api/getNews', fetcher);

	if (error) return <div>Failed to load</div>;
	if (!data) return <DashboardCardLoading />;

	const recentNews = findMostRecentNews(data);

	if (recentNews) {
		const length = 100;
		const shortBody = recentNews.body.substring(0, length) + '...';
		return (
			<Link href='/articles'>
				<a>
					<div className='sm:rounded-bl-lg relative group bg-white p-6 h-full'>
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
							<p className='mt-2 text-gray-500 text-xl'>{recentNews.title}</p>
							<ReactMarkdown className='mt-2 text-sm text-gray-500'>{shortBody}</ReactMarkdown>
						</div>
					</div>
				</a>
			</Link>
		);
	} else {
		return (
			<div className='sm:rounded-bl-lg relative group bg-white p-6 h-full'>
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
					<p className='mt-2 text-gray-500 text-xl'>No Recent News</p>
				</div>
			</div>
		);
	}
}
