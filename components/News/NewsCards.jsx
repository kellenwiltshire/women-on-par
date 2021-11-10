import React from 'react';
import Link from 'next/link';

export default function NewsCards({ post }) {
	const length = 100;
	const shortBody = post.body.substring(0, length) + '...';
	return (
		<div
			key={post.title}
			className='flex flex-col rounded-lg shadow-lg overflow-hidden'
		>
			<div className='flex-shrink-0'>
				<img
					className='h-48 w-full object-cover'
					src={post.media[0].url}
					alt=''
				/>
			</div>
			<div className='flex-1 bg-white p-6 flex flex-col justify-between'>
				<div className='flex-1'>
					<Link
						href={{
							pathname: `/news/${post.id}`,
							query: { slug: post.id },
						}}
					>
						<a className='block mt-2'>
							<p className='text-xl font-semibold text-gray-900'>
								{post.title}
							</p>
							<p className='mt-3 text-base text-gray-500'>{shortBody}</p>
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
}
